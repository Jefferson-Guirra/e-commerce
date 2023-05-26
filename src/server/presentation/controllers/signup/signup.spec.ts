import { SignupController } from './signup-controller'
describe('Signup Controller', () => {
  test('shdould retun sum 1 and two is three', () => {
    const controller = new SignupController()
    const sum = controller.sum(1, 2)
    expect(sum).toBe(3)
  })
})
