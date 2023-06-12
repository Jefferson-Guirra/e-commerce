import { DbAddBookBuyList } from '../../../data/usecases/book-buy-list/db-add-book-buy-list'
import { AccountMongoRepository } from '../../../infra/db/account/account-mongo-repository'
import { BuyBooksListMongoRepository } from '../../../infra/db/book-buy-list/book-buy-list-mongo-repository'
import { AddBookBuyListController } from '../../../presentation/controllers/book-buy-list/add-book-buy-list/add-book-buy-list-controller'
import { Controller } from '../../../presentation/protocols/controller'
import { AddBookBuyListValidator } from '../../../presentation/validators/book-buy-list/add-book-buy-list-validator'

export const makeAddBookBuyListController = (): Controller => {
  const addBuyBookValidator = new AddBookBuyListValidator()
  const accountMongoRepository = new AccountMongoRepository()
  const buyListMongoRepository = new BuyBooksListMongoRepository()
  const dbAddBookBuyListRepository = new DbAddBookBuyList(
    accountMongoRepository,
    buyListMongoRepository,
    buyListMongoRepository,
    buyListMongoRepository
  )
  return new AddBookBuyListController(
    addBuyBookValidator,
    dbAddBookBuyListRepository
  )
}
