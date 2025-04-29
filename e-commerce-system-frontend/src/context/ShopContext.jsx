import { createContext, useEffect, useState } from "react";
import { getAllProductos } from '../api/producto.api';
import { toast } from "react-toastify";

export const ShopContext = createContext();

    const ShopContextProvider = (props) => {
    // Estado para almacenar los productos
    const [productos, setProductos] = useState([]);
    const [search, setSearch] = useState('');
    const [showSearch,setShowSearch] = useState(true);
    const [cartItems, setCartItems] = useState([]);

    // Función para obtener los productos desde la API
    const fetchProductos = async () => {
    try {
      const response = await getAllProductos();
      setProductos(response.data); // Guarda los productos en el estado
        } catch (error) {
        console.error("Error fetching productos:", error);
     }
    };

    const addToCart = async (itemId,size) => {
      if(!size){
        toast.error('Seleccione una medida del producto', {position: 'bottom-right'});
        return;
      }else{
        toast.success('Producto agregado al carrito', {position: 'bottom-right'});
      }
      let cartData = structuredClone(cartItems);

      if(cartData[itemId]){
        if(cartData[itemId][size]){
          cartData[itemId][size] += 1;
        }
        else{
          cartData[itemId][size] = 1;
        }
      }
      else {
        cartData[itemId] = {};
        cartData[itemId][size] = 1;
      }

      setCartItems(cartData);
    }

    //contar items del carrito
    const getCartCount = () => {
      let totalCount= 0 ;
      for(const items in cartItems){
        for(const item in cartItems[items]){
          try {
            if(cartItems[items][item]){
              totalCount += cartItems[items][item];
            }
          } catch (error) {

          }
        }
      }
      return totalCount;
    }

    const updateQuantity= async (itemId,size,quantity) =>{
      let cartData = structuredClone(cartItems);
      cartData[itemId][size]= quantity;
      setCartItems(cartData);
    }

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
    cartItems,
    getCartCount,
    addToCart,
    updateQuantity,
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