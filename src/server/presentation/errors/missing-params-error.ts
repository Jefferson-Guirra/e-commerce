export class MissingParamError extends Error {
  constructor(paramName: string) {
    super(`invalid param ${paramName}`)
    this.name = 'invalid params error'
  }
}
