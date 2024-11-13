import react from 'react'
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Home from './pages/Home'
import Login from './pages/Login'

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home/>
          }
        />
        <Route path="/login" element={<Login></Login>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
