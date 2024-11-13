import React from 'react';
import { Link } from "react-router-dom";
import img from '../assets/logo-e-commerce-2.png';
import search from '../assets/search.png';

function Nav() {
  return (
    <>
      <nav>
        <div className="bg-white container flex items-center py-3 border-b border-gray-600">
          <div className="px-3">
            <img src={img} height="50px" width="50px" alt="" />
          </div>
          <div className='hidden md:block'>
            <ul className='flex items-center gap-5 text-gray-600 px-3'>
              <li>
                <Link to='/' className='inline-block py-1 px-3 hover:text-primary font-semibold'>Inicio</Link>
              </li>
              <li>
                <Link to='#' className='inline-block py-1 px-3 hover:text-primary font-semibold'>Categorias</Link>
              </li>
              <li>
                <Link to='#' className='inline-block py-1 px-3 hover:text-primary font-semibold'>Ofertas</Link>
              </li>
              <li>
                <Link to='#' className='inline-block py-1 px-3 hover:text-primary font-semibold'>Sobre Nosotros</Link>
              </li>
            </ul>
          </div>
          <div className='flex text-gray-600'>
            <input type="text" className='placeholder:italic' placeholder='search..???' name='search'/>
            <img src={search} width="20px" height="20px"></img>
          </div>
        </div>
      </nav>
    </>
  )
}
export default Nav
