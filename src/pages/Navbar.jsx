import '../css/main.css'
import { useState, useEffect } from "react";
import React from 'react';



const calcularNumerito = () => {
    const productosEnCarritoLS = localStorage.getItem("productos-en-carrito");
    let productos = [];
    if (productosEnCarritoLS) {
        try {
            productos = JSON.parse(productosEnCarritoLS);
        } catch (error) {
            console.error("Error al parsear el carrito desde localStorage:", error);
            productos = [];
        }
    }
    return productos.reduce((acc, producto) => acc + (producto.cantidad || 0), 0);
};

function Navbar(){
    const [numerito, setNumerito] = useState(calcularNumerito());
    useEffect(() => {
        // Función que actualiza el estado 'numerito'
        const actualizarNumerito = () => {
            setNumerito(calcularNumerito());
        };

        // 1. Escuchar el evento 'storage' para cambios externos (ej. desde otra pestaña/ventana)
        window.addEventListener('storage', actualizarNumerito);

        // 2. Crear un observador de cambios en 'localStorage' (ya que el evento 'storage' no funciona para la misma pestaña)
        // La lógica de 'main.js' y 'carrito.js' DEBE llamar a una función para actualizar el 'numerito'
        // después de cada acción (agregar, eliminar, vaciar).
        
        // La forma más simple, asumiendo que tu JS externo actualiza el 'numerito' en el DOM:
        const observerTarget = document.getElementById("numerito");
        if (observerTarget) {
            const observer = new MutationObserver(actualizarNumerito);
            // Observar solo cambios en el contenido de texto
            observer.observe(observerTarget, { childList: true, subtree: true, characterData: true });

            // Limpieza al desmontar
            return () => {
                window.removeEventListener('storage', actualizarNumerito);
                observer.disconnect();
            };
        }
        
        // Si no se encuentra el elemento, limpiamos solo el listener de storage
        return () => {
            window.removeEventListener('storage', actualizarNumerito);
        };

    }, []);

    return(
        <div className="wrapper">
        <aside>
            <header>
                <h1 className="logo">Pasteleria Mil Sabores</h1>
            </header>
            <nav>
                <ul className="menu">
                    <li>
                        <a href="/"> <button id="todos" className="boton-menu boton-categoria"><i className="bi bi-caret-right-fill"></i> Productos </button></a>
                    </li>
                    <li>
                        <button id="torta" className="boton-menu boton-categoria"><i className="bi bi-caret-right"></i> Tortas</button>
                    </li>
                    <li>
                        <button id="alternativos" className="boton-menu boton-categoria"><i className="bi bi-caret-right"></i> Productos Alternativos</button>
                    </li>
                    <li>
                        <button id="individuales" className="boton-menu boton-categoria"><i className="bi bi-caret-right"></i> Individuales</button>
                    </li>
                    <li>
                        <button id="especiales" className="boton-menu boton-categoria"><i className="bi bi-caret-right"></i> Especiales</button>
                    </li>
                    <li>
                        <a href="/nosotros"> <button id="nostros" className="boton-menu boton-categoria"><i className="bi bi-caret-right"></i>Nosotros</button></a>
                    </li>
                    <li>
                        <button id="contacto" className="boton-menu boton-categoria"><i className="bi bi-caret-right"></i><a href="/contacto">Contacto</a></button>
                    </li>
                    <li>
                        <button id="noticias" className="boton-menu boton-categoria"><i className="bi bi-caret-right"></i><a href="/blogs">Noticias</a></button>
                    </li>
                    <li>
                        <a href="/login"> <button id="login" className="boton-menu boton-categoria"><i className="bi bi-person-fill"></i> Login</button></a>
                    </li>
                    <li>
                        <a className="boton-menu boton-carrito" href="/carrito">
                            <i className="bi bi-cart-fill"></i> Carrito <span id="numerito" className="numerito">{numerito}</span></a>
                    </li>
                </ul>
            </nav>
            <footer>
                <p className="texto-footer">©PasteleriaMilSabores</p>
            </footer>
        </aside>
        
    </div>
    )
}
// eslint-disable-next-line react-refresh/only-export-components
export { calcularNumerito };
export default Navbar;