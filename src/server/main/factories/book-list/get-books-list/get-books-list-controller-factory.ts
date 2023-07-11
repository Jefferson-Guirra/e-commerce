import { DbGetBooksList } from '../../../../data/usecases/book-list/get-books-list/db-get-books-list'
import { AccountMongoRepository } from '../../../../infra/db/account/account-mongo-repository'
import { BookListMongoRepository } from '../../../../infra/db/book-list/book-list-mongo-repository'
import { GetBooksListController } from '../../../../presentation/controllers/book-list/get-books-list/get-books-list-controller'
import { Controller } from '../../../../presentation/protocols/controller'
import { GetBooksListValidator } from '../../../../presentation/helpers/validators/book-list/get-books-list-validator'

export const makeGetBooksListController = (): Controller => {
  const validator = new GetBooksListValidator()
  const accountMongoRepository = new AccountMongoRepository()
  const bookListMongoRepository = new BookListMongoRepository()
  const dbGetBooksList = new DbGetBooksList(
    accountMongoRepository,
    bookListMongoRepository
  )
  return new GetBooksListController(validator, dbGetBooksList)
}
