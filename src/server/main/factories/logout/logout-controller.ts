import { DbLogoutAccount } from '../../../data/usecases/logout-account/logout-account'
import { AccountMongoRepository } from '../../../infra/db/account/account-mongo-repository'
import { LogoutController } from '../../../presentation/controllers/logout/logout-controller'
import { Controller } from '../../../presentation/protocols/controller'
import { LogoutValidate } from '../../../presentation/validators/account/logout-validate'
export const makeLogoutController = (): Controller => {
  const logoutValidate = new LogoutValidate()
  const accountMongoRepository = new AccountMongoRepository()
  const dbLogoutAccount = new DbLogoutAccount(
    accountMongoRepository,
    accountMongoRepository
  )
  return new LogoutController(logoutValidate, dbLogoutAccount)
}
