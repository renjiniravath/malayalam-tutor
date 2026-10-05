import { contentRevision, currentItemIds } from '@/content';
import { reconcileProgress } from './reconcile';
import type { CardRecord, ReviewLogRecord, Skill } from '@/lib/fsrs/types';
import type { ProgressEvent, ProgressStore } from './store';

/**
 * JSON export/import (PLAN.md §11: backup from day one). The envelope is
 * versioned and validated; on import, cards are reconciled against the
 * current content revision (removed items are dropped, re-added items
 * start fresh) before anything is written. Logs and events import as
 * history; meta (streak, achievements) imports as-is.
 */

export const BACKUP_FORMAT = 'learn-malayalam-backup';
export const BACKUP_VERSION = 1;

export interface BackupEnvelope {
  format: typeof BACKUP_FORMAT;
  version: typeof BACKUP_VERSION;
  contentRevision: number;
  exportedAt: string;
  cards: CardRecord[];
  logs: ReviewLogRecord[];
  events: ProgressEvent[];
  meta: Record<string, unknown>;
}

export async function buildBackup(store: ProgressStore, now: Date): Promise<BackupEnvelope> {
  return {
    format: BACKUP_FORMAT,
    version: BACKUP_VERSION,
    contentRevision: contentRevision.revision,
    exportedAt: now.toISOString(),
    cards: await store.listCards(),
    logs: await store.listLogs(10_000),
    events: await store.listEvents(),
    meta: await store.listMeta(),
  };
}

const SKILLS: Skill[] = ['recognition', 'production'];

function isCardRecord(value: unknown): value is CardRecord {
  const record = value as CardRecord;
  return (
    !!record &&
    typeof record === 'object' &&
    typeof record.key === 'string' &&
    typeof record.itemId === 'string' &&
    SKILLS.includes(record.skill) &&
    record.due instanceof Date &&
    !!record.fsrs &&
    record.fsrs.due instanceof Date &&
    typeof record.fsrs.stability === 'number' &&
    typeof record.fsrs.difficulty === 'number'
  );
}

function isLogRecord(value: unknown): value is ReviewLogRecord {
  const log = value as ReviewLogRecord;
  return (
    !!log &&
    typeof log === 'object' &&
    typeof log.id === 'string' &&
    typeof log.cardKey === 'string' &&
    typeof log.itemId === 'string' &&
    SKILLS.includes(log.skill) &&
    ['again', 'hard', 'good', 'easy'].includes(log.rating) &&
    log.review instanceof Date &&
    log.due instanceof Date
  );
}

/**
 * Parses and validates a backup JSON string. Throws with a learner-safe
 * message when the payload is not a valid backup; returns the envelope
 * with date fields restored to Date objects.
 */
export function parseBackup(raw: string): BackupEnvelope {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error('That file is not valid JSON.');
  }
  const envelope = parsed as BackupEnvelope;
  if (!envelope || envelope.format !== BACKUP_FORMAT) {
    throw new Error('That file is not a Learn Malayalam backup.');
  }
  if (envelope.version !== BACKUP_VERSION) {
    throw new Error('That backup was made by a different version of the app.');
  }
  if (!Number.isInteger(envelope.contentRevision) || !Array.isArray(envelope.cards) || !Array.isArray(envelope.logs)) {
    throw new Error('The backup is missing expected data.');
  }

  // Dates arrive as strings over JSON; restore them and validate shapes.
  const cards = envelope.cards.map((card) => ({
    ...card,
    due: new Date(card.due),
    fsrs: { ...card.fsrs, due: new Date(card.fsrs.due), last_review: card.fsrs.last_review ? new Date(card.fsrs.last_review) : undefined },
  }));
  const logs = envelope.logs.map((log) => ({
    ...log,
    review: new Date(log.review),
    due: new Date(log.due),
  }));
  const events = (envelope.events ?? []).map((event) => ({ ...event, at: new Date(event.at) }));

  if (!cards.every(isCardRecord)) throw new Error('The backup contains cards this version cannot read.');
  if (!logs.every(isLogRecord)) throw new Error('The backup contains review logs this version cannot read.');

  return { ...envelope, cards, logs, events, meta: envelope.meta ?? {} };
}

export interface ImportResult {
  cards: number;
  droppedCards: number;
  logs: number;
  events: number;
}

/**
 * Applies a validated backup. Cards are reconciled through the
 * contentRevision mechanism first: cards for removed items are dropped,
 * cards for re-added items are dropped (they start fresh). Logs and
 * events import as history, and meta is replaced by the backup's.
 */
export async function importBackup(store: ProgressStore, envelope: BackupEnvelope): Promise<ImportResult> {
  const records = envelope.cards.map((card) => ({ itemId: card.itemId, skill: card.skill, state: card }));
  const reconciliation = reconcileProgress(records, currentItemIds(), contentRevision.removedItemIds);
  const activeKeys = new Set(reconciliation.active.map((record) => (record.state as CardRecord).key));

  await store.putCards(envelope.cards.filter((card) => activeKeys.has(card.key)));
  await store.putLogs(envelope.logs);
  for (const event of envelope.events) await store.appendEvent(event);
  for (const [key, value] of Object.entries(envelope.meta)) await store.setMeta(key, value);

  return {
    cards: activeKeys.size,
    droppedCards: envelope.cards.length - activeKeys.size,
    logs: envelope.logs.length,
    events: envelope.events.length,
  };
}

/** Downloads a backup envelope as a JSON file. */
export function downloadBackup(envelope: BackupEnvelope): void {
  const blob = new Blob([JSON.stringify(envelope, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `learn-malayalam-backup-${envelope.exportedAt.slice(0, 10)}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
