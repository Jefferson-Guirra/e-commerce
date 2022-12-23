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

export async  function SEARCH_BOOKS_GENRES(genre: string[]) {

    const genreFormat = genre.reduce((acc,v)=> acc + `+${v}`)
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=subject:${genreFormat}&maxResults=40&filter=paid-ebooks&orderBy=relevance&key=${apiKey}`
    )
    const data = await response.json()


  return data
  
}

export async function NEW_BOOKS(){
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=orderBy:newest&key=${apiKey}`
  )
  const data = response.json()
  return data
}

export async function GET_VOLUME_TITLE_BOOKS(title:string){
  const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}&filter=paid-ebooks`)
  const data = await response.json() 
  return data
}

export async function GET_BOOKS_PARAMS(params: string) {
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${params}&filter=paid-ebooks&maxResults=40&key=${apiKey}`
  )
  const data = await response.json()
  return data
}