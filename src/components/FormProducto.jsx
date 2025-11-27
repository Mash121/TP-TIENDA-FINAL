import { useState } from "react";
import styles from "./FormProducto.module.css";

const FormProducto = ({ onAgregar, cerrarFormulario }) => {

  const [producto, setProducto] = useState({
    nombre: "",
    precio: "",
    imagen: ""
  });

  const manejarCambio = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };

  const manejarSubmit = (e) => {
    e.preventDefault();
    onAgregar(producto);
  };

  return (
    <form className={styles.form} onSubmit={manejarSubmit}>
      
      <h2 className={styles.titulo}>Agregar Producto</h2>

      <div className={styles.inputGroup}>
        <label>Nombre</label>
        <input
          type="text"
          name="nombre"
          value={producto.nombre}
          onChange={manejarCambio}
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <label>Precio</label>
        <input
          type="number"
          name="precio"
          value={producto.precio}
          onChange={manejarCambio}
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <label>Imagen (URL)</label>
        <input
          type="text"
          name="imagen"
          value={producto.imagen}
          onChange={manejarCambio}
          required
        />
      </div>

      <div className={styles.buttons}>
        <button className={styles.botonGuardar} type="submit">
          Agregar
        </button>

        <button
          className={styles.botonCancelar}
          type="button"
          onClick={cerrarFormulario}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default FormProducto;
