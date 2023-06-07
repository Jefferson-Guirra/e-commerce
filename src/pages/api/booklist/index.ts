import { adapterRouter } from '../../../server/main/adapters/next/adapter-route'
import { makeGetBooksListController } from '../../../server/main/factories/get-books-list/get-books-list-controller-factory'

export default adapterRouter(makeGetBooksListController())
