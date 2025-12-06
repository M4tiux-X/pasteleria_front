import React, { useEffect, useState } from "react";
import '../css/main.css';
import useProductos from "../hooks/useProductos";

const Productos = () => {
  const { obtenerProductos } = useProductos();

  const [productos, setProductos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todos");
  const [carrito, setCarrito] = useState(() => {
    return JSON.parse(localStorage.getItem("productos-en-carrito")) || [];
  });

  // === Cargar productos desde el microservicio ===
  useEffect(() => {
    obtenerProductos()
      .then((data) => {
        if (data) {
          setProductos(data);  // <-- productos del backend
        }
      })
      .catch((err) => {
        console.error("Error cargando productos:", err);
      });
  }, []);

  // === Guardar carrito en localStorage ===
  useEffect(() => {
    localStorage.setItem("productos-en-carrito", JSON.stringify(carrito));

    const numerito = document.getElementById("numerito");
    if (numerito) {
      numerito.textContent = carrito.reduce((acc, p) => acc + p.cantidad, 0);
    }
  }, [carrito]);

  // === Categorías (Navbar) ===
  useEffect(() => {
    const botones = document.querySelectorAll(".boton-categoria");

    const manejarClick = (e) => {
      const categoriaId = e.currentTarget.id;
      setCategoriaSeleccionada(categoriaId);

      const titulo = document.getElementById("titulo-principal");
      if (titulo) {
        titulo.innerText =
          categoriaId === "todos"
            ? "Todos los Productos"
            : categoriaId.charAt(0).toUpperCase() + categoriaId.slice(1);
      }

      botones.forEach(btn => btn.classList.remove("active"));
      e.currentTarget.classList.add("active");
    };

    botones.forEach(btn => btn.addEventListener("click", manejarClick));
    return () => botones.forEach(btn => btn.removeEventListener("click", manejarClick));
  }, []);

  // === Agregar producto al carrito ===
  const agregarAlCarrito = (producto) => {
    const existe = carrito.find(item => item.id === producto.id);

    if (existe) {
      const actualizado = carrito.map(item =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
      setCarrito(actualizado);
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  // === Filtrar productos ===
  const productosFiltrados =
    categoriaSeleccionada === "todos"
      ? productos
      : productos.filter(p =>
          p.categoria?.nombre
            ?.toLowerCase()
            .includes(categoriaSeleccionada.toLowerCase())
        );

  return (
    <main>
      <h2 id="titulo-principal" className="titulo-principal">
        Todos los Productos
      </h2>

      <div id="contenedor-productos" className="contenedor-productos">
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map(producto => (
            <div key={producto.id} className="producto-detalle">
              <img
                src={producto.imagen}
                alt={producto.titulo}
                className="producto-imagen"
              />
              <h3 className="producto-titulo">{producto.titulo}</h3>
              <p>{producto.categoria?.nombre}</p>
              <p>${producto.precio?.toLocaleString()}</p>
              <button
                className="producto-agregar"
                onClick={() => agregarAlCarrito(producto)}
              >
                Agregar al carrito
              </button>
            </div>
          ))
        ) : (
          <p>Cargando productos...</p>
        )}
      </div>
    </main>
  );
};

export default Productos;
