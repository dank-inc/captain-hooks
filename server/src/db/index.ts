import { userInfo } from 'os'
// TODO: the magic!

type User = {
  id: string
  name: string
}

type Field = {
  name: string
  type: 'string' | 'integer' | 'timestamp'
}
type Table = {
  name: string
  fields: Field[]
}
type Schema = Table[]

export const schema: Schema = [
  {
    name: 'user',
    fields: [{ name: 'name', type: 'string' }],
  },
]
