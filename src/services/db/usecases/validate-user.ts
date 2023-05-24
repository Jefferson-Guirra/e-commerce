import { collection, getDocs, query, where } from 'firebase/firestore'
import { IValidateUserProps } from '../@types'
import { db } from '../helpers/firebaseConnection'

export const ValidateUser = ({ username, email }: IValidateUserProps) => {
  const ref = collection(db, 'users')
  let error: string | boolean = false
  let validate = true

  const validateUsername = async () => {
    const users = await getDocs(
      query(ref, where('username', '==', username))
    ).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
      }))
      return newData
    })

    if (users.length > 0) {
      validate = false
      error = 'Nome de usuário já cadastrado'
    }
  }

  const validateEmail = async () => {
    const validateEmail = await getDocs(
      query(ref, where('email', '==', email))
    ).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
      }))
      return newData
    })

    if (validateEmail.length > 0) {
      validate = false
      error = 'Email já cadastrado'
    }
  }

  const initUserCreate: () => Promise<{
    error: string | boolean
    validate: boolean
  }> = async () => {
    await validateUsername()
    await validateEmail()
    return {
      error,
      validate,
    }
  }
  const validateUser = initUserCreate()

  return {
    validateUser,
  }
}
