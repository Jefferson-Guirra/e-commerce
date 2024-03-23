import styles from './styles.module.css'
import { Logo } from './logo/Logo'
import { Hamburger } from './menu-icon-mob/Hamburger'
import { Search } from './search/Search'
import { MenuMobile } from './menu-mobile/MenuMobile'
import Actions from './user-actions/Actions'

export const HeaderContainer = () => {
  return (
    <header className={styles.container}>
      <nav>
        <Logo />
        <Hamburger />
        <Search />
        <Actions />
        <MenuMobile />
      </nav>
    </header>
  )
}
