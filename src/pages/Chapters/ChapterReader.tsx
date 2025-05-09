import {
  ArrowBack,
  ArrowForward,
  Menu as MenuIcon,
  VolumeUp,
  Stop,
} from '@mui/icons-material'
import {
  Typography,
  TypographySystem,
  Box,
  Select,
  Option,
  ColorPaletteProp,
  TypographyPropsColorOverrides,
  Button,
  Dropdown,
  MenuButton,
  MenuItem,
  Menu,
} from '@mui/joy'
import { OverridableStringUnion } from '@mui/types'
import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

import { chapterGetAll, chapterGetInfo } from '../../api/chapter'
import MainLayout from '../../components/layouts/MainLayout'
import Loading from '../../components/UI/Loading'
import { showToast, ToastSeverity } from '../../components/UI/ToastMessageUtils'
import { Chapter } from '../../types/chapter'

const themeColors: {
  value: OverridableStringUnion<ColorPaletteProp, TypographyPropsColorOverrides>
  name: string
}[] = [
  { value: 'primary', name: '墨染青花' },
  { value: 'warning', name: '落日余晖' },
  { value: 'danger', name: '胭脂红尘' },
  { value: 'neutral', name: '水墨山川' },
  { value: 'success', name: '翠竹清风' },
]

const fontSizes: { value: keyof TypographySystem; name: string }[] = [
  { value: 'body-lg', name: '大' },
  { value: 'body-md', name: '中' },
  { value: 'body-sm', name: '小' },
  { value: 'body-xs', name: '特小' },
]

const renderTextWithLineBreaks = (text: string) => {
  return text.split('\n').map((line, index, array) => (
    <Typography key={index}>
      {line}
      <br />
      {index < array.length - 1 && <br />}
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
  const [bookChapters, setBookChapters] = useState<Chapter[]>([])
  console.log('chapterId', chapterId)
  const [fontSize, setFontSize] = useState<keyof TypographySystem>('body-md')
  const [themeColor, setThemeColor] =
    useState<
      OverridableStringUnion<ColorPaletteProp, TypographyPropsColorOverrides>
    >('neutral')
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(
    null
  )

  useEffect(() => {
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
          } else {
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
  }, [chapterIdNum, navigate])

  const handleSpeechToggle = () => {
    if (isSpeaking && audioElement) {
      audioElement.pause()
      audioElement.currentTime = 0
      setIsSpeaking(false)
      return
    }

    if (chapter.content) {
      playSpeech(chapter.content)
    }
  }

  const prepareAudioChunk = (text: string, audio: HTMLAudioElement) => {
    const blobUrl = URL.createObjectURL(new Blob([]))
    audio.src = blobUrl

    fetch('https://tts.cos.tg/v1/audio/speech', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      mode: 'cors',
      credentials: 'omit',
      body: JSON.stringify({
        input: text,
        model: 'tts-1',
        voice: 'zh-CN-YunxiNeural',
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`TTS API error: ${response.status}`)
        }
        return response.blob()
      })
      .then((blob) => {
        const newBlobUrl = URL.createObjectURL(blob)
        audio.src = newBlobUrl
        URL.revokeObjectURL(blobUrl)
        audio.load()
      })
      .catch((error) => {
        console.error('Failed to fetch TTS audio:', error)
        URL.revokeObjectURL(blobUrl)
        setIsSpeaking(false)
      })
  }

  const playSpeech = (text: string) => {
    const audio = audioElement || new Audio()
    prepareAudioChunk(text, audio)

    audio.onplay = () => setIsSpeaking(true)
    audio.onended = () => setIsSpeaking(false)
    audio.onerror = () => {
      console.error('TTS playback error')
      setIsSpeaking(false)
    }

    setAudioElement(audio)

    audio.play().catch((err) => {
      console.error('Failed to play TTS:', err)
      setIsSpeaking(false)
    })
  }

  useEffect(() => {
    // 清除音频
    return () => {
      if (audioElement) {
        audioElement.pause()
        audioElement.src = ''
      }
    }
  }, [audioElement])

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <MainLayout
          title="章节阅读"
          breadcrumbsItems={[
            { label: '购买书籍', link: '/books' },
            { label: '书籍详情', link: `/books/${chapter.productId}` },
          ]}
        >
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
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                width: { xs: '100%', sm: 'auto' },
                justifyContent: { xs: 'space-between', sm: 'flex-end' },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography level="body-sm">字体</Typography>
                <Select
                  value={fontSize}
                  onChange={(_, value) =>
                    setFontSize(value as keyof TypographySystem)
                  }
                  size="sm"
                  sx={{ minWidth: 80 }}
                >
                  {fontSizes.map((size) => (
                    <Option key={size.value} value={size.value}>
                      <Typography level={size.value}>{size.name}</Typography>
                    </Option>
                  ))}
                </Select>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography level="body-sm">主题</Typography>
                <Select
                  value={themeColor}
                  onChange={(_, value) =>
                    setThemeColor(value as ColorPaletteProp)
                  }
                  size="sm"
                  sx={{ minWidth: 100 }}
                >
                  {themeColors.map((theme) => (
                    <Option key={theme.value} value={theme.value}>
                      <Typography
                        color={theme.value}
                        level="body-sm"
                        variant="soft"
                      >
                        {theme.name}
                      </Typography>
                    </Option>
                  ))}
                </Select>
              </Box>
            </Box>
          </Box>
          <Typography
            level={fontSize}
            color={themeColor}
            sx={{
              mb: 1,
              mx: { sx: 1, md: 4 },
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
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 2,
              gap: 2,
            }}
          >
            <Button
              component={Link}
              to={`/chapters/${chapter.previous}`}
              disabled={!chapter.previous}
              variant="soft"
              startDecorator={<ArrowBack />}
              size="sm"
            >
              上一章
            </Button>
            <Dropdown>
              <MenuButton
                variant="outlined"
                startDecorator={<MenuIcon />}
                size="sm"
              >
                章节列表
              </MenuButton>
              <Menu>
                {bookChapters.map((ch) => (
                  <MenuItem
                    key={ch.id}
                    component={Link}
                    to={`/chapters/${ch.id}`}
                  >
                    {ch.name}
                  </MenuItem>
                ))}
              </Menu>
            </Dropdown>
            <Button
              component={Link}
              to={`/chapters/${chapter.next}`}
              disabled={!chapter.next}
              variant="soft"
              endDecorator={<ArrowForward />}
              size="sm"
            >
              下一章
            </Button>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mt: 2,
              gap: 2,
            }}
          >
            <Button
              onClick={handleSpeechToggle}
              variant="soft"
              startDecorator={isSpeaking ? <Stop /> : <VolumeUp />}
              size="sm"
              color={isSpeaking ? 'danger' : 'primary'}
            >
              {isSpeaking ? '停止朗读' : '朗读章节'}
            </Button>
          </Box>
        </MainLayout>
      )}
    </>
  )
}
