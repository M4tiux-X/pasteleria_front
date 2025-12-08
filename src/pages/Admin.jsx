import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";


const Admin = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    // Verificamos si hay usuario logueado
    const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));

    if (!usuarioLogueado) {
      // Si no hay sesión → redirigir al login
      navigate("/login");
      return;
    }

    if (usuarioLogueado.role !== "ADMIN") {
      // Si el rol no es ADMIN → redirigir al inicio
      alert("Acceso denegado: no tienes permisos de administrador.");
      navigate("/");
      return;
    }

    // Guardar datos del usuario en el estado
    setUsuario(usuarioLogueado);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("usuarioLogueado");
    navigate("/login");
  };

  if (!usuario) return null; // Evita mostrar la página antes de verificar el rol

  return (
    <main className="admin-body">
      <div className="admin-contenedor">
        <h1 className="titulo-principal">Panel de Administración</h1>
        <p className="info-pasteleria">Bienvenido, <strong>{usuario.username}</strong></p>
        

        <div className="admin-opciones">
          <button className="boton-admin" onClick={() => navigate("/boletas")}>
            Boletas/Recibos
          </button>
          <button className="boton-admin" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>

        <hr />

        <section className="admin-seccion">
          <h2 className="titulo-principal">Usuarios</h2>
          <p className="info-pasteleria">En esta sección podrás administrar los usuarios registrados.</p>

          {/* Ejemplo: lista de usuarios almacenados */}
          <ul className="lista-usuarios">
            {JSON.parse(localStorage.getItem("usuarios") || "[]").map((u, index) => (
              <li key={index}>
                <a className='info-usuario'><i className="bi bi-person-circle"></i> {u.username} — <strong className="rol-ususario">{u.role}</strong></a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
};

export default Admin;
