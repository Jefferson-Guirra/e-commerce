import { DbRemoveAmountBookBuyList } from '../../../data/usecases/book-buy-list/remove-amount-book-buy-list/db-remove-amount-book-buy-list'
import { AccountMongoRepository } from '../../../infra/db/account/account-mongo-repository'
import { BuyBooksListMongoRepository } from '../../../infra/db/book-buy-list/book-buy-list-mongo-repository'
import { RemoveAmountBuyBookListController } from '../../../presentation/controllers/book-buy-list/remove-amount-book-buy-list/remove-amount-book-buy-list-controller'
import { Controller } from '../../../presentation/protocols/controller'
import { RemoveAmountBuyBookValidator } from '../../../presentation/validators/book-buy-list/remove-book-amount-buy-list-validator'

export const makeRemoveAmountBookBuyListController = (): Controller => {
  const validator = new RemoveAmountBuyBookValidator()
  const accountMongoRepository = new AccountMongoRepository()
  const buyBookListMongoRepository = new BuyBooksListMongoRepository()
  const dbRemoveAmountBuyBook = new DbRemoveAmountBookBuyList(
    accountMongoRepository,
    buyBookListMongoRepository,
    buyBookListMongoRepository
  )
  return new RemoveAmountBuyBookListController(validator, dbRemoveAmountBuyBook)
}
