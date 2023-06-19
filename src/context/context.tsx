import { UserStorage } from './user/UserContext'
import { BooksBuyListContext } from './books-buy-list/BooksBuyListContext'
interface ContextProps {
  children: JSX.Element
}

export const AppProvider = ({ children }: ContextProps) => {
  return (
    <BooksBuyListContext>
      <UserStorage>{children}</UserStorage>
    </BooksBuyListContext>
  )
}
