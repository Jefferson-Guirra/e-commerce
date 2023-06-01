import { JwtAdapter } from './jwt-adapter'
import jwt from 'jsonwebtoken'

const makeSut = () => new JwtAdapter('secret')
describe('JwtAdapter', () => {
  test('should call encrypt with correct values', async () => {
    const sut = makeSut()
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt('id')
    expect(signSpy).toHaveBeenCalledWith({ id: 'id' }, 'secret')
  })

  test('should return throw if sign return throw', async () => {
    const sut = makeSut()
    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
      throw new Error()
    })
    const response = sut.encrypt('id')
    await expect(response).rejects.toThrow()
  })
})
