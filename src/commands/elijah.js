const { servicesVersion } = require('typescript')

const commands = {
  '!dankping': { action: () => {}, reply: 'Pong!' },
  '!interesting': {},
}

module.exports = { commands }
