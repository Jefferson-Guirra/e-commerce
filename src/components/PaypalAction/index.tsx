import React from 'react'
import {PayPalButtons} from '@paypal/react-paypal-js'
import * as C from './styles'
import { IoClose } from 'react-icons/io5'
import { Dispatch, SetStateAction } from 'react'


interface Props {
  price: string
  clearBuyList:()=>void,
  setValue: Dispatch<SetStateAction<boolean>>
}
const PaypalAction = ({price,clearBuyList,setValue}:Props) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {

    if(e.target === e.currentTarget){
      setValue(state=>!state)
    }
  }


  /*useEffect(()=>{
    document.body.style.overflow = 'hidden'
    return()=>{
      document.body.style.overflow = 'auto'
    }
  },[])*/
  return (
    <C.container onClick={handleClick}>
      <div className="content">
        <h2>Comprar com Paypal</h2>
        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: `${price}`
                  }
                }
              ]
            })
          }}
          onApprove={async (data, actions) => {
            return actions.order?.capture().then(function (details) {
              clearBuyList()
              console.log('compra aprovada ' + details.payer.name?.given_name)
              setValue(state => !state)
            })
          }}
        />
        <button onClick={()=>setValue(state=>!state)}>
          <IoClose size={22} color="#fff" />
        </button>
      </div>
    </C.container>
  )
}

export default PaypalAction
