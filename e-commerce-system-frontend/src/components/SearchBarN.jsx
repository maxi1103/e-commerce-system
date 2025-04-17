import { useContext } from 'react';
import React from 'react'
import { ShopContext } from '../context/ShopContext';

const SearchBarN = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  return (

    <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-94 sm:w-1/2'>
        <input value={search} onChange={(e)=>setSearch(e.target.value)} className='flex-1 outline-none bg-inherit text-sm' type="text" placeholder='Search'/>
        <img className='w-4' src='assets/search_icon.png'/>
    </div>
    
    
  
   
  ) 
}

export default SearchBarN