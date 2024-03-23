import React from 'react'
import styles from './styles.module.css'
import { BiUser } from 'react-icons/bi'
import { parseCookies } from 'nookies'
import { FiShoppingCart } from 'react-icons/fi'
import { useHeaderContext } from '../../../context/header/HeaderContext'

export const MenuMobile = () => {
  const { amountList, menuMob, username } = useHeaderContext()

  return (
    <article
      className={
        menuMob ? `${styles.container} ${styles.active}` : styles.container
      }
    >
      <ul className={styles.list}>
        <li>
          <a href="#">
            <BiUser className={styles.user} size={23} />
            Olá {username === 'undefined' ? 'usuário' : username.toLowerCase()}
          </a>
        </li>
        <li>
          <a href="#">Entrar</a>
        </li>
        <li>
          <a href="#">Cadastrar</a>
        </li>
        <li>
          <a href="#">Sair</a>
        </li>
        <li>
          <a href="#">Minha Lista</a>
        </li>
        <li>
          <a href="#">
            <span className={styles['number-items']}>{amountList}</span>
            Meu Carrinho
          </a>
        </li>
      </ul>
    </article>
  )
}
