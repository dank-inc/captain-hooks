import { Express } from 'express'
import { Server } from './server'

type Props = {
  server: Server
}

export class Routes {
  server: Server
  constructor({ server }: Props) {
    this.server = server

    // build all the routes and shit
    // handles parsing of http request body and crap
  }

  execController(action, params) {
    // package HTTP Params
    this.server.execHTTPAction(action, params)
  }
}
