// src/hooks/useUsuarios.js

import useApi from "./useApi";
const URL = "http://localhost:8082/api/usuario";

export default function useUsuarios() {
    const api = useApi(URL);

    return {
        ...api,

        //  Obtener todos los usuarios
        obtenerUsuarios: () => api.get("/"),

        //  Obtener un usuario por ID
        obtenerUsuario: (id) => api.get(`/${id}`),

        //  Crear usuario nuevo
        crearUsuario: (body) => api.post("/", body),

        //  Actualizar usuario existente
        actualizarUsuario: (id, body) => api.put(`/${id}`, body),

        //  Eliminar usuario
        eliminarUsuario: (id) => api.remove(`/${id}`)
    };
}
