import React from 'react'
import { PayPalButtons } from '@paypal/react-paypal-js'
import styles from './styles.module.css'
import { IoClose } from 'react-icons/io5'
import { Dispatch, SetStateAction } from 'react'

interface Props {
  purchase: boolean
  price: string
  clearBuyList: () => void
  setValue: Dispatch<SetStateAction<boolean>>
}
export const BuyComponent = ({
  price,
  clearBuyList,
  setValue,
  purchase,
}: Props) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setValue((state) => !state)
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
