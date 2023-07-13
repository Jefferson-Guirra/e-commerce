import { adapterRouter } from '../../../server/main/adapters/next/adapter-route'
import { makeAddBookBuyListController } from '../../../server/main/factories/book-buy-list/add-book/add-book-buy-list-controller-factory'

export default adapterRouter(makeAddBookBuyListController())
