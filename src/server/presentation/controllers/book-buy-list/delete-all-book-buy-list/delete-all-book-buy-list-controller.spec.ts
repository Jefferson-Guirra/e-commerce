import { HttpRequest } from '../../../protocols/http'
import { Validation } from '../../../protocols/validate'
import { DeleteAllBuyBooKListController } from './delete-all-book-buy-list-controller'
import { badRequest } from '../../../helpers/http'
import { MissingParamError } from '../../../errors/missing-params-error'
import { DeleteAllBuyBookList } from '../../../../domain/usecases/book-buy-list/delete-all-book-buy-list'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    accessToken: 'any_token',
  },
})

const makeValidatorStub = (): Validation => {
  class ValidatorStub implements Validation {
    validation(input: any): Error | undefined {
      return
    }
  }
  return new ValidatorStub()
}

const makeDeleteAllBuyBooksStub = (): DeleteAllBuyBookList => {
  class DeleteAllBuyBookListStub implements DeleteAllBuyBookList {
    async deleteAllBooks(accessToken: string): Promise<void | null> {
      await Promise.resolve()
    }
  }
  return new DeleteAllBuyBookListStub()
}

interface SutTypes {
  deleteAllBuyBooksStub: DeleteAllBuyBookList
  validatorStub: Validation
  sut: DeleteAllBuyBooKListController
}

const makeSut = (): SutTypes => {
  const deleteAllBuyBooksStub = makeDeleteAllBuyBooksStub()
  const validatorStub = makeValidatorStub()
  const sut = new DeleteAllBuyBooKListController(
    validatorStub,
    deleteAllBuyBooksStub
  )
  return {
    deleteAllBuyBooksStub,
    validatorStub,
    sut,
  }
}

describe('DeleteAllBuyBooKListController', () => {
  test('should call validation wit correct values', async () => {
    const { sut, validatorStub } = makeSut()
    const validationSpy = jest.spyOn(validatorStub, 'validation')
    await sut.handle(makeFakeRequest())
    expect(validationSpy).toHaveBeenCalledWith(makeFakeRequest())
  })

  test('should return 400 if validation return a error', async () => {
    const { sut, validatorStub } = makeSut()
    jest
      .spyOn(validatorStub, 'validation')
      .mockReturnValueOnce(new MissingParamError('any_field'))
    const response = await sut.handle(makeFakeRequest())
    expect(response).toEqual(badRequest(new MissingParamError('any_field')))
  })

  test('should call deleteAllBooks wit correct values', async () => {
    const { sut, deleteAllBuyBooksStub } = makeSut()
    const deleteSpy = jest.spyOn(deleteAllBuyBooksStub, 'deleteAllBooks')
    await sut.handle(makeFakeRequest())
    expect(deleteSpy).toHaveBeenCalledWith('any_token')
  })
})
