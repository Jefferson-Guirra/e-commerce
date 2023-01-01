import {useState,useEffect} from 'react'
import { createContext, ReactNode } from "react"
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { UserCookie } from './Types/User'
import { GET_BOOKS_DATABASE } from './services/helper/FirebaseFunctions'
import { async } from '@firebase/util'

interface Props {
  children: ReactNode
}

type Context = {
  user: UserCookie | undefined
  createCookie: (name: string, value: string) => void
  deleteCookie: (value: string) => void,
  updatedBuyList:(value:string)=>void,
  buyBooks: number
}

export const UserContext = createContext<Context>(null!)

export const UserStorage = ({ children }: Props) => {
  const [user, setUser] = useState<undefined | UserCookie>(undefined)
  const [buyBooks,setBuyBooks] = useState(0)
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

  const getBuyList = async (id:string,idColection:string)=>{
    const buyList = await GET_BOOKS_DATABASE({id:id,idCollection:idColection})
    setBuyBooks(buyList.length)
  }

  const updatedBuyList = (value:string) =>{
    value === 'add' ? setBuyBooks(state => state + 1) : setBuyBooks(state => state - 1)
  }



useEffect(()=>{
    const cookies = parseCookies()
    if(cookies.user !==undefined){
      const user = JSON.parse(cookies.user)
      const updatetdList = async()=>{
        await getBuyList(user.token, 'buyBooks')
      }
      updatetdList()
      setUser(JSON.parse(cookies.user))

    }
},[])

  return (
    <UserContext.Provider
      value={{ user, createCookie, deleteCookie, buyBooks, updatedBuyList }}
    >
      {children}
    </UserContext.Provider>
  )
}