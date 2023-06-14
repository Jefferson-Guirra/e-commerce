import { AddBuyBookModel } from '../../../../domain/usecases/book-buy-list/add-book-buy-list'
import { RemoveAmountBuyBook } from '../../../../domain/usecases/book-buy-list/remove-amount-book-buy-list'
import { MissingParamError } from '../../../errors/missing-params-error'
import { badRequest, ok } from '../../../helpers/http'
import { HttpRequest } from '../../../protocols/http'
import { Validation } from '../../../protocols/validate'
import { RemoveAmountBuyBookListController } from './remove-book-buy-list-controller'

const makeFakeAddBuyBook = (): AddBuyBookModel => ({
  authors: ['any_author'],
  amount: 0,
  date: 0,
  description: 'any_description',
  title: 'any_title',
  bookId: 'any_book_id',
  id: 'any_id',
  imgUrl: 'any_url',
  language: 'any-language',
  price: 0,
  publisher: 'any_publisher',
  publisherDate: 'any_date',
  queryDoc: 'any_id_doc',
  userId: 'any_user_id',
})

const makeFakeRequest = (): HttpRequest => ({
  body: {
    accessToken: 'any_token',
    bookId: 'any_book_id',
  },
})

const makeValidateStub = (): Validation => {
  class ValidationStub implements Validation {
    validation(input: any): Error | undefined {
      return
    }
  }
  return new ValidationStub()
}

const makeRemoveAmountBuyBookStub = (): RemoveAmountBuyBook => {
  class RemoveAmountBuyBookStub implements RemoveAmountBuyBook {
    async removeAmount(
      accessToken: string,
      bookId: string
    ): Promise<AddBuyBookModel | undefined> {
      return await Promise.resolve(makeFakeAddBuyBook())
    }
  }
  return new RemoveAmountBuyBookStub()
}
interface SutTypes {
  removeAmountStub: RemoveAmountBuyBook
  validateStub: Validation
  sut: RemoveAmountBuyBookListController
}

const makeSut = (): SutTypes => {
  const removeAmountStub = makeRemoveAmountBuyBookStub()
  const validateStub = makeValidateStub()
  const sut = new RemoveAmountBuyBookListController(
    validateStub,
    removeAmountStub
  )
  return {
    removeAmountStub,
    validateStub,
    sut,
  }
}

describe('RemoveBookBuyListController', () => {
  test('should call validation with correct values', async () => {
    const { validateStub, sut } = makeSut()
    const validationSpy = jest.spyOn(validateStub, 'validation')
    await sut.handle(makeFakeRequest())
    expect(validationSpy).toHaveBeenCalledWith(makeFakeRequest())
  })

  test('should return 400 if validation return a error', async () => {
    const { sut, validateStub } = makeSut()
    jest
      .spyOn(validateStub, 'validation')
      .mockReturnValue(new MissingParamError('any_field'))
    const response = await sut.handle(makeFakeRequest())
    expect(response).toEqual(badRequest(new MissingParamError('any_field')))
  })

  test('should call removeBookAmount with correct values', async () => {
    const { sut, removeAmountStub } = makeSut()
    const removeAmountSpy = jest.spyOn(removeAmountStub, 'removeAmount')
    await sut.handle(makeFakeRequest())
    expect(removeAmountSpy).toHaveBeenCalledWith('any_token', 'any_book_id')
  })
})
