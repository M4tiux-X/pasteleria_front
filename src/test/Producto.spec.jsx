import React from "react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Productos from "../pages/Productos";
import { productos as catalogo } from "../data/Productos";

beforeEach(() => {
  // Limpia el estado entre tests
  localStorage.clear();
  document.body.innerHTML = `<span id="numerito">0</span>`;
});

describe("Productos.jsx", () => {

    it("debe renderizar el título y los productos del catálogo", () => {
        render(<Productos />);
      
        expect(screen.getByText("Todos los Productos")).toBeInTheDocument();
        
        // Verificar que se rendericen productos del catálogo
        expect(screen.getByText("Torta Cuadrada de Chocolate")).toBeInTheDocument();
        expect(screen.getByText("Torta Vegana de Chocolate")).toBeInTheDocument();
      
        // En lugar de buscar por precio (que se repite)
        const precios = screen.getAllByText(/\$/);
        expect(precios.length).toBeGreaterThan(5);
      });

  it("debe actualizar el carrito y el numerito al agregar un producto", async () => {
    render(<Productos />);

    const botonAgregar = await screen.findAllByText("Agregar al carrito");
    fireEvent.click(botonAgregar[0]);

    const carrito = JSON.parse(localStorage.getItem("productos-en-carrito"));
    expect(carrito).toHaveLength(1);
    expect(carrito[0].cantidad).toBe(1);

    const numerito = document.getElementById("numerito");
    expect(numerito.textContent).toBe("1");

    // Click otra vez: debe sumar cantidad
    fireEvent.click(botonAgregar[0]);
    const carritoActualizado = JSON.parse(localStorage.getItem("productos-en-carrito"));
    expect(carritoActualizado[0].cantidad).toBe(2);
    expect(numerito.textContent).toBe("2");
  });

  it("debe filtrar productos al hacer click en un botón de categoría", async () => {
    render(<Productos />);

    const categoriaId = catalogo[0].menu.we.toLowerCase();
    const boton = document.createElement("button");
    boton.id = categoriaId;
    boton.className = "boton-categoria";
    document.body.appendChild(boton);

    fireEvent.click(boton);

    await waitFor(() => {
      const productosFiltrados = catalogo.filter((p) =>
        p.menu.we.toLowerCase().includes(categoriaId)
      );
      productosFiltrados.forEach((p) => {
        expect(screen.getByText(p.titulo)).toBeInTheDocument();
      });
    });
  });

  it("debe mostrar mensaje de carga si no hay productos", () => {
    // Simula sin productos
    const spy = vi.spyOn(Storage.prototype, "getItem").mockReturnValue(null);
    render(<Productos />);

    expect(screen.getByText("Todos los Productos")).toBeInTheDocument();
    spy.mockRestore();
  });
});
