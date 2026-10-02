import { readFile } from "node:fs/promises";
import path from "node:path";
import { notFound } from "next/navigation";
import { levels } from "@/content";
import { LessonPlayer } from "@/components/player/LessonPlayer";

export function generateStaticParams() {
  return levels.flatMap((level) =>
    level.lessons.map((lesson) => ({ lessonId: lesson.id })),
  );
}

/**
 * Articulation SVGs are inlined at build time (content:check already
 * guarantees they contain no scripts or external references), so the
 * player renders diagrams with zero runtime requests.
 */
async function loadDiagrams(lesson: (typeof levels)[number]["lessons"][number]) {
  const diagrams: Record<string, string> = {};
  for (const item of lesson.items) {
    const diagram = item.articulation?.diagram;
    if (diagram && !(diagram in diagrams)) {
      const file = path.join(process.cwd(), "src/content", diagram);
      diagrams[diagram] = await readFile(file, "utf8");
    }
  }
  return diagrams;
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = await params;
  const lesson = levels
    .flatMap((level) => level.lessons)
    .find((candidate) => candidate.id === lessonId);
  if (!lesson) notFound();
  const diagrams = await loadDiagrams(lesson);
  return <LessonPlayer lesson={lesson} diagrams={diagrams} />;
}
