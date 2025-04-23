import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import MainLayout from '../../components/layouts/MainLayout'
import Loading from '../../components/UI/Loading'
import { showToast, ToastSeverity } from '../../components/UI/ToastMessageUtils'
import { Advertisement } from '../../types/advertisement'

import EditAdsCard from './EditAdsCard'

export default function AdsEdit() {
  const navigate = useNavigate()
  const { adId } = useParams()
  const [initialAdsData, setInitialAdsData] = useState<Advertisement>()

  useEffect(() => {
    if (!adId) {
      showToast({
        title: '错误',
        message: '广告ID不存在',
        severity: ToastSeverity.Danger,
        duration: 3000,
      })
      navigate('/dashboard')
      return
    }

    setTimeout(() => {
      const mockData: Advertisement = {
        id: adId,
        title: '测试广告' + adId,
        content: '这是一个测试广告的详细内容描述，支持较长文本。',
        imgUrl: 'https://picsum.photos/400/300',
        productId: '101',
      }
      setInitialAdsData(mockData)
    }, 500)
  }, [adId, navigate])

  return (
    <MainLayout
      title="编辑广告"
      breadcrumbsItems={[{ label: '管理中心', link: '/dashboard' }]}
    >
      {!adId || !initialAdsData ? (
        <Loading />
      ) : (
        <EditAdsCard adId={adId} initialAdsData={initialAdsData} />
      )}
    </MainLayout>
  )
}
