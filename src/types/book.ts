import { Specification } from './specification'
import { Tag } from './tag'

export type Book = {
  id?: number
  title: string
  price?: number
  rate?: number
  description?: string
  cover?: string
  detail?: string
  specifications?: Specification[]
  tags?: Tag[]
}
