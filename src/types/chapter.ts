export interface Chapter {
  id: number
  name: string
  content?: string
  state: ChapterState
  productId: number
  previous?: number
  next?: number
}

export type ChapterState = 'FREE' | 'LOCKED' | 'CHARGED'
