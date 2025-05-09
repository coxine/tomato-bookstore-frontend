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

export const chapterEnter = (productId: number, chapter: ChapterSimple) => {
  return axios
    .post<
      ApiResponse<string>
    >(`${PRODUCT_MODULE}/${productId}/chapters`, chapter)
    .then((res) => {
      return res
    })
}

export const chapterUpdate = (chapterId: number, chapter: ChapterSimple) => {
  return axios
    .put<ApiResponse<string>>(`${CHAPTER_MODULE}/${chapterId}`, chapter)
    .then((res) => {
      return res
    })
}

export const chapterDelete = (chapterId: number) => {
  return axios
    .delete<ApiResponse<string>>(`${CHAPTER_MODULE}/${chapterId}`)
    .then((res) => {
      return res
    })
}

export const chapterGetAll = (productId: number) => {
  return axios
    .get<ApiResponse<Chapter[]>>(`${PRODUCT_MODULE}/${productId}/chapters`)
    .then((res) => {
      return res
    })
}

export const chapterGetInfo = (chapterId: number) => {
  return axios
    .get<ApiResponse<Chapter>>(`${CHAPTER_MODULE}/${chapterId}`)
    .then((res) => {
      return res
    })
}
