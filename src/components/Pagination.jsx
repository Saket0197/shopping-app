import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';

export default function Pagination() {

  const [searchParams, setSearchParams] = useSearchParams();
  const {selectedFilters} = useContext(ProductContext);
  const pageNo = Number(searchParams.get('page'));

  const totalPages = useSelector(({TotalPages}) => TotalPages.pageValue);

  useEffect(()=>{
    if(pageNo > totalPages) {
      setSearchParams({page:1});
    }
  },[totalPages,selectedFilters]);

  function increPage() {
    setSearchParams({page:pageNo + 1});
  }

  function decrePage() {
    setSearchParams({page:pageNo - 1});
  }

  return (
    <div className='flex justify-between mt-5 p-2 bg-[#fff]'>
      {
        pageNo > 1 && <div className='bg-[#5eee5ecc] border border-[#00000073] font-semibold rounded-md p-2 cursor-pointer' onClick={decrePage}>Previous</div>
      }
      <div className='p-2 font-bold'>{`Page ${pageNo} of ${totalPages}`}</div>
      {
        pageNo < totalPages && <div className='bg-[#5eee5ecc] border border-[#00000073] font-semibold rounded-md p-2 cursor-pointer' onClick={increPage}>Next</div>
      }
    </div>
    
  )
}
