import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Carrito from './components/Carrito';
import Inicio from './pages/Inicio';
import Moda from './pages/Moda';
import Tecnologia from './pages/Tecnologia';
import ProductoDetalle from './pages/ProductoDetalle';

function App() {

  const iniciarSesion = () => setEstaAutenticado(true);
  const cerrarSesion = () => setEstaAutenticado(false);

  return (
    <>
      <Header/>
      
      <Routes> 
        <Route path='/' element={<Inicio />}/> 
        <Route path='/moda' element={<Moda />}/> 
        <Route path='/tecnologia' element={<Tecnologia />}/> 
        <Route path='/productos/:id' element={<ProductoDetalle />}/>
        <Route path='/carrito' element={<Carrito />} />
      </Routes> 
      
      <Footer/>     
    </>
  )
}

export default App;