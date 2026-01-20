import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Register from './pages/register';
import Login from './pages/login';
import Profile from './components/profile';
import { useContext } from 'react';
import "./App.css"
import Nav from './components/nav';
import PrivateRoute from './PrivateRoute';


function App() {
  return (
    <AuthProvider>
      {/* <Nav/> */}
  
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        {/* Redirect any unknown path to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
