import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { rateRank } from '../api/rate'
import { Book } from '../types/book'

import BookCard from './BookCard'
import Carousel from './UI/Carousel'
import { showToast, ToastSeverity } from './UI/ToastMessageUtils'

interface BookCarouselProps {
  /** 自动播放 */
  autoPlay?: boolean
  /** 播放间隔(毫秒) */
  interval?: number
  /** 一次显示多少本书 */
  itemsPerView?: number
  /** 是否显示指示器 */
  showDots?: boolean
  /** 是否显示箭头 */
  showArrows?: boolean
  /** 轮播高度 */
  height?: string | number
  /** 最小高度 */
  minHeight?: string | number
  /** 书籍间距 */
  gap?: number
  /** 获取排行榜书籍数量 */
  bookCount?: number
}

export default function BookCarousel({
  autoPlay = true,
  interval = 6000,
  showDots = true,
  showArrows = true,
  height = '350px',
  minHeight = '300px',
  gap = 16,
  bookCount = 12,
}: BookCarouselProps) {
  const [bookRankings, setBookRankings] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)

  const fetchRank = async () => {
    try {
      setLoading(true)
      const res = await rateRank(bookCount)
      if (res.data.code === '200') {
        setBookRankings(res.data.data)
      } else if (res.data.code === '400') {
        showToast({
          title: '意外错误',
          message: res.data.msg,
          severity: ToastSeverity.Warning,
          duration: 3000,
        })
        setBookRankings([])
      } else {
        showToast({
          title: '未知错误',
          message: '服务器出错！获取排行榜失败，请重新尝试！',
          severity: ToastSeverity.Warning,
          duration: 3000,
        })
        setBookRankings([])
      }
    } catch (error) {
      console.error('获取排行榜失败:', error)
      showToast({
        title: '网络错误',
        message: '网络连接失败，请检查网络连接！',
        severity: ToastSeverity.Danger,
        duration: 3000,
      })
      setBookRankings([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRank()
  }, [bookCount]) // eslint-disable-line react-hooks/exhaustive-deps

  // 渲染单本书籍
  const renderBookItem = (book: Book, index: number) => (
    <Link
      key={book.id || index}
      to={`/books/${book.id}`}
      style={{
        textDecoration: 'none',
        display: 'block',
        height: '100%',
      }}
    >
      <BookCard book={book} />
    </Link>
  )

  return (
    <Carousel
      items={bookRankings}
      renderItem={renderBookItem}
      autoPlay={autoPlay}
      interval={interval}
      showDots={showDots}
      showArrows={showArrows}
      height={height}
      minHeight={minHeight}
      gap={gap}
      loading={loading}
    />
  )
}
