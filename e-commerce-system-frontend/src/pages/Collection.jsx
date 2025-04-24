import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import ProductoItem from '../components/ProductoItem';

const Collection = () => {
  const { productos, search } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts,setFilterProducts] = useState([]);
  const [category, setCategory]=useState([]);
  const [subCategory, setSubCategory]=useState([]);
  const [sortType, setSortType]=useState('relevante');

  
  // Filtrar Productos por categoria y subcategoria
  const toggleCategory = (e) =>{
    const value = parseInt(e.target.value, 10);
    if(category.includes(value)){
      setCategory((prev)=> prev.filter(item=>item !== value))
    }
    else{
      setCategory((prev) => [...prev,value])
    }
  }
  const toggleSubCategory = (e) =>{
    const value = parseInt(e.target.value, 10);
    if(subCategory.includes(value)){
      setSubCategory((prev)=> prev.filter(item=>item !== value))
    }
    else{
      setSubCategory((prev) => [...prev,value])
    }
  }
  //aplicar filtros
  const aplyFilter = () =>{
    
    let productsCopy= productos.slice();
    if( search ) {
      productsCopy = productsCopy.filter((item) => item.nombre.toLowerCase().includes(search.toLowerCase()));
    }

    if (category.length > 0){
      productsCopy = productsCopy.filter((item) => category.includes(item.categoria));
    }
    if (subCategory.length > 0){
      productsCopy = productsCopy.filter((item) => subCategory.includes(item.subCategoria));
    }
    console.log(productsCopy);
    setFilterProducts(productsCopy); 
  }

  const sortProduct = () => {
    let ftCopy = filterProducts.slice();

    switch(sortType){
      case 'menor-mayor':
        setFilterProducts(ftCopy.sort((a,b)=>(a.precio - b.precio)));
        break;
      case 'mayor-menor':
        setFilterProducts(ftCopy.sort((a,b)=>(b.precio - a.precio)));
        break;                                                
      default: 
        aplyFilter();
        break;
    }

  }

  // Inicializar productos visibles cuando 'productos' cambie
  useEffect(() => {
    if (productos.length > 0) {
      setFilterProducts(productos);
    }
  }, [productos]);
  useEffect(()=>{
    aplyFilter();
  },[category,subCategory,search])
  useEffect(()=>{
    sortProduct();
  },[sortType])
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filter*/}
      <div className='min-w-60 '>
        <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTROS
          <img  className={`h-3 sm:hidden ${showFilter ? 'rotate-90':''}`} src="/assets/dropdown_icon.png" />
        </p>
        {/*Categorias */}
        <div className={`border border-gray-300 pl-5 py-5 mt-6 ${showFilter ? '':'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIAS</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={1} onChange={toggleCategory}/> Men
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={2} onChange={toggleCategory}/> Women
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={3} onChange={toggleCategory}/> Kids
            </p>
          </div> 
        </div>
        {/*SubCategorias */}
        <div className={`border border-gray-300 pl-5 py-5 my-5 ${showFilter ? '':'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TIPOS</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={1} onChange={toggleSubCategory}/> Ropa Superior
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={2} onChange={toggleSubCategory}/> Ropa Inferior
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={3} onChange={toggleSubCategory}/> Ropa de Invierno
            </p>
          </div> 
        </div>

      </div>

      {/*Products */}
      <div className='flex-1 '>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'NUESTRA'} text2={'COLLECIÓN'}/>
          <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relevante">Odernar por: Relevante</option>
            <option value="menor-mayor">Odernar por: Menor a Mayor</option>
            <option value="mayor-menor">Odernar por: Mayor a Menor</option>
          </select>
        </div>
        { /* Mapear Productos */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProducts.map((item,index)=>(
              <ProductoItem key={index} name={item.nombre} id={item.id} price={item.precio} image={item.imagenes} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Collection