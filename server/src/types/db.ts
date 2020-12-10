export type TableNames = 'users' | 'messages'

export type User = {
  name: string
}

export type Message = {
  body: string
  user_id: number
}
