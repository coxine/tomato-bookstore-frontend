import axios from 'axios'

export const ttsAxiosInstance = axios.create({
  baseURL: 'https://tts-service.cos.tg',
  headers: {
    'Content-Type': 'application/json',
  },
})
