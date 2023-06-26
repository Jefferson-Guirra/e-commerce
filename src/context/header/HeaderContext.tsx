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
import { HandleCookies } from '../../utils/handle-cookie'

interface IContext extends IHeaderState {
  dispatch: Dispatch<IActions>
}
const HeaderContext = createContext<IContext>(null!)

interface Props {
  children: ReactNode
}
const api = new Api()
const handleCookies = new HandleCookies()
export const HeaderStorage = ({ children }: Props) => {
  const reducer = (state: IHeaderState, action: IActions): IHeaderState => {
    switch (action.type) {
      case 'INIT':
        return {
          ...state,
          username: action.payload.username,
          amountList: action.payload.amountList,
        }

      case 'DEFAULT_ADD_AMOUNT_LIST':
        return {
          ...state,
          amountList: state.amountList + 1,
        }

      case 'DEFAULT_REMOVE_AMOUNT_LIST':
        return {
          ...state,
          amountList: state.amountList - 1,
        }
      case 'ADD_AMOUNT_LIST':
        return {
          ...state,
          amountList: state.amountList + action.payload.amount,
        }
      case 'REMOVE_AMOUNT_LIST':
        return {
          ...state,
          amountList: state.amountList + action.payload.removeAmount,
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

  const [accessToken, username] = handleCookies.getCookies([
    'literando_accessToken',
    'literando_username',
  ])

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
