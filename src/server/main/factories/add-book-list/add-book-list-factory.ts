import { DbAddBookList } from '../../../data/usecases/book-list/add-book-list/db-add-book-list'
import { CreateQueryDoc } from '../../../data/usecases/book-list/add-book-list/protocols/create-query-doc'
import { GetDate } from '../../../data/usecases/book-list/add-book-list/protocols/get-date'
import { AccountMongoRepository } from '../../../infra/db/account/account-mongo-repository'
import { BookListMongoRepository } from '../../../infra/db/book-list/book-list-mongo-repository'
import { LogMongoRepository } from '../../../infra/db/log/log-mongo-repository'
import { AddBookListController } from '../../../presentation/controllers/add-book-list/add-book-list-controller'
import { Controller } from '../../../presentation/protocols/controller'
import { AddBookListValidator } from '../../../presentation/validators/book-list/add-book-list-validator'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'

const getDate = (): GetDate => ({
  date: new Date().getTime(),
})
const createQueryDoc = (): CreateQueryDoc => {
  return {
    create(userId, idBook) {
      return userId + idBook
    },
  }
}
export const makeAddBookListController = (): Controller => {
  const validate = new AddBookListValidator()
  const accountMongoRepository = new AccountMongoRepository()
  const createDate = getDate()
  const getQueryDoc = createQueryDoc()
  const bookListMongoRepository = new BookListMongoRepository()
  const logMongoRepository = new LogMongoRepository()
  const dbAddBookList = new DbAddBookList(
    accountMongoRepository,
    bookListMongoRepository,
    createDate,
    getQueryDoc,
    bookListMongoRepository
  )
  const addBookListController = new AddBookListController(
    validate,
    dbAddBookList
  )
  return new LogControllerDecorator(addBookListController, logMongoRepository)
}
