// src/hooks/usePedidos.js

import useApi from "./useApi";
const URL = "http://localhost:8083/api/pedido";

export default function usePedidos() {
    const api = useApi(URL);

    return {
        ...api,

        //  Obtener todos los pedidos
        obtenerPedidos: () => api.get("/"),

        //  Obtener un pedido por ID
        obtenerPedido: (id) => api.get(`/${id}`),

        //  Crear un pedido
        crearPedido: (body) => api.post("/", body),

        //  Actualizar un pedido
        actualizarPedido: (id, body) => api.put(`/${id}`, body),

        //  Eliminar un pedido
        eliminarPedido: (id) => api.remove(`/${id}`)
    };
}
