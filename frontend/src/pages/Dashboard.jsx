import { Link, useLocation } from 'react-router-dom';

function Dashboard() {
  const location = useLocation();
  const nombre = location.state?.nombre || 'Usuario';

  return (
    <div style={{ textAlign:'center', marginTop:'50px' }}>
      <h2>Bienvenido, {nombre}</h2>
      <Link to="/cultivos">
        <button style={{ marginTop:'20px', padding:'10px 20px' }}>Mis Cultivos</button>
      </Link>
    </div>
  );
}

export default Dashboard;
