import React from 'react';
import { NavLink,Link } from "react-router-dom";
import img from '../assets/logo-e-commerce-2.png';
import {assets} from '../assets/assets'
import { useState } from 'react';

const Nav = () => {
  const [visible, setVisible] = useState(false)
  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      <img src={img} alt="" className='size-16'/>
      <ul className='hidden sm:flex gap-5 text-sm text-gray-500'>
        <NavLink to='/' className='flex flex-col items-center gap-1 hover:text-gray-800'>
          <p>Inicio</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
        <NavLink to='/collection' className='flex flex-col items-center gap-1 hover:text-gray-800'>
          <p>Colección</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
        <NavLink to='/about' className='flex flex-col items-center gap-1 hover:text-gray-800'>
          <p>Sobre Nosotros</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
        <NavLink to='/contact' className='flex flex-col items-center gap-1 hover:text-gray-800'>
          <p>Contactanos</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
      </ul>
      <div className='flex items-center gap-6'>
        <img src={assets.search_icon} className='w-5 cursor-pointer' alt="" />
        <div className='group relative'>
          <img src={assets.profile_icon} className='w-5 cursor-pointer' alt="" />
          <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-3'>
            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
              <p className='cursor-pointer hover:text-black'>Mi perfil</p>
              <p className='cursor-pointer hover:text-black'>Ordenes</p>
              <p className='cursor-pointer hover:text-black'>Salir</p>
            </div>
          </div>
        </div>
        <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} className='w-5 min-w5' alt="" />
          <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>10</p>
        </Link>
        <img onClick={()=>setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden'></img>
      </div>
      {/** Mobile Menu */}
      <div className={`absolute top-0 right-0 overflow-hidden bg-white transition-all duration-300 ${visible ? 'w-full':'w-0'}`}>
        <div className='flex flex-col text-gray-600'>
          <div onClick={()=>setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
            <img src={assets.dropdown_icon} className='h-4 rotate-180'/>
            <p>Atras</p>
          </div>
          <NavLink onClick={()=>setVisible(false)} to='/' className='py-2 pl-6 border'>Inicio</NavLink>
          <NavLink onClick={()=>setVisible(false)} to='/collection' className='py-2 pl-6 border'>Colección</NavLink>
          <NavLink onClick={()=>setVisible(false)} to='/about' className='py-2 pl-6 border'>Sobre Nosotros</NavLink>
          <NavLink onClick={()=>setVisible(false)} to='/contact' className='py-2 pl-6 border'>Contactanos</NavLink>
        </div>
      </div>
    </div>
  )
}
export default Nav
