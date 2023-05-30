import { DbAddAccountRepository } from '../../../data/usecases/add-account/db-add-account'
import { BcrypterAdapter } from '../../../infra/criptography/bcrypt-adapter.ts/bcrypter-adapter'
import { AccountMongoRepository } from '../../../infra/db/account/account-mongo-repository'
import { SignupController } from '../../../presentation/controllers/signup/signup-controller'
import { Controller } from '../../../presentation/protocols/controller'
import { Validate } from '../../../presentation/validators/validate'

export const makeSignUpController = (): Controller => {
  const validation = new Validate()
  const accountMongoRepository = new AccountMongoRepository()
  const bcrypterAdapter = new BcrypterAdapter(12)
  const addAccountRepository = new DbAddAccountRepository(
    accountMongoRepository,
    bcrypterAdapter,
    accountMongoRepository
  )
  return new SignupController(validation, addAccountRepository)
}
