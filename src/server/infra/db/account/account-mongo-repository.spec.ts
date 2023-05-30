import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account-mongo-repository'

const makeSut = () => new AccountMongoRepository()
describe('AccountMongoRepository', () => {
  let accountCollection: Collection
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })
  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })
  afterAll(async () => {
    MongoHelper.disconnect()
  })

  test('should return account loadByEmail success', async () => {
    const sut = makeSut()
    await accountCollection.insertOne({
      username: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    })
    const account = await sut.loadByEmail('any_email@mail.com')
    expect(account).toBeTruthy()
    expect(account?.id).toBeTruthy()
    expect(account?.email).toBe('any_email@mail.com')
    expect(account?.password).toBe('any_password')
    expect(account?.username).toBe('any_name')
  })

  test('should return null if loadByEmail fails', async () => {
    const sut = makeSut()
    const account = await sut.loadByEmail('any_email')
    expect(account).toBeFalsy()
  })

  test('should return account if add success', async () => {
    const sut = makeSut()
    const account = await sut.add({
      username: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    })
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.username).toBe('any_name')
    expect(account.password).toBe('any_password')
    expect(account.email).toBe('any_email@mail.com')
  })
})
