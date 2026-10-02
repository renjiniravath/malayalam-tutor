import { notFound } from 'next/navigation'
import { LEVELS } from '@/content/levels'
import { LessonPlayer } from '@/components/lesson/LessonPlayer'

export function generateStaticParams() {
  return LEVELS.flatMap((level) =>
    level.lessons.map((lesson) => ({ lessonId: lesson.id })),
  )
}

const ALL_LESSONS = LEVELS.flatMap((level) => level.lessons)

export default async function LessonPage({
  params,
}: {
  params: Promise<{ lessonId: string }>
}) {
  const { lessonId } = await params
  const index = ALL_LESSONS.findIndex((lesson) => lesson.id === lessonId)
  if (index === -1) notFound()
  return <LessonPlayer lesson={ALL_LESSONS[index]} nextLesson={ALL_LESSONS[index + 1]} />
}
