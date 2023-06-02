import { adapterRouter } from '../../server/main/adapters/next/adapter-route'
import { makeLogoutController } from '../../server/main/factories/logout/logout-controller'

export default adapterRouter(makeLogoutController())
