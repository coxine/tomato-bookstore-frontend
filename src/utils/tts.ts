import axios from 'axios'

export const ttsAxiosInstance = axios.create({
  baseURL: 'https://get-tts.tgcos.workers.dev',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})
