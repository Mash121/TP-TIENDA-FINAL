import { useState, useEffect } from "react";
import FormProducto from "./FormProducto";
import EditarProducto from "./EditarProducto";
import styles from './GestionProducto.module.css';
import CirclePlus from "../assets/CirclePlus";

const GestionProductos = () => {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [cargando, setCargando] = useState(true);

  const API = 'https://68dbdb8c445fdb39dc26db9b.mockapi.io/productos';

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      setCargando(true);
      const respuesta = await fetch(API);
      const datos = await respuesta.json();
      setProductos(datos);
    } catch (error) {
      console.error("Error al cargar productos:", error);
      alert("Error al cargar los productos");
    } finally {
      setCargando(false);
    }
  };

  const cerrarFormulario = () => {
    setMostrarFormulario(false);
    setProductoSeleccionado(null);
  };

  const seleccionarProducto = (producto) => {
    setProductoSeleccionado(producto);
    setMostrarFormulario(true);
  };

  const agregarProducto = async (producto) => {
    try {
      const respuesta = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto)
      });

      if (!respuesta.ok) throw new Error("Error al agregar el producto");

      const datos = await respuesta.json();
      alert("Producto agregado correctamente");

      setProductos([...productos, datos]);
      cerrarFormulario();

    } catch (error) {
      console.error(error.message);
      alert("Hubo un problema al agregar el producto.");
    }
  };

  const eliminarProducto = async (id) => {
    const confirmar = window.confirm("¿Estás seguro de eliminar?");

    if (!confirmar) return;

    try {
      const respuesta = await fetch(`${API}/${id}`, { method: "DELETE" });

      if (!respuesta.ok) throw new Error("Error al eliminar");

      setProductos(productos.filter(p => p.id !== id));
    } catch (error) {
      console.error(error.message);
      alert("Hubo un problema al eliminar el producto.");
    }
  };

  const actualizarProducto = (productoActualizado) => {
    setProductos(
      productos.map((p) =>
        p.id === productoActualizado.id ? productoActualizado : p
      )
    );
    cerrarFormulario();
  };

  if (cargando) return <div>Cargando productos...</div>;

  return (
    <div className={styles.container}>

      {/* LISTA DE PRODUCTOS */}
      <div className={styles.panel}>

        <div
          className={styles.botonAgregarProducto}
          onClick={() => {
            setMostrarFormulario(true);
            setProductoSeleccionado(null);
          }}
        >
          <CirclePlus />
          <p>Agregar Producto</p>
        </div>

        {productos.map((producto) => (
          <div
            key={producto.id}
            onClick={() => seleccionarProducto(producto)}
            className={styles.productoItem}
          >
            <img className={styles.imagen} src={producto.imagen} />

            <h3>{producto.nombre}</h3>
            <p>Precio: ${producto.precio}</p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                eliminarProducto(producto.id);
              }}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>

      {/* FORMULARIO */}
      <div className={styles.panel}>

        {mostrarFormulario && !productoSeleccionado && (
          <FormProducto
            onAgregar={agregarProducto}
            cerrarFormulario={cerrarFormulario}
          />
        )}

        {mostrarFormulario && productoSeleccionado && (
          <EditarProducto
            productoSeleccionado={productoSeleccionado}
            onActualizar={actualizarProducto}
            cerrarFormulario={cerrarFormulario}
          />
        )}

      </div>
    </div>
  );
};

export default GestionProductos;
