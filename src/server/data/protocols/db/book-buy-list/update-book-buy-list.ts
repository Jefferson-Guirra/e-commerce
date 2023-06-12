import { AddBuyBookModel } from '../../../../domain/usecases/book-buy-list/add-book-buy-list'

export interface UpdateBuyBook {
  updateAmount: (book: AddBuyBookModel) => Promise<AddBuyBookModel | null>
}
