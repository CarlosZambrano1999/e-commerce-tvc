'use client';
import React, { useState } from 'react'
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5';

interface Props {
    quantity: number;
    maxQuantity: number;
    onQuantityChange: (newQuantity: number) => void;
}

export const QuantitySelector = ({quantity, maxQuantity, onQuantityChange}: Props) => {

    const [count,setCount] = useState(quantity);
    const onQuantityChanged = (value:number)=>{
        const newCount = count + value;

        if (newCount < 1 || newCount > maxQuantity) return;

        setCount(newCount);
        onQuantityChange(newCount);
    };
  return (
    <div className='flex'>
        <button onClick={()=> onQuantityChanged(-1)}>
            <IoRemoveCircleOutline size={30} />
        </button>
        <span className='w-20 mx-3 px-5 bg-gray-100 text-center rounded'>
            {count}
        </span>
        <button onClick={()=> onQuantityChanged(+1)}>
            <IoAddCircleOutline size={30} />
        </button>
    </div>
  )
}
