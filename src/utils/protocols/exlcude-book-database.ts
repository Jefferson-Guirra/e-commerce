export interface ExcludeBookDatabase {
  removeBook: (accessToken: string, idBook: string) => Promise<void>
}
