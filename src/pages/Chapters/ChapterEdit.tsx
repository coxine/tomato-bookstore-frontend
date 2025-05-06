import React from 'react'
import { useParams } from 'react-router-dom'

import MainLayout from '../../components/layouts/MainLayout'
import { Chapter } from '../../types/chapter'

import EditChapterCard from './EditChapterCard'

export default function ChapterEdit() {
  const { chapterId } = useParams()
  const initialChapterData: Chapter = {
    id: 1001,
    name: '第1章',
    state: 'FREE',
    productId: 15,
    content: '梧桐枝桠疯长，爱意贯穿心脏。',
  }

  // Fetch chapter data when component mounts
  React.useEffect(() => {
    if (chapterId) {
      console.log('Fetching chapter data for', chapterId)
      // TODO
    }
  }, [chapterId])

  return (
    <MainLayout
      title="编辑章节"
      breadcrumbsItems={[
        { label: '购买书籍', link: '/books' },
        { label: '书籍详情', link: `/books/${initialChapterData.productId}` },
      ]}
    >
      <EditChapterCard
        initialChapterData={initialChapterData}
      />
    </MainLayout>
  )
}
