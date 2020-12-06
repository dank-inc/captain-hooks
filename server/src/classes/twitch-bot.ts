import * as tmi from 'tmi.js'
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

    this.client.on('message', (channel, tags, message, self) => {
      const keyword = message.split(' ')[0]
      if (keyword[0] !== '!') return

      const username = tags['username']
      const userId = tags['user-id']
      const isSubscriber = tags.badges?.subscriber

      console.log(channel, keyword)

      const response = this.server.execChatAction(keyword)
      this.client.say(channel, response)
    })
  }

  msg(body: string) {
    this.client.say(this.noticeChannel, body)
    // send message
  }
}

module.exports = { TwitchBot }
