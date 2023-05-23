import { apiKey } from '../helpers/api-key'
export async function RELEVANCE_BOOKS() {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=orderBy:relevance&key=${apiKey}`
    )
    const data = response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}
