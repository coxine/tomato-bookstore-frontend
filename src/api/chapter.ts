import { ApiResponse } from '../types/apiResponse'
import { Chapter } from '../types/chapter'
import { axios } from '../utils/require'

import { CHAPTER_MODULE, PRODUCT_MODULE } from './_prefix'

export const chapterEnter = async (
  productId: number,
  chapter: Chapter
) => {
  const res = await axios.post<ApiResponse<string>>(
    `${PRODUCT_MODULE}/${productId}/chapters`,
    chapter
  )
  return res
}

export const chapterUpdate = async (
  chapterId: number,
  chapter: Chapter
) => {
  const res = await axios.put<ApiResponse<string>>(
    `${CHAPTER_MODULE}/${chapterId}`,
    chapter
  )
  return res
}

export const chapterDelete = async (chapterId: number) => {
  const res = await axios.delete<ApiResponse<string>>(
    `${CHAPTER_MODULE}/${chapterId}`
  )
  return res
}

export const chapterGetAll = async (productId: number) => {
  const res = await axios.get<ApiResponse<Chapter[]>>(
    `${PRODUCT_MODULE}/${productId}/chapters`
  )
  return res
}

export const chapterGetInfo = async (chapterId: number) => {
  const res = await axios.get<ApiResponse<Chapter>>(
    `${CHAPTER_MODULE}/${chapterId}`
  )
  return res
}

/**
 * 返回用户在对应productId书中，已购买的章节id数组
 */
export const chapterGetPurchased = async (productId: number) => {
  const res = await axios.get<ApiResponse<number[]>>(
    `${PRODUCT_MODULE}/${productId}/account/chapters`
  )
  return res
}
