import { BcrypterAdapter } from './bcrypter-adapter'
import bcrypter from 'bcrypt'

jest.mock('bcrypt', () => ({
  hash: async (value: string, salt: number): Promise<string> => {
    return await Promise.resolve('hash_value')
  },
}))
describe('BcrypterAdapter', () => {
  const salt = 12
  const makeSut = () => new BcrypterAdapter(salt)
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
})
