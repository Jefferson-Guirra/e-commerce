import { adapterRouter } from '../../../server/main/adapters/next/adapter-route'
import { makeGetBookBuyListController } from '../../../server/main/factories/book-buy-list/get-book-buy-list-controller-factory'

export default adapterRouter(makeGetBookBuyListController())
