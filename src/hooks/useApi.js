// src/hooks/useApi.js

import { useState } from "react";

export default function useApi(baseUrl) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = async (method, endpoint = "", body = null) => {
        setLoading(true);
        setError(null);
        

        try {
            const response = await fetch(`${baseUrl}${endpoint}`, {
                method,
                headers: { "Content-Type": "application/json" },
                body: body ? JSON.stringify(body) : null,
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.message || "Error en la petición");

            setData(result);
            return result;

        } catch (err) {
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return {
        data,
        loading,
        error,
        get: (endpoint) => request("GET", endpoint),
        post: (endpoint, body) => request("POST", endpoint, body),
        put: (endpoint, body) => request("PUT", endpoint, body),
        remove: (endpoint) => request("DELETE", endpoint)
    };
}
