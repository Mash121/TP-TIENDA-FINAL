import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ProductoDetalle = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    fetch(`https://68dbdb8c445fdb39dc26db9b.mockapi.io/productos/${id}`)
      .then(respuesta => respuesta.json())
      .then(dato => setProducto(dato))
      .catch(error => console.error("Error al cargar producto:", error));
  }, [id]);

  if (!producto) return <p>Cargando ......</p>;

  return (
    <>
      <h2>Detalles del Producto Nro {id}</h2>
      <img
        src={producto.imagen || producto.image}
        alt={producto.nombre || producto.title}
        width={100}
        height={100}
      />
      <h3>{producto.nombre || producto.title}</h3>
      <p>{producto.descripcion || producto.description}</p>
      <p><strong>Precio:</strong> ${producto.precio || producto.price}</p>
    </>
  );
};

export default ProductoDetalle;
