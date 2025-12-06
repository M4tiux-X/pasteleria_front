import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import Navbar, { calcularNumerito } from "../pages/Navbar";

// limpiar el entorno antes de cada test
beforeEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
});

describe("Navbar Component", () => {

  it("debería mostrar el número correcto de productos desde localStorage", () => {
    // simula datos en localStorage
    localStorage.setItem(
      "productos-en-carrito",
      JSON.stringify([{ cantidad: 2 }, { cantidad: 3 }])
    );

    render(<Navbar />);
    const numerito = screen.getByText("5");
    expect(numerito).toBeInTheDocument();
  });

  it("debería manejar localStorage vacío sin errores", () => {
    localStorage.removeItem("productos-en-carrito");
    render(<Navbar />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("debería renderizar el enlace del carrito", () => {
    render(<Navbar />);
    const carrito = screen.getByText(/Carrito/i);
    expect(carrito).toBeInTheDocument();
  });
});

describe("calcularNumerito()", () => {

  it("retorna 0 si localStorage está vacío", () => {
    localStorage.removeItem("productos-en-carrito");
    expect(calcularNumerito()).toBe(0);
  });

  it("suma correctamente las cantidades de productos", () => {
    localStorage.setItem(
      "productos-en-carrito",
      JSON.stringify([{ cantidad: 1 }, { cantidad: 4 }])
    );
    expect(calcularNumerito()).toBe(5);
  });
});
