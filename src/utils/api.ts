import { HttpResponse } from '../@types/request/http'
type ApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'
interface BookApi {
  send: (url: string, method: ApiMethod, body: any) => Promise<HttpResponse>
}

export class Api implements BookApi {
  private readonly originUrl = 'https://literando.onrender.com/api/'

  async send(url: string, method: ApiMethod, body: any): Promise<HttpResponse> {
    const promise = await fetch(this.originUrl + url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    return await promise.json()
  }
}
