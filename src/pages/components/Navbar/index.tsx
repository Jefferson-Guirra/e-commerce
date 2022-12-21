import {useState} from 'react'
import * as C from './styles'
import Link from 'next/link'
import { SiBookstack } from 'react-icons/si'
import { BiSearch, BiBookAlt, BiUser } from 'react-icons/bi'
import { AiOutlineHeart } from 'react-icons/ai'
import { FiShoppingCart } from 'react-icons/fi'
import { MdOutlineNavigateNext } from 'react-icons/md'

const navBar = () => {
  const [menu,setMenu] = useState(false)
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
          <SiBookstack size={55} color="#fff" />
          Literando
        </Link>
        <div className="search">
          <ul>
            <li className="filterContainer">
              <span id="filter">
                <p>Autor ou Título</p>
                <MdOutlineNavigateNext size={25} />
              </span>
              <div className="options">
                <div className="option">
                  <BiUser size={18} color="#ffa500" />
                  <p>Autor</p>
                </div>
                <div className="option">
                  <BiBookAlt size={18} color="#ffa500" />
                  <p>Livro</p>
                </div>
              </div>
            </li>
          </ul>

          <input type="text" placeholder="buscar..." />
          <span id="icon">
            <BiSearch size={35} color="#ffa500" />
          </span>
        </div>
        <div className="actions">
          <Link className="list" href="/">
            <AiOutlineHeart size={25} />
            Minhas listas
          </Link>
          <C.userActions>
            <li>
              <p>
                <BiUser id='user' size={25} />
                Olá, usuário <MdOutlineNavigateNext id="arrow" size={25} />
              </p>
              <div className="links">
                <button>Entrar</button>
                <Link href="/">Cadastre-se</Link>
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
