import { useCallback, useEffect, useState } from "react";
import Cards from "./components/card/Cards";
import Cart from "./components/cart/Cart";
import { getData } from "./constants/db";

const telegram=window.Telegram.WebApp
const courses = getData();

const App = () => {

  useEffect(()=>{
    telegram.ready()
  })

  const [cardsItems, setCardsItems] = useState([])

const onAddItems=(item)=>{
const existItem=cardsItems.find(c=>c.id==item.id)

if(existItem){
  const newData=cardsItems.map((c)=>c.id==item.id?{...existItem,quantity:existItem.quantity+1}:c)
  setCardsItems(newData)
}else{
  const newData=[...cardsItems,{...item,quantity:1}]
  setCardsItems(newData)
}
}
const onRemoveItems=(item)=>{
  const existItem=cardsItems.find(c=>c.id==item.id)

  if(existItem.quantity===1){
const newData=cardsItems.filter(c=>c.id !== item.id)
setCardsItems(newData)
  }else{
    const newData=cardsItems.map((c)=>c.id==item.id?{...existItem,quantity:existItem.quantity-1}:c)
    setCardsItems(newData)

  }

}

const onCheckout=()=>{
  telegram.MainButton.text="Sotib olish :)"
  telegram.MainButton.show()
}

const onSendData=useCallback(()=>{
const queryID=telegram.initDataUnsafe?.query_id;
console.log(1);
if(queryID){
// fetch("https://telegramwebapibot-b671371371abfbb.herokuapp.com/web-data",{
fetch("http://localhost:8000/web-data",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({products:cardsItems,queryID:queryID})
})
}else{
  telegram.sendData(JSON.stringify(cardsItems))
}
},[cardsItems])

useEffect(()=>{
  telegram.onEvent("mainButtonClicked",onSendData) 

return ()=>telegram.offEvent("mainButtonClicked",onSendData) 
},[onSendData])

  return (
    <div>
      <h1 className="text-2xl text-center">Jasurinc kurslari</h1>
      <Cart cardsItems={cardsItems} onCheckout={onCheckout}/>
      <div className="flex justify-center flex-wrap">
        {courses.map((course) => <Cards key={course.id} course={course} onAddItems={onAddItems} onRemoveItems={onRemoveItems}/>)}
      </div>
    </div>
  );
};

export default App;
