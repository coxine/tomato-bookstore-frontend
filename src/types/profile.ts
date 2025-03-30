export type Profile = {
  id?: string
  username: string
  password?: string
  name?: string
  avatar?: string
  telephone?: string
  email?: string
  location?: string
  role: 'ADMIN' | 'USER'
}
