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
      // const members = this.client.users.cache

      this.helpers.testChannel.send('Captain Hooks is online!')
      console.log(`Test Channel Ready! => ${this.client.user?.tag}!`)
    })

    this.client.on('message', async (msg) => {
      console.log(
        msg.guild?.name,
        msg.channel?.id,
        msg.member?.displayName,
        msg.content
      )

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

  init = async (token: string) => {
    await this.client.login(token)
    console.log(`Discord bot logged in!`)
  }

  msg(body: string) {
    if (this.helpers.testChannel) this.helpers.testChannel.send(body)
  }
}
