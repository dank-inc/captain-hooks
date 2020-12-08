import { userInfo } from 'os'
// DB TYPES
type User = {
  id: number
  name: string
}

// SCHEMA TYPES
type Field = {
  name: string
  type: 'string' | 'integer' | 'timestamp'
}
type Table = {
  name: string
  fields: Field[]
}
type Schema = Table[]

// THE SCHEMA
export const schema: Schema = [
  {
    name: 'user',
    fields: [{ name: 'name', type: 'string' }],
  },
]
