import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import { useParams } from 'react-router-dom';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

  const { productId} = useParams();
  const { productos } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image,setImage] = useState('');
  const [size, setSize] = useState('');
  
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
                {productData.medidas.map((item,index)=>(
                  <button onClick={()=>setSize(item.nombre)} className={`border py-2 px-4 bg-gray-100 ${item.nombre === size ? 'border-orange-500':''}`} key={index}>{item.nombre}</button>
                ))}
              </div>
            </div>
            <button className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>AGREGAR AL CARRITO</button>
            <hr className='mt-8 sm:w-4/5'/>
            <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
              <p>100% Producto original.</p>
              <p>Delivery en efectivo en este producto.</p>
              <p>Devolucion facil y politica de reembolso dentro de los 7 días.</p>
            </div>
        </div>
      </div>

      {/*--Descripcion & review*/}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Descripcion</b>
          <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi sequi aliquam esse qui quas! Non libero adipisci facere maiores facilis quos quisquam error! Illum molestiae deserunt quo odio perspiciatis alias?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. A architecto accusantium fuga est expedita mollitia, adipisci quae, incidunt sint atque porro eius. Asperiores, reiciendis libero accusantium at illum ad fugit?</p>
        </div>
      </div>
    
    {/*---- Mostrar Productos relacionados----*/}
    <RelatedProducts category={productData.categoria} subCategory={productData.subCategoria} id={productId}/>
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product