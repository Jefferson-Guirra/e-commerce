import { adapterRouter } from '../../../server/main/adapters/next/adapter-route'
import { makeAddBookListController } from '../../../server/main/factories/add-book-list/add-book-list-factory'

export default adapterRouter(makeAddBookListController())