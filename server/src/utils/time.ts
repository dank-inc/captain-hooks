export const addTimestamps = (date = new Date()) => ({
  created_at: new Date(date),
  updated_at: new Date(date),
})

export const updateUpdatedAt = () => ({
  updated_at: new Date(),
})
