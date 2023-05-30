import { AccountModel } from '../../../domain/models/account'
import { AuthenticationModel } from '../../../domain/usecases/authentication'
import { LoadAccountByEmailRepository } from '../../protocols/db/account/load-account-by-email-repository'
import { DbAuthentication } from './db-authentication'

interface SutTypes {
  sut: DbAuthentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
}

const makeFakeAccountModel = (): AccountModel => {
  return {
    username: 'any_username',
    password: 'hashed_password',
    email: 'any_email@mail.com',
    id: 'any_id',
  }
}

const makeLoadAccountByEmailRepositoryStub =
  (): LoadAccountByEmailRepository => {
    class LoadAccountByEmailRepositoryStub
      implements LoadAccountByEmailRepository
    {
      async loadByEmail(email: string): Promise<AccountModel | null> {
        return await Promise.resolve(makeFakeAccountModel())
      }
    }
    return new LoadAccountByEmailRepositoryStub()
  }
const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub =
    makeLoadAccountByEmailRepositoryStub()
  const sut = new DbAuthentication(loadAccountByEmailRepositoryStub)
  return {
    loadAccountByEmailRepositoryStub,
    sut,
  }
}
describe('DbAuthentication', () => {
  test(' should call load with correct value', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const fakeAccount: AuthenticationModel = {
      email: 'any_email@email.com',
      password: 'any_password',
    }
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.auth(fakeAccount)
    expect(loadSpy).toHaveBeenCalledWith('any_email@email.com')
  })
})
