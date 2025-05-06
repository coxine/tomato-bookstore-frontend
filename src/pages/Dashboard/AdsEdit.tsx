import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { adGetInfo } from '../../api/ad'
import MainLayout from '../../components/layouts/MainLayout'
import Loading from '../../components/UI/Loading'
import { showToast, ToastSeverity } from '../../components/UI/ToastMessageUtils'
import { Advertisement } from '../../types/advertisement'

import EditAdsCard from './EditAdsCard'

export default function AdsEdit() {
  const navigate = useNavigate()
  const { adId } = useParams()
  const adIdNum = parseInt(adId || '0')
  const [initialAdsData, setInitialAdsData] = useState<Advertisement>()

  useEffect(() => {
    if (!adIdNum) {
      showToast({
        title: '错误',
        message: '广告ID不存在',
        severity: ToastSeverity.Danger,
        duration: 3000,
      })
      navigate('/dashboard')
      return
    }

    adGetInfo(adIdNum).then((res) => {
      if (res.data.code === '200') {
        setInitialAdsData(res.data.data)
      } else {
        showToast({
          title: '未知错误',
          message: '服务器出错！获取商品数据失败，请刷新尝试！',
          severity: ToastSeverity.Warning,
          duration: 3000,
        })
      }
    })
  }, [adIdNum, navigate])

  return (
    <MainLayout
      title="编辑广告"
      breadcrumbsItems={[{ label: '管理中心', link: '/dashboard' }]}
    >
      {!adIdNum || !initialAdsData ? (
        <Loading />
      ) : (
        <EditAdsCard adId={adIdNum} initialAdsData={initialAdsData} />
      )}
    </MainLayout>
  )
}
