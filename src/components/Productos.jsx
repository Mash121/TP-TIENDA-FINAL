import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CarritoContext } from '../context/CarritoContext';
import './Productos.css'; 
const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const { agregarAlCarrito } = useContext(CarritoContext);

  const URL = 'https://68dbdb8c445fdb39dc26db9b.mockapi.io/productos';

  useEffect(() => {
    fetch(URL)
      .then((respuesta) => {
        if (!respuesta.ok) throw new Error('Error al conectar con el servidor');
        return respuesta.json();
      })
      .then((datos) => setProductos(datos))
      .catch(() => setError('Error al cargar productos'))
      .finally(() => setCargando(false));
  }, []);

  if (cargando) return <p className="mensaje">Cargando productos...</p>;
  if (error) return <p className="mensaje error">{error}</p>;

  return (
    <div className="productos-container">
      <h2 className="titulo">Productos</h2>

      <div className="grid-productos">
        {Array.isArray(productos) && productos.length > 0 ? (
          productos.map((producto) => (
            <div key={producto.id} className="card">
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="card-imagen"
              />
              <h3 className="card-titulo">{producto.nombre}</h3>
              <p className="card-precio">${producto.precio}</p>
              <div className="card-botones">
                <button
                  className="btn-agregar"
                  onClick={() => agregarAlCarrito(producto)}
                >
                  Agregar
                </button>
                <Link to={`/productos/${producto.id}`} className="btn-detalles">
                  Detalles
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="mensaje">No hay productos disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default Productos;
