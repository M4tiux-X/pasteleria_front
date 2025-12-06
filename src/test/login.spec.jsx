import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Login from "../pages/Login";
import React from "react";

// --- MOCK GLOBAL DE useNavigate ---
const navigateMock = vi.fn();

// Mock parcial de react-router-dom (mantiene MemoryRouter, etc.)
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => navigateMock, // solo se mockea navigate
  };
});

beforeEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
  navigateMock.mockClear();
});

describe("Componente Login", () => {
  it("debería renderizar los campos de login y registro", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText("Usuario")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Contraseña")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Nuevo Usuario")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Nueva Contraseña")).toBeInTheDocument();
  });

  it("muestra mensaje de error si el usuario no existe", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Usuario"), {
      target: { value: "fakeuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Contraseña"), {
      target: { value: "1234" },
    });

    fireEvent.click(screen.getByText("Ingresar"));

    await waitFor(() => {
      expect(screen.getByText("Usuario o contraseña incorrectos")).toBeInTheDocument();
    });
  });

  it("registra un nuevo usuario correctamente", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Nuevo Usuario"), {
      target: { value: "juan" },
    });
    fireEvent.change(screen.getByPlaceholderText("Nueva Contraseña"), {
      target: { value: "1234" },
    });
    fireEvent.change(screen.getByDisplayValue("Usuario"), {
      target: { value: "ADMIN" },
    });

    fireEvent.click(screen.getByText("Registrar"));

    await waitFor(() => {
      expect(screen.getByText(/Usuario registrado correctamente/i)).toBeInTheDocument();
    });

    const usuarios = JSON.parse(localStorage.getItem("usuarios"));
    expect(usuarios).toHaveLength(1);
    expect(usuarios[0].username).toBe("juan");
    expect(usuarios[0].role).toBe("ADMIN");
  });

  it("no permite registrar usuarios duplicados", async () => {
    localStorage.setItem(
      "usuarios",
      JSON.stringify([{ username: "juan", password: "1234", role: "USUARIO" }])
    );

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Nuevo Usuario"), {
      target: { value: "juan" },
    });
    fireEvent.change(screen.getByPlaceholderText("Nueva Contraseña"), {
      target: { value: "abcd" },
    });

    fireEvent.click(screen.getByText("Registrar"));

    await waitFor(() => {
      expect(screen.getByText("El usuario ya existe.")).toBeInTheDocument();
    });
  });

  it("permite iniciar sesión con usuario existente y guarda en localStorage", async () => {
    localStorage.setItem(
      "usuarios",
      JSON.stringify([{ username: "maria", password: "abcd", role: "USUARIO" }])
    );

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Usuario"), {
      target: { value: "maria" },
    });
    fireEvent.change(screen.getByPlaceholderText("Contraseña"), {
      target: { value: "abcd" },
    });

    fireEvent.click(screen.getByText("Ingresar"));

    await waitFor(() => {
      expect(screen.getByText(/Bienvenido maria/i)).toBeInTheDocument();
    });

    const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
    expect(usuarioLogueado.username).toBe("maria");
  });

  
});
