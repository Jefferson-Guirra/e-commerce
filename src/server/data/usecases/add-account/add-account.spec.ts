import { AccountModel } from '../../../domain/models/account'
import { AddAccountModel } from '../../../domain/usecases/add-account'
import { LoadAccountByEmailRepository } from '../../protocols/db/account/load-account-by-email-repository'
import { DbAddAccountRepository } from './db-add-account'
import { Hasher } from '../../protocols/criptography/hasher'
import { AddAccountRepository } from '../../protocols/db/account/add-account-repository'

const makeFakeAccount = (): AccountModel => {
  return {
    email: 'any_mail@email.com',
    password: 'hashed_password',
    username: 'any_name',
    id: 'any_id',
  }
}

const makeFakeAddAccount = (): AddAccountModel => ({
  email: 'any_mail@email.com',
  password: 'any_password',
  username: 'any_name',
})
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

const makeHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash(value: string): Promise<string> {
      return Promise.resolve('hashed_password')
    }
  }
  return new HasherStub()
}

const makeAddAccountRepositoryStub = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(account: AddAccountModel): Promise<AccountModel> {
      return Promise.resolve({ ...account, id: 'any_id' })
    }
  }
  return new AddAccountRepositoryStub()
}

interface SutTypes {
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  sut: DbAddAccountRepository
  addAccountRepositoryStub: AddAccountRepository
  hasherStub: Hasher
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadByEmailRepository()
  const hasherStub = makeHasher()
  const addAccountRepositoryStub = makeAddAccountRepositoryStub()
  const sut = new DbAddAccountRepository(
    loadAccountByEmailRepositoryStub,
    hasherStub,
    addAccountRepositoryStub
  )
  return {
    sut,
    hasherStub,
    loadAccountByEmailRepositoryStub,
    addAccountRepositoryStub,
  }
}
describe('AddAccountRepository', () => {
  test('should call loadByEmail with correct value', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
    await sut.add(makeFakeAddAccount())
    expect(loadSpy).toHaveBeenCalledWith('any_mail@email.com')
  })

  test('should return null if account exist', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest
      .spyOn(loadAccountByEmailRepositoryStub, 'load')
      .mockReturnValueOnce(Promise.resolve(makeFakeAccount()))
    const account = await sut.add(makeFakeAddAccount())
    expect(account).toBeFalsy()
  })

  test('should return throw if loadByEmail return throw', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest
      .spyOn(loadAccountByEmailRepositoryStub, 'load')
      .mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.add(makeFakeAddAccount())
    await expect(promise).rejects.toThrow()
  })

  test('should call Hasher with correct value', async () => {
    const { sut, hasherStub } = makeSut()
    const hashSpy = jest.spyOn(hasherStub, 'hash')
    await sut.add(makeFakeAddAccount())
    expect(hashSpy).toHaveBeenCalledWith('any_password')
  })

  test('should return throw if Hasher return throw', async () => {
    const { sut, hasherStub } = makeSut()
    jest
      .spyOn(hasherStub, 'hash')
      .mockResolvedValueOnce(Promise.reject(new Error()))
    const promise = sut.add(makeFakeAddAccount())
    await expect(promise).rejects.toThrow()
  })

  test('should call AddAccountRepository with correct value', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    await sut.add(makeFakeAddAccount())
    expect(addSpy).toHaveBeenCalledWith({
      email: 'any_mail@email.com',
      password: 'hashed_password',
      username: 'any_name',
    })
  })
})
