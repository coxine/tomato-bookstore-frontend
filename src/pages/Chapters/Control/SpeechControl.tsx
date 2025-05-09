import { VolumeUp, Stop, Pause, PlayArrow } from '@mui/icons-material'
import { Button, IconButton, ButtonGroup } from '@mui/joy'
import { useEffect, useState } from 'react'

import { generateSpeech } from '../../../api/tts'
import {
  showToast,
  ToastSeverity,
} from '../../../components/UI/ToastMessageUtils'
import { Chapter } from '../../../types/chapter'

export default function SpeechControl({ chapter }: { chapter: Chapter }) {
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

  const handlePauseResumeToggle = () => {
    if (audioElement) {
      if (audioElement.paused) {
        audioElement.play()
        setIsSpeaking(true)
      } else {
        audioElement.pause()
        setIsSpeaking(false)
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
      setIsSpeaking(false)
    }
  }

  const playSpeech = async (text: string) => {
    showToast({
      title: '正在合成音频',
      message: '请稍等片刻',
      severity: ToastSeverity.Primary,
      duration: 3000,
    })
    const audio = audioElement || new Audio()
    await prepareAudioChunk(text, audio)

    audio.onplay = () => setIsSpeaking(true)
    audio.onended = () => setIsSpeaking(false)
    audio.onerror = () => {
      setIsSpeaking(false)
    }

    setAudioElement(audio)

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
      setIsSpeaking(false)
    }
  }

  useEffect(() => {
    return () => {
      if (audioElement) {
        audioElement.pause()
        audioElement.src = ''
      }
    }
  }, [audioElement])

  return (
    <ButtonGroup>
      <Button
        onClick={handleSpeechToggle}
        variant="soft"
        size="sm"
        color={isSpeaking ? 'danger' : 'primary'}
        sx={{ width: { xs: '100%', sm: 'auto' } }}
        startDecorator={isSpeaking ? <Stop /> : <VolumeUp />}
      >
        {isSpeaking ? '停止朗读' : '朗读章节'}
      </Button>
      <IconButton
        onClick={handlePauseResumeToggle}
        variant="soft"
        size="sm"
        color={audioElement?.paused ? 'success' : 'warning'}
        sx={{ width: { xs: '100%', sm: 'auto' } }}
      >
        {audioElement?.paused ? <PlayArrow /> : <Pause />}
      </IconButton>
    </ButtonGroup>
  )
}
