import React from 'react'
import { PayPalButtons } from '@paypal/react-paypal-js'
import styles from './styles.module.css'
import { IoClose } from 'react-icons/io5'
import { Dispatch, SetStateAction } from 'react'
import { ApiBook } from '../../../../utils/book-api'
import { useBuyContext } from '../../../../context/books-buy-list/BuyBookContext'

interface Props {
  purchase: boolean
  price: string
  setValue: Dispatch<SetStateAction<boolean>>
  accessToken: string
}
const apiBook = new ApiBook()
export const BuyComponent = ({
  price,
  setValue,
  purchase,
  accessToken,
}: Props) => {
  const { books } = useBuyContext()
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setValue((state) => !state)
    }
  }

  const clearBuyList = async () => {
    for (const book of books) {
      const { bookId } = book
      await apiBook.delete({ accessToken, bookId }, 'buybooklist/delete')
    }
  }

  return (
    <>
      {purchase && (
        <section className={styles.container} onClick={handleClick}>
          <div className={styles.content}>
            <h2>Comprar com Paypal</h2>
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: `${price}`,
                      },
                    },
                  ],
                })
              }}
              onApprove={async (data, actions) => {
                return actions.order?.capture().then(function (details) {
                  clearBuyList()
                  console.log(
                    'compra aprovada ' + details.payer.name?.given_name
                  )
                  setValue((state) => !state)
                })
              }}
            />
            <button onClick={() => setValue((state) => !state)}>
              <IoClose size={22} color="#fff" />
            </button>
          </div>
        </section>
      )}
    </>
  )
}
