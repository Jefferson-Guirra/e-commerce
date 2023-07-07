import { UserStorage } from './user/UserContext'
import { HeaderStorage } from './header/HeaderContext'
import { BookListStorage } from './books-list/BookList'
interface ContextProps {
  children: JSX.Element
}

import { BuyStorage } from './books-buy-list/BuyBookContext'

export const AppProvider = ({ children }: ContextProps) => {
  return (
    <BuyStorage>
      <BookListStorage>
        <UserStorage>
          <HeaderStorage>{children}</HeaderStorage>
        </UserStorage>
      </BookListStorage>
    </BuyStorage>
  )
}
