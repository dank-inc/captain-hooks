export const commands: Record<string, { action: string }> = {
  '!ping': { action: 'dank.ping' },
  '!interesting': { action: 'dank.interesting' },
  '!rolld6': { action: 'dice.d6' },
  '!rolld20': { action: 'dice.d20' },
}
