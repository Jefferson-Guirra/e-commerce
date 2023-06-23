import { UserStorage } from './user/UserContext'
interface ContextProps {
  children: JSX.Element
}

import { BuyStorage } from './books-buy-list/BuyBookContext'

export const AppProvider = ({ children }: ContextProps) => {
  return (
    <BuyStorage>
      <UserStorage>{children}</UserStorage>
    </BuyStorage>
  )
}
