import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';

export default function Categories() {

  const {categories,setCategories,selectedCategory, setSelectedCategory} = useContext(ProductContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCategories() {
       try {
        const res = await fetch(`${process.env.REACT_APP_BASE_URL}/categories`);
        const response = await res.json();
        response.unshift('All');
        setCategories(response);
       } catch(err) {
          console.log('Error in fetching Products Categories');
          console.error(err.message);
       }
    }

    fetchCategories();

  },[]);

  function handleSelection(e) {
    const category = e.target.value;
    setSelectedCategory(category);
    category === 'All' ? navigate({pathname:'/',search:'?page=1'}) : navigate({
      pathname:`/products/${category}`,
      search:'?page=1'
    });
  }

  return (
    <div className='flex justify-start gap-4 p-4 my-5 bg-[#fff]'>
     <div className='xs:flex-col xs:gap-1 w-full flex justify-between p-1 rounded-md'>
        <div className='font-semibold bg-[#ff7300] p-2 rounded-md'>Categories</div>
        <select className='bg-[#ef0] p-2 rounded-md cursor-pointer font-semibold capitalize border-slate-700' onChange={(e) => handleSelection(e)} value={selectedCategory}>
          {
            categories.map((category,index) => {
              return <option key={index} className={`p-2 border  mx-2 rounded-lg ${category === 'All' ? 'bg-[red]' : 'bg-[#d579f19c]'} ${category === 'All' ? 'text-[yellow]' : 'text-[#000]'} font-semibold capitalize`}>{category}</option>
            })
          }
        </select>
     </div>
    </div>
  )
}
