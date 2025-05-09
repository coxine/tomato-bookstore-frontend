import { VolumeUp, Pause, PlayArrow } from '@mui/icons-material'
import { Button, ColorPaletteProp } from '@mui/joy'
import { JSX, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { generateSpeech } from '../../../api/tts'
import {
  showToast,
  ToastSeverity,
} from '../../../components/UI/ToastMessageUtils'
import { Chapter } from '../../../types/chapter'

enum PlaybackState {
  NotRequested,
  Playing,
  Paused,
}

const playbackConfig: {
  state: PlaybackState
  text: string
  decorator: JSX.Element
  color: ColorPaletteProp
}[] = [
  {
    state: PlaybackState.NotRequested,
    text: '朗读章节',
    decorator: <VolumeUp />,
    color: 'primary',
  },
  {
    state: PlaybackState.Playing,
    text: '暂停',
    decorator: <Pause />,
    color: 'warning',
  },
  {
    state: PlaybackState.Paused,
    text: '恢复播放',
    decorator: <PlayArrow />,
    color: 'success',
  },
]

export default function SpeechControl({ chapter }: { chapter: Chapter }) {
  const [playbackState, setPlaybackState] = useState<PlaybackState>(
    PlaybackState.NotRequested
  )
  const audioElementRef = useRef<HTMLAudioElement | null>(null)
  const location = useLocation()

  const handlePlaybackToggle = () => {
    if (playbackState === PlaybackState.NotRequested && chapter.content) {
      playSpeech(chapter.content)
    } else if (audioElementRef.current) {
      if (playbackState === PlaybackState.Paused) {
        audioElementRef.current.play()
        setPlaybackState(PlaybackState.Playing)
      } else if (playbackState === PlaybackState.Playing) {
        audioElementRef.current.pause()
        setPlaybackState(PlaybackState.Paused)
      }
    }
  }

  const prepareAudioChunk = async (text: string, audio: HTMLAudioElement) => {
    try {
      const blob = await generateSpeech(text)
      const newBlobUrl = URL.createObjectURL(blob)
      audio.src = newBlobUrl
      audio.load()
    } catch {
      setPlaybackState(PlaybackState.NotRequested)
      showToast({
        title: '合成失败',
        message: '请检查网络连接或重试',
        severity: ToastSeverity.Danger,
        duration: 3000,
      })
    }
  }

  const playSpeech = async (text: string) => {
    showToast({
      title: '正在合成音频',
      message: '合成音频耗时较长，请耐心等待',
      severity: ToastSeverity.Primary,
      duration: 3000,
    })
    const audio = audioElementRef.current || new Audio()
    await prepareAudioChunk(text, audio)

    audio.onplay = () => setPlaybackState(PlaybackState.Playing)
    audio.onended = () => setPlaybackState(PlaybackState.Paused)
    audio.onerror = () => setPlaybackState(PlaybackState.NotRequested)

    audioElementRef.current = audio

    try {
      await audio.play()
      showToast({
        title: '正在播放',
        message: '音频合成成功！',
        severity: ToastSeverity.Success,
        duration: 3000,
      })
    } catch {
      showToast({
        title: '播放失败',
        message: '请检查音频设置',
        severity: ToastSeverity.Danger,
        duration: 3000,
      })
      setPlaybackState(PlaybackState.NotRequested)
    }
  }

  useEffect(() => {
    return () => {
      if (audioElementRef.current) {
        audioElementRef.current.pause()
        setPlaybackState(PlaybackState.NotRequested)
      }
    }
  }, [location])

  const currentConfig = playbackConfig.find(
    (config) => config.state === playbackState
  )

  return (
    <Button
      onClick={handlePlaybackToggle}
      variant="soft"
      size="sm"
      color={currentConfig?.color}
      sx={{ width: { xs: '100%', sm: 'auto' } }}
      startDecorator={currentConfig?.decorator}
    >
      {currentConfig?.text}
    </Button>
  )
}
