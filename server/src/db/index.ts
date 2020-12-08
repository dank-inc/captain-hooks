import { userInfo } from 'os'

type User = {
  id: string
  name: string
}

export const schema = [
  {
    name: 'user',
    fields: [
      { name: 'id', type: 'string' },
      { name: 'name', type: 'string' },
    ],
  },
]
