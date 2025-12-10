import React from "react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Productos from "../pages/Productos";

// === MOCK del hook useProductos (IMPORTANTE) ===
vi.mock("../hooks/useProductos", () => {
  return {
    default: () => ({
      obtenerProductos: vi.fn(() =>
        Promise.resolve([
          {
            id: 1,
            titulo: "Torta Cuadrada de Chocolate",
            categoria: { nombre: "chocolate" },
            precio: 12000,
            imagen: "img1.jpg"
          },
          {
            id: 2,
            titulo: "Torta Vegana de Chocolate",
            categoria: { nombre: "vegano" },
            precio: 15000,
            imagen: "img2.jpg"
          }
        ])
      )
    })
  };
});

beforeEach(() => {
  localStorage.clear();
  document.body.innerHTML = `<span id="numerito">0</span>`;
});

describe("Productos.jsx", () => {

  it("debe renderizar el título y los productos cargados desde la API", async () => {
    render(<Productos />);

    // Título inicial
    expect(screen.getByText("Todos los Productos")).toBeInTheDocument();

    // Esperar productos mockeados
    expect(await screen.findByText("Torta Cuadrada de Chocolate")).toBeInTheDocument();
    expect(await screen.findByText("Torta Vegana de Chocolate")).toBeInTheDocument();

    const precios = screen.getAllByText(/\$/);
    expect(precios.length).toBeGreaterThan(1);
  });

  it("debe actualizar el carrito y el numerito al agregar un producto", async () => {
    render(<Productos />);

    const botones = await screen.findAllByRole("button", { name: "Agregar al carrito" });

    fireEvent.click(botones[0]);

    let carrito = JSON.parse(localStorage.getItem("productos-en-carrito"));
    expect(carrito).toHaveLength(1);
    expect(carrito[0].cantidad).toBe(1);

    const numerito = document.getElementById("numerito");
    expect(numerito.textContent).toBe("1");

    // Agregar nuevamente el mismo producto
    fireEvent.click(botones[0]);

    carrito = JSON.parse(localStorage.getItem("productos-en-carrito"));
    expect(carrito[0].cantidad).toBe(2);
    expect(numerito.textContent).toBe("2");
  });


  it("debe mostrar mensaje de carga si no hay productos todavía", () => {
    // Este test valida el estado inicial antes de la carga

    // MOCK especial para este test → devolver null
    const spy = vi.spyOn(Storage.prototype, "getItem").mockReturnValue(null);

    render(<Productos />);

    expect(screen.getByText("Todos los Productos")).toBeInTheDocument();
    expect(screen.getByText("Cargando productos...")).toBeInTheDocument();

    spy.mockRestore();
  });
});
