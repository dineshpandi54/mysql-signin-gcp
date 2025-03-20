import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import Home from './Home'
import Success from './Success'
import Cancel from './Cancel'

const App = () => {
  return (
   <BrowserRouter>
      <Routes>
      <Route index element={<Login/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/success' element={<Success/>}></Route>
        <Route path='/cancel' element={<Cancel/>}></Route>
      </Routes>
   </BrowserRouter>
  )
}

export default App