type AcessInfo = {
  accessViewStatus: string
  country: string
  embeddable: boolean
  epub: { isAvailable: boolean }
  pdf: { isAvailable: boolean }
  publicDomain: boolean
  quoteSharingAllowed: boolean
  textToSpeechPermission: string
  viewability: string
  webReaderLink: string
}
type SaleInfo = {
  buyLink: string
  country: string
  isEbook: boolean
  listPrice: { amount: number; currencyCode: string }
  offers: Array<{
    finskyOfferType: number
    giftable: boolean
    listPrice: { amountInMicros: number; currencyCode: string }
    retailPrice: { amountInMicros: number; currencyCode: string }
    saleability: string
  }>
  retailPrice: { amount: number; currencyCode: string }
  saleability: string
}

type VolumeInfo = {
  allowAnonLogging: 'boolean'
  authors: string[]
  canonicalVolumeLink: string
  categories: string[]
  contentVersion: string
  description: string
  averageRating: number
  imageLinks: {
    smallThumbnail: string
    thumbnail: string
    small: string
    medium: string
    large: string
    extraLarge: string
  }
  industryIdentifiers: Array<{ type: string; identifier: string }>
  infoLink: string
  language: string
  maturityRating: string
  pageCount: number
  panelizationSummary: {
    containsEpubBubbles: boolean
    containsImageBubbles: boolean
  }
  previewLink: string
  printType: string
  printedPageCount: number
  publishedDate: string
  publisher: string
  readingModes: { text: string; image: string }
  title: string
  subtitle?: string
}

export interface Book {
  kind: string
  id: string
  etag: string
  selfLink: string
  accessInfo: AcessInfo
  volumeInfo: VolumeInfo
  layerInfo: {
    layers: Array<{ layerId: string; volumeAnnotationsVersion: string }>
  }
  saleInfo: SaleInfo
}

export type Books = {
  kind: string
  totalItems: number
  items: Book[]
}
