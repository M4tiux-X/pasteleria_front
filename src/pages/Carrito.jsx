import { useEffect, useState } from "react";
import "../css/main.css";
import useCarrito from "../hooks/useCarrito";
import useCarritoDetalle from "../hooks/useCarritoDetalle";

const Carrito = () => {
  const [carrito, setCarrito] = useState(null);
  const [detalles, setDetalles] = useState([]);

  const { obtenerCarritoUsuario, crearCarrito } = useCarrito();
  const { 
    obtenerDetallePorCarrito,
    agregarProducto,
    actualizarCantidad,
    eliminarDetalle
  } = useCarritoDetalle();

  const idUsuario = 1;

  // =============================
  //   1. CARGAR CARRITO
  // =============================
  useEffect(() => {
    cargarCarrito();
  }, []);

  const cargarCarrito = async () => {
    try {
      // Buscar carrito del usuario
      let res = await obtenerCarritoUsuario(idUsuario);

      // si el backend NO devuelve carrito → viene null
      if (!res) {
        const nuevo = await crearCarrito({ usuarioId: idUsuario });
        res = nuevo; // ← JSON completo de la creación
      }

      setCarrito(res);

      // cargar detalles
      const det = await obtenerDetallePorCarrito(res.id);
      setDetalles(det || []);

    } catch (e) {
      console.error("Error cargando carrito:", e);
    }
  };

  // =============================
  //   2. SUMAR / RESTAR CANTIDAD
  // =============================
  const incrementar = async (idDetalle, cantidadActual) => {
    await actualizarCantidad(idDetalle, { cantidad: cantidadActual + 1 });
    cargarCarrito();
  };

  const decrementar = async (idDetalle, cantidadActual) => {
    if (cantidadActual === 1) {
      await eliminarDetalle(idDetalle);
    } else {
      await actualizarCantidad(idDetalle, { cantidad: cantidadActual - 1 });
    }
    cargarCarrito();
  };

  // =============================
  //   3. ELIMINAR PRODUCTO
  // =============================
  const eliminarProducto = async (idDetalle) => {
    if (!window.confirm("¿Eliminar producto?")) return;
    await eliminarDetalle(idDetalle);
    cargarCarrito();
  };

  // =============================
  //   4. VACIAR CARRITO
  // =============================
  const vaciarCarrito = async () => {
    if (!window.confirm("¿Vaciar carrito?")) return;

    for (const d of detalles) {
      await eliminarDetalle(d.id);
    }

    cargarCarrito();
  };

  // =============================
  //   5. TOTAL
  // =============================
  const total = detalles.reduce(
    (acc, p) => acc + p.producto.precio * p.cantidad,
    0
  );

  // =============================
  //   6. RENDER
  // =============================
  if (!carrito || detalles.length === 0) {
    return (
      <main>
        <h2 className="titulo-principal">Carrito</h2>
        <p id="carrito-vacio">Tu carrito está vacío</p>
      </main>
    );
  }

  return (
    <main>
      <h2 className="titulo-principal">Carrito</h2>

      <div className="contenedor-carrito">
        <div className="carrito-productos">

          {detalles.map(det => (
            <div key={det.id} className="carrito-producto">
              <img
                className="carrito-producto-imagen"
                src={det.producto.imagen}
                alt={det.producto.titulo}
              />

              <div className="h3-carrito">
                <small>Título</small>
                <h3>{det.producto.titulo}</h3>
              </div>

              <div className="h3-carrito">
                <small>Cantidad</small>
                <div className="carrito-producto-cantidad-controles">
                  <button onClick={() => decrementar(det.id, det.cantidad)}>-</button>
                  <p>{det.cantidad}</p>
                  <button onClick={() => incrementar(det.id, det.cantidad)}>+</button>
                </div>
              </div>

              <div className="h3-carrito">
                <small>Precio</small>
                <p>${det.producto.precio.toLocaleString()}</p>
              </div>

              <div className="h3-carrito">
                <small>Subtotal</small>
                <p>${(det.producto.precio * det.cantidad).toLocaleString()}</p>
              </div>

              <button
                onClick={() => eliminarProducto(det.id)}
                className="carrito-producto-eliminar"
              >
                <i className="bi bi-trash3"></i>
              </button>
            </div>
          ))}

        </div>

        <div className="carrito-acciones">
          <div>
            <button onClick={vaciarCarrito}>Vaciar carrito</button>
          </div>
          <div className="carrito-acciones-derecha">
            <div className="carrito-acciones-total">
              <p>Total:</p>
              <p>${total.toLocaleString()}</p>
            </div>
            <button onClick={() => alert("Aquí realizar compra con microservicio")}>
              Comprar ahora
            </button>
          </div>
        </div>

      </div>
    </main>
  );
};

export default Carrito;
