import styles from './styles.module.css'
import { Logo } from './logo/Logo'
import { Hamburger } from './menu-icon-mob/Hamburger'
import { Search } from './search/Search'
import Actions from './user-actions/Actions'
import { useHeaderContext } from '../../context/header/HeaderContext'
import { useCallback, useEffect } from 'react'
import { Api } from '../../utils/api'
import { parseCookies } from 'nookies'

const userApi = new Api()
export const HeaderContainer = () => {
  const { dispatch } = useHeaderContext()
  const getInitProps = useCallback(async () => {
    const { literando_accessToken } = parseCookies()
    if (literando_accessToken) {
      const books = await userApi.get(
        { accessToken: JSON.parse(literando_accessToken) },
        'buybooklist'
      )
      if (books.statusCode === 200) {
        dispatch({
          type: 'INIT',
          payload: { amountList: books.body.length, username: 'jefferson' },
        })
      }
    }
  }, [])

  useEffect(() => {
    getInitProps()
  }, [getInitProps])
  return (
    <header className={styles.container}>
      <nav>
        <Logo />
        <Hamburger />
        <Search />
        <Actions />
      </nav>
    </header>
  )
}
