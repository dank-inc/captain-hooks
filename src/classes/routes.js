class Routes {
  constructor({ server }) {
    this.server = server

    // build all the routes and shit
    // handles parsing of http request body and crap
  }

  execController(action, params) {
    this.server.execHTTPAction(action, params)
  }
}
