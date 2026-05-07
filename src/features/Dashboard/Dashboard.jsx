import { useAuth } from "../../context/AuthContext.jsx";

export const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Dashboard</h1>
      <p>Bienvenido, {user?.username || "Usuario"}!</p>
      <p>Tu rol ID es: {user?.rolId}</p>
      <button 
        onClick={logout}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#a52422",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Cerrar Sesión
      </button>
    </div>
  );
};
