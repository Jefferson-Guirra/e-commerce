import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import * as C from '../../styles/buyList'
import {useState} from 'react'
import { IoClose } from 'react-icons/io5'
import { DataBook, GET_BOOKS_DATABASE, REMOVE_BOOK_DATABASE } from '../../services/helper/FirebaseFunctions'
import { UserCookie } from '../../Types/User'
import {doc,updateDoc} from 'firebase/firestore'
import { db } from '../../services/firebaseConnection'
import { MdAdd, MdRemove } from 'react-icons/md'
import { UserContext } from '../../UserContext'
import {useContext} from 'react'


interface Props{
  books:string
}



const Buy = ({books}:Props) => {
  const booksFormat: DataBook[] = JSON.parse(books)
  const [bookList, setBookList] = useState(booksFormat)
  const { updatedBuyList } = useContext(UserContext)
  const price = bookList.reduce(
    (acc, v) => acc + v.saleInfo.listPrice.amount * v.qtd,
    0
  )
  const handleExclude = (id:string)=>{
    updatedBuyList('remove')
    REMOVE_BOOK_DATABASE({id,idCollection:'buyBooks'})
    const newBooks = bookList.filter(item=> item.idDoc !== id)
    setBookList(newBooks)
  }

  const handleNext = async (idDoc:string,) =>{
      const updatedBooks = [...bookList]
      const index = updatedBooks.findIndex(item => item.idDoc === idDoc)
      const docRef = doc(db, 'buyBooks', idDoc)
      
      
        await updateDoc(docRef, {
          qtd: updatedBooks[index].qtd + 1
        })
        updatedBooks[index].qtd = updatedBooks[index].qtd + 1
        setBookList(updatedBooks)
      
  }

  const handlePrev = async (idDoc: string) => {
    const updatedBooks = [...bookList]
    const index = updatedBooks.findIndex(item => item.idDoc === idDoc)
    const docRef = doc(db, 'buyBooks', idDoc)
    
    if (updatedBooks[index].qtd >1) {
      await updateDoc(docRef, {
        qtd: updatedBooks[index].qtd - 1
      })
      updatedBooks[index].qtd = updatedBooks[index].qtd - 1
      setBookList(updatedBooks)
    }
  }


  return (
   <C.container>
      <div className="content">
        <h1>Meu Carrinho</h1>

        {bookList.map(item => (
          <C.cardContent key={item.idDoc}>
            <h2>{item.volumeInfo.publisher}</h2>
            <article className="infoBook">
              <div className="img">
                <img
                  src={`https://books.google.com/books/publisher/content/images/frontcover/${item.id}?fife=w340-h600&source=gbs_api`}
                  height="150px"
                  alt={`Imagem do livro ${item.volumeInfo.title}`}
                />
              </div>
              <article className="dataBook">
                <div className="header">
                  <div className="bookTitle">
                    <p>{item.volumeInfo.title}</p>
                  </div>
                  <div className="actions">
                    <button className="qtd">
                      <MdRemove onClick={()=>handlePrev(item.idDoc)} size={20} color="#363636" />
                      <p>{item.qtd}</p>
                      <MdAdd onClick={()=>handleNext(item.idDoc)} size={20} color="#363636" />
                    </button>
                    <p>
                      R$:{' '}
                      {(item.saleInfo.listPrice.amount * item.qtd).toFixed(2)
                        .toString()
                        .replace('.', ',')}
                    </p>
                    <button
                      className="btnExclude"
                      onClick={() => handleExclude(item.idDoc)}
                    >
                      <IoClose size={20} color="#363636" />
                    </button>
                  </div>
                </div>
                <div className="textInfo">
                  <p>Ano: </p>
                  <span>
                    {item.volumeInfo.publishedDate.replace(/\-\d+/g, '')}
                  </span>
                </div>
                <div className="textInfo">
                  <p className="textInfo">Páginas: </p>
                  <span>{item.volumeInfo.pageCount}</span>
                </div>
                <div className="textInfo">
                  <p>Idioma: </p>
                  <span>{item.volumeInfo.language}</span>
                </div>
              </article>
            </article>
            <C.buyInfoCard>
              <h2>Entrega Básica</h2>
              <div className="infoBuy">
                <span id="free">Frete grátis </span>
                <p>neste vendedor nas compras a partir de</p>
                <span> R$ {item.shipping.toFixed(2).toString().replace('.',',')}</span>
              </div>
            </C.buyInfoCard>
          </C.cardContent>
        ))}
      </div>
      <article className="price">
        <p>Total do carrinho: R${price.toFixed(2).toString().replace('.', ',')}</p>
      </article>
      { bookList.length > 0 && <article className="checkout">
        <button id="addButton">ESCOLHER MAIS LIVROS</button>
        <button id="buyButton">FINALIZAR PEDIDO</button>
      </article>}
    </C.container>
    
  )
}

export default Buy

export const getServerSideProps:GetServerSideProps = async (ctx)=>{
  const cookies = parseCookies(ctx)
  if(!cookies.user){
    return{
      redirect:{
        destination:'/',
        permanent:false
      }
    }
  }
  const user = JSON.parse(cookies.user) as UserCookie
  const books = JSON.stringify(await GET_BOOKS_DATABASE({id:user.token,idCollection:'buyBooks'}))
  
  
  return{
    props:{
      books
    }
  }
}
