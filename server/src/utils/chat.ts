export const parseChatArgs = (
  content: string[]
): Record<string, string | number> => {
  // expect ["blah=bleh", "blah=bleh", "what", "doing"]

  // strip non params
  const args = content.filter((w) => w.includes('='))

  // @ts-ignore
  const params = Object.fromEntries(args.map((i) => i.split('=')))

  return params
}
