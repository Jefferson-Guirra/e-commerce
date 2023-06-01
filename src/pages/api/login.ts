import { adapterRouter } from '../../server/main/adapters/next/adapter-route'
import { makeLoginController } from '../../server/main/factories/login/login-controller'

export default adapterRouter(makeLoginController())
