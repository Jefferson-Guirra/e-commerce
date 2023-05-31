import {
  Authentication,
  AuthenticationModel,
} from '../../../domain/usecases/authentication'
import { Encrypter } from '../../protocols/criptography/encrypter'
import { HashCompare } from '../../protocols/criptography/hash-compare'
import { LoadAccountByEmailRepository } from '../../protocols/db/account/load-account-by-email-repository'

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccount: LoadAccountByEmailRepository,
    private readonly hashCompare: HashCompare,
    private readonly encrypter: Encrypter
  ) {}
  async auth(account: AuthenticationModel): Promise<string | null> {
    const loadAccount = await this.loadAccount.loadByEmail(account.email)
    if (loadAccount) {
      const isValid = await this.hashCompare.compare(
        account.password,
        loadAccount.password
      )

      if (isValid) {
        await this.encrypter.encrypt(loadAccount.id)
        return Promise.resolve('access_token')
      }
    }

    return null
  }
}
