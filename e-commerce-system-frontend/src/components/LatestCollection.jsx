import React, { useEffect } from 'react'
import { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductoItem from './ProductoItem';
import { assets } from '../assets/assets';

const LatestCollection = () => {

    const { productos } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);

    
    useEffect(() => {
        // setLatestProducts(productos.slice());
        setLatestProducts(productos);
    })
    
  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1={'ULTIMA'} text2={'COLLECIÓN'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda reiciendis cum doloribus. Maiores illo nulla libero voluptas rem qui cumque, sunt repellendus vitae, modi necessitatibus aliquam dignissimos minus neque sint.</p>
        </div>
        {/* { Renderizar productos } */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {latestProducts.map((item,index)=>(
                
                <ProductoItem key={index} id={item.id} image={item.imagenes} name={item.nombre} price={item.precio}/>
            ))}
            
        </div>
    </div>
  )
}

export default LatestCollection