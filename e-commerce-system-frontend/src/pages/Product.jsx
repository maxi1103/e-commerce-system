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
        return null;
        
      }
    })
  }

  useEffect(() =>{
    fetchProductData();
  },[productId,productos])

  return (
    <div>Products</div>
  )
}

export default Product