export interface ITime {
  nanoseconds: number
  seconds: number
}

export interface IDataBook {
  title: string
  language: string
  price: number
  id: string
  publisher: string
  publisherDate: string
  authors: string[]
  categories: string[]
  pageCount: number
  avarege: number
  created: ITime
  idDoc: string
  userId: string
  qtd: number
  shipping: number
}
