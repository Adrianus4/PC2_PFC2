import { Link, useLocation } from 'react-router-dom';

export default function Dashboard() {
  const location = useLocation();
  const nombre = location.state?.nombre || 'Usuario';

  return (
    <div style={{ textAlign:'center', paddingTop:'50px', fontFamily: 'Arial, sans-serif', backgroundColor:'#f0f4f8', height:'100vh' }}>
      <h1 style={{ color:'#2b6cb0' }}>Bienvenido, {nombre}</h1>
      <Link to="/cultivos">
        <button style={{
          marginTop:'20px', padding:'15px 30px', backgroundColor:'#48bb78', color:'white',
          border:'none', borderRadius:'8px', cursor:'pointer', fontSize:'16px'
        }}>
          Mis Cultivos
        </button>
      </Link>
    </div>
  );
}
