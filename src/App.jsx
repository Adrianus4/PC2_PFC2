import { useState } from 'react';

export default function App() {
  const [page, setPage] = useState('login'); // login, user, manager
  const [loginName, setLoginName] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [comment, setComment] = useState('');

  const managerCred = { name: '123', pass: '123' };

  // LOGIN
  const handleLogin = () => {
    if (loginName === managerCred.name && loginPass === managerCred.pass) {
      setPage('manager');
      setLoginName('');
      setLoginPass('');
    } else {
      const user = users.find(u => u.name === loginName);
      if (user) {
        setCurrentUser(user);
        setPage('user');
        setLoginName('');
      } else {
        alert('Usuario o contraseña incorrecta');
      }
    }
  };

  // MANAGER FUNCTIONS
  const addUser = () => {
    const name = prompt('Nombre del nuevo usuario:');
    if (!name) return;
    if (users.some(u => u.name === name)) {
      alert('Usuario ya existe');
      return;
    }
    setUsers([...users, { name, tasks: [] }]);
  };

  const editUser = (index) => {
    const newName = prompt('Nuevo nombre del usuario:', users[index].name);
    if (!newName) return;
    setUsers(prev => {
      const copy = [...prev];
      copy[index].name = newName;
      return copy;
    });
  };

  const deleteUser = (index) => {
    if (!confirm('Eliminar usuario?')) return;
    setUsers(prev => prev.filter((_, i) => i !== index));
  };

  const addTask = (index) => {
    if (users[index].tasks.length >= 5) {
      alert('Máximo 5 tareas por usuario');
      return;
    }
    const taskName = prompt('Nombre de la tarea:');
    if (!taskName) return;
    setUsers(prev => {
      const copy = [...prev];
      copy[index].tasks.push({ name: taskName, done: false, comment: '' });
      return copy;
    });
  };

  const editTask = (uIdx, tIdx) => {
    const newName = prompt('Editar tarea:', users[uIdx].tasks[tIdx].name);
    if (!newName) return;
    setUsers(prev => {
      const copy = [...prev];
      copy[uIdx].tasks[tIdx].name = newName;
      return copy;
    });
  };

  const deleteTask = (uIdx, tIdx) => {
    if (!confirm('Eliminar tarea?')) return;
    setUsers(prev => {
      const copy = [...prev];
      copy[uIdx].tasks.splice(tIdx, 1);
      return copy;
    });
  };

  // USER FUNCTIONS
  const toggleDone = (tIdx) => {
    setCurrentUser(prev => {
      const copy = { ...prev };
      copy.tasks[tIdx].done = !copy.tasks[tIdx].done;
      return copy;
    });
    setUsers(prev => prev.map(u => u.name === currentUser.name ? currentUser : u));
  };

  const addComment = (tIdx) => {
    const newComment = prompt('Comentario:', currentUser.tasks[tIdx].comment || '');
    setCurrentUser(prev => {
      const copy = { ...prev };
      copy.tasks[tIdx].comment = newComment;
      return copy;
    });
    setUsers(prev => prev.map(u => u.name === currentUser.name ? currentUser : u));
  };

  // UI
  if (page === 'login') {
    return (
      <div style={{ padding: '20px' }}>
        <h1>Pantalla de Inicio</h1>
        <input placeholder='Nombre' value={loginName} onChange={e => setLoginName(e.target.value)} />
        <input placeholder='Contraseña' type='password' value={loginPass} onChange={e => setLoginPass(e.target.value)} />
        <button onClick={handleLogin}>Ingresar</button>
      </div>
    );
  }

  if (page === 'manager') {
    return (
      <div style={{ padding: '20px' }}>
        <h1>Panel Gestor</h1>
        <button onClick={() => setPage('login')}>Cerrar Sesión</button>
        <button onClick={addUser}>Agregar Usuario</button>
        <div style={{ marginTop: '20px' }}>
          {users.map((u, uIdx) => (
            <div key={uIdx} style={{ border: '1px solid gray', padding: '10px', marginBottom: '10px' }}>
              <h3>{u.name}</h3>
              <button onClick={() => editUser(uIdx)}>Editar Usuario</button>
              <button onClick={() => deleteUser(uIdx)}>Eliminar Usuario</button>
              <button onClick={() => addTask(uIdx)}>Agregar Tarea</button>
              <ul>
                {u.tasks.map((t, tIdx) => (
                  <li key={tIdx}>
                    {t.name} [{t.done ? '✔' : '✖'}]
                    <button onClick={() => editTask(uIdx, tIdx)}>Editar</button>
                    <button onClick={() => deleteTask(uIdx, tIdx)}>Eliminar</button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (page === 'user') {
    return (
      <div style={{ padding: '20px' }}>
        <h1>Panel Usuario: {currentUser.name}</h1>
        <button onClick={() => { setPage('login'); setCurrentUser(null); }}>Cerrar Sesión</button>
        <ul>
          {currentUser.tasks.map((t, tIdx) => (
            <li key={tIdx} style={{ marginBottom: '10px' }}>
              <strong>{t.name}</strong> [{t.done ? '✔' : '✖'}]
              <button onClick={() => toggleDone(tIdx)}>{t.done ? 'Desmarcar' : 'Completar'}</button>
              <button onClick={() => addComment(tIdx)}>Comentar</button>
              {t.comment && <p>Comentario: {t.comment}</p>}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return null;
}