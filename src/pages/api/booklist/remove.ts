import { adapterRouter } from '../../../server/main/adapters/next/adapter-route'
import { makeRemoveBookListController } from '../../../server/main/factories/remove-book-list/remove-book-list-controller-factory'

export default adapterRouter(makeRemoveBookListController())
