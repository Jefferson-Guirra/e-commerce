import { adapterRouter } from '../../../server/main/adapters/next/adapter-route'
import { makeGetBuyBooksListController } from '../../../server/main/factories/book-buy-list/get-books-buy-list-factory'

export default adapterRouter(makeGetBuyBooksListController())
