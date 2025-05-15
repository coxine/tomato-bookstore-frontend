import { Advertisement } from '../types/advertisement'
import { ApiResponse } from '../types/apiResponse'
import { axios } from '../utils/require'

import { AD_MODULE } from './_prefix'

export const adGetAllInfo = async () => {
  const res = await axios.get<ApiResponse<Advertisement[]>>(`${AD_MODULE}`)
  return res
}

export const adUpdate = async (ad: Advertisement) => {
  const res = await axios.put<ApiResponse<string>>(`${AD_MODULE}`, ad)
  return res
}

export const adCreate = async (ad: Advertisement) => {
  const res = await axios.post<ApiResponse<Advertisement>>(`${AD_MODULE}`, ad)
  return res
}

export const adDelete = async (adId: number) => {
  const res = await axios.delete<ApiResponse<string>>(`${AD_MODULE}/${adId}`)
  return res
}

export const adGetInfo = async (adId: number) => {
  const res = await axios.get<ApiResponse<Advertisement>>(
    `${AD_MODULE}/${adId}`
  )
  return res
}
