import { LoadAccountByEmailRepository } from '../../../data/protocols/db/account/load-account-by-email-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { AccountModel } from '../../../domain/models/account'

export class AccountMongoRepository implements LoadAccountByEmailRepository {
  async loadByEmail(email: string): Promise<AccountModel | null> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email: email })
    return account && MongoHelper.Map(account)
  }
}
