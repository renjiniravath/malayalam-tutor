"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { level1 } from "@/content";
import { ACHIEVEMENTS } from "@/lib/gamification/achievements";
import { levelCanDo, soundMastery } from "@/lib/gamification/mastery";
import {
  pauseLearnerStreak,
  resumeLearnerStreak,
  type StreakState,
  type XpState,
} from "@/lib/gamification/progress";
import { nextRank, rankForXp } from "@/lib/gamification/xp";
import type { ReviewLogRecord } from "@/lib/fsrs/types";
import { progressStore } from "@/lib/progress/store";

/**
 * Progress dashboard (PLAN.md §7, §8): real states, not vague
 * percentages. Rank and XP from real events, streak with its grace and
 * pause, per-sound mastery, the level can-do checklist, and achievements
 * in earned / in-progress / locked states, all derived from stored logs
 * and cards.
 */

interface DashboardData {
  xp: XpState;
  streak: StreakState;
  due: number;
  logs: ReviewLogRecord[];
  cardsCount: number;
  unlocked: Set<string>;
}

const ZH_TOTAL_FALLBACK = 3;
const ACHIEVEMENT_PROGRESS_100 = 100;
const RECENT_LOG_WINDOW = 20;

export default function ProgressPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [unavailable, setUnavailable] = useState(false);

  const fetchDashboard = async (): Promise<DashboardData> => {
    const [xp, streak, due, logs, cards, unlockedRaw] = await Promise.all([
      progressStore.getMeta<XpState>('xp'),
      progressStore.getMeta<StreakState>('streak'),
      progressStore.countDue(new Date()),
      progressStore.listLogs(RECENT_LOG_WINDOW),
      progressStore.listCards(),
      progressStore.getMeta<Record<string, string>>('achievements'),
    ]);
    return {
      xp: xp ?? { total: 0 },
      streak: streak ?? { count: 0, lastDay: '', freezes: 0 },
      due,
      logs,
      cardsCount: cards.length,
      unlocked: new Set(Object.keys(unlockedRaw ?? {})),
    };
  };

  useEffect(() => {
    let cancelled = false;
    fetchDashboard()
      .then((result) => {
        if (!cancelled) {
          setData(result);
          setUnavailable(false);
        }
      })
      .catch(() => {
        if (!cancelled) setUnavailable(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const mastery = useMemo(() => soundMastery(level1, data?.logs ?? []), [data]);
  const canDo = useMemo(() => levelCanDo(level1, data?.logs ?? []), [data]);

  const refresh = async () => {
    try {
      setData(await fetchDashboard());
      setUnavailable(false);
    } catch {
      setUnavailable(true);
    }
  };

  const pause = async () => {
    await pauseLearnerStreak(progressStore, new Date());
    await refresh();
  };

  const resume = async () => {
    await resumeLearnerStreak(progressStore);
    await refresh();
  };

  if (unavailable) {
    return (
      <main className="mx-auto min-h-[100dvh] w-full max-w-md px-4 pb-8 pt-[calc(2rem+env(safe-area-inset-top))]">
        <Link href="/lessons" className="inline-flex min-h-11 items-center rounded-full text-sm text-text-2">
          Lessons
        </Link>
        <h1 className="mt-4 text-3xl font-bold tracking-tight">Progress</h1>
        <p className="mt-4 text-text-2">Progress is not available on this device right now.</p>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="mx-auto min-h-[100dvh] w-full max-w-md px-4 pb-8 pt-[calc(2rem+env(safe-area-inset-top))]">
        <p className="text-sm text-text-2">Loading your progress</p>
      </main>
    );
  }

  const rank = rankForXp(data.xp.total);
  const next = nextRank(data.xp.total);
  const passing = data.logs.filter((log) => log.rating === 'good' || log.rating === 'easy').length;
  const zhMastery = mastery.find((sound) => sound.tag === 'sound:zh');

  const achievementProgress: Record<string, string | undefined> = {
    'first-100-words': `${Math.min(data.cardsCount, ACHIEVEMENT_PROGRESS_100)} of 100 cards scheduled`,
    'zh-master': `${zhMastery?.reviewed ?? 0} of ${zhMastery?.total ?? ZH_TOTAL_FALLBACK} zh words reviewed`,
    'streak-7': `${Math.min(data.streak.count, 7)} of 7 days`,
  };

  return (
    <main className="mx-auto min-h-[100dvh] w-full max-w-md px-4 pb-8 pt-[calc(2rem+env(safe-area-inset-top))]">
      <div className="flex items-center justify-between">
        <Link
          href="/lessons"
          className="inline-flex min-h-11 min-w-11 items-center rounded-full text-sm text-text-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
        >
          Lessons
        </Link>
        <p lang="ml" aria-hidden="true" className="font-malayalam text-xl leading-none">
          മലയാളം
        </p>
      </div>
      <h1 className="mt-4 text-3xl font-bold tracking-tight">Progress</h1>

      <section className="mt-5 rounded-3xl border border-line bg-surface p-5">
        <p className="text-sm font-medium text-text-2">
          Level {rank.level} · {rank.title}
        </p>
        <p className="mt-1 text-4xl font-bold tabular-nums tracking-tight">{data.xp.total} XP</p>
        {next && (
          <p className="mt-1 text-sm text-text-2">
            {next.title} at {next.minXp} XP
          </p>
        )}
      </section>

      <section className="mt-3 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-line bg-surface-2 p-4">
          <p className="text-sm text-text-2">Streak</p>
          <p className="mt-1 text-2xl font-semibold tabular-nums">{data.streak.count} days</p>
        </div>
        <div className="rounded-2xl border border-line bg-surface-2 p-4">
          <p className="text-sm text-text-2">Due today</p>
          <p className="mt-1 text-2xl font-semibold tabular-nums">{data.due} cards</p>
        </div>
        <div className="rounded-2xl border border-line bg-surface-2 p-4">
          <p className="text-sm text-text-2">Reviews</p>
          <p className="mt-1 text-2xl font-semibold tabular-nums">{data.logs.length}</p>
        </div>
        <div className="rounded-2xl border border-line bg-surface-2 p-4">
          <p className="text-sm text-text-2">Recent recall</p>
          <p className="mt-1 text-2xl font-semibold tabular-nums">
            {data.logs.length > 0 ? `${passing} of ${data.logs.length}` : 'None yet'}
          </p>
        </div>
      </section>

      <section className="mt-3 rounded-2xl border border-line bg-surface-2 p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="font-semibold">Streak</h2>
            <p className="mt-1 text-sm text-text-2">
              {data.streak.pausedUntil !== undefined
                ? `Paused until ${data.streak.pausedUntil}. Your streak is safe.`
                : data.streak.freezes > 0
                  ? `A missed day uses a freeze automatically. ${data.streak.freezes} saved.`
                  : 'Finish a ten-card review to earn a freeze. A missed day without one simply restarts.'}
            </p>
          </div>
          {data.streak.pausedUntil === undefined ? (
            <button
              type="button"
              onClick={() => void pause()}
              className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full border border-line px-4 text-sm font-medium transition-opacity active:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
            >
              Pause
            </button>
          ) : (
            <button
              type="button"
              onClick={() => void resume()}
              className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full border border-line px-4 text-sm font-medium transition-opacity active:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
            >
              Resume
            </button>
          )}
        </div>
      </section>

      <section className="mt-3 rounded-2xl border border-line bg-surface-2 p-4">
        <h2 className="font-semibold">Sounds</h2>
        <ul className="mt-2 space-y-1.5">
          {mastery.map((sound) => (
            <li key={sound.tag} className="flex items-baseline justify-between gap-3 text-sm">
              <span className="text-text-2">{sound.label}</span>
              <span className={sound.mastered ? 'font-medium text-accent' : 'tabular-nums text-text-3'}>
                {sound.mastered ? 'mastered' : `${sound.reviewed} of ${sound.total} words`}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-3 rounded-2xl border border-line bg-surface-2 p-4">
        <h2 className="font-semibold">You can</h2>
        <ul className="mt-2 space-y-1.5">
          {canDo.map((entry) => (
            <li key={entry.statement} className="flex items-baseline justify-between gap-3 text-sm">
              <span className={entry.done ? 'text-text-2' : 'text-text-3'}>{entry.statement}</span>
              <span className={entry.done ? 'shrink-0 font-medium text-accent' : 'shrink-0 text-text-3'}>
                {entry.done ? 'done' : 'not yet'}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-3 rounded-2xl border border-line bg-surface-2 p-4">
        <h2 className="font-semibold">Achievements</h2>
        <ul className="mt-2 space-y-2.5">
          {ACHIEVEMENTS.map((definition) => {
            const earned = data.unlocked.has(definition.id);
            const progress = achievementProgress[definition.id];
            return (
              <li key={definition.id} className="flex items-baseline justify-between gap-3 text-sm">
                <span>
                  <span className={earned ? 'font-medium' : 'text-text-2'}>{definition.name}</span>
                  <span className="block text-text-3">{definition.description}</span>
                  {!earned && progress && <span className="block tabular-nums text-text-3">{progress}</span>}
                </span>
                <span className={`shrink-0 font-medium ${earned ? 'text-accent' : 'text-text-3'}`}>
                  {earned ? 'earned' : 'locked'}
                </span>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
