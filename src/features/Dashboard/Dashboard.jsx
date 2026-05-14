import { useAuth } from "../../context/AuthContext.jsx";
import { ViewHeader } from "../../ui/ViewHeader/ViewHeader";

export const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: "40px" }}>
      <ViewHeader
        breadcrumb="admin > dashboard"
        title="Dashboard"
        description={`Bienvenido, ${user?.username || "Usuario"}! Aquí tienes un resumen de tu inmobiliaria.`}
      />
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
