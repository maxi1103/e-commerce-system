import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductoItem from './ProductoItem';
import { getFeaturedProducts } from '../api/cms.api';

const BestSeller = () => {
    const {productos} = useContext(ShopContext);
    const [bestSeller,setBestSeller] = useState([]);

    useEffect(() => {
        getFeaturedProducts('best_seller', true).then((r) => {
            if (r.data.length > 0) {
                const featured = r.data
                    .sort((a, b) => a.order - b.order)
                    .map((item) => item.product)
                    .filter(Boolean)
                setBestSeller(featured)
            } else {
                setBestSeller(productos.filter((item) => item.masvendido))
            }
        }).catch(() => {
            setBestSeller(productos.filter((item) => item.masvendido))
        })
    }, [productos])

  return (
    <div className='my-10'>
      <div className='text-center text-3xl py-8'>
        <Title text1={'MEJORES'} text2={'VENDIDOS'}/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Los productos mas populares entre nuestros clientes. Calidad garantizada en cada compra.</p>
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
