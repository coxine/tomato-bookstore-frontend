export type Profile = {
  id?: number
  username: string
  password?: string
  name?: string
  avatar?: string
  telephone?: string
  email?: string
  location?: string
  role: 'ADMIN' | 'USER'
}
