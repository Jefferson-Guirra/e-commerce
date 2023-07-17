import { SetCookie } from './protocols/insert-cookie-protocol'
import { GetCookie } from './protocols/get-cookie-protocols'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { GetCookies } from './protocols/get-cookies-protocols'
import { DestroyCookie } from './protocols/destroy-cookie-protocols'

export class HandleCookies
  implements SetCookie, GetCookie, GetCookies, DestroyCookie
{
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
      returnCookies.push(cookies[cookieName])
    }
    return returnCookies
  }

  destroyCookie(name: string) {
    destroyCookie(null, name)
  }
}
