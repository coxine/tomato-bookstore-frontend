import { TTS_MODULE } from '../api/_prefix'
import { ttsAxiosInstance } from '../utils/tts'

export async function generateSpeech(input: string): Promise<Blob> {
  const response = await ttsAxiosInstance.post(
    TTS_MODULE,
    {
      input: input,
      model: 'tts-1',
      voice: 'zh-CN-YunxiNeural',
    },
    {
      responseType: 'blob',
    }
  )
  return response.data
}
