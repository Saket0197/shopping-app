import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';


export default function CheckoutPage() {
  const {setSelectedCategory} = useContext(ProductContext);
  return (
    <div className='flex flex-col gap-4 justify-center items-center w-full h-[100vh]'>
      <p className='sm:text-3xl text-4xl text-[#299158] text-center'>Congratulations! Payment Successful</p>
      <NavLink to='/'>
        <button className='sm:text-xl w-[70vw] text-2xl font-semibold p-2 rounded-lg border border-slate-500 capitalize bg-[#299158] hover:bg-[#299158b7] transition duration-200 text-[#f3f382]' onClick={() => setSelectedCategory('All')}>Continue Shopping</button>
      </NavLink>
    </div>
  )
}
