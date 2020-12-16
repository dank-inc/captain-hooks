import { CaptainMessage } from '../../types/db'

export interface IBot {
  mapMessage(
    msg: any
  ): [Pick<CaptainMessage, 'body' | 'channel_id' | 'channel_user_id'>, string]
}
