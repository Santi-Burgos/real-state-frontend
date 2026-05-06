import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { Login } from './features/Login/Login.jsx'
import { LoginPage } from './pages/LoginPage.jsx'
import { MainAdminPage } from './pages/MainAdminPage.jsx'
import { Dashboard } from './features/Dashboard/Dashboard.jsx'
import { CustomerView } from './features/CustomerView/CustomerView.jsx'

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Navigate to="/admin" /> : <LoginPage />} />
        <Route path="/admin" element={isAuthenticated ? <MainAdminPage /> : <Navigate to="/" />}>
          <Route index element={<Dashboard />} />
          <Route path="customers" element={<CustomerView />} />
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
