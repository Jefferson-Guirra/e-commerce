import {
  Authentication,
  AuthenticationModel,
} from '../../../domain/usecases/authentication'
import { LoadAccountByEmailRepository } from '../../protocols/db/account/load-account-by-email-repository'

export class DbAuthentication implements Authentication {
  constructor(private readonly loadAccount: LoadAccountByEmailRepository) {}
  async auth(account: AuthenticationModel): Promise<string | null> {
    await this.loadAccount.loadByEmail(account.email)
    return await Promise.resolve(null)
  }
}
