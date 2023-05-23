export interface IBuyBookCardProps {
  publisher: string
  id: string
  title: string
  qtd: number
  price: number
  idDoc: string
  pageCount: number
  publisherDate: string
  shipping: number
  language: string
  handleNext: (idDoc: string) => void
  handlePrev: (idDoc: string) => void
  handleExclude: (idDoc: string) => void
}
