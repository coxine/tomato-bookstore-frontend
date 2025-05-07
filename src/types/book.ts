import { Specification } from './specification'

export type Book = {
  id?: number
  title: string
  price?: number
  rate?: number
  description?: string
  cover?: string
  detail?: string
  specifications?: Specification[]
  tags?: Array<string>
}
