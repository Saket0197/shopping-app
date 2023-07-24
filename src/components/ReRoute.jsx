import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';

export default function ReRoute({children}) {

  const navigate = useNavigate();
  const {setSelectedCategory} = useContext(ProductContext);
  setSelectedCategory('All');

  useEffect(()=>{
      navigate({search:'?page=1'});
  },[]);

  return (
    <div>
        {children}
    </div>
  )
}
