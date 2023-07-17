import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from 'react'
import { IHeaderState, initialState } from './@types/initial-state'
import { IActions } from './@types/Iactions'
import { Api } from '../../utils/api'
import { parseCookies } from 'nookies'

interface IContext extends IHeaderState {
  dispatch: Dispatch<IActions>
}
const HeaderContext = createContext<IContext>(null!)

interface Props {
  children: ReactNode
}
const api = new Api()
export const HeaderStorage = ({ children }: Props) => {
  const { literando_accessToken: accessToken, literando_username: username } =
    parseCookies()
  const reducer = (state: IHeaderState, action: IActions): IHeaderState => {
    switch (action.type) {
      case 'INIT':
        return {
          ...state,
          username: action.payload.username,
          amountList: action.payload.amountList,
        }
      case 'ADD_AMOUNT_LIST':
        return {
          ...state,
          amountList: state.amountList + action.payload.amount,
        }
      case 'REMOVE_AMOUNT_LIST':
        return {
          ...state,
          amountList: state.amountList - action.payload.removeAmount,
        }
      case 'REVERT_MENU_MOB_STATE':
        return {
          ...state,
          menuMob: !state.menuMob,
        }
      default:
        return {
          ...state,
        }
    }
  }
  const [headerState, dispatch] = useReducer(reducer, initialState)

  const getInitProps = async (accessToken: string, username: string) => {
    const books = await api.get({ accessToken }, 'buybooklist')
    dispatch({
      type: 'INIT',
      payload: { amountList: books.body.length, username },
    })
  }

  useEffect(() => {
    if (accessToken && username) {
      getInitProps(JSON.parse(accessToken), JSON.parse(username))
    }
  }, [accessToken, username])

  return (
    <HeaderContext.Provider value={{ dispatch, ...headerState }}>
      {children}
    </HeaderContext.Provider>
  )
}

export const useHeaderContext = () => useContext(HeaderContext)
