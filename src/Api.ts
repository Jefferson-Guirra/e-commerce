const apiKey = 'AIzaSyBMfQlCfLea2FkXRsq7KMd0JrqN2YkmyDo'


export async function RELEVANCE_BOOKS (){
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=orderBy:relevance&key=${apiKey}`
  )
  const data = response.json()
  return data
}

export async function SEARCH_BOOKS_ID(id :string){
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes/${id}`
  )
  const data = response.json()
  return data
}

export async function SEARCH_BOOKS_GENRES(genre: string) {
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&filter=paid-ebooks&orderBy=relevance&key=${apiKey}`
  )
  const data = response.json()
  return data
}

export async function NEW_BOOKS(){
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=orderBy:newest&key=${apiKey}`
  )
  const data = response.json()
  return data
}