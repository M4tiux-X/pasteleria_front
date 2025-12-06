import React, { useState, useEffect } from "react";
import "../css/main.css";
import { useNavigate } from "react-router-dom";
import useBoletas from "../hooks/useBoleta";

function Boleta() {
    const [boletas, setBoletas] = useState([]);
    const navigate = useNavigate();

    const { obtenerBoletas, eliminarBoleta } = useBoletas();

    useEffect(() => {
        cargarBoletas();
    }, []);

    /**
     * Carga boletas y sus productos mediante id_pedido
     */
    const cargarBoletas = async () => {
        try {
            const response = await obtenerBoletas();
            const listaBoletas = Array.isArray(response.data) ? response.data : [];

            const boletasConProductos = await Promise.all(
                listaBoletas.map(async (boleta) => {
                    try {
                        const pedResp = await fetch(
                            `http://localhost:8080/api/pedido/${boleta.id_pedido}`
                        );
                        const pedido = await pedResp.json();

                        return {
                            id: boleta.id_boleta,                // Normalizamos ID
                            fecha: boleta.fec_emision,          // Normalizamos fecha
                            total: boleta.total,
                            medio_pago: boleta.medio_pago,
                            productos: pedido.productos || []   // Evita undefined
                        };
                    } catch (error) {
                        console.error(
                            `Error cargando pedido ${boleta.id_pedido}:`,
                            error
                        );
                        return {
                            id: boleta.id_boleta,
                            fecha: boleta.fec_emision,
                            total: boleta.total,
                            medio_pago: boleta.medio_pago,
                            productos: []
                        };
                    }
                })
            );

            setBoletas(boletasConProductos);
        } catch (error) {
            console.error("Error al obtener boletas:", error);
        }
    };

    /**
     * Eliminar una boleta
     */
    const borrarBoleta = async (id) => {
        const confirmar = window.confirm(`¿Eliminar la boleta #${id}?`);

        if (confirmar) {
            try {
                await eliminarBoleta(id); // el servicio ya usa id_boleta
                cargarBoletas();
            } catch (error) {
                console.error("Error al eliminar boleta:", error);
            }
        }
    };

    /**
     * Eliminar todas las boletas
     */
    const borrarTodasBoletas = async () => {
        const confirmar = window.confirm("¿Seguro que deseas borrar todas las boletas?");

        if (!confirmar) return;

        try {
            for (let boleta of boletas) {
                await eliminarBoleta(boleta.id);
            }
            cargarBoletas();
        } catch (error) {
            console.error("Error al borrar todas las boletas:", error);
        }
    };

    return (
        <main>
            <div className="contenedor-titulo">
                <h2 className="titulo-principal">Historial de Boletas</h2>

                <div className="admin-opciones">
                    <button
                        className="boton-admin"
                        onClick={() => navigate("/admin")}
                    >
                        Volver
                    </button>
                </div>

                {boletas.length > 0 && (
                    <button
                        className="boleta-borrar-todas"
                        onClick={borrarTodasBoletas}
                    >
                        Borrar todas
                    </button>
                )}
            </div>

            <section id="boletas-container" className="contenedor-boletas">
                {boletas.length === 0 ? (
                    <p>No hay boletas registradas.</p>
                ) : (
                    boletas.map((boleta) => (
                        <div key={boleta.id} className="boleta-container">
                            <div className="boleta-header">
                                <h3>Boleta #{boleta.id}</h3>
                                <button
                                    className="boleta-acciones-borrar"
                                    onClick={() => borrarBoleta(boleta.id)}
                                >
                                    Eliminar
                                </button>
                            </div>

                            <p className="boletas_letras">
                                <strong>Fecha:</strong> {boleta.fecha}
                            </p>

                            <table className="boleta-tabla">
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th>Cantidad</th>
                                        <th>Precio</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
    <tr>
        <td>ID Boleta:</td>
        <td>{boleta.id_boleta}</td>
    </tr>

    <tr>
        <td>ID Pedido:</td>
        <td>{boleta.id_pedido}</td>
    </tr>

    <tr>
        <td>Fecha Emisión:</td>
        <td>{boleta.fec_emision}</td>
    </tr>

    <tr>
        <td>Total:</td>
        <td>${boleta.total?.toLocaleString()}</td>
    </tr>

    <tr>
        <td>Impuestos:</td>
        <td>${boleta.impuestos?.toLocaleString()}</td>
    </tr>

    <tr>
        <td>Medio de Pago:</td>
        <td>{boleta.medio_pago}</td>
    </tr>
</tbody>
                            </table>

                            <p className="boleta-total">
                                <strong>Total:</strong> ${boleta.total.toLocaleString()}
                            </p>
                        </div>
                    ))
                )}
            </section>
        </main>
    );
}

export default Boleta;
