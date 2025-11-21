import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Login() {
  const [nombre, setNombre] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if(nombre.trim()) navigate('/dashboard', { state: { nombre } });
    else alert('Ingresa tu nombre');
  };

  return (
    <div style={{ textAlign:'center', marginTop:'100px' }}>
      <h2>AgroLink Login</h2>
      <input 
        type="text" 
        placeholder="Nombre" 
        value={nombre} 
        onChange={e => setNombre(e.target.value)}
      />
      <button onClick={handleLogin}>Ingresar</button>
    </div>
  );
}

export default Login;
