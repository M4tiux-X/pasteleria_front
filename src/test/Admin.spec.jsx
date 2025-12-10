import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Admin from "../pages/Admin";
import { beforeEach, describe, expect, test, vi } from "vitest";
import React from "react";

// ⬅️ Mock global de navigate
const mockNavigate = vi.fn();

// ⬅️ Mock correcto de react-router-dom
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

beforeEach(() => {
  localStorage.clear();
  mockNavigate.mockReset();
});

describe("Admin.jsx", () => {
  test("Redirige al login si NO hay usuario logueado", () => {
    render(
      <MemoryRouter>
        <Admin />
      </MemoryRouter>
    );

    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  test("Redirige al inicio si el usuario NO es ADMIN", () => {
    localStorage.setItem(
      "usuarioLogueado",
      JSON.stringify({ username: "juan", role: "USER" })
    );

    render(
      <MemoryRouter>
        <Admin />
      </MemoryRouter>
    );

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });



  test("Cerrar Sesión borra localStorage y redirige al login", () => {
    localStorage.setItem(
      "usuarioLogueado",
      JSON.stringify({ username: "admin", role: "ADMIN" })
    );

    render(
      <MemoryRouter>
        <Admin />
      </MemoryRouter>
    );

    const btn = screen.getByText("Cerrar Sesión");
    fireEvent.click(btn);

    expect(localStorage.getItem("usuarioLogueado")).toBeNull();
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  test("Botón Boletas redirige a /boletas", () => {
    localStorage.setItem(
      "usuarioLogueado",
      JSON.stringify({ username: "admin", role: "ADMIN" })
    );

    render(
      <MemoryRouter>
        <Admin />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Boletas/Recibos"));

    expect(mockNavigate).toHaveBeenCalledWith("/boletas");
  });

  test("Renderiza correctamente la lista de usuarios", () => {
    localStorage.setItem(
      "usuarioLogueado",
      JSON.stringify({ username: "admin", role: "ADMIN" })
    );

    localStorage.setItem(
      "usuarios",
      JSON.stringify([
        { username: "maria", role: "USER" },
        { username: "pepe", role: "ADMIN" },
      ])
    );

    render(
      <MemoryRouter>
        <Admin />
      </MemoryRouter>
    );

    expect(screen.getByText(/maria/i)).toBeInTheDocument();
    expect(screen.getByText(/pepe/i)).toBeInTheDocument();
  });
});
