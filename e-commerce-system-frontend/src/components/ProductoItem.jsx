import React from 'react'
import { Link } from 'react-router-dom'

const ProductoItem = ({id,image,name,price}) => {

  return (
    <Link to={`/producto/${id}`} className='text-gray-700 cursor-pointer'>
        <div className='overflow-hidden'>
            <img src={image} className='hover:scale-110 transition ease-in-out' />
        </div>
        <p className='pt-3 pb-1 text-sm'>{name}</p>
        <p className='text-sm font-medium'>${price}</p>
    </Link>
  )
}

export default ProductoItem