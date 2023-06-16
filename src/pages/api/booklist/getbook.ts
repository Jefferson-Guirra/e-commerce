import { adapterRouter } from '../../../server/main/adapters/next/adapter-route'
import { makeGetBookListController } from '../../../server/main/factories/book-list/get-book-list/get-book-list-controller-factory'

export default adapterRouter(makeGetBookListController())
