import { ApiResponse } from '../types/apiResponse'
import { axios } from '../utils/require'

import { PICTURE_MODULE } from './_prefix'

const PICTURE_ACCOUNT_MODULE = `${PICTURE_MODULE}/account`
const PICTURE_PRODUCT_MODULE = `${PICTURE_MODULE}/product`
const PICTURE_AD_MODULE = `${PICTURE_MODULE}/advertisements`

export const imageAvatarUpload = async (imageFile: FormData) => {
  const res = await axios.post<ApiResponse<string>>(
    `${PICTURE_ACCOUNT_MODULE}`,
    imageFile,
    {
      headers: {
        // 显式删除实例的默认 Content-Type，避免冲突
        'Content-Type': undefined,
      },
    }
  )
  return res
}

export const imageProductCoverUpload = async (
  productId: number,
  imageFile: FormData
) => {
  const res = await axios.post<ApiResponse<string>>(
    `${PICTURE_PRODUCT_MODULE}/${productId}`,
    imageFile,
    {
      headers: {
        // 显式删除实例的默认 Content-Type，避免冲突
        'Content-Type': undefined,
      },
    }
  )
  return res
}

export const imageProductCoverUploadWithoutCreate = async (
  imageFile: FormData
) => {
  const res = await axios.post<ApiResponse<string>>(
    `${PICTURE_PRODUCT_MODULE}`,
    imageFile,
    {
      headers: {
        // 显式删除实例的默认 Content-Type，避免冲突
        'Content-Type': undefined,
      },
    }
  )
  return res
}

export const imageAdImageUpload = async (adId: number, imageFile: FormData) => {
  const res = await axios.post<ApiResponse<string>>(
    `${PICTURE_AD_MODULE}/${adId}`,
    imageFile,
    {
      headers: {
        // 显式删除实例的默认 Content-Type，避免冲突
        'Content-Type': undefined,
      },
    }
  )
  return res
}

export const imageAdImageUploadWithoutCreate = async (imageFile: FormData) => {
  const res = await axios.post<ApiResponse<string>>(
    `${PICTURE_AD_MODULE}`,
    imageFile,
    {
      headers: {
        // 显式删除实例的默认 Content-Type，避免冲突
        'Content-Type': undefined,
      },
    }
  )
  return res
}
