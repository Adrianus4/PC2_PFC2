import { useState, useEffect } from 'react';
import { getCultivos, createCultivo } from '../services/api';

function Cultivos() {
  const [cultivos, setCultivos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [area, setArea] = useState('');
  const [costo, setCosto] = useState('');

  const fetchCultivos = async () => {
    const res = await getCultivos();
    setCultivos(res.data);
  };

  const handleAdd = async () => {
    if(nombre && area && costo){
      await createCultivo({ nombre, area: parseFloat(area), costo: parseFloat(costo) });
      setNombre(''); setArea(''); setCosto('');
      fetchCultivos();
    } else alert('Completa todos los campos');
  };

  useEffect(() => { fetchCultivos() }, []);

  return (
    <div style={{ textAlign:'center', marginTop:'30px' }}>
      <h2>Mis Cultivos</h2>
      <div style={{ marginBottom:'20px' }}>
        <input placeholder="Nombre" value={nombre} onChange={e=>setNombre(e.target.value)} />
        <input placeholder="Área" type="number" value={area} onChange={e=>setArea(e.target.value)} style={{ marginLeft:'5px' }}/>
        <input placeholder="Costo" type="number" value={costo} onChange={e=>setCosto(e.target.value)} style={{ marginLeft:'5px' }}/>
        <button onClick={handleAdd} style={{ marginLeft:'5px' }}>Agregar</button>
      </div>
      <ul>
        {cultivos.map((c, i) => (
          <li key={i}>{c.nombre} - {c.area} ha - S/ {c.costo}</li>
        ))}
      </ul>
    </div>
  );
}

export default Cultivos;
