import React from 'react'
import styles from './styles.module.css'
import { Loading } from '../../../../components'
import { useListContext } from '../../../../context/books-list/BookList'

interface IProps {
  loading: boolean
}

export const LoadingComponent = () => {
  const { collectionLoading } = useListContext()
  return (
    <>
      {collectionLoading && (
        <div className={styles.container}>
          <Loading />
        </div>
      )}
    </>
  )
}
