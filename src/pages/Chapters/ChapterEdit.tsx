import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { chapterGetInfo } from '../../api/chapter'
import MainLayout from '../../components/layouts/MainLayout'
import Loading from '../../components/UI/Loading'
import { showToast, ToastSeverity } from '../../components/UI/ToastMessageUtils'
import { Chapter } from '../../types/chapter'

import EditChapterCard from './EditChapterCard'

export default function ChapterEdit() {
  const { chapterId } = useParams()
  const chapterIdNum = parseInt(chapterId || '0')
  const [initialChapterData, setInitialChapterData] = useState<Chapter>()

  // Fetch chapter data when component mounts
  useEffect(() => {
    if (chapterIdNum) {
      chapterGetInfo(chapterIdNum).then((res) => {
        if (res.data.code === '200') {
          setInitialChapterData(res.data.data)
        } else {
          showToast({
            title: '未知错误',
            message: '服务器出错！获取章节内容失败，请刷新尝试！',
            severity: ToastSeverity.Warning,
            duration: 3000,
          })
        }
      })
    }
  }, [chapterIdNum])

  return (
    <MainLayout
      title="编辑章节"
      breadcrumbsItems={[
        { label: '购买书籍', link: '/books' },
        {
          label: '书籍详情',
          link: `/books/${initialChapterData?.productId || 0}`,
        },
      ]}
    >
      {!initialChapterData ? (
        <Loading />
      ) : (
        <EditChapterCard initialChapterData={initialChapterData} />
      )}
    </MainLayout>
  )
}
