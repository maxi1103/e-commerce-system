import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import ProductoItem from '../components/ProductoItem';

const Collection = () => {
  const { productos } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts,setFilterProducts] = useState([]);
 
  useEffect(()=>{
    setFilterProducts(productos);
    
  })
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filter*/}
      <div className='min-w-60 '>
        <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTROS
          <img  className={`h-3 sm:hidden ${showFilter ? 'rotate-90':''}`} src="/assets/dropdown_icon.png" />
        </p>
        {/*Categorias */}
        <div className={`border border-gray-300 pl-5 py-5 mt-6 ${showFilter ? '':'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIAS</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Men'} /> Men
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Women'} /> Women
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Kids'} /> Kids
            </p>
          </div> 
        </div>
        {/*SubCategorias */}
        <div className={`border border-gray-300 pl-5 py-5 my-5 ${showFilter ? '':'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TIPOS</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Topwear'} /> Ropa Superior
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Bottomwear'} /> Ropa Inferior
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Winterwear'} /> Ropa de Invierno
            </p>
          </div> 
        </div>

      </div>

      {/*Products */}
      <div className='flex-1 '>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'NUESTRA'} text2={'COLLECIÓN'}/>
          <select className='border-2 border-gray-300 text-sm px-2'>
            <option value="relevante">Odernar por: Relevante</option>
            <option value="menor-mayor">Odernar por: Menor a Mayor</option>
            <option value="mayor-menor">Odernar por: Mayor a Menor</option>
          </select>
        </div>
        { /* Mapear Productos */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProducts.map((item,index)=>(
              <ProductoItem key={index} name={item.nombre} id={item.id} price={item.precio} image={item.imagenes} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Collection