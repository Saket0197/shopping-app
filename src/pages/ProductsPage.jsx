import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useSearchParams } from 'react-router-dom';
import { setCount } from '../redux/slices/TotalPageSlice';
import Product from '../components/Product';
import { ProductContext } from '../context/ProductContext';

export default function ProductsPage({type}) {

  const {pathname,search} = useLocation();
  const dispatch = useDispatch();
  const [currPage,setCurrPage] = useSearchParams();
  const [Products,setProducts] = useState([]);
  const {selectedFilters,setSelectedFilters} = useContext(ProductContext);


  const pageNo = currPage.get('page');

  useEffect(() => {
    if(!search) {
      setCurrPage({page:1});
    } 

      async function fetchProducts() {

        let url = null;
        if(type === 'All'){
          url = `${process.env.REACT_APP_BASE_URL}?limit=100`;
        }
        else if(type === 'Category') {
          let category = pathname.split('/').at(-1).split('?')[0];
          url = `${process.env.REACT_APP_BASE_URL}/category/${category}`;
        }
        try {
              const res = await fetch(url);
              const {products} = await res.json();
              let prods = applyFilter(products);
              setProducts(prods);
        } catch(err) {
            console.log('Error in fetching Category Products');
            console.error(err.message);
        }
      }
      fetchProducts();
 
  },[selectedFilters,pathname,search]);

  function setTotalPageCount(len) {
    let pageLimit = 20;
    let count = Math.ceil(len/pageLimit);
    if(count === 0)
      dispatch(setCount(1));
    else
      dispatch(setCount(count));
  }

  function applyFilter(totalProducts) {
    if(!totalProducts?.length) {
      return;
    }
      
    // rating filter
    totalProducts = selectedFilters.rating === '4.5+' ? totalProducts.filter((eachProd) => eachProd.rating >= 4.5) : totalProducts;

    // price filter
    totalProducts = 
   (selectedFilters.range === '100 or below') ? 
    totalProducts.filter((eachProd)=>{return eachProd.price > 0 && eachProd.price <= 100}) :
   (selectedFilters.range === '100-500') ?
   totalProducts.filter((eachProd)=>{return eachProd.price > 100 && eachProd.price <= 500}) :
   (selectedFilters.range === '500-1000') ?
   totalProducts.filter((eachProd)=>{return eachProd.price > 500 && eachProd.price <= 1000}) :
   (selectedFilters.range === '1000-1500') ?
   totalProducts.filter((eachProd)=>{return eachProd.price > 1000 && eachProd.price <= 1500}) :
   (selectedFilters.range === '1500-2000') ?
   totalProducts.filter((eachProd)=>{return eachProd.price > 1500 && eachProd.price <= 2000}):
   totalProducts;

   setTotalPageCount(totalProducts.length);
   return totalProducts;
  }

  return (
  <div className='flex flex-wrap gap-2  p-2 align-baseline'>
    {
      search &&
        <>
          <div className='sm:flex-col sm:gap-4 w-full flex justify-between bg-[#fff] p-2'>

            <div className='sm:justify-between flex gap-4 p-2 rounded-md'>
              <div className='font-semibold bg-[#0a125cc2] text-[#fff] p-2 rounded-md'>Rating</div>
              <select className='bg-[#299158] text-[#f3f382] p-2 rounded-md cursor-pointer font-semibold capitalize border-slate-700' onChange={(e) => {setSelectedFilters({...selectedFilters,rating:e.target.value})}} value={selectedFilters.rating}>
                <option className='p-2 border  mx-2 rounded-lg bg-[#d579f19c] hover:bg-[#53a0be] font-semibold capitalize'>None</option>
                <option className='p-2 border  mx-2 rounded-lg bg-[#d579f19c] hover:bg-[#53a0be] font-semibold capitalize'>4.5+</option>
              </select>
            </div>

            <div className='sm:justify-between flex gap-4 p-2 rounded-md'>
              <div className='font-semibold bg-[#0a125cc2] text-[#fff] p-2 rounded-md'>Price</div>
              <select className='bg-[#299158] text-[#f3f382] p-2 rounded-md cursor-pointer font-semibold capitalize border-slate-700' onChange={(e) => setSelectedFilters({...selectedFilters,range:e.target.value})} value={selectedFilters.range}>
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
                Products.map((eachProduct,index) => {
                  return (index >= (Number(pageNo) - 1)*process.env.REACT_APP_MAX_PROD_LIMIT && index < (Number(pageNo))*process.env.REACT_APP_MAX_PROD_LIMIT) &&
                   <Product key={eachProduct.id} {...eachProduct}/>
                })
              }
            </div> : 
            <div className='mt-7'>
              {
                ((selectedFilters.rating !== 'None' || selectedFilters.range !== 'None') && Products?.length === 0) && <div className='w-[97vw] text-xl text-center font-bold'>No Matches for filtered Products Here</div>
              }
            </div>

          }
        </>
    }
  </div>
  )
}
