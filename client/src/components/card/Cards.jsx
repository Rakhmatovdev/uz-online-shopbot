import { useState } from "react"
import Button from "../button/Button"

const Cards = (props) => {
    const [count,setCount]=useState(0)
    const {course,onAddItems,onRemoveItems}=props

const handleIncrease=()=>{
setCount(p=>p+1)
onAddItems(course)
}

const handleDecrease=()=>{
setCount(p=>p-1)
onRemoveItems(course)
}

  return (
    <div className="flex justify-between text-white flex-col w-[350px] p-[10px] rounded-lg relative mx-3 my-[10px] bg-[#2d3748] ">
        <span className={`${count>0?"badge":"hidden"} ` }>{count}</span>
     
        <div className="">
            <img className="w-full object-cover" src={course.Image} alt={course.title} width={"100%"} height={'230px'} />
        </div>
        <div className="flex justify-between items-center  ">
            <h2 className="font-normal ">{course.title}</h2>
            <div className="text-2xl font-bold">
                {course.price.toLocaleString('en-US',{
                    style:"currency",
                    currency:"USD"
                })}
            </div>
        </div>
<div className="w-full h-[1px] bg-[rgba(128,128,128,0.656)] mb-[10px]"></div>


<div className="flex flex-row justify-center gap-3">
    <Button type="add" onClick={handleIncrease}  title="+"/>
    <Button type="remove" disabled={count==0?true:false}  onClick={handleDecrease} title="-"/>
</div>

    </div>
  )
}

export default Cards