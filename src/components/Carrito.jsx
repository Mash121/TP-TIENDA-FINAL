import "./Carrito.css"; // 👈 agregamos el CSS

const Carrito = ({ productosEnCarrito, productosEliminados }) => {
  return (
    <div className="carrito-container">
      <h2 className="carrito-titulo">Tu Carrito</h2>

      {productosEnCarrito.length === 0 ? (
        <p className="carrito-vacio">No hay productos en el carrito</p>
      ) : (
        <div className="carrito-grid">
          {productosEnCarrito.map((producto, indice) => (
            <div key={indice} className="carrito-card">
              <img
                src={producto.image}
                alt={producto.title}
                className="carrito-imagen"
              />
              <h3 className="carrito-nombre">{producto.title}</h3>
              <p className="carrito-precio">${producto.price}</p>
              <button
                onClick={() => productosEliminados(indice)}
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
