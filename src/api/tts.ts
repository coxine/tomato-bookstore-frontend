import { TTS_MODULE } from '../api/_prefix'
import { ttsAxiosInstance } from '../utils/tts'

export async function generateSpeech(input: string): Promise<Blob> {
  try {
    const response = await ttsAxiosInstance.post(
      TTS_MODULE,
      {
        input: input,
        model: 'tts-1',
        voice: 'zh-CN-YunxiNeural',
        speed: 0.9,
      },
      {
        responseType: 'blob',
      }
    )
    return response.data
  } catch (error) {
    console.error('Failed to generate speech:', error)
    throw error
  }
}
