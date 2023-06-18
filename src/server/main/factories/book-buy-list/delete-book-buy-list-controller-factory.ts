import { DbDeleteBuyBookList } from '../../../data/usecases/book-buy-list/delete-book-buy-list/db-delete-buy-book-list'
import { AccountMongoRepository } from '../../../infra/db/account/account-mongo-repository'
import { BuyBooksListMongoRepository } from '../../../infra/db/book-buy-list/book-buy-list-mongo-repository'
import { DeleteBuyBookListController } from '../../../presentation/controllers/book-buy-list/delete-book-buy-list/delete-book-buy-list-controller'
import { Controller } from '../../../presentation/protocols/controller'
import { DeleteBuyBookListValidator } from '../../../presentation/validators/book-buy-list/delete-buy-book-list-validator'

export const makeDeleteBuyBookListController = (): Controller => {
  const validator = new DeleteBuyBookListValidator()
  const accountMongoRepository = new AccountMongoRepository()
  const buyBooksListMongoRepository = new BuyBooksListMongoRepository()
  const dbDeleteBuyBookList = new DbDeleteBuyBookList(
    accountMongoRepository,
    buyBooksListMongoRepository
  )
  return new DeleteBuyBookListController(validator, dbDeleteBuyBookList)
}
