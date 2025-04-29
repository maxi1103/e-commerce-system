import React, {useContext,useEffect,useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';

const Cart = () => {

  const {cartItems,productos,updateQuantity} = useContext(ShopContext);
  
  const [cartData,setCartData] = useState([]);
  useEffect(()=>{
    const tempData = [];

    for(const items in cartItems){
      for(const item in cartItems[items]){
        if(cartItems[items][item]>0){
          tempData.push({
            id: items,
            size: item,
            quantity: cartItems[items][item]
          })
        }
      }
    }
    setCartData(tempData);
    
  },[cartItems])
  console.log(cartData);
  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={"TU"} text2={"CARRITO"}/>
      </div>
      <div>
        {
          cartData.map((item,index)=>{
            const productData = productos.find((product)=> product.id == item.id);
            return(
              <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols[4fr_2fr_0.5fr] items-center gap-4'>
                <div className='flex items-start gap-6'>
                  <img src={productData.imagenes.length > 0 ? productData.imagenes[0].imagen : 'https://via.placeholder.com/150'} className='w-16 sm:w-20'/>
                  <div>
                    <p className='text-xs sm:text-lg font-medium'>{productData.nombre}</p>
                    <div className='flex items-center gap-5 mt-2'>
                      <p>${productData.precio}</p>
                      <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                    </div>
                  </div>
                </div>
                <input onChange={(e)=> e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item.id,item.size,Number(e.target.value))} className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' type='number' min={1} value={item.quantity}/>
                <img onClick={()=>updateQuantity(item.id,item.size,0)} className='w-4 mr-4 sm:w-5 cursor-pointer' src='/assets/bin_icon.png'/>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Cart