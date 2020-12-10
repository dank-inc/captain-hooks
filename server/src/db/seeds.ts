import { Message, TableNames, User } from '../types/db'

export const users: User[] = [
  { name: 'elijah' },
  { name: 'erik' },
  { name: 'tanner' },
]

export const messages: Message[] = [{ body: 'Hello World', user_id: 1 }]

export const seeds: Record<TableNames, any> = { users, messages }
