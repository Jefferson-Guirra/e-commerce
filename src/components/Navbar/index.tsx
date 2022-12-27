import {useState,FormEvent} from 'react'
import * as C from './styles'
import Link from 'next/link'
import { SiBookstack } from 'react-icons/si'
import { BiSearch, BiBookAlt, BiUser } from 'react-icons/bi'
import {useEffect} from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import { FiShoppingCart } from 'react-icons/fi'
import { MdOutlineNavigateNext } from 'react-icons/md'
import { useRouter } from 'next/router'

type User = {
  username:string,
  token:string;
}


const navBar = () => {
  const [menu,setMenu] = useState(false)
  const [input,setInput] = useState('')
  const [filter,setFilter] = useState('')
  const [user,setUser] = useState<User | null>(null)
  const router = useRouter()
  useEffect(()=>{
    setUser(JSON.parse(localStorage.getItem('user') || '{}') as User)
  },[])


  const handleSubmit = (event:FormEvent<HTMLFormElement>)=>{
    event.preventDefault()
    if(filter !==''){
      filter === 'Autor'
        ? router.push(`/search?q=inauthor:${input}`)
        : router.push(`/search?q=intitle:${input}`)
    }
    else{
      alert('Informe um filtro')
    }
  }
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
                Olá, usuário <MdOutlineNavigateNext id="arrow" size={25} />
              </p>
              <div className="links">
                {!user?.token ? (
                  <button onClick={() => router.push('/Login')}>Entrar</button>
                ) : (
                  <button>Sair</button>
                )}
                {!user?.token && (
                  <Link href="/Login/Cadastrar">Cadastre-se</Link>
                )}
                <Link href="/">Meus pedidos</Link>
                <Link href="/">Minha conta</Link>
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

export default navBar
