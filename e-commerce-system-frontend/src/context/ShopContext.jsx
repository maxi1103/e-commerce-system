import { createContext, useEffect, useState } from "react";
import { getAllProductos } from '../api/producto.api'

export const ShopContext = createContext();

    const ShopContextProvider = (props) => {
    // Estado para almacenar los productos
    const [productos, setProductos] = useState([]);
    const [search, setSearch] = useState('');
    const [showSearch,setShowSearch] = useState(true);

    // Función para obtener los productos desde la API
    const fetchProductos = async () => {
    try {
      const response = await getAllProductos();
      setProductos(response.data); // Guarda los productos en el estado
        } catch (error) {
        console.error("Error fetching productos:", error);
     }
    };

     // Llama a fetchProductos cuando el contexto se monte
     useEffect(() => {
        fetchProductos();
    }, []);

    // Valor compartido en el contexto
  const value = {
    productos, // Los productos estarán disponibles globalmente
    search,
    setSearch,
    showSearch,
    setShowSearch,
    fetchProductos, // También puedes exponer esta función si necesitas recargar los productos
  };
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider