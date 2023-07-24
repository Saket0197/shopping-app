import React from 'react';
import Header from '../components/Header';
import { useSelector } from 'react-redux';
import CartProduct from '../components/CartProduct';
import { NavLink } from 'react-router-dom';

export default function CartPage() {

  const cartProducts = useSelector(({Cart})=>Cart.cartValue);

  return (
    <div>
      <Header/>
      {
        cartProducts.length > 0 ? 
        <div className='sm:flex-col-reverse sm:items-center flex justify-between p-1 mt-4'>
          <div className='lg:w-[55%] sm:w-[90%] sm:mt-4 xs:w-[95%] p-1 w-[40%] flex flex-col gap-9'>
            {
              cartProducts.map((eachProduct) => {
                return <CartProduct key={eachProduct.id} {...eachProduct} />
              })
            }
          </div>

          <div className='lg:w-[35%] sm:gap-4 sm:w-full sm:items-center sm:justify-between sm:flex-wrap w-[45%] p-1 flex flex-col justify-start gap-7'>
              <div className='sm:flex sm:gap-1 sm:items-center'>
                <div className='sm:text-base text-2xl font-semibold text-[#17174d]'>Total Items: </div>
                <p className='sm:text-lg text-3xl font-bold text-[#299158]'>{cartProducts.length}</p>
              </div>

              <div className='sm:flex sm:gap-1 sm:items-center'>
                <div className='sm:text-base text-2xl font-semibold text-[#17174d]'>Total Price:</div>
                <p className='sm:text-lg text-3xl font-bold text-[#299158]'>${cartProducts.reduce((totalPrice,{price}) => totalPrice + price,0)}</p>
              </div>

              <NavLink to='/cart/checkout'>
                  <button className='w-full p-2 rounded-md border border-slate-500 capitalize bg-[#299158] hover:bg-[#299158b7] transition duration-200 text-[#f3f382] font-semibold'>Checkout</button>
              </NavLink>
          </div>
        </div> : 
        <div className='flex flex-col gap-4 justify-center items-center w-full h-[100vh]'>
          <p className='sm:text-3xl text-4xl text-[#299158] text-center'>Your Cart is Empty</p>
          <NavLink to='/'>
            <button className='sm:text-xl w-[70vw] text-2xl font-semibold p-2 rounded-lg border border-slate-500 capitalize bg-[#299158] hover:bg-[#299158b7] transition duration-200 text-[#f3f382]'>Shop Now!</button>
          </NavLink>
        </div>
      }
    </div>
  )
}
