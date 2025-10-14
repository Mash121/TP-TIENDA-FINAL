import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Productos.css"; // importamos el CSS

const Productos = ({ agregarProducto }) => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const URL = "https://fakestoreapi.com/products";

  useEffect(() => {
    fetch(URL)
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        setProductos(datos);
        setCargando(false);
      })
      .catch(() => {
        setError("Error al cargar productos");
        setCargando(false);
      });
  }, []);

  if (cargando) return <p className="mensaje">Cargando productos...</p>;
  if (error) return <p className="mensaje error">{error}</p>;

  return (
    <div className="productos-container">
      <h2 className="titulo">Productos</h2>

      <div className="grid-productos">
        {productos.map((producto) => (
          <div key={producto.id} className="card">
            <img
              src={producto.image}
              alt={producto.title}
              className="card-imagen"
            />
            <h3 className="card-titulo">{producto.title}</h3>
            <p className="card-precio">${producto.price}</p>

            <div className="card-botones">
              <button
                onClick={() => agregarProducto(producto)}
                className="btn-agregar"
              >
                Agregar
              </button>
              <Link to={`/productos/${producto.id}`} className="btn-detalles">
                Detalles
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productos;
