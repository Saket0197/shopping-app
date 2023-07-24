import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setCount } from '../redux/slices/TotalPageSlice';
import Product from '../components/Product';
import { ProductContext } from '../context/ProductContext';


export default function ProductsPage({type}) {

  const {pathname,search} = useLocation();
  const dispatch = useDispatch();
  const skipLimit = (Number(search.split('=')[1])-1)*process.env.REACT_APP_MAX_PROD_LIMIT;
  const [Products,setProducts] = useState([]);
  const {rating,setRating,priceRange,setRange} = useContext(ProductContext)
  let category = null;
  if(type === 'Category') {
    category = pathname.split('/').at(-1).split('?')[0];
  }

  useEffect(() => {
    try {
      if(!search)
        return;
      async function fetchProducts() {
        const base_url_prefix = `${process.env.REACT_APP_BASE_URL}`;
        const base_url_suffix = `?skip=${skipLimit}&limit=${process.env.REACT_APP_MAX_PROD_LIMIT}`;
        let url = null;
        if(type === 'All'){
          url = `${base_url_prefix}${base_url_suffix}`;
        }
        else if(type === 'Category') {
          url = `${base_url_prefix}/category/${category}${base_url_suffix}`;
        }
        const res = await fetch(url);
        const {products,total,limit} = await res.json();
        let fetchedProds = products;

        // price filter
        if(priceRange === 'less than 100') {
          fetchedProds = fetchedProds.filter((eachProd)=>{return eachProd.price > 0 && eachProd.price <= 100});
        }

        else if(priceRange === '100-500') {
          fetchedProds = fetchedProds.filter((eachProd)=>{return eachProd.price > 100 && eachProd.price <= 500});
        }
        else if(priceRange === '500-1000'){
          fetchedProds = fetchedProds.filter((eachProd)=>{return eachProd.price > 500 && eachProd.price <= 1000});
        }
        else if(priceRange === '1000-1500'){
          fetchedProds = fetchedProds.filter((eachProd)=>{return eachProd.price > 1000 && eachProd.price <= 1500});
        }
        else if(priceRange === '1500-2000') {
          fetchedProds = fetchedProds.filter((eachProd)=>{return eachProd.price > 1500 && eachProd.price <= 2000});
        }

        // rating filter
        if(rating === '4.5+') {
          fetchedProds = fetchedProds.filter((eachProd)=>{return eachProd.rating >= 4.5});
        }
        setProducts(fetchedProds);
        let count = total/limit;
        if(count === 0)
          dispatch(setCount(1));
        else if(count > 0)
          dispatch(setCount(count));
      }
      fetchProducts();
    } catch(err) {
        console.log('Error in fetching Category Products');
        console.error(err.message);
    }
  },[pathname,search,rating,priceRange]);

  return (
  <div className='flex flex-wrap gap-2  p-2 align-baseline'>
    {
      search && 
        <>
          <div className='sm:flex-col sm:gap-4 w-full flex justify-between bg-[#fff] p-2'>

            <div className='sm:justify-between flex gap-4 p-2 rounded-md'>
              <div className='font-semibold bg-[#0a125cc2] text-[#fff] p-2 rounded-md'>Rating</div>
              <select className='bg-[#299158] text-[#f3f382] p-2 rounded-md cursor-pointer font-semibold capitalize border-slate-700' onChange={(e) => setRating(e.target.value)} value={rating}>
                <option className='p-2 border  mx-2 rounded-lg bg-[#d579f19c] hover:bg-[#53a0be] font-semibold capitalize'>None</option>
                <option className='p-2 border  mx-2 rounded-lg bg-[#d579f19c] hover:bg-[#53a0be] font-semibold capitalize'>4.5+</option>
              </select>
            </div>

            <div className='sm:justify-between flex gap-4 p-2 rounded-md'>
              <div className='font-semibold bg-[#0a125cc2] text-[#fff] p-2 rounded-md'>Price</div>
              <select className='bg-[#299158] text-[#f3f382] p-2 rounded-md cursor-pointer font-semibold capitalize border-slate-700' onChange={(e) => setRange(e.target.value)} value={priceRange}>
                <option className='p-2 border  mx-2 rounded-lg bg-[#d579f19c] hover:bg-[#53a0be] font-semibold capitalize'>None</option>
                <option className='p-2 border  mx-2 rounded-lg bg-[#d579f19c] hover:bg-[#53a0be] font-semibold capitalize'>100 or below</option>
                <option className='p-2 border  mx-2 rounded-lg bg-[#d579f19c] hover:bg-[#53a0be] font-semibold capitalize'>100-500</option>
                <option className='p-2 border  mx-2 rounded-lg bg-[#d579f19c] hover:bg-[#53a0be] font-semibold capitalize'>500-1000</option>
                <option className='p-2 border  mx-2 rounded-lg bg-[#d579f19c] hover:bg-[#53a0be] font-semibold capitalize'>1000-1500</option>
                <option className='p-2 border  mx-2 rounded-lg bg-[#d579f19c] hover:bg-[#53a0be] font-semibold capitalize'>1500-2000</option>
              </select>
            </div>
          </div>

          {
            Products?.length > 0 ? 
            <div className='md:gap-2 sm:content-center flex gap-4 justify-around mx-auto flex-wrap mt-7'>
              {
              Products.map((eachProduct) => {
                return <Product key={eachProduct.id} {...eachProduct}/>
              })
              }
            </div> : 
            <div className='mt-7'>
              {
              ((rating !== 'None' || priceRange !== 'None') && Products?.length === 0) && <div className='w-[97vw] text-xl text-center font-bold'>No Matches for filtered Products Here</div>
              }
            </div>

          }
          
          

        </>
    }
  </div>
  )
}
