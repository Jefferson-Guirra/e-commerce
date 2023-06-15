import { HttpResponse } from '../server/presentation/protocols/http'

interface UserApi {
  post: (body: any, url: string) => Promise<HttpResponse>
  delete: (body: any, url: string) => Promise<HttpResponse>
}

export class ApiUser implements UserApi {
  private readonly originUrl = 'http://localhost:3000/api/'

  async post(body: any, url: string): Promise<HttpResponse> {
    const promise = await fetch(this.originUrl + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    return await promise.json()
  }

  async delete(body: any, url: string): Promise<HttpResponse> {
    const promise = await fetch(this.originUrl + url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    return await promise.json()
  }
}
