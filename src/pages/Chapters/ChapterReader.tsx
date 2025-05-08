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
import { useParams, Link } from 'react-router-dom'

import MainLayout from '../../components/layouts/MainLayout'
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
  const { chapterId } = useParams()
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
    return () => {
      if (audioElement) {
        audioElement.pause()
        audioElement.src = ''
      }
    }
  }, [audioElement])

  const chapter: Chapter = {
    // TODO 获取章节详情
    id: 1001,
    name: '第1章',
    content: `墨燃还没当皇帝的那会儿，总有人骂他是狗。

乡人骂他狗玩意，堂弟骂他狗东西，他干娘最厉害，骂他狗儿子。

当然，总也有过一些与狗相关的形容，不算太差。比如他那些露水情缘，总是带着几分佯怒，嗔他在榻上腰力如公狗，嘴上甜言勾了人的魂魄，身下凶器夺了卿卿性命，但转眼又去与旁人炫耀，搞得瓦肆间人人皆知他墨微雨人俊器猛，试过的饕足意满，没试过的心弛神摇。

不得不说，这些人讲的很对，墨燃确实像是一只摇头摆尾的傻狗。`,
    state: 'FREE',
    productId: 15,
    previous: 1000,
    next: 1002,
  }

  const bookChapters: Chapter[] = [
    // TODO 获取章节列表
    {
      id: 1000,
      name: '序章',
      state: 'FREE',
      productId: 15,
    },
    {
      id: 1001,
      name: '第1章',
      state: 'FREE',
      productId: 15,
    },
    {
      id: 1002,
      name: '第11451412章',
      state: 'CHARGED',
      productId: 15,
    },
    {
      id: 1003,
      name: '第3章',
      state: 'LOCKED',
      productId: 15,
    },
  ]

  return (
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
              onChange={(_, value) => setThemeColor(value as ColorPaletteProp)}
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
              <MenuItem key={ch.id} component={Link} to={`/chapters/${ch.id}`}>
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
  )
}
