import { UserStorage } from './user/UserContext'
import { HeaderStorage } from './header/HeaderContext'
interface ContextProps {
  children: JSX.Element
}

import { BuyStorage } from './books-buy-list/BuyBookContext'

export const AppProvider = ({ children }: ContextProps) => {
  return (
    <BuyStorage>
      <UserStorage>
        <HeaderStorage>{children}</HeaderStorage>
      </UserStorage>
    </BuyStorage>
  )
}
