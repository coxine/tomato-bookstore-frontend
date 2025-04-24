import { Advertisement } from '../types/advertisement'
import { ApiResponse } from '../types/apiResponse'
import { axios } from '../utils/require'

import { AD_MODULE } from './_prefix'

export const adGetAllInfo = () => {
  return axios.get<ApiResponse<Advertisement[]>>(`${AD_MODULE}`).then((res) => {
    return res
  })
}

export const adUpdate = (ad: Advertisement) => {
  return axios.put<ApiResponse<string>>(`${AD_MODULE}`, ad).then((res) => {
    return res
  })
}

export const adCreate = (ad: Advertisement) => {
  return axios
    .post<ApiResponse<Advertisement>>(`${AD_MODULE}`, ad)
    .then((res) => {
      return res
    })
}

export const adDelete = (adId: string) => {
  return axios
    .delete<ApiResponse<string>>(`${AD_MODULE}/${adId}`)
    .then((res) => {
      return res
    })
}

export const adGetInfo = (adId: string) => {
  return axios
    .get<ApiResponse<Advertisement>>(`${AD_MODULE}/${adId}`)
    .then((res) => {
      return res
    })
}
