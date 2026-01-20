import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../styles/profile.css';

export default function Profile() {
  const { user, setUser } = useContext(AuthContext);

  const logout = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (res.ok) setUser(null);
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  if (!user)
    return (
      <div className="profile-wrapper">
        <div className="profile-card">
          <p>You are not logged in.</p>
        </div>
      </div>
    );

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        <h2>Welcome, {user.name}</h2>
        <p>Email: {user.email}</p>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}
