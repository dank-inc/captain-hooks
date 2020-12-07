import qs from 'querystring'
import axios from 'axios'

type UnsplashParams = {
  count: number // 1 - 30
  content_filter?: 'low' | 'high'
  query?: string
  orientation?: 'landscape' | 'portrait' | 'squarish'
  username?: string
}

export const getPhoto = async (params?: UnsplashParams): Promise<any> => {
  try {
    const res = await axios.get(
      `https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_KEY}`,
      { params }
    )

    console.log('GOT PHOTO', res.config.params)
    return res.data.urls.small
  } catch {
    console.error('FAILLL')
    return 'CAUGHT ERROR'
  }
}
