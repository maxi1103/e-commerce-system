import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ShopContextProvider from "./context/ShopContext";
import App from './App.jsx'
import './index.css'
createRoot(document.getElementById('root')).render(
  <ShopContextProvider>
    <App />
  </ShopContextProvider>,
)
