import { SetCookie } from './protocols/insert-cookie-protocol'
import { parseCookies, setCookie } from 'nookies'

export class HandleCookies implements SetCookie, GetCookie, GetCookies {
  insert(name: string, value: any): void {
    setCookie(null, name, JSON.stringify(value), {
      maxAge: 86400,
      path: '/',
    })
  }

  getCookie(cookieName: string): any {
    const cookies = parseCookies()
    return cookies[cookieName]
  }

  getCookies(cookiesNames: string[]): any {
    const returnCookies = []
    const cookies = parseCookies()
    for (const cookieName of cookiesNames) {
      returnCookies.push({
        [cookieName]: cookies[cookieName],
      })
    }
    return returnCookies
  }
}