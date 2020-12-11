export type TableNames = 'users' | 'messages'

export type User = {
  name: string
}

export type CaptainMessage = {
  body: string
  user_id: number
  chat_user_id: string
  channel_id: string
}
