import { apiKey } from '../helpers/api-key'

export const NEW_BOOKS = async () => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=orderBy:newest&key=${apiKey}`
    )
    const data = response.json()
    return data
  } catch (err) {
    return null
  }
}
