import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'
import { getBanners } from '../api/cms.api'

const Hero = () => {
  const [banner, setBanner] = useState(null)

  useEffect(() => {
    getBanners(true).then((r) => {
      if (r.data.length > 0) setBanner(r.data[0])
    }).catch(() => {})
  }, [])

  return (
    <div className='flex flex-col sm:flex-row border border-gray-400'>
       {/* Hero Left Side */}
        <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
            <div className='text-[#414141] '>
                <div className='flex items-center gap-2'>
                    <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                    <p className='font-medium text-sm md:text-base'>
                        {banner?.subtitle || 'Nuestras Mejores Ventas'}
                    </p>
                </div>
                <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>
                    {banner?.title || 'Ultimos Ingresos'}
                </h1>
                <Link to={banner?.buttonLink || '/collection'} className='flex items-center gap-2 group'>
                    <p className='font-semibold text-sm md:text-base group-hover:underline'>
                        {banner?.buttonText || 'Compra Ahora'}
                    </p>
                    <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                </Link>
            </div>
        </div>
        {/* Hero Right Side */}
        {banner?.image ? (
            <img src={banner.image} className='w-full sm:w-1/2 object-cover' alt={banner.title} />
        ) : (
            <img src={assets.hero_img} className='w-full sm:w-1/2' />
        )}
    </div>
  )
}

export default Hero
