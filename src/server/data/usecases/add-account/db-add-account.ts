import { AccountModel } from '../../../domain/models/account'
import {
  AddAccount,
  AddAccountModel,
} from '../../../domain/usecases/add-account'
import { LoadAccountByEmailRepository } from '../../protocols/db/account/load-account-by-email-repository'

export class DbAddAccountRepository implements AddAccount {
  constructor(private readonly loadByEmail: LoadAccountByEmailRepository) {}
  async add(account: AddAccountModel): Promise<AccountModel | null> {
    const loadAccount = await this.loadByEmail.load(account.email)
    if (loadAccount) {
      return null
    }
    return {
      email: 'any_mail@email.com',
      password: 'any_password',
      username: 'any_name',
      id: 'any_id',
    }
  }
}
