import { ArrowBack, ArrowForward } from '@mui/icons-material'
import { Box, IconButton, Typography, useTheme } from '@mui/joy'
import { useMediaQuery } from '@mui/system'
import { useCallback, useEffect, useRef, useState } from 'react'

interface CarouselProps<T> {
  /** 轮播的数据项 */
  items: T[]
  /** 渲染单个项目的函数 */
  renderItem: (item: T, index: number) => React.ReactNode
  /** 是否自动播放 */
  autoPlay?: boolean
  /** 自动播放间隔(毫秒) */
  interval?: number
  /** 是否显示指示器 */
  showDots?: boolean
  /** 是否显示箭头 */
  showArrows?: boolean
  /** 一次显示多少个项目 (已被响应式设计替代，仅作为备用) */
  itemsPerView?: number
  /** 项目间距 */
  gap?: number
  /** 加载状态 */
  loading?: boolean
  /** 轮播容器的高度 */
  height?: string | number
  /** 轮播容器的最小高度 */
  minHeight?: string | number
}

export default function Carousel<T>({
  items,
  renderItem,
  autoPlay = false,
  interval = 3000,
  showDots = true,
  showArrows = true,
  gap = 16,
  loading = false,
  height = 'auto',
  minHeight = '200px',
}: CarouselProps<T>) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'))

  const getResponsiveItemsPerView = () => {
    if (isMobile) {
      return 1
    } else if (isTablet) {
      return 3
    } else {
      return 4
    }
  }

  const responsiveItemsPerView = getResponsiveItemsPerView()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  // 计算总页数
  const totalPages = Math.ceil(items.length / responsiveItemsPerView)

  // 当响应式itemsPerView改变时重置currentIndex
  useEffect(() => {
    setCurrentIndex(0)
  }, [responsiveItemsPerView])

  // 下一页
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= totalPages - 1 ? 0 : prevIndex + 1
    )
  }, [totalPages])

  // 上一页
  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex <= 0 ? totalPages - 1 : prevIndex - 1
    )
  }, [totalPages])

  // 跳转到指定页
  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  // 自动播放逻辑
  useEffect(() => {
    if (autoPlay && !isHovered && items.length > responsiveItemsPerView) {
      intervalRef.current = setInterval(nextSlide, interval)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [
    autoPlay,
    isHovered,
    items.length,
    responsiveItemsPerView,
    nextSlide,
    interval,
  ])

  // 键盘事件处理
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        prevSlide()
      } else if (event.key === 'ArrowRight') {
        nextSlide()
      }
    }

    const carouselElement = carouselRef.current
    if (carouselElement) {
      carouselElement.addEventListener('keydown', handleKeyDown)
      return () => carouselElement.removeEventListener('keydown', handleKeyDown)
    }
  }, [nextSlide, prevSlide])

  // 如果没有数据或正在加载
  if (loading || items.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height,
          minHeight,
          borderRadius: 'sm',
          border: '1px dashed',
          borderColor: 'divider',
        }}
      >
        <Typography level="body-sm" textColor="text.tertiary">
          {loading ? '加载中...' : '暂无数据'}
        </Typography>
      </Box>
    )
  }

  // 如果只有一个项目或不需要轮播
  if (items.length <= responsiveItemsPerView) {
    return (
      <Box
        sx={{
          display: 'flex',
          gap: `${gap}px`,
          height,
          minHeight,
        }}
      >
        {items.map((item, index) => (
          <Box key={index} sx={{ flex: 1 }}>
            {renderItem(item, index)}
          </Box>
        ))}
      </Box>
    )
  }

  return (
    <Box
      ref={carouselRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        position: 'relative',
        width: '100%',
        height,
        minHeight,
        overflow: 'hidden',
        borderRadius: 'sm',
        '&:focus-visible': {
          outline: '2px solid',
          outlineColor: 'primary.500',
          outlineOffset: '2px',
        },
      }}
      tabIndex={0}
    >
      {/* 轮播内容 */}
      <Box
        sx={{
          display: 'flex',
          transition: 'transform 0.3s ease-in-out',
          transform: `translateX(-${currentIndex * 100}%)`,
          height: '100%',
        }}
      >
        {Array.from({ length: totalPages }).map((_, pageIndex) => (
          <Box
            key={pageIndex}
            sx={{
              display: 'flex',
              gap: `${gap}px`,
              minWidth: '100%',
              height: '100%',
              px: 1,
            }}
          >
            {items
              .slice(
                pageIndex * responsiveItemsPerView,
                (pageIndex + 1) * responsiveItemsPerView
              )
              .map((item, itemIndex) => (
                <Box
                  key={pageIndex * responsiveItemsPerView + itemIndex}
                  sx={{
                    flex: 1,
                    minWidth: 0, // 防止内容溢出
                  }}
                >
                  {renderItem(
                    item,
                    pageIndex * responsiveItemsPerView + itemIndex
                  )}
                </Box>
              ))}
          </Box>
        ))}
      </Box>

      {/* 箭头控制 */}
      {showArrows && (
        <>
          <IconButton
            variant="solid"
            color="neutral"
            size="sm"
            onClick={prevSlide}
            sx={{
              position: 'absolute',
              left: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 1,
              opacity: isHovered ? 0.9 : 0.6,
              transition: 'opacity 0.2s',
              '&:hover': {
                opacity: 1,
              },
            }}
          >
            <ArrowBack />
          </IconButton>
          <IconButton
            variant="solid"
            color="neutral"
            size="sm"
            onClick={nextSlide}
            sx={{
              position: 'absolute',
              right: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 1,
              opacity: isHovered ? 0.9 : 0.6,
              transition: 'opacity 0.2s',
              '&:hover': {
                opacity: 1,
              },
            }}
          >
            <ArrowForward />
          </IconButton>
        </>
      )}

      {/* 指示器 */}
      {showDots && totalPages > 1 && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 16,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 1,
            zIndex: 1,
          }}
        >
          {Array.from({ length: totalPages }).map((_, index) => (
            <Box
              key={index}
              onClick={() => goToSlide(index)}
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor:
                  index === currentIndex ? 'primary.500' : 'neutral.300',
                cursor: 'pointer',
                transition: 'background-color 0.2s, transform 0.2s',
                '&:hover': {
                  backgroundColor:
                    index === currentIndex ? 'primary.600' : 'neutral.400',
                  transform: 'scale(1.2)',
                },
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  )
}
