import { DbUpdateAmountBookBuyList } from '../../../data/usecases/book-buy-list/update-amount-book-buy-list/db-update-amount-book-buy-list'
import { AccountMongoRepository } from '../../../infra/db/account/account-mongo-repository'
import { BuyBooksListMongoRepository } from '../../../infra/db/book-buy-list/book-buy-list-mongo-repository'
import { UpdateAmountBookBuyListController } from '../../../presentation/controllers/book-buy-list/update-amount-book-buy-list/update-amount-book-buy-list-controller'
import { Controller } from '../../../presentation/protocols/controller'
import { UpdateAmountBookBuyListValidator } from '../../../presentation/helpers/validators/book-buy-list/add-amount-book-buy-list-validator'

export const makeUpdateAmountBookBuyListController = (): Controller => {
  const validator = new UpdateAmountBookBuyListValidator()
  const accountMongoRepository = new AccountMongoRepository()
  const bookBuyListMongoRepository = new BuyBooksListMongoRepository()
  const dbUpdateAmountBookBuyList = new DbUpdateAmountBookBuyList(
    accountMongoRepository,
    bookBuyListMongoRepository,
    bookBuyListMongoRepository
  )
  return new UpdateAmountBookBuyListController(
    validator,
    dbUpdateAmountBookBuyList
  )
}
