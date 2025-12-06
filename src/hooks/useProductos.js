// src/hooks/useProductos.js

import useApi from "./useApi";
const URL = "http://localhost:8080/api/productos";

export default function useProductos() {
    const api = useApi(URL);

    return {
        ...api,

        //  Obtener todos los productos
        obtenerProductos: () => api.get(""),

        //  Obtener un producto por ID
        obtenerProducto: (id) => api.get(`/${id}`),

        //  Crear un nuevo producto
        crearProducto: (body) => api.post("/", body),

        //  Actualizar un producto
        actualizarProducto: (id, body) => api.put(`/${id}`, body),

        //  Eliminar un producto
        eliminarProducto: (id) => api.remove(`/${id}`)
    };
}

