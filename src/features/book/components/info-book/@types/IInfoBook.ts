export interface IInfoBook {
  title: string
  subtitle: string | undefined
  authors: string[]
  description: string
  id: string
  query: string
  favoriteBook: boolean | null
  avarege: number
  handleAddBookDatabase: () => Promise<void>
  handleExcludeBookDatabase: () => Promise<void>
}
