import { DbGetBookBuyList } from '../../../data/usecases/book-buy-list/get-book-buy-list/db-get-book-buy-list'
import { AccountMongoRepository } from '../../../infra/db/account/account-mongo-repository'
import { BuyBooksListMongoRepository } from '../../../infra/db/book-buy-list/book-buy-list-mongo-repository'
import { GetBookBuyListController } from '../../../presentation/controllers/book-buy-list/get-book-buy-list/get-book-buy-list-controller'
import { Controller } from '../../../presentation/protocols/controller'
import { GetBookBuyListValidator } from '../../../presentation/helpers/validators/book-buy-list/get-book-buy-list-validator'

export const makeGetBookBuyListController = (): Controller => {
  const validator = new GetBookBuyListValidator()
  const accountMongoRepository = new AccountMongoRepository()
  const buyBookListMongoRepository = new BuyBooksListMongoRepository()
  const dbGetBookBuyList = new DbGetBookBuyList(
    accountMongoRepository,
    buyBookListMongoRepository
  )
  return new GetBookBuyListController(validator, dbGetBookBuyList)
}
