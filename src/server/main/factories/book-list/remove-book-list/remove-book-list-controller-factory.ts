import { DbRemoveBookList } from '../../../../data/usecases/book-list/remove-book-list/db-remove-book-list'
import { AccountMongoRepository } from '../../../../infra/db/account/account-mongo-repository'
import { BookListMongoRepository } from '../../../../infra/db/book-list/book-list-mongo-repository'
import { RemoveBookListController } from '../../../../presentation/controllers/book-list/remove-book-list/remove-book-list-controller'
import { Controller } from '../../../../presentation/protocols/controller'
import { RemoveBookListValidator } from '../../../../presentation/validators/book-list/remove-book-list-validator'

export const makeRemoveBookListController = (): Controller => {
  const validate = new RemoveBookListValidator()
  const accountMongoRepository = new AccountMongoRepository()
  const bookListMongoRepository = new BookListMongoRepository()
  const dbRemoveBookList = new DbRemoveBookList(
    accountMongoRepository,
    bookListMongoRepository
  )
  return new RemoveBookListController(validate, dbRemoveBookList)
}
