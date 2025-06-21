import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { adGetAllInfo } from '../../api/ad'
import AdCard from '../../components/AdCard'
import Carousel from '../../components/UI/Carousel'
import { showToast, ToastSeverity } from '../../components/UI/ToastMessageUtils'
import { Advertisement } from '../../types/advertisement'

interface AdCarouselProps {
  /** 自动播放 */
  autoPlay?: boolean
  /** 播放间隔(毫秒) */
  interval?: number
  /** 一次显示多少个广告 */
  itemsPerView?: number
  /** 是否显示指示器 */
  showDots?: boolean
  /** 是否显示箭头 */
  showArrows?: boolean
  /** 轮播高度 */
  height?: string | number
  /** 最小高度 */
  minHeight?: string | number
  /** 广告间距 */
  gap?: number
}

export default function AdCarousel({
  autoPlay = true,
  interval = 4000,
  itemsPerView = 3,
  showDots = true,
  showArrows = true,
  height = '300px',
  minHeight = '250px',
  gap = 16,
}: AdCarouselProps) {
  const [adList, setAdList] = useState<Advertisement[]>([])
  const [loading, setLoading] = useState(true)

  const fetchAllAd = async () => {
    try {
      setLoading(true)
      const res = await adGetAllInfo()
      if (res.data.code === '200') {
        setAdList(res.data.data)
      } else {
        showToast({
          title: '获取广告失败',
          message: '服务器出错！获取广告数据失败，请刷新尝试！',
          severity: ToastSeverity.Warning,
          duration: 3000,
        })
        setAdList([])
      }
    } catch (error) {
      console.error('获取广告数据失败:', error)
      showToast({
        title: '网络错误',
        message: '网络连接失败，请检查网络连接！',
        severity: ToastSeverity.Danger,
        duration: 3000,
      })
      setAdList([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllAd()
  }, [])

  // 渲染单个广告卡片
  const renderAdItem = (ad: Advertisement, index: number) => (
    <Link
      key={ad.id || index}
      to={`/books/${ad.productId}`}
      style={{
        textDecoration: 'none',
        display: 'block',
        height: '100%',
      }}
    >
      <AdCard ad={ad} />
    </Link>
  )

  return (
    <Carousel
      items={adList}
      renderItem={renderAdItem}
      autoPlay={autoPlay}
      interval={interval}
      itemsPerView={itemsPerView}
      showDots={showDots}
      showArrows={showArrows}
      height={height}
      minHeight={minHeight}
      gap={gap}
      loading={loading}
    />
  )
}
