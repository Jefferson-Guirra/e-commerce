import React from 'react'
import styles from './styles.module.css'
import { BiUser } from 'react-icons/bi'
import { parseCookies } from 'nookies'
import { signOut } from 'next-auth/react'
import { HandleCookies } from '../../../utils/handle-cookie'
import { Api } from '../../../utils/api'
import Link from 'next/link'
import { useHeaderContext } from '../../../context/header/HeaderContext'

const userApi = new Api()
const handleCookies = new HandleCookies()

export const MenuMobile = () => {
  const { amountList, menuMob, username, dispatch } = useHeaderContext()

  const handleLogout = async () => {
    const accessToken = JSON.parse(parseCookies().literando_accessToken)
    await userApi.send('logout', 'PUT', { accessToken })
    handleCookies.destroyCookie('literando_accessToken')
    handleCookies.destroyCookie('literando_username')
    signOut()
  }

  return (
    <article
      className={
        menuMob ? `${styles.container} ${styles.active}` : styles.container
      }
    >
      <ul className={styles.list}>
        <li>
          <Link
            href="/"
            onClick={() => dispatch({ type: 'REVERT_MENU_MOB_STATE' })}
          >
            <BiUser className={styles.user} size={23} />
            Olá {username === 'undefined' ? 'usuário' : username.toLowerCase()}
          </Link>
        </li>
        {username === 'undefined' && (
          <li>
            <Link
              href="/Login"
              onClick={() => dispatch({ type: 'REVERT_MENU_MOB_STATE' })}
            >
              Entrar
            </Link>
          </li>
        )}
        {username === 'undefined' && (
          <li>
            <Link
              href="/SignUp"
              onClick={() => dispatch({ type: 'REVERT_MENU_MOB_STATE' })}
            >
              Cadastrar
            </Link>
          </li>
        )}
        {username !== 'undefined' && (
          <li>
            <Link
              href="#"
              onClick={() => {
                handleLogout()
                dispatch({ type: 'REVERT_MENU_MOB_STATE' })
              }}
            >
              Sair
            </Link>
          </li>
        )}
        <li>
          <Link
            href="/List"
            onClick={() => dispatch({ type: 'REVERT_MENU_MOB_STATE' })}
          >
            Minha Lista
          </Link>
        </li>
        <li>
          <Link
            href="Buy"
            onClick={() => dispatch({ type: 'REVERT_MENU_MOB_STATE' })}
          >
            <span className={styles['number-items']}>{amountList}</span>
            Meu Carrinho
          </Link>
        </li>
      </ul>
    </article>
  )
}
