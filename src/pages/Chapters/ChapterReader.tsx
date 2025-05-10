import {
  Typography,
  TypographySystem,
  Box,
  ColorPaletteProp,
  Grid,
} from '@mui/joy'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { chapterGetAll, chapterGetInfo } from '../../api/chapter'
import MainLayout from '../../components/layouts/MainLayout'
import Loading from '../../components/UI/Loading'
import { showToast, ToastSeverity } from '../../components/UI/ToastMessageUtils'
import { Chapter } from '../../types/chapter'

import ChapterControl from './Control/ChapterControl'
import SpeechControl from './Control/SpeechControl'
import ThemeControl from './Control/ThemeControl'

const renderTextWithLineBreaks = (text: string) => {
  return text.split('\n').map((line, index, array) => (
    <Typography key={index}>
      {line}
      {index < array.length - 1 && (
        <>
          <br /> <br />
        </>
      )}
    </Typography>
  ))
}

export default function ChapterReader() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const { chapterId } = useParams()
  const chapterIdNum = parseInt(chapterId || '0')
  const [chapter, setChapter] = useState<Chapter>({
    id: 0,
    name: '',
    content: ``,
    status: 'FREE',
    productId: 0,
    previous: 0,
    next: 0,
  })
  const [productId, setPorductId] = useState<number>()
  const [bookChapters, setBookChapters] = useState<Chapter[]>([])
  const [fontSize, setFontSize] = useState<keyof TypographySystem>(
    (localStorage.getItem('fontSize') as keyof TypographySystem) || 'body-md'
  )
  const [themeColor, setThemeColor] = useState<ColorPaletteProp>(
    (localStorage.getItem('themeColor') as ColorPaletteProp) || 'neutral'
  )

  useEffect(() => {
    localStorage.setItem('fontSize', fontSize)
  }, [fontSize])

  useEffect(() => {
    localStorage.setItem('themeColor', themeColor)
  }, [themeColor])

  useEffect(() => {
    setIsLoading(true)
    if (chapterIdNum) {
      // 获取当前章节数据
      chapterGetInfo(chapterIdNum).then((res) => {
        if (res.data.code === '200') {
          setChapter(res.data.data)
          setIsLoading(false)
          if (!res.data.data.productId) {
            showToast({
              title: '错误',
              message: '书籍ID不存在',
              severity: ToastSeverity.Danger,
              duration: 3000,
            })
            navigate('/books')
            return
          } else if (res.data.data.productId !== productId) {
            setPorductId(res.data.data.productId)
            chapterGetAll(res.data.data.productId).then((res) => {
              if (res.data.code === '200') {
                setBookChapters(res.data.data)
              } else {
                showToast({
                  title: '未知错误',
                  message: '服务器出错！获取章节目录失败，请刷新尝试！',
                  severity: ToastSeverity.Warning,
                  duration: 3000,
                })
              }
            })
          }
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
  }, [chapterIdNum, navigate, productId])

  return (
    <MainLayout
      title="章节阅读"
      breadcrumbsItems={[
        { label: '购买书籍', link: '/books' },
        { label: '书籍详情', link: `/books/${chapter.productId}` },
      ]}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', sm: 'center' },
              pl: { xs: 0, md: 6 },
              pr: { xs: 0, md: 4 },
              mb: 2,
              gap: 2,
            }}
          >
            <Typography level="h3">{chapter.name}</Typography>
          </Box>
          <Grid
            container
            gap={1}
            sx={{
              mx: { sx: 1, md: 6 },
              pb: 2,
              justifyItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Grid xs={12} sm="auto">
              {' '}
              <SpeechControl chapter={chapter} />
            </Grid>
            <Grid xs={12} sm="auto">
              {' '}
              <ThemeControl
                setFontSize={setFontSize}
                setThemeColor={setThemeColor}
              />
            </Grid>
          </Grid>
          <Typography
            level={fontSize}
            color={themeColor}
            sx={{
              mb: 1,
              mx: { sx: 1, md: 6 },
              px: { xs: 1, md: 2 },
              py: 2,
              borderRadius: 8,
            }}
            variant="soft"
          >
            {renderTextWithLineBreaks(chapter.content ?? '')}
          </Typography>
          <Box
            sx={{
              mx: { sx: 1, md: 4 },
              py: 2,
              justifyItems: 'center',
            }}
          >
            <ChapterControl chapter={chapter} bookChapters={bookChapters} />
          </Box>
        </>
      )}
    </MainLayout>
  )
}
