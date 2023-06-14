import { adapterRouter } from '../../../server/main/adapters/next/adapter-route'
import { makeRemoveAmountBookBuyListController } from '../../../server/main/factories/book-buy-list/remove-amount-book-buy-list-factory'

export default adapterRouter(makeRemoveAmountBookBuyListController())
