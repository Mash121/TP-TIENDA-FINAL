import { useAuthContext } from "../context/AuthContext";
import Productos from "../components/Productos";

const Inicio = () => {
  const { agregarAlCarrito } = useAuthContext();

  return (
    <>
      <Productos agregarProducto={agregarAlCarrito} />
    </>
  );
};

export default Inicio;
