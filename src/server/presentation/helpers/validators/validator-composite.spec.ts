import { MissingParamError } from '../../errors/missing-params-error'
import { HttpRequest } from '../../protocols/http'
import { Validation } from '../../protocols/validate'
import { ValidatorComposite } from './validator-composite'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    field: 'any_field',
  },
})

const makeValidatorStub = (): Validation => {
  class RequiredFieldsValidatorStub implements Validation {
    constructor(private readonly field: string) {}
    validation(input: any): Error | undefined {
      if (!input.body[this.field]) {
        return new MissingParamError(this.field)
      }
    }
  }
  return new RequiredFieldsValidatorStub('field')
}

interface SutTypes {
  validatorStub: Validation
  sut: ValidatorComposite
}

const makeSut = (): SutTypes => {
  const validatorStub = makeValidatorStub()
  const sut = new ValidatorComposite([validatorStub])

  return {
    validatorStub,
    sut,
  }
}

describe('ValidatorComposite', () => {
  test('should call validators with correct values', () => {
    const { sut, validatorStub } = makeSut()
    const validatorSpy = jest.spyOn(validatorStub, 'validation')
    sut.validation(makeFakeRequest())
    expect(validatorSpy).toHaveBeenCalledWith(makeFakeRequest())
  })
})
