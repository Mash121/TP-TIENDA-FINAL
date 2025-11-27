import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  
  const { login } = useAuthContext();
  const navigate = useNavigate();
  
  const manejarSubmit = (evento) => {
    evento.preventDefault();

    // Validación simple
    if (usuario === 'martin' && contrasenia === '4268') {

      // Guarda usuario + rol en el AuthContext
      login(usuario);

      // Redirige al panel admin
      navigate('/admin');

      // Limpia los campos
      setUsuario('');
      setContrasenia('');

    } else {
      alert('Usuario o contraseña inválidos');
    }
  };

  return (
    <form onSubmit={manejarSubmit}>
      <h3>Iniciar Sesión</h3>

      <label>Usuario</label>
      <input
        type="text"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
      />

      <label>Contraseña</label>
      <input
        type="password"
        value={contrasenia}
        onChange={(e) => setContrasenia(e.target.value)}
      />

      <button type="submit">Iniciar Sesión</button>
    </form>
  );
};

export default Login;
