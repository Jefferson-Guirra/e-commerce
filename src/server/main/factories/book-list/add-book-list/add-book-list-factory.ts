import { DbAddBookList } from '../../../../data/usecases/book-list/add-book-list/db-add-book-list'
import { AccountMongoRepository } from '../../../../infra/db/account/account-mongo-repository'
import { BookListMongoRepository } from '../../../../infra/db/book-list/book-list-mongo-repository'
import { LogMongoRepository } from '../../../../infra/db/log/log-mongo-repository'
import { AddBookListController } from '../../../../presentation/controllers/book-list/add-book-list/add-book-list-controller'
import { Controller } from '../../../../presentation/protocols/controller'
import { AddBookListValidator } from '../../../../presentation/validators/book-list/add-book-list-validator'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'

export const makeAddBookListController = (): Controller => {
  const validate = new AddBookListValidator()
  const accountMongoRepository = new AccountMongoRepository()
  const bookListMongoRepository = new BookListMongoRepository()
  const logMongoRepository = new LogMongoRepository()
  const dbAddBookList = new DbAddBookList(
    accountMongoRepository,
    bookListMongoRepository,
    bookListMongoRepository
  )
  const addBookListController = new AddBookListController(
    validate,
    dbAddBookList
  )
  return new LogControllerDecorator(addBookListController, logMongoRepository)
}
