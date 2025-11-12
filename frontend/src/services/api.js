const API_URL = "http://localhost:3000/api";

export const solicitudService = {
  crear: async (datos) => {
    const response = await fetch(`${API_URL}/solicitudes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Error al crear solicitud");
    }

    return response.json();
  },

  // Obtener todas las solicitudes con filtros
  obtenerTodas: async (filtros = {}) => {
    const params = new URLSearchParams();

    if (filtros.estado) params.append("estado", filtros.estado);
    if (filtros.fechaInicio) params.append("fechaInicio", filtros.fechaInicio);
    if (filtros.fechaFin) params.append("fechaFin", filtros.fechaFin);

    const response = await fetch(`${API_URL}/solicitudes?${params}`);

    if (!response.ok) {
      throw new Error("Error al obtener solicitudes");
    }

    return response.json();
  },

  // Obtener solicitud por ID
  obtenerPorId: async (id) => {
    const response = await fetch(`${API_URL}/solicitudes/${id}`);

    if (!response.ok) {
      throw new Error("Error al obtener solicitud");
    }

    return response.json();
  },

  actualizarEstado: async (id, datos) => {
    const response = await fetch(`${API_URL}/solicitudes/${id}/estado`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar solicitud");
    }

    return response.json();
  },

  eliminar: async (id) => {
    const response = await fetch(`${API_URL}/solicitudes/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Error al eliminar solicitud");
    }

    return response.json();
  },
};
