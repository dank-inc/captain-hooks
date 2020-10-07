import Discord from 'discord.js'
import { Server } from './server'

export type DiscordBotCFG = {
  testChannelId: string
  token: string
}

type Props = DiscordBotCFG & {
  server: Server
}

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
      const members = this.client.users.cache
      console.log(`My Botty is ready! => ${this.client.user?.tag}!`)
    })

    this.client.on('message', (msg) => {
      console.log(
        msg.guild?.name,
        msg.channel?.id,
        msg.member?.displayName,
        msg.content
      )

      const keyword = msg.content.split(' ')[0]
      if (keyword[0] !== '!') return

      const response = this.server.execChatAction(keyword)
      msg.reply(response)
    })

    // init bot
    this.client.login(token)
  }

  msg(body: string) {
    if (this.helpers.testChannel) this.helpers.testChannel.send(body)
  }
}
