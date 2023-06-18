import { adapterRouter } from '../../../server/main/adapters/next/adapter-route'
import { makeDeleteAllBuyBooksListController } from '../../../server/main/factories/book-buy-list/delete-all-book-buy-list-controller-factory'

export default adapterRouter(makeDeleteAllBuyBooksListController())
