import React from 'react'
import styles from './styles.module.css'
import { Loading } from '../../../../components/helpers/loading/Loading'

interface IProps {
  loading: boolean
}

const LoadingComponent = ({ loading }: IProps) => {
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

export default LoadingComponent
