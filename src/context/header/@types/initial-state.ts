export interface IHeaderState {
  username: string
  amountList: number
  menuMob: boolean
}

export const initialState: IHeaderState = {
  username: 'undefined',
  amountList: 0,
  menuMob: false,
}
