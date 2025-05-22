export interface Chapter {
  id?: number
  name: string
  content?: string
  status: ChapterState
  productId: number
  previous?: number
  price?: number
  next?: number
  purchased?: boolean
}

export type ChapterState = 'FREE' | 'LOCKED' | 'CHARGED'