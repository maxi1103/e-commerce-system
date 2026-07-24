import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductoItem from './ProductoItem';
import { getFeaturedProducts } from '../api/cms.api';

const LatestCollection = () => {

    const { productos } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        getFeaturedProducts('latest_collection', true).then((r) => {
            if (r.data.length > 0) {
                const featured = r.data
                    .sort((a, b) => a.order - b.order)
                    .map((item) => item.product)
                    .filter(Boolean)
                setLatestProducts(featured)
            } else {
                setLatestProducts(productos)
            }
        }).catch(() => {
            setLatestProducts(productos)
        })
    }, [productos])

  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1={'ULTIMA'} text2={'COLLECIÓN'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Descubre nuestros ultimos productos seleccionados especialmente para ti. Calidad y estilo en cada prenda.</p>
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
