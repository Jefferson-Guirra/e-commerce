import {useState,FormEvent,memo,useContext,useEffect} from 'react'
import { UserContext } from '../../UserContext'
import * as C from './styles'
import Link from 'next/link'
import { SiBookstack } from 'react-icons/si'
import { BiSearch, BiBookAlt, BiUser } from 'react-icons/bi'
import { AiOutlineHeart } from 'react-icons/ai'
import { FiShoppingCart } from 'react-icons/fi'
import { MdOutlineNavigateNext } from 'react-icons/md'
import { useRouter } from 'next/router'
import { SessionUser } from '../../Types/User'
import { signOut, useSession,getSession } from 'next-auth/react'
import { parseCookies } from 'nookies'
import Router from 'next/router'



const navBar = () => {
  const [menu,setMenu] = useState(false)
  const [input,setInput] = useState('')
  const [filter,setFilter] = useState('')
  const router = useRouter()
  const { user, deleteCookie, createCookie } = useContext(UserContext)
  const {data:session,status} = useSession()
  

  const createCookieNextAuth = async() =>{
    const attributes  =  await getSession() as SessionUser
    const user = {
      token:attributes.id,
      username:attributes.user.name.replace(/\s\w+/g,'')
    }
    createCookie('user',JSON.stringify(user))
  }


  const handleLoggout = ()=>{
    deleteCookie('user')
    if(status === 'authenticated'){
      signOut()
    }
    else{
      Router.reload()
    }
  }


  const handleSubmit = (event:FormEvent<HTMLFormElement>)=>{
    event.preventDefault()
    if(filter !==''){
      filter === 'Autor'
        ? router.push(`/Search?q=inauthor:${input}`)
        : router.push(`/Search?q=intitle:${input}`)
    }
    else{
      alert('Informe um filtro')
    }
  }

  useEffect( ()=>{
    const cookies = parseCookies()
    if (cookies.token === undefined && status === 'authenticated') {
      createCookieNextAuth()
    }
  },[session])

  return (
    <C.Container values={{ active: menu }}>
      <nav>
        <C.hamburguer
          values={{ active: menu }}
          onClick={() => setMenu(state => !state)}
        >
          <span className="line1"></span>
          <span className="line2"></span>
          <span className="line3"></span>
        </C.hamburguer>
        <Link href="/" className="logo">
          <SiBookstack size={55} color="#ffa500" />
          Literando
        </Link>
        <form onSubmit={handleSubmit} className="search">
          <ul>
            <li className="filterContainer">
              <span id="filter">
                <p>{filter === '' ? 'Autor ou Título' : filter}</p>
                <MdOutlineNavigateNext size={25} />
              </span>
              <div className="options">
                <div onClick={() => setFilter('Autor')} className="option">
                  <BiUser size={18} color="#ffa500" />
                  <p>Autor</p>
                </div>
                <div onClick={() => setFilter('Livro')} className="option">
                  <BiBookAlt size={18} color="#ffa500" />
                  <p>Livro</p>
                </div>
              </div>
            </li>
          </ul>

          <input
            type="text"
            value={input}
            onChange={({ target }) => setInput(target.value)}
            placeholder="buscar..."
          />
          <button type="submit" id="icon">
            <BiSearch size={30} color="#001f3f" />
          </button>
        </form>
        <div className="actions">
          <Link className="list" href="/">
            <AiOutlineHeart size={25} />
            Minhas listas
          </Link>
          <C.userActions>
            <li>
              <p>
                <BiUser id="user" size={25} />
                Olá, {user === undefined ? 'usuário' : `${user.username}`} <MdOutlineNavigateNext id="arrow" size={25} />
              </p>
              <div className="links">
                {user === undefined ? (
                  <button onClick={() => router.push('/Login')}>Entrar</button>
                ) : (
                  <button
                    onClick={handleLoggout}
                  >
                    Sair
                  </button>
                )}
                {user === undefined && (
                  <Link href="/Login/Cadastrar">Cadastre-se</Link>
                )}
                <Link href="/">Meus pedidos</Link>
                <Link href="/List">Minha Lista</Link>
              </div>
            </li>
          </C.userActions>
          <div className="cart">
            <FiShoppingCart size={25} />
            <span>0</span>
          </div>
        </div>
      </nav>
    </C.Container>
  )
}

export default memo(navBar)
