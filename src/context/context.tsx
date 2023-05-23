import { UserStorage } from './user/UserContext'
interface ContextProps {
  children: JSX.Element
}

export const AppProvider = ({ children }: ContextProps) => {
  return <UserStorage>{children}</UserStorage>
}
