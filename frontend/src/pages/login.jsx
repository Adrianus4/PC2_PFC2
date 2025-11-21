import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [nombre, setNombre] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if(nombre.trim()) navigate('/dashboard', { state: { nombre } });
    else alert('Ingresa tu nombre');
  };

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      height: '100vh', backgroundColor: '#f0f4f8', fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#2b6cb0' }}>AgroLink</h1>
      <div style={{ background: 'white', padding: '40px', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <h2 style={{ marginBottom: '20px', color: '#1a202c' }}>Login</h2>
        <input 
          type="text" 
          placeholder="Nombre" 
          value={nombre} 
          onChange={e => setNombre(e.target.value)}
          style={{ padding: '10px', width: '200px', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '15px' }}
        />
        <br/>
        <button 
          onClick={handleLogin} 
          style={{ padding: '10px 20px', backgroundColor: '#2b6cb0', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Ingresar
        </button>
      </div>
    </div>
  );
}
