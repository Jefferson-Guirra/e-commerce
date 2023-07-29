import { HttpResponse } from '../../@types/request/http'
export interface ExcludeBookDatabase {
  removeBook: (accessToken: string, idBook: string) => Promise<HttpResponse>
}
