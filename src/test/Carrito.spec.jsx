import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { beforeEach, afterEach, describe, expect, test, vi } from "vitest";
import Carrito from "../pages/Carrito"; // ajusta la ruta según tu proyecto
import React from "react";


// ===== MOCKS GLOBALES =====
beforeEach(() => {
  vi.restoreAllMocks();
  localStorage.clear();

  // Mock localStorage
  const store = {};
  vi.spyOn(window.localStorage.__proto__, "getItem").mockImplementation(
    (key) => store[key] || null
  );
  vi.spyOn(window.localStorage.__proto__, "setItem").mockImplementation(
    (key, value) => {
      store[key] = value;
    }
  );

  // Mock confirm/alert
  vi.spyOn(window, "confirm").mockReturnValue(true);
  vi.spyOn(window, "alert").mockImplementation(() => {});
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("Componente Carrito", () => {
  test("muestra mensaje de carrito vacío cuando no hay productos", () => {
    render(<Carrito />);
    expect(
      screen.getByText(/Tu carrito está vacío/i)
    ).toBeInTheDocument();
  });

  test("renderiza productos del carrito desde localStorage", () => {
    const carritoMock = [
      { id: 1, titulo: "Torta de Chocolate", precio: 5000, cantidad: 2, imagen: "img1.jpg" },
    ];
    localStorage.setItem("productos-en-carrito", JSON.stringify(carritoMock));

    render(<Carrito />);

    expect(screen.getByText("Torta de Chocolate")).toBeInTheDocument();
    expect(screen.getAllByText((content) => content.includes("5.000")).length).toBeGreaterThan(0);
    expect(screen.getAllByText((content) => content.includes("10.000")).length).toBeGreaterThan(0);

  });

  test("incrementa la cantidad al presionar +", async () => {
    const carritoMock = [
      { id: 1, titulo: "Torta de Chocolate", precio: 1000, cantidad: 1, imagen: "img1.jpg" },
    ];
    localStorage.setItem("productos-en-carrito", JSON.stringify(carritoMock));

    render(<Carrito />);

    const botonSumar = screen.getByText("+");
    fireEvent.click(botonSumar);

    await waitFor(() => {
      expect(screen.getByText("2")).toBeInTheDocument();
    });
  });

  test("decrementa la cantidad al presionar -", async () => {
    const carritoMock = [
      { id: 1, titulo: "Pie de Limón", precio: 2000, cantidad: 2, imagen: "img1.jpg" },
    ];
    localStorage.setItem("productos-en-carrito", JSON.stringify(carritoMock));

    render(<Carrito />);

    const botonRestar = screen.getByText("-");
    fireEvent.click(botonRestar);

    await waitFor(() => {
      expect(screen.getByText("1")).toBeInTheDocument();
    });
  });

  test("elimina un producto al confirmar", async () => {
    const carritoMock = [
      { id: 1, titulo: "Brownie", precio: 1500, cantidad: 1, imagen: "img1.jpg" },
    ];
    localStorage.setItem("productos-en-carrito", JSON.stringify(carritoMock));

    render(<Carrito />);

    const botonEliminar = screen.getByTitle("Eliminar producto completo");
    fireEvent.click(botonEliminar);

    await waitFor(() => {
      expect(
        screen.getByText(/Tu carrito está vacío/i)
      ).toBeInTheDocument();
    });
  });

  test("vacía el carrito al confirmar", async () => {
    const carritoMock = [
      { id: 1, titulo: "Galletas", precio: 1000, cantidad: 3, imagen: "img1.jpg" },
    ];
    localStorage.setItem("productos-en-carrito", JSON.stringify(carritoMock));

    render(<Carrito />);

    const botonVaciar = screen.getByText("Vaciar carrito");
    fireEvent.click(botonVaciar);

    await waitFor(() => {
      expect(
        screen.getByText(/Tu carrito está vacío/i)
      ).toBeInTheDocument();
    });
  });

});
