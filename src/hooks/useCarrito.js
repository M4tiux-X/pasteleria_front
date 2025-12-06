// src/hooks/useCarrito.js

import useApi from "./useApi";

const URL = "http://localhost:8080/api/carrito";

export default function useCarrito() {
    const api = useApi(URL);

    return {
        // Estados base
        ...api,

        // Obtener carrito por ID de usuario
        obtenerCarritoUsuario: (idUsuario) => api.get(`/usuario/${idUsuario}`),

        // Obtener un carrito por ID
        obtenerCarrito: (id) => api.get(`/${id}`),

        // Crear carrito
        crearCarrito: (body) => api.post("/", body),

        // Actualizar carrito
        actualizarCarrito: (id, body) => api.put(`/${id}`, body),

        // Eliminar carrito
        eliminarCarrito: (id) => api.remove(`/${id}`)
    };
}
