import {
  Authentication,
  AuthenticationModel,
} from '../../../domain/usecases/authentication'
import { LoadAccountByEmailRepository } from '../../protocols/db/account/load-account-by-email-repository'

export class DbAuthentication implements Authentication {
  constructor(private readonly loadAccount: LoadAccountByEmailRepository) {}
  async auth(account: AuthenticationModel): Promise<string | null> {
    const loadAccount = await this.loadAccount.loadByEmail(account.email)
    if (!loadAccount) {
      return await Promise.resolve(null)
    }
    return await Promise.resolve('any_token')
  }
}
