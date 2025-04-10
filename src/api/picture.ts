import { ApiResponse } from '../types/apiResponse'
import { axios } from '../utils/require'

import { PICTURE_MODULE } from './_prefix'

export const imageAvatarUpload = (imageFile: FormData) => {
  return axios
    .post<ApiResponse<string>>(`${PICTURE_MODULE}/account`, imageFile, {
      headers: {
        // 显式删除实例的默认 Content-Type，避免冲突
        'Content-Type': undefined,
      },
    })
    .then((res) => {
      return res
    })
}

export const imageProductCoverUpload = (
  productId: string,
  imageFile: FormData
) => {
  return axios
    .post<ApiResponse<string>>(
      `${PICTURE_MODULE}/product/${productId}`,
      imageFile,
      {
        headers: {
          // 显式删除实例的默认 Content-Type，避免冲突
          'Content-Type': undefined,
        },
      }
    )
    .then((res) => {
      return res
    })
}

export const imageProductCoverUploadWithoutCreate = (imageFile: FormData) => {
  return axios
    .post<ApiResponse<string>>(`${PICTURE_MODULE}/product`, imageFile, {
      headers: {
        // 显式删除实例的默认 Content-Type，避免冲突
        'Content-Type': undefined,
      },
    })
    .then((res) => {
      return res
    })
}
