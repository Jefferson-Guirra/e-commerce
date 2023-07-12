import { MissingParamError } from '../../errors/missing-params-error'
import { Validation } from '../../protocols/validate'
export class RequiredFieldValidator implements Validation {
  constructor(private readonly fieldName: string) {}
  validation(input: any): Error | undefined {
    if (!input.body[this.fieldName]) {
      return new MissingParamError(this.fieldName)
    }
  }
}
