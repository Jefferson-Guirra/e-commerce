import { AccountModel } from '../../../domain/models/account'
import { AddAccountModel } from '../../../domain/usecases/add-account'
import { LoadAccountByEmailRepository } from '../../protocols/db/account/load-account-by-email-repository'
import { DbAddAccountRepository } from './db-add-account'

interface SutTypes {
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  sut: DbAddAccountRepository
}

const makeLoadByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub
    implements LoadAccountByEmailRepository
  {
    async load(email: string): Promise<AccountModel | null> {
      return null
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}
const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadByEmailRepository()
  const sut = new DbAddAccountRepository(loadAccountByEmailRepositoryStub)
  return {
    sut,
    loadAccountByEmailRepositoryStub,
  }
}
describe('AddAccountRepository', () => {
  test('should call loadByEmail with correct value', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
    const fakeAccount: AddAccountModel = {
      email: 'any_mail@email.com',
      password: 'any_password',
      username: 'any_name',
    }
    await sut.add(fakeAccount)
    expect(loadSpy).toHaveBeenCalledWith('any_mail@email.com')
  })
})
