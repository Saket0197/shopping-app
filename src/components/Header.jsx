import React from 'react';
import logo from '../Assets/AppLogo.jpg';
import {FaShoppingCart} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const cartProducts = useSelector(({Cart}) => Cart.cartValue);
  return (
    <div className='w-full pr-4 flex justify-between items-center bg-[#0c0c31]'>
        <NavLink to='/'>
          <img src={logo} alt='app logo' className='h-[14vh] rounded-sm' />
        </NavLink>
            

        <NavLink to='/cart'>
          <div className='relative'>
            <div className='h-7 w-7 border rounded-full absolute left-[60%] translate-x-[-50%] -top-2 flex justify-center items-center bg-[#fdf91dda] font-bold border-[#0000002d]'>{cartProducts.length}</div>
            <FaShoppingCart className='text-5xl text-[#67ec88]'/>
          </div>
        </NavLink>
    </div>
  )
}
