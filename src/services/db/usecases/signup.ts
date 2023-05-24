import { IAccountModel } from '../@types'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../helpers/firebaseConnection'

export const SignUp = (email: string, password: string) => {
  const ref = collection(db, 'users')
  let user: IAccountModel | null = null
  let validate = true
  let error: string | boolean = false

  const validateEmail = async () => {
    const emailUser = await getDocs(
      query(ref, where('email', '==', email))
    ).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
      }))
      return newData
    })
    if (emailUser.length === 0) {
      validate = false
      error = 'O email que você inseriu não está conectado a uma conta.'
    }
    user = emailUser[0] as IAccountModel
  }
  const validatePassword = async () => {
    const userPassword = await getDocs(
      query(ref, where('email', '==', email))
    ).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
      }))
      return newData
    })

    if (userPassword.length > 0 && userPassword[0].password !== password) {
      validate = false
      error = 'Senha incorreta'
    }
    user = userPassword[0] as IAccountModel
  }

  const initValidateUser: () => Promise<{
    error: string | boolean
    validate: boolean
    user: IAccountModel | null
  }> = async () => {
    await validateEmail()
    await validatePassword()
    return {
      error,
      user,
      validate,
    }
  }
  const validateLogin = initValidateUser()

  return {
    validateLogin,
  }
}
