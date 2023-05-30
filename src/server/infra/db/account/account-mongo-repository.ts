import { LoadAccountByEmailRepository } from '../../../data/protocols/db/account/load-account-by-email-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { AccountModel } from '../../../domain/models/account'
import { AddAccountRepository } from '../../../data/protocols/db/account/add-account-repository'
import { AddAccountModel } from '../../../domain/usecases/add-account'
import { ObjectId } from 'mongodb'

export class AccountMongoRepository
  implements LoadAccountByEmailRepository, AddAccountRepository
{
  async loadByEmail(email: string): Promise<AccountModel | null> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email: email })
    return account && MongoHelper.Map(account)
  }
  async add(account: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(account)
    const newAccount = await accountCollection.findOne({
      _id: new ObjectId(result.insertedId),
    })
    return newAccount && MongoHelper.Map(newAccount)
  }
}
