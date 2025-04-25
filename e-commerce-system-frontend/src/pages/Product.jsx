import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import { useParams } from 'react-router-dom';

const Product = () => {

  const { productId} = useParams();
  const { productos } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image,setImage] = useState('');
  
  const fetchProductData= async () =>{
    
    productos.map((item) => {
      
      if(item.id == productId){
        setProductData(item);
        setImage(item.imagenes[0].imagen);
        return null;
        
      }
    })
  }

  useEffect(() =>{
    fetchProductData();
  },[productId,productos])

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* Imagenes del producto */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full '>
            {
              productData.imagenes.map((item,index) => (
                <img onClick={()=>setImage(item.imagen)} src={item.imagen} key={index} alt="" className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img src={image} alt="" className='w-full h-auto'/>

          </div>
        </div>

        {/* Descripcion del producto */}
        <div className='flex-1'>
            <h1 className='font-medium text-2xl mt-2'>{productData.nombre}</h1>
            <div className='flex items-center gap-1 mt-2'>
              <img src='/assets/star_icon.png' alt="" className="w-3" />
              <img src='/assets/star_icon.png' alt="" className="w-3" />
              <img src='/assets/star_icon.png' alt="" className="w-3" />
              <img src='/assets/star_icon.png' alt="" className="w-3" />
              <img src='/assets/star_dull_icon.png' alt="" className="w-3" />
              <p className='pl-2'>(122)</p>
            </div>
            <p className='mt-5 text-3xl font-medium'>${productData.precio}</p>
            <p className='mt-5 text-gray-500 md:w-4/5'>{productData.descripcion}</p>
            <div className='flex flex-col gap-4 my-8'>
              <p>Selecciona la medida</p>
              <div className='flex gap-2'>

              </div>
            </div>
        </div>
      </div>

    </div>
  ) : <div className='opacity-0'></div>
}

export default Product