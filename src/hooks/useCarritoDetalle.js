// src/hooks/useCarritoDetalle.js

import useApi from "./useApi";
const URL = "http://localhost:8087/api/carrito_detalle";

export default function useCarritoDetalle() {
    const api = useApi(URL);

    return {
        ...api,

        //  Obtiene todos los productos dentro de un carrito

        //  Agrega un producto al carrito
        agregarProducto: (body) => api.post("/", body),

        //  Actualiza la cantidad de un producto dentro del carrito
        actualizarCantidad: (id, body) => api.put(`/${id}`, body),

        //  Elimina un producto del carrito
        eliminarDetalle: (id) => api.remove(`/${id}`)
    };
}
