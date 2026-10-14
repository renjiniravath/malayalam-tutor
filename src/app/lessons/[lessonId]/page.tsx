import { notFound } from "next/navigation";
import { levels } from "@/content";
import { LessonPlayer } from "@/components/player/LessonPlayer";

export function generateStaticParams() {
  return levels.flatMap((level) =>
    level.lessons.map((lesson) => ({ lessonId: lesson.id })),
  );
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
  return <LessonPlayer lesson={lesson} />;
}
