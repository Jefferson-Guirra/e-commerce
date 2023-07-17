import { HttpResponse } from '../server/presentation/protocols/http'
interface BookApi {
  get: (body: any, url: string) => Promise<HttpResponse>
  post: (body: any, url: string) => Promise<HttpResponse>
  delete: (body: any, url: string) => Promise<HttpResponse>
  put: (body: any, url: string) => Promise<HttpResponse>
}

export class Api implements BookApi {
  private readonly originUrl = 'http://localhost:3000/api/'
  async get(body: any, url: string): Promise<HttpResponse> {
    const promise = await fetch(this.originUrl + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    return await promise.json()
  }

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

  async put(body: any, url: string): Promise<HttpResponse> {
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
