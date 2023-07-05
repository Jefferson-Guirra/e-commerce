import { HttpResponse } from '../../server/presentation/protocols/http'
export interface ExcludeBookDatabase {
  removeBook: (accessToken: string, idBook: string) => Promise<HttpResponse>
}
