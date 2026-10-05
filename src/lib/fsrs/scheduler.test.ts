import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { State } from 'ts-fsrs';
import {
  DAILY_REVIEW_CAP,
  DESIRED_RETENTION,
  LESSON_INJECTION_LIMIT,
  newCardRecord,
  persistReview,
  ratingForAnswer,
  reviewCard,
} from './scheduler';
import { cardKey, type CardRecord, type ReviewLogRecord } from './types';
import { MemoryProgressStore, type ProgressStore } from '@/lib/progress/store';

// Fixed clock: all scheduler calls take `now` explicitly (PLAN.md §7).
const DAY = 24 * 60 * 60 * 1000;
const now = new Date('2026-10-05T09:00:00.000Z');

describe('scheduler', () => {
  it('creates cards keyed {itemId, skill}, due immediately, in the New state', () => {
    const record = newCardRecord('mazha', 'recognition', now);
    assert.equal(record.key, 'mazha:recognition');
    assert.equal(cardKey('mazha', 'recognition'), record.key);
    assert.equal(record.due.getTime(), now.getTime());
    assert.equal(record.fsrs.state, State.New);
  });

  it('desired retention is 0.90 and the daily cap matches the 10-minute plan', () => {
    assert.equal(DESIRED_RETENTION, 0.9);
    assert.ok(DAILY_REVIEW_CAP > 0 && DAILY_REVIEW_CAP <= 40, 'cap stays near a 10-minute session');
    assert.equal(LESSON_INJECTION_LIMIT, 2);
  });

  it('a good review schedules the card into the future and returns a log', () => {
    const record = newCardRecord('mazha', 'recognition', now);
    const { record: next, log } = reviewCard(record, 'good', now);

    assert.ok(next.due.getTime() > now.getTime(), 'due moves into the future');
    assert.equal(next.key, record.key);
    assert.equal(log.cardKey, 'mazha:recognition');
    assert.equal(log.itemId, 'mazha');
    assert.equal(log.skill, 'recognition');
    assert.equal(log.rating, 'good');
    assert.equal(log.review.getTime(), now.getTime());
    assert.equal(log.due.getTime(), next.due.getTime());
    assert.ok(log.stability > 0);
    assert.ok(log.scheduledDays >= 0);
    assert.match(log.state, /^(new|learning|review|relearning)$/);
  });

  it('ratings order the next schedule: easy later than good later than hard', () => {
    const due = (rating: 'hard' | 'good' | 'easy') =>
      reviewCard(newCardRecord('mazha', 'recognition', now), rating, now).record.due.getTime();

    assert.ok(due('easy') >= due('good'));
    assert.ok(due('good') >= due('hard'));
  });

  it('again reschedules sooner than a passing grade', () => {
    const againDue = reviewCard(newCardRecord('mazha', 'recognition', now), 'again', now).record.due.getTime();
    const goodDue = reviewCard(newCardRecord('mazha', 'recognition', now), 'good', now).record.due.getTime();
    assert.ok(againDue <= goodDue);
  });

  it('repeated good reviews grow stability; an again lapse resets it downward', () => {
    let record = newCardRecord('mazha', 'recognition', now);
    let stabilityAfterGood = 0;
    for (let day = 1; day <= 3; day++) {
      const t = new Date(now.getTime() + day * DAY);
      const result = reviewCard(record, 'good', t);
      record = result.record;
      stabilityAfterGood = record.fsrs.stability;
    }
    const lapsed = reviewCard(record, 'again', new Date(now.getTime() + 4 * DAY)).record;
    assert.ok(stabilityAfterGood > 0);
    assert.ok(lapsed.fsrs.lapses > record.fsrs.lapses, 'a lapse is counted');
  });

  it('maps drill results: correct is good, wrong is again', () => {
    assert.equal(ratingForAnswer(true), 'good');
    assert.equal(ratingForAnswer(false), 'again');
  });
});

/** A store whose writes always fail, like a blocked IndexedDB on mobile. */
class FailingProgressStore implements ProgressStore {
  async putCard(): Promise<void> {
    throw new Error('storage blocked');
  }
  async getCard(): Promise<CardRecord | undefined> {
    return undefined;
  }
  async listDue(): Promise<CardRecord[]> {
    return [];
  }
  async countDue(): Promise<number> {
    return 0;
  }
  async appendLog(): Promise<void> {
    throw new Error('storage blocked');
  }
  async listLogs(): Promise<ReviewLogRecord[]> {
    return [];
  }
}

/** Records the order of write calls so the card-before-log contract is provable. */
class OrderSpyStore extends MemoryProgressStore {
  calls: string[] = [];
  async putCard(record: CardRecord): Promise<void> {
    this.calls.push('putCard');
    return super.putCard(record);
  }
  async appendLog(log: ReviewLogRecord): Promise<void> {
    this.calls.push('appendLog');
    return super.appendLog(log);
  }
}

describe('persistReview (advance never depends on storage)', () => {
  it('writes the card before the log', async () => {
    const store = new OrderSpyStore();
    const result = reviewCard(newCardRecord('mazha', 'recognition', now), 'good', now);
    await persistReview(store, result, () => {
      throw new Error('onError must not fire on success');
    });
    assert.deepEqual(store.calls, ['putCard', 'appendLog']);
  });

  it('reports through onError and never throws when the store rejects', async () => {
    const store = new FailingProgressStore();
    const result = reviewCard(newCardRecord('mazha', 'recognition', now), 'good', now);
    let reported: unknown;
    await assert.doesNotReject(async () => {
      await persistReview(store, result, (error) => {
        reported = error;
      });
    });
    assert.ok(reported, 'onError was called with the failure');
  });

  it('does not report on success and the card lands in the store', async () => {
    const store = new MemoryProgressStore();
    const result = reviewCard(newCardRecord('mazha', 'recognition', now), 'good', now);
    let reported = false;
    await persistReview(store, result, () => {
      reported = true;
    });
    assert.equal(reported, false);
    assert.ok(await store.getCard('mazha:recognition'));
  });
});
