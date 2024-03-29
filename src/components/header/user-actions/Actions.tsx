import React from 'react'
import Link from 'next/link'
import { AiOutlineHeart } from 'react-icons/ai'
import { BiUser } from 'react-icons/bi'
import { MdOutlineNavigateNext } from 'react-icons/md'
import { useRouter } from 'next/router'
import { FiShoppingCart } from 'react-icons/fi'
import styles from './styles.module.css'
import { useHeaderContext } from '../../../context/header/HeaderContext'
import { Api } from '../../../utils/api'
import { parseCookies } from 'nookies'
import { HandleCookies } from '../../../utils/handle-cookie'
import { signOut } from 'next-auth/react'
const userApi = new Api()
const handleCookies = new HandleCookies()
const Actions = () => {
  const { dispatch, username, menuMob, amountList } = useHeaderContext()
  const router = useRouter()

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
        menuMob ? `${styles.actions} ${styles.active}` : styles.actions
      }
    >
      <Link className={styles.list} href="/List">
        <AiOutlineHeart size={25} />
        Minhas listas
      </Link>
      <ul className={styles['user-actions']}>
        <li>
          <p>
            <BiUser className={styles.user} size={25} />
            <span className={styles.presentation}>
              Olá,
              {username === 'undefined'
                ? ' usuário'
                : ` ${username.toLowerCase()}`}
            </span>

            <MdOutlineNavigateNext className={styles.arrow} size={25} />
          </p>
          <div className={styles.links}>
            {username === 'undefined' ? (
              <button
                onClick={() => {
                  dispatch({ type: 'REVERT_MENU_MOB_STATE' })
                  router.push('/Login')
                }}
              >
                Entrar
              </button>
            ) : (
              <button
                onClick={() => {
                  dispatch({ type: 'REVERT_MENU_MOB_STATE' })
                  handleLogout()
                }}
              >
                Sair
              </button>
            )}
            {username === 'undefined' && (
              <Link
                href="/SignUp"
                onClick={() => dispatch({ type: 'REVERT_MENU_MOB_STATE' })}
              >
                Cadastre-se
              </Link>
            )}
            <Link
              href="/Buy"
              onClick={() => dispatch({ type: 'REVERT_MENU_MOB_STATE' })}
            >
              Meu carrinho
            </Link>
            <Link
              href="/List"
              onClick={() => dispatch({ type: 'REVERT_MENU_MOB_STATE' })}
            >
              Minha lista
            </Link>
          </div>
        </li>
      </ul>
      <div
        className={styles.cart}
        onClick={() => {
          dispatch({ type: 'REVERT_MENU_MOB_STATE' })
          router.push('/Buy')
        }}
      >
        <FiShoppingCart size={25} />
        <span>
          <p>{amountList}</p>
        </span>
      </div>
    </article>
  )
}

export default Actions
