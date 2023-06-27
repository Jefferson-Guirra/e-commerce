import { Dispatch } from 'react'
import { IActions } from '../../context/header/@types/Iactions'

export interface ValidateAddBuyBook {
  validateAdd: (
    accessToken: string,
    bookId: string,
    dispatch: Dispatch<IActions>,
    amount: number
  ) => Promise<void>
}
