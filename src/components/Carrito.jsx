import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import "./Carrito.css";

const Carrito = () => {
  const { carrito, eliminarDelCarrito } = useContext(CarritoContext);

  return (
    <div className="carrito-container">
      <h2 className="carrito-titulo">🛒 Tu Carrito</h2>

      {carrito.length === 0 ? (
        <p className="carrito-vacio">No hay productos en el carrito</p>
      ) : (
        <div className="carrito-grid">
          {carrito.map((producto, indice) => (
            <div key={indice} className="carrito-card">
              <img
                src={producto.imagen}   // 👈 nombres corregidos
                alt={producto.nombre}
                className="carrito-imagen"
              />
              <h3 className="carrito-nombre">{producto.nombre}</h3>
              <p className="carrito-precio">${producto.precio}</p>
              <button
                onClick={() => eliminarDelCarrito(indice)}
                className="carrito-eliminar"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Carrito;
