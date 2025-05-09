import axios from 'axios'

export const ttsAxiosInstance = axios.create({
  baseURL: 'https://get-tts.tgcos.workers.dev',
  headers: {
    'Content-Type': 'application/json',
  },
})
