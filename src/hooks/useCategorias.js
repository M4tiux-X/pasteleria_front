// src/hooks/useCategorias.js

import useApi from "./useApi";
const URL = "http://localhost:8085/api/categoria";

export default function useCategorias() {
    const api = useApi(URL);

    return {
        ...api,

        //  Obtener todas las categorías
        obtenerCategorias: () => api.get("/"),

        //  Obtener una categoría por ID
        obtenerCategoria: (id) => api.get(`/${id}`),

        //  Crear una nueva categoría
        crearCategoria: (body) => api.post("/", body),

        //  Actualizar una categoría existente
        actualizarCategoria: (id, body) => api.put(`/${id}`, body),

        //  Eliminar categoría
        eliminarCategoria: (id) => api.remove(`/${id}`)
    };
}
