import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { Login } from './features/Login/Login.jsx'
import { LoginPage } from './pages/LoginPage.jsx'
import { MainAdminPage } from './pages/MainAdminPage.jsx'

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} />
      <Route path="/dashboard" element={<MainAdminPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App
