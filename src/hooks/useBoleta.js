// src/hooks/useBoletas.js

import useApi from "./useApi";

const URL = "http://localhost:8080/api/boleta";

export default function useBoletas() {
    const api = useApi(URL);

    return {
        // Estados base del hook
        ...api,

        // Obtener todas las boletas
        obtenerBoletas: () => api.get(""),

        // Obtener una boleta por ID
        obtenerBoleta: (id) => api.get(`/${id}`),

        // Crear una boleta
        crearBoleta: (body) => api.post("/", body),

        // Actualizar una boleta
        actualizarBoleta: (id, body) => api.put(`/${id}`, body),

        // Eliminar una boleta
        eliminarBoleta: (id) => api.remove(`/${id}`)
    };
}
