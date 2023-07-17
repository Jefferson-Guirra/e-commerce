import { adapterRouter } from '../../../server/main/adapters/next/adapter-route'
import { makeUpdateAmountBookBuyListController } from '../../../server/main/factories/book-buy-list/update-amount/update-amount-book-buy-list-controller-factory'

export default adapterRouter(makeUpdateAmountBookBuyListController())
