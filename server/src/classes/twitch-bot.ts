import * as tmi from 'tmi.js'
import { CaptainMessage } from '../types/db'
import { Server } from './server'

export type TwitchBotCFG = {
  oauth: string
  channels: string[]
  noticeChannel: string
  debug: boolean
}

type Props = {
  debug: boolean
  oauth: string
  channels: string[]
  noticeChannel: string
  server: Server
}

export class TwitchBot {
  server: Server
  client: tmi.Client
  noticeChannel: string

  constructor({ debug, oauth, channels, noticeChannel, server }: Props) {
    this.server = server

    const options = {
      options: { debug },
      connection: {
        reconnect: true,
      },
      identity: {
        username: 'dankbot',
        password: oauth,
      },
      channels,
    }
    this.client = tmi.Client(options)
    this.noticeChannel = noticeChannel

    this.client.connect()
    console.log('Twitch bot be twitchin')

    this.client.on('message', async (channel, tags, message, self) => {
      const [data, username] = this.mapMessage(tags, message)
      this.server.persistMsg(data, username, 'twitch')

      const content = message.split(' ')
      const keyword = content[0]

      if (keyword[0] !== '!') return

      const isSubscriber = tags.badges?.subscriber

      console.log(channel, keyword)

      const args = {}

      const response = await this.server.execChatAction(
        keyword.slice(1),
        content.slice(1)
      )
      this.client.say(channel, response)
    })
  }

  mapMessage(
    msg: tmi.ChatUserstate,
    body: string
  ): [Pick<CaptainMessage, 'channel_id' | 'chat_user_id' | 'body'>, string] {
    return [
      {
        channel_id: msg['room-id'] as string,
        chat_user_id: msg['user-id'] as string,
        body,
      },
      msg.username as string,
    ]
  }

  msg(body: string) {
    this.client.say(this.noticeChannel, body)
    // send message
  }
}

module.exports = { TwitchBot }
