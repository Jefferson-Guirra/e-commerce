import { BcrypterAdapter } from './bcrypter-adapter'
import bcrypter from 'bcrypt'

describe('BcrypterAdapter', () => {
  const salt = 12
  const makeSut = () => new BcrypterAdapter(salt)
  test('should call hash with correct value', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypter, 'hash')
    const hashValue = await sut.hash('any_value')
    expect(hashSpy).toBeCalledWith('any_value', 12)
  })
})
