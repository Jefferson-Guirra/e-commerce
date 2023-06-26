import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from 'react'
import { IHeaderState, initialState } from './@types/initial-state'
import { IActions } from './@types/Iactions'

interface IContext extends IHeaderState {
  dispatch: Dispatch<IActions>
}
const HeaderContext = createContext<IContext>(null!)

interface Props {
  children: ReactNode
}
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

  return (
    <HeaderContext.Provider value={{ dispatch, ...headerState }}>
      {children}
    </HeaderContext.Provider>
  )
}

export const useHeaderContext = () => useContext(HeaderContext)
