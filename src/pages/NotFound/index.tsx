import styles from '../../styles/not-found.module.css'
import Head from 'next/head'

const NotFound = () => {
  return (
    <>
      <Head>
        <title>Error | não encontrado</title>
      </Head>
      <main className={styles.container}>
        <h1>Livro não encontrado.</h1>
      </main>
    </>
  )
}

export default NotFound
