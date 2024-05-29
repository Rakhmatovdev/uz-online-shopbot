import { totalPrice } from "../../utils/totalPrice"
import Button from "../button/Button"

const Cart = ({cardsItems,onCheckout}) => {
   
  return (
    <div className="flex justify-center items-center mt-8 gap-[10px]">
        <p>
Umumiy narx: {totalPrice(cardsItems).toLocaleString('en-US',{
                    style:"currency",
                    currency:"USD"
                })} </p>
<Button type="checkout" onClick={onCheckout} disabled={cardsItems.length?false:true} title={`${cardsItems.length?"To'lov":"Buyurtma berish"}`}/>
    </div>
  )
}

export default Cart