import * as C from  '../../styles/notFound'
import Head from 'next/head'

const NotFound = () => {

  return (
    <>
      <Head>
        <title>
          Error | não encontrado
        </title>
      </Head>
      <C.container>
      <h1>Livro não encontrado.</h1>
      </C.container>
    </>
  )
}

export default NotFound
