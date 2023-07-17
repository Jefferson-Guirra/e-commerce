import { adapterRouter } from '../../../server/main/adapters/next/adapter-route'
import { makeSignUpController } from '../../../server/main/factories/account/signup/signup-factory'

export default adapterRouter(makeSignUpController())
