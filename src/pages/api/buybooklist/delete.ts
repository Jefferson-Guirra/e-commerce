import { adapterRouter } from '../../../server/main/adapters/next/adapter-route'
import { makeDeleteBuyBookListController } from '../../../server/main/factories/book-buy-list/delete-book-buy-list-controller-factory'

export default adapterRouter(makeDeleteBuyBookListController())
