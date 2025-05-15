import { ApiResponse } from '../types/apiResponse'
import { Chapter, ChapterState } from '../types/chapter'
import { axios } from '../utils/require'

import { CHAPTER_MODULE, PRODUCT_MODULE } from './_prefix'

interface ChapterSimple {
  name: string
  content?: string
  status: ChapterState
  previous?: number
  next?: number
}

export const chapterEnter = async (productId: number, chapter: ChapterSimple) => {
  const res = await axios
    .post<
      ApiResponse<string>
    >(`${PRODUCT_MODULE}/${productId}/chapters`, chapter)
  return res
}

export const chapterUpdate = async (chapterId: number, chapter: ChapterSimple) => {
  const res = await axios
    .put<ApiResponse<string>>(`${CHAPTER_MODULE}/${chapterId}`, chapter)
  return res
}

export const chapterDelete = async (chapterId: number) => {
  const res = await axios
    .delete<ApiResponse<string>>(`${CHAPTER_MODULE}/${chapterId}`)
  return res
}

export const chapterGetAll = async (productId: number) => {
  const res = await axios
    .get<ApiResponse<Chapter[]>>(`${PRODUCT_MODULE}/${productId}/chapters`)
  return res
}

export const chapterGetInfo = async (chapterId: number) => {
  const res = await axios
    .get<ApiResponse<Chapter>>(`${CHAPTER_MODULE}/${chapterId}`)
  return res
}
