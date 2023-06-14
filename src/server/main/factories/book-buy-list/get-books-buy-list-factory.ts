import { DbGetBuyBooks } from '../../../data/usecases/book-buy-list/get-buy-books-list/db-get-buy-books-list'
import { AccountMongoRepository } from '../../../infra/db/account/account-mongo-repository'
import { BuyBooksListMongoRepository } from '../../../infra/db/book-buy-list/book-buy-list-mongo-repository'
import { GetBuyBooksController } from '../../../presentation/controllers/book-buy-list/get-books-buy-list/get-books-buy-list-controller'
import { Controller } from '../../../presentation/protocols/controller'
import { GetBuyBooksValidator } from '../../../presentation/validators/book-buy-list/get-book-buy-list-validator'

export const makeGetBuyBooksListController = (): Controller => {
  const buyBooksValidator = new GetBuyBooksValidator()
  const accountMongoRepository = new AccountMongoRepository()
  const buyBookListMongoRepository = new BuyBooksListMongoRepository()
  const dbGetBuyBooks = new DbGetBuyBooks(
    accountMongoRepository,
    buyBookListMongoRepository
  )
  return new GetBuyBooksController(buyBooksValidator, dbGetBuyBooks)
}
