import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8000';

export default function Cultivos() {
  const [cultivos, setCultivos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [area, setArea] = useState('');
  const [costo, setCosto] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/cultivos`);
        setCultivos(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleAdd = async () => {
    if (!nombre || !area || !costo) {
      alert('Completa todos los campos');
      return;
    }

    try {
      await axios.post(`${API_URL}/cultivos`, {
        nombre, area: parseFloat(area), costo: parseFloat(costo)
      });
      setNombre(''); setArea(''); setCosto('');
      const res = await axios.get(`${API_URL}/cultivos`);
      setCultivos(res.data);
    } catch (error) {
      console.error(error);
      alert('Error al agregar cultivo');
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor:'#f0f4f8', minHeight:'100vh', padding:'40px' }}>
      <h1 style={{ textAlign:'center', color:'#2b6cb0' }}>Mis Cultivos</h1>
      <div style={{
        display:'flex', justifyContent:'center', gap:'10px', marginBottom:'30px',
        flexWrap:'wrap', background:'white', padding:'20px', borderRadius:'10px', boxShadow:'0 4px 12px rgba(0,0,0,0.1)'
      }}>
        <input type="text" placeholder="Nombre" value={nombre} onChange={e=>setNombre(e.target.value)} style={{ padding:'10px', borderRadius:'5px', border:'1px solid #ccc' }} />
        <input type="number" placeholder="Área (ha)" value={area} onChange={e=>setArea(e.target.value)} style={{ padding:'10px', borderRadius:'5px', border:'1px solid #ccc' }} />
        <input type="number" placeholder="Costo (S/)" value={costo} onChange={e=>setCosto(e.target.value)} style={{ padding:'10px', borderRadius:'5px', border:'1px solid #ccc' }} />
        <button onClick={handleAdd} style={{ padding:'10px 20px', backgroundColor:'#48bb78', color:'white', border:'none', borderRadius:'5px', cursor:'pointer' }}>Agregar</button>
      </div>

      <div style={{ display:'flex', justifyContent:'center' }}>
        <ul style={{ listStyle:'none', padding:0, width:'400px', background:'white', borderRadius:'10px', boxShadow:'0 4px 12px rgba(0,0,0,0.1)', padding:'20px' }}>
          {cultivos.length === 0 ? (
            <li style={{ textAlign:'center', color:'#718096' }}>No hay cultivos registrados</li>
          ) : (
            cultivos.map((c, i) => (
              <li key={i} style={{ padding:'10px 0', borderBottom:'1px solid #eee' }}>
                <strong>{c.nombre}</strong> - {c.area} ha - S/ {c.costo}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
