// src/hooks/useDescuentos.js

import useApi from "./useApi"; 
const URL = "http://localhost:8084/api/descuento";

export default function useDescuentos() {
    const api = useApi(URL);

    return {
        ...api,

        //  Obtener todos los descuentos
        obtenerDescuentos: () => api.get("/"),

        //  Obtener un descuento por ID
        obtenerDescuento: (id) => api.get(`/${id}`),

        //  Crear un nuevo descuento
        crearDescuento: (body) => api.post("/", body),

        //  Actualizar un descuento existente
        actualizarDescuento: (id, body) => api.put(`/${id}`, body),

        //  Eliminar un descuento
        eliminarDescuento: (id) => api.remove(`/${id}`)
    };
}
