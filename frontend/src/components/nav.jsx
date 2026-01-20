import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Nav() {
  const { user } = useContext(AuthContext);

  return (
    <nav style={{ textAlign: 'center', marginBottom: '20px' }}>
      {user ? (
        <>
          <Link to="/profile" style={{ margin: '0 10px' }}>Profile</Link>
        </>
      ) : (
        <>
          <Link to="/login" style={{ margin: '0 10px' }}>Login</Link>
          <Link to="/register" style={{ margin: '0 10px' }}>Register</Link>
        </>
      )}
    </nav>
  );
}
