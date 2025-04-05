import React from 'react'
import { assets } from '../assets/assets'
const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
        <div>
            <img src={assets.exchange_icon} className='w-12 m-auto mb-5 '/>
            <p className='font-semibold '>Politica de Intercambio Facil</p>
            <p className='text-gray-400'>Ofrecemos una politica de intercambio sin complicaciones</p>
        </div>
        <div>
            <img src={assets.quality_icon} className='w-12 m-auto mb-5 '/>
            <p className='font-semibold '>Politica de 7 Dias de Devolución</p>
            <p className='text-gray-400'>Proveemos una politica de 7 dias de devolución gratis</p>
        </div>
        <div>
            <img src={assets.support_img} className='w-12 m-auto mb-5 '/>
            <p className='font-semibold '>El Mejor Servicio al Cliente</p>
            <p className='text-gray-400'>Proveemos 24/7 servicio al cliente</p>
        </div>
    </div>
  )
}

export default OurPolicy