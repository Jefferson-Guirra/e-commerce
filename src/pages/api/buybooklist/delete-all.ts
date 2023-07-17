import { adapterRouter } from '../../../server/main/adapters/next/adapter-route'
import { makeRemoveAllBooksBuyListController } from '../../../server/main/factories/book-buy-list/remove-all-books/remove-all-book-buy-list-controller-factory'

export default adapterRouter(makeRemoveAllBooksBuyListController())
