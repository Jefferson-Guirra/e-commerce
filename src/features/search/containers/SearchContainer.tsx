import React from 'react'
import styles from './styles.module.css'
import { Search } from '../pages/Search'
import { ISearchProps } from '../@types/ISearchProps'
export const SearchContainer = (props: ISearchProps) => {
  return (
    <main className={styles.container}>
      <Search {...props} />
    </main>
  )
}
