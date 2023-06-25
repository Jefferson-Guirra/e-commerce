import React from 'react'
import styles from './styles.module.css'
import { Loading } from '../../../../components'

interface IProps {
  loading: boolean
}

export const LoadingComponent = ({ loading }: IProps) => {
  return (
    <>
      {loading && (
        <div className={styles.container}>
          <Loading />
        </div>
      )}
    </>
  )
}
