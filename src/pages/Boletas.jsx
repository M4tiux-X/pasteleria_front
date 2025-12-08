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

    const cargarBoletas = async () => {
        try {
            const response = await obtenerBoletas();

            const listaBoletas = Array.isArray(response) ? response : [];

            const boletasConProductos = await Promise.all(
                listaBoletas.map(async (boleta) => {

                    let pedido = { productos: [] };
                    try {
                        const pedResp = await fetch(`http://localhost:8080/api/pedido/${boleta.id_pedido}`);
                        pedido = await pedResp.json();
                    } catch (e) {
                        console.error("Error cargando pedido", e);
                    }

                    return {
                        id: boleta.id_boleta,
                        id_pedido: boleta.id_pedido,
                        fecha: boleta.fec_emision,
                        total: boleta.total,
                        medio_pago: boleta.medio_pago,
                        impuestos: boleta.impuestos,
                        productos: pedido.productos ?? []
                    };
                })
            );

            setBoletas(boletasConProductos);

        } catch (error) {
            console.error("Error al obtener boletas:", error);
        }
    };

    const borrarBoleta = async (id) => {
        const confirmar = window.confirm(`¿Eliminar la boleta #${id}?`);

        if (!confirmar) return;

        try {
            await eliminarBoleta(id);
            cargarBoletas();
        } catch (error) {
            console.error("Error al eliminar boleta:", error);
        }
    };

    const borrarTodasBoletas = async () => {
        if (!window.confirm("¿Seguro que deseas borrar todas las boletas?")) return;

        for (const boleta of boletas) {
            await eliminarBoleta(boleta.id);
        }
        cargarBoletas();
    };

    return (
        <main>
            <div className="contenedor-titulo">
                <h2 className="titulo-principal">Historial de Boletas</h2>

                <div className="admin-opciones">
                    <button className="boton-admin" onClick={() => navigate("/admin")}>
                        Volver
                    </button>
                </div>

                {boletas.length > 0 && (
                    <button className="boleta-borrar-todas" onClick={borrarTodasBoletas}>
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
                                <tbody>
                                    <tr><td>ID Pedido:</td><td>{boleta.id_pedido}</td></tr>
                                    <tr><td>Total:</td><td>${boleta.total?.toLocaleString()}</td></tr>
                                    <tr><td>Impuestos:</td><td>${boleta.impuestos?.toLocaleString()}</td></tr>
                                    <tr><td>Medio de Pago:</td><td>{boleta.medio_pago}</td></tr>
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
