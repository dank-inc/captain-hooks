import { CaptainMessage, TableNames, User } from '../types/db'

export const users: User[] = [
  { name: 'elijah' },
  { name: 'erik' },
  { name: 'tanner' },
]

export const messages: CaptainMessage[] = [
  { body: 'Hello World', user_id: 1, channel_id: '', chat_user_id: '' },
]

export const seeds: Record<TableNames, any> = { users, messages }
