export interface IInfoBook {
  title: string
  subtitle: string | undefined
  authors: string[]
  description: string
  id: string
  query: string
  favoriteBook: boolean | null
  avarege: number
  handleAddBookDatabase: (collection: string) => void
  handleExcludeBookFavoriteList: (collection: string) => void
}
