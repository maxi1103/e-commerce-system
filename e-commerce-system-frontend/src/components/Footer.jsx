import React from 'react'
import img from '../assets/logo-e-commerce-2.png';

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid  grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm '>
            <div>
                <img src={img} className='mb-5 size-16' alt="" />
                <p className='w-full md:w-2/3 text-gray-600'>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum quasi numquam nobis adipisci accusamus sint? Rerum ipsam voluptatum, quo quos sequi laudantium fugiat deserunt corrupti dolorem unde vel nulla ipsa!
                </p>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>COMPAÑIA</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Inicio</li>
                    <li>Sobre nosotros</li>
                    <li>Delivery</li>
                    <li>Politica de Privacidad</li>

                </ul>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>PONTE EN CONTACTO</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+388 4558437</li>
                    <li>nahuel_maxi11@hotmail.com</li>
                </ul>
            </div>
        </div>
        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright@2025 - All Rights Reserved </p>
        </div>
    </div>
  )
}

export default Footer