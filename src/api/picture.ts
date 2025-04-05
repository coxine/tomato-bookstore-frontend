import { ApiResponse } from '../types/apiResponse'
import { axios } from '../utils/require'

import { PICTURE_MODULE } from './_prefix'

export const imageUpload = (imageFile: FormData) => {
  return axios
    .post<ApiResponse<string>>(`${PICTURE_MODULE}/images`, imageFile, {
      headers: {
        // 显式删除实例的默认 Content-Type，避免冲突
        'Content-Type': undefined,
      },
    })
    .then((res) => {
      return res
    })
}
