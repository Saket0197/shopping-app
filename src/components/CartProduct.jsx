import React from 'react';
import {MdDelete} from 'react-icons/md';
import { removeFromCart } from '../redux/slices/CartSlice';
import { useDispatch } from 'react-redux';

export default function CartProduct({id,title,description,thumbnail,price}) {

  const dispatch = useDispatch();
  let text = null;
  text = description.length > 70 ? `${description.substring(0,70)}...` : description;

  return (
    <div className='border border-slate-400 rounded-lg shadow-xl shadow-slate-700 p-4 h-[55vh] flex flex-col justify-between'>
        <h2 className='font-bold text-lg text-center capitalize'>{title}</h2>
        <p className='text-[#00000085] italic lowercase'>{text}</p>
        <img src={thumbnail} alt='product pic' className='xs:h-[50%] object-cover w-full h-[65%] rounded-lg'/>
        <div className='flex justify-between items-center mt-1'>
          <p className='self-center text-[#0f0f38] text-lg font-bold'>${price}</p>
          <MdDelete onClick={() => dispatch(removeFromCart(id))} className='bg-[#e06060c5] rounded-full p-1 text-4xl font-bold text-red-700 cursor-pointer'/>
        </div>
    </div>
  )
}
