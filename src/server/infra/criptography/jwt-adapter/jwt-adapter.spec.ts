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
})
