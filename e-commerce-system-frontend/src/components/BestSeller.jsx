import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductoItem from './ProductoItem';

const BestSeller = () => {
    const {productos} = useContext(ShopContext);
    const [bestSeller,setBestSeller] = useState([]);
    
    useEffect(() => {
        // const bestProduct = products.filter((item)=>(item.masvendido));
        setBestSeller(productos);
        console.log(productos)
    },[productos])

  return (
    <div className='my-10'>
      <div className='text-center text-3xl py-8'>
        <Title text1={'MEJORES'} text2={'VENDIDOS'}/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur obcaecati id possimus? Voluptate placeat autem error alias culpa ullam repudiandae? Iusto eligendi error porro nisi sit fugit beatae nobis at.</p>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'> 
        {
          bestSeller.map((item,index)=>(
            <ProductoItem key={index} id={item.id} name={item.nombre} image={item.imagenes} price={item.precio}/>
          ))
        }
      </div>
    </div>
  )
}

export default BestSeller