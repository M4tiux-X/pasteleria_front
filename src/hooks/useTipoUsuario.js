// src/hooks/useTipoUsuario.js

import useApi from "./useApi";
const URL = "http://localhost:8081/api/tipo_usuario";

export default function useTipoUsuario() {
    const api = useApi(URL);

    return {
        ...api,

        //  Obtener todos los tipos de usuario
        obtenerTipos: () => api.get("/"),

        //  Obtener un tipo por ID
        obtenerTipo: (id) => api.get(`/${id}`),

        //  Crear un tipo de usuario
        crearTipo: (body) => api.post("/", body),

        //  Actualizar un tipo de usuario
        actualizarTipo: (id, body) => api.put(`/${id}`, body),

        //  Eliminar un tipo de usuario
        eliminarTipo: (id) => api.remove(`/${id}`)
    };
}
