import { adapterRouter } from '../../../server/main/adapters/next/adapter-route'
import { makeRemoveBookBuyListController } from '../../../server/main/factories/book-buy-list/remove-book/remove-book-buy-list-controller-factory'

export default adapterRouter(makeRemoveBookBuyListController())
