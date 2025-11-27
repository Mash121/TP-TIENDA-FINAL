import { useContext, useState, createContext, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [carrito, setCarrito] = useState([]);

  // --- REVISAR SESIÓN GUARDADA ---
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const nombreUsuario = token.replace("fake-token-", "");

      const rol = nombreUsuario === "martin" ? "admin" : "user";

      setUsuario({
        nombre: nombreUsuario,
        rol: rol,
      });
    }
  }, []);

  // --- LOGIN ---
  const login = (nombreUsuario) => {
    const token = `fake-token-${nombreUsuario}`;
    localStorage.setItem("authToken", token);

    const rol = nombreUsuario === "martin" ? "admin" : "user";

    setUsuario({
      nombre: nombreUsuario,
      rol: rol,
    });
  };

  // --- LOGOUT ---
  const logout = () => {
    localStorage.removeItem("authToken");
    setUsuario(null);
    setCarrito([]);
  };

  // --- CARRITO ---
  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => [...prev, producto]);
  };

  const eliminarDelCarrito = (idProducto) =>
    setCarrito((prev) => prev.filter((p) => p.id !== idProducto));

  return (
    <AuthContext.Provider
      value={{
        usuario,
        login,
        logout,
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
