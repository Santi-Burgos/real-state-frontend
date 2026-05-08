import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { LoginPage } from './pages/LoginPage.jsx'
import { MainAdminPage } from './pages/MainAdminPage.jsx'
import { Dashboard } from './features/Dashboard/Dashboard.jsx'
import { CustomerView } from './features/CustomerView/CustomerView.jsx'
import { useAuth } from './context/AuthContext.jsx'

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Navigate to="/admin" /> : <LoginPage />} />
      <Route path="/admin" element={isAuthenticated ? <MainAdminPage /> : <Navigate to="/" />}>
        <Route index element={<Dashboard />} />
        <Route path="customers" element={<CustomerView />} />
        <Route path="appointments" element={<div>Citas</div>} />
        <Route path="properties" element={<div>Propiedades</div>} />
        <Route path="tickets" element={<div>Tickets</div>} />
        <Route path="services" element={<div>Servicios</div>} />
        <Route path="settings" element={<div>Configuración</div>} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App
