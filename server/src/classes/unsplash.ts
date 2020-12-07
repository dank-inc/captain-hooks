import qs from 'querystring'
import axios from 'axios'

type UnsplashParams = {
  count: number // 1 - 30
  content_filter?: 'low' | 'high'
  query?: string
  orientation?: 'landscape' | 'portrait' | 'squarish'
  username?: string
}

// {
//   count = 1,
//   content_filter = 'low',
//   query,
//   orientation,
//   username,
// }

export const getPhoto = async (params?: UnsplashParams): Promise<any> => {
  console.log('GETTING PHOTO')
  try {
    const { data } = await axios.get(
      `https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_KEY}`
    )

    console.log('GOT PHOTO', data)
    return data.urls.small
  } catch {
    console.error('FAILLL')
    return 'CAUGHT ERROR'
  }
}
