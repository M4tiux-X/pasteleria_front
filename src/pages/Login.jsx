import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState("USUARIO");
  const [mensajeRegistro, setMensajeRegistro] = useState("");

  // --- LOGIN ---
  const handleLogin = (e) => {
    e.preventDefault();

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioEncontrado = usuarios.find(
      (u) => u.username === username && u.password === password
    );

    if (usuarioEncontrado) {
      localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioEncontrado));
      setMensaje(`Bienvenido ${username} (${usuarioEncontrado.role})`);

      setTimeout(() => {
        if (usuarioEncontrado.role === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }, 1000);
    } else {
      setMensaje("Usuario o contraseña incorrectos");
      setTimeout(() => setMensaje(""), 2000);
    }
  };

  // --- REGISTRO ---
  const handleRegistro = (e) => {
    e.preventDefault();

    if (!newUsername || !newPassword) {
      setMensajeRegistro("Debes ingresar usuario y contraseña.");
      setTimeout(() => setMensajeRegistro(""), 2000);
      return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    if (usuarios.some((u) => u.username === newUsername)) {
      setMensajeRegistro("El usuario ya existe.");
      setTimeout(() => setMensajeRegistro(""), 2000);
      return;
    }

    usuarios.push({ username: newUsername, password: newPassword, role: newRole });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    setMensajeRegistro(`Usuario registrado correctamente como ${newRole}`);
    setNewUsername("");
    setNewPassword("");
    setNewRole("USUARIO");

    setTimeout(() => setMensajeRegistro(""), 2000);
  };


  return (
    <main className="login-body">
      <div className="login-contenedor">
        <h2 className="titulo-principal">Iniciar Sesión</h2>
        <form className="form-login" onSubmit={handleLogin}>
          <input
            className="input-login"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Usuario"
            required
          />
          <input
            className="input-login"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
          />
          <button className="boton-ingresar" type="submit">
            Ingresar
          </button>
        </form>
        <p className="mensaje">{mensaje}</p>

        <hr />

        <h3 className="titulo-principal">Registrarse</h3>
        <form className="form-login" onSubmit={handleRegistro}>
          <input
            className="input-login"
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            placeholder="Nuevo Usuario"
            required
          />
          <input
            className="input-login"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Nueva Contraseña"
            required
          />
          <select
            className="input-login"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
          >
            <option value="USUARIO">Usuario</option>
            <option value="ADMIN">Administrador</option>
          </select>
          <button className="boton-ingresar" type="submit">
            Registrar
          </button>
        </form>
        <p className="mensaje">{mensajeRegistro}</p>
      </div>
    </main>
  );
};
export default Login;
