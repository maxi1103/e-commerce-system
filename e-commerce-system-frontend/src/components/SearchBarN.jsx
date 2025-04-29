import { useContext } from 'react';
import React from 'react'
import { ShopContext } from '../context/ShopContext';
import { useLocation, useNavigate} from 'react-router-dom';

const SearchBarN = () => {
  const { search, setSearch} = useContext(ShopContext);
  const location = useLocation();
  const navigate = useNavigate();

  // Función para manejar el clic en el icono de búsqueda
  const handleSearchClick = () => {
    if (location.pathname !== '/collection') {
     navigate('/collection'); // Redirige a /collection si no estás ya en esa página
    }
  };
  // Función para manejar el evento de presionar Enter en el input
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick(); // Llama a la función de redirección
    }
  };

  return (

    <div className='inline-flex items-center justify-center border border-gray-400 px-1 py-3 my-5 md:mx-3 rounded-full w-1/2 sm:w-full '>
        <input onKeyDown={handleKeyDown} value={search} onChange={(e)=>setSearch(e.target.value)} className='flex-1 outline-none bg-inherit text-sm w-full' type="text" placeholder=' Search'/>
        <img onClick={handleSearchClick} className='w-4 cursor-pointer hover:scale-110' src='/assets/search_icon.png'/>
    </div>
    
    
  
   
  ) 
}

export default SearchBarN