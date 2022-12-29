import {useState,useEffect} from 'react'
import { createContext, ReactNode } from "react"
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { UserCookie } from './Types/User'

interface Props {
  children: ReactNode
}

type Context = {
  user: UserCookie | undefined
  createCookie: (name: string, value: string) => void
  deleteCookie: (value: string) => void
}

export const UserContext = createContext<Context>(null!)

export const UserStorage = ({ children }: Props) => {
  const [user, setUser] = useState<undefined | UserCookie>(undefined)
  
  const createCookie = (name: string,value:string) => {
    setCookie(null, name, value, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/'
    })
    setUser(JSON.parse(value))
  }

  const deleteCookie = (value: string) => {
    destroyCookie(null, value)
    setUser(undefined)
  }



useEffect(()=>{
    const cookies = parseCookies()
    if(cookies.user !==undefined){
      setUser(JSON.parse(cookies.user))
    }
},[])

  return (
    <UserContext.Provider
      value={{user,createCookie,deleteCookie}}
    >
      {children}
    </UserContext.Provider>
  )
}