import { TableNames, User } from '../types/db'

export const userSeeds: User[] = [
  { name: 'elijah' },
  { name: 'erik' },
  { name: 'tanner' },
]

export const seeds: Record<TableNames, any> = { users: userSeeds, messages: [] }
