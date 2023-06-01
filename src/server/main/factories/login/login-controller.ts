import { DbAuthentication } from '../../../data/usecases/authentication/db-authentication'
import { BcrypterAdapter } from '../../../infra/criptography/bcrypt-adapter.ts/bcrypter-adapter'
import { JwtAdapter } from '../../../infra/criptography/jwt-adapter/jwt-adapter'
import { AccountMongoRepository } from '../../../infra/db/account/account-mongo-repository'
import { LoginController } from '../../../presentation/controllers/login/login-controller'
import { Controller } from '../../../presentation/protocols/controller'
import { LoginValidate } from '../../../presentation/validators/login-validate'

export const makeLoginController = (): Controller => {
  const validate = new LoginValidate()
  const bcryptAdapter = new BcrypterAdapter(12)
  const jwtAdapter = new JwtAdapter(process.env.JWT_SECRET as string)
  const accountMongoRepository = new AccountMongoRepository()
  const authentication = new DbAuthentication(
    accountMongoRepository,
    bcryptAdapter,
    jwtAdapter,
    accountMongoRepository
  )
  return new LoginController(validate, authentication)
}
