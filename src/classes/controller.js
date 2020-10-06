class Controller {
  constructor({ db }) {
    // dependency inject whatever data points we need.
    this.db = db

    this.actions = {
      dice: {
        d6: (params) => (Math.floor(Math.random() * 6) + 1).toString(), // returns string
        d20: (params) => (Math.floor(Math.random() * 20) + 1).toString(), // returns string
      },
      user: {
        get: ({ username }) => {
          return this.db.table('users').get({ username }).then().toJson()
        },
      },
    }
  }

  exec(action, params) {
    return this.actions[action](params)
  }
}

module.exports = { Controller }
