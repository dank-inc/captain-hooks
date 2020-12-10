import { TableNames } from '../types/db'

// SCHEMA TYPES
type Field = {
  name: string
  type: 'string' | 'integer' | 'timestamp'
}
type Table = {
  name: TableNames
  fields: Field[]
}
type Schema = Table[]

const IDType = 'integer'

// TODO Type safe table names

// THE SCHEMA
export const schema: Schema = [
  {
    name: 'users',
    fields: [{ name: 'name', type: 'string' }],
  },
  {
    name: 'messages',
    fields: [
      { name: 'body', type: 'string' },
      { name: 'user_id', type: IDType },
    ],
  },
]
