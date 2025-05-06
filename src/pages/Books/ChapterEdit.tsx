import { useParams } from 'react-router-dom'

import MainLayout from '../../components/layouts/MainLayout'

export default function ChapterEdit() {
  const { productId, chapterId } = useParams()
  console.log('productId', productId)
  console.log('chapterId', chapterId)
  return (
    <MainLayout
      title="编辑章节"
      breadcrumbsItems={[
        { label: '购买书籍', link: '/books' },
        { label: '书籍详情', link: `/books/${productId}` },
      ]}
    >
      <div>章节编辑</div>
    </MainLayout>
  )
}
