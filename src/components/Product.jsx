import React from 'react';
import ReactStars from 'react-stars';
import {addToCart,removeFromCart} from '../redux/slices/CartSlice';
import { useDispatch,useSelector } from 'react-redux';

export default function Product({id,title,description,thumbnail,price,rating}) {

    const dispatch = useDispatch();
    let text = null;
    text = description.length > 55 ? `${description.substring(0,55)}...` : description;
    const cartProducts = useSelector(({Cart}) => Cart.cartValue);
    
  return (
    <div className='xl:w-[30vw] lg:w-[45vw] md:w-[85vw] border bg-[#fff] border-slate-400 rounded-lg shadow-xl shadow-slate-700 transition duration-200 hover:scale-[1.01] h-[85vh] w-[22vw] flex flex-col justify-around gap-4 p-2'>
        <div className='mb-4'>
            <h2 className='font-bold text-lg mb-2 text-center capitalize'>{title.length > 25 ? `${title.substring(0,25)}...`:title}</h2>
            <p className='text-[#00000085] italic lowercase'>{text}</p>
        </div>
        <img src={thumbnail} alt='product pic' className='h-[50vh] w-[full] object-cover rounded-md border'/>
        <div className='flex justify-between align-center mx-1'>
            <p className='self-center text-[#0f0f38] text-lg font-bold'>${price}</p>
            <ReactStars
                count={5}
                size={24}
                value={rating}
                edit={false} />
        </div>
        
        {
          (cartProducts.length && cartProducts.map((eachProduct) => eachProduct.id).includes(id)) ? 
          <div className='border border-slate-500 p-2 rounded-lg cursor-pointer text-center bg-[#f5581ac9] hover:bg-[#f5581aaf] transition duration-200 font-semibold text-[#000] capitalize' onClick={() => dispatch(removeFromCart(id))}>Remove From Cart</div> : 
          <div className='border border-slate-500 p-2 rounded-lg cursor-pointer text-center bg-[#f5e61a8c] hover:bg-[#f5e61a5e] transition duration-200 font-semibold text-[#000] capitalize' onClick={() => dispatch(addToCart({id,title,description,thumbnail,price}))}>Add to Cart</div> 
        }
    </div>
  )
}
