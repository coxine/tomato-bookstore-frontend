import React from 'react'
import { useParams } from 'react-router-dom'

import MainLayout from '../../components/layouts/MainLayout'
import { Chapter } from '../../types/chapter'

import EditChapterCard from './EditChapterCard'

export default function ChapterEdit() {
  const { productId, chapterId } = useParams()
  const initialChapterData: Chapter = {
    id: 1001,
    name: '第1章',
    state: 'FREE',
    productId: 15,
    content: '梧桐枝桠疯长，爱意贯穿心脏。',
  }

  // Fetch chapter data when component mounts
  React.useEffect(() => {
    if (productId && chapterId) {
      // This would be replaced with actual API call to fetch chapter data
      // For now, using placeholder data
      console.log('Fetching chapter data for', productId, chapterId)

      // Simulating data fetch - in real implementation, replace with API call
      // Example: fetchChapter(chapterId).then(data => setInitialChapterData(data))
    }
  }, [productId, chapterId])

  return (
    <MainLayout
      title="编辑章节"
      breadcrumbsItems={[
        { label: '购买书籍', link: '/books' },
        { label: '书籍详情', link: `/books/${productId}` },
      ]}
    >
      <EditChapterCard
        productId={productId || ''}
        initialChapterData={initialChapterData}
      />
    </MainLayout>
  )
}
