import Discord, { Message } from 'discord.js'
import { CaptainMessage } from '../types/db'
import { Server } from './server'

export type DiscordBotCFG = {
  testChannelId: string
  token: string
}

type Props = DiscordBotCFG & {
  server: Server
}

// implements thing to force message mapping
export class DiscordBot {
  client: Discord.Client
  server: Server
  helpers: any // TODO: not this

  constructor({ testChannelId, token, server }: Props) {
    this.client = new Discord.Client()
    this.server = server
    this.helpers = {}

    // event listeners - clean up later
    this.client.on('ready', () => {
      this.client.user?.setActivity('WITH MYSELF', { type: 'PLAYING' })
      this.helpers.testChannel = this.client.channels.cache.get(testChannelId)
      // const members = this.client.users.cache

      // this.helpers.testChannel.send('Captain Hooks is online!')
      console.log(`Test Channel Ready! => ${this.client.user?.tag}!`)
    })

    this.client.on('message', async (msg) => {
      const [data, username] = this.mapMessage(msg)
      this.server.persistMsg(data, username, 'discord')

      const content = msg.content.split(' ')

      const keyword = content[0]
      if (keyword[0] !== '!') return

      const response = await this.server.execChatAction(
        keyword.slice(1),
        content.slice(1)
      )
      msg.reply(response)
    })

    // init bot
    this.init(token)
  }

  mapMessage = (
    msg: Message
  ): [
    Pick<CaptainMessage, 'body' | 'channel_id' | 'channel_user_id'>,
    string
  ] => {
    return [
      {
        channel_id: msg.channel.id,
        channel_user_id: msg.author.id,
        body: msg.content,
      },
      msg.author.username,
    ]
  }

  init = async (token: string) => {
    await this.client.login(token)
    console.log(`Discord bot logged in!`)
  }

  msg(body: string) {
    if (this.helpers.testChannel) this.helpers.testChannel.send(body)
  }
}
