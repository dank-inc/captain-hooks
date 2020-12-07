export const forN = (n: number, fn: (i: number) => void) => {
  for (let i = 0; i < n; i++) fn(i)
}
