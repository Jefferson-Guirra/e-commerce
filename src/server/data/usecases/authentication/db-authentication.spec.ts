import { AccountModel } from '../../../domain/models/account'
import { AuthenticationModel } from '../../../domain/usecases/authentication'
import { HashCompare } from '../../protocols/criptography/hash-compare'
import { LoadAccountByEmailRepository } from '../../protocols/db/account/load-account-by-email-repository'
import { DbAuthentication } from './db-authentication'

const makeFakeAccountModel = (): AccountModel => {
  return {
    username: 'any_username',
    password: 'hashed_password',
    email: 'any_email@mail.com',
    id: 'any_id',
  }
}

const makeFakeAccountAuthentication = (): AuthenticationModel => {
  return {
    email: 'any_email@email.com',
    password: 'any_password',
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

const makeHashCompareStub = (): HashCompare => {
  class HashCompareStub implements HashCompare {
    async compare(value: string, hash: string): Promise<boolean> {
      return await Promise.resolve(true)
    }
  }
  return new HashCompareStub()
}

interface SutTypes {
  sut: DbAuthentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  hashCompareStub: HashCompare
}
const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub =
    makeLoadAccountByEmailRepositoryStub()
  const hashCompareStub = makeHashCompareStub()
  const sut = new DbAuthentication(
    loadAccountByEmailRepositoryStub,
    hashCompareStub
  )
  return {
    loadAccountByEmailRepositoryStub,
    hashCompareStub,
    sut,
  }
}
describe('DbAuthentication', () => {
  test(' should call load with correct value', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.auth(makeFakeAccountAuthentication())
    expect(loadSpy).toHaveBeenCalledWith('any_email@email.com')
  })

  test('should throw if loadAccountByEmail throw', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest
      .spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
      .mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.auth(makeFakeAccountAuthentication())
    await expect(promise).rejects.toThrow()
  })
  test('should return nul if loadAccountByEmail repository return null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest
      .spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
      .mockReturnValueOnce(Promise.resolve(null))
    const accessToken = await sut.auth(makeFakeAccountAuthentication())
    expect(accessToken).toBeFalsy()
  })

  test('should call compare with correct values', async () => {
    const { sut, hashCompareStub } = makeSut()
    const compareSpy = jest.spyOn(hashCompareStub, 'compare')
    await sut.auth(makeFakeAccountAuthentication())
    expect(compareSpy).toHaveBeenCalledWith('any_password', 'hashed_password')
  })
})
