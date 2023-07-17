import { AddBuyBookModel } from '../../../server/domain/usecases/book-buy-list/add-book-buy-list'

export type IActions =
  | {
      type: 'INIT'
      payload: {
        username: string
        amountList: number
      }
    }
  | {
      type: 'REVERT_MENU_MOB_STATE'
    }
  | {
      type: 'ADD_AMOUNT_LIST'
      payload: { amount: number }
    }
  | {
      type: 'REMOVE_AMOUNT_LIST'
      payload: { removeAmount: number }
    }
  | {
      type: 'LOGIN_USER'
      payload: { callBack: () => Promise<AddBuyBookModel[]> }
    }
