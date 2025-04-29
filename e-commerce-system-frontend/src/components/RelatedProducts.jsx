import React, { useEffect, useState, useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductoItem from './ProductoItem';

const RelatedProducts = ({category, subCategory,id}) => {

  const { productos } = useContext(ShopContext);
  const [ related , setRelated] = useState([]);

  useEffect(() => {
    if(productos.length >0){
        let productsCopy = productos.slice();

        productsCopy = productsCopy.filter((item) => item.categoria === category && item.id != id);
        productsCopy = productsCopy.filter((item) => item.subCategoria === subCategory && item.id != id);

        setRelated(productsCopy.slice(0,5));
    }
  },[])

  return (
    <div className='my-24'>
        <div className='text-center textl-3xl py-2'>
            <Title text1={"PRODUCTOS"} text2={"RELACIONADOS"}/>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                related.map((item,index) => (
                    <ProductoItem key={index} name={item.nombre} price={item.precio} image={item.imagenes}/>
            ))}
        </div>
    </div>
  )
}

export default RelatedProducts