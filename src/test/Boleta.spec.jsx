import { describe, it, expect, vi, beforeEach } from "vitest";

// 🔥 Creamos UNA SOLA instancia de la API mockeada
const mockApi = {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    remove: vi.fn(),
};

// 🔥 Mockeamos useApi para que siempre devuelva ESTA MISMA instancia
vi.mock("../hooks/useApi", () => ({
    default: () => mockApi
}));

import useBoletas from "../hooks/useBoleta";

describe("Pruebas de useBoletas", () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("debería devolver una lista de boletas del API", async () => {

        const mockBoletas = [
            { id: 1, cliente: "Juan", total: 12000 },
            { id: 2, cliente: "María", total: 8500 },
        ];

        // 💥 Simulamos la respuesta correcta
        mockApi.get.mockResolvedValue(mockBoletas);

        const { obtenerBoletas } = useBoletas();

        const result = await obtenerBoletas();

        expect(result).toEqual(mockBoletas);
        expect(mockApi.get).toHaveBeenCalledWith("");
    });

    it("debería lanzar error si el servidor falla", async () => {

        mockApi.get.mockRejectedValue(new Error("Error al obtener boletas"));

        const { obtenerBoletas } = useBoletas();

        await expect(obtenerBoletas()).rejects.toThrow("Error al obtener boletas");
    });

});
