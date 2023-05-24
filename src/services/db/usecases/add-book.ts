import { IAddBookProps } from '../@types'
import { setDoc, doc } from 'firebase/firestore'
import { db } from '../helpers/firebaseConnection'

export const AddBook = async ({
  idBook,
  tokenUser,
  book,
  collection,
}: IAddBookProps) => {
  const number = Math.floor(Math.random() * (30 - 100) + 100)
  await setDoc(doc(db, collection, idBook + tokenUser), {
    title: book.title,
    language: book.language,
    price: book.price,
    id: book.id,
    publisher: book.publisher,
    publisherDate: book.publisherDate ?? 2023,
    authors: book.authors,
    pageCount: book.pageCount,
    created: new Date(),
    idDoc: idBook + tokenUser,
    userId: tokenUser,
    qtd: 1,
    shipping: number + 0.9,
  })
}
