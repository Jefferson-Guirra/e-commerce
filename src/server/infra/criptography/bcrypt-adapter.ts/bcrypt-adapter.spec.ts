import { BcrypterAdapter } from './bcrypter-adapter'
import bcrypter from 'bcrypt'

jest.mock('bcrypt', () => ({
  hash: async (value: string, salt: number): Promise<string> => {
    return await Promise.resolve('hash_value')
  },
  compare: async (value: string, hash: string) => {
    return await Promise.resolve(true)
  },
}))

const salt = 12
const makeSut = () => new BcrypterAdapter(salt)

describe('BcrypterAdapter', () => {
  test('should call hash with correct value', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypter, 'hash')
    await sut.hash('any_value')
    expect(hashSpy).toBeCalledWith('any_value', 12)
  })

  test('should return a valid hash on hash success', async () => {
    const sut = makeSut()
    const hashValue = await sut.hash('any_value')
    expect(hashValue).toBe('hash_value')
  })

  test('should return throw if hash return throw', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypter, 'hash').mockImplementationOnce(() => {
      return Promise.reject(new Error())
    })
    const promise = sut.hash('any_value')
    await expect(promise).rejects.toThrow()
  })

  test('should call compare correct values', async () => {
    const sut = makeSut()
    const compareSpy = jest.spyOn(bcrypter, 'compare')
    await sut.compare('any_value', 'hash_value')
    expect(compareSpy).toHaveBeenCalledWith('any_value', 'hash_value')
  })
})
