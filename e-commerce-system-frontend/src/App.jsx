import react from 'react'
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Home from './pages/Home'
import Login from './pages/Login'
import About from './pages/About'
import Nav from './components/Nav'
import Cart from './pages/Cart'
import Collection from './pages/Collection'
import Contact from './pages/Contact'
import Product from './pages/Product'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'

function App() {
  
  return (
    <BrowserRouter>
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
    <Nav/>
    <SearchBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/cart" element={<Cart/>}></Route>
        <Route path="/contact" element={<Contact/>}></Route>
        <Route path="/collection" element={<Collection/>}></Route>
        <Route path="/product/:productId" element={<Product/>}></Route>
        <Route path="/place-order" element={<PlaceOrder/>}></Route>
        <Route path="/orders" element={<Orders/>}></Route>
      </Routes>
      <Footer/>
    </div>
    </BrowserRouter>
  )
}

export default App
