import pool from "../config/database.js";

const TARIFA_NORMAL = 50.0;

const calcularTarifa = (fecha) => {
  const hora = new Date(fecha).getHours();
  const dia = new Date(fecha).getDay();
  return dia >= 1 && dia <= 6 && hora >= 8 && hora < 18
    ? TARIFA_NORMAL
    : TARIFA_NORMAL * 2;
};

export const crearSolicitud = async (req, res) => {
  try {
    const {
      nombreRemitente,
      telefonoRemitente,
      direccionOrigen,
      nombreDestinatario,
      telefonoDestinatario,
      direccionDestino,
      peso,
      descripcion,
    } = req.body;

    if (
      !nombreRemitente ||
      !direccionOrigen ||
      !nombreDestinatario ||
      !direccionDestino ||
      peso > 15
    ) {
      return res.status(400).json({ error: "Datos inválidos" });
    }

    const fecha = new Date();
    const tarifa = calcularTarifa(fecha);

    const [result] = await pool.query(
      "INSERT INTO solicitudes (nombreRemitente, telefonoRemitente, direccionOrigen, nombreDestinatario, telefonoDestinatario, direccionDestino, peso, descripcion, fechaSolicitud, tarifa) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        nombreRemitente,
        telefonoRemitente,
        direccionOrigen,
        nombreDestinatario,
        telefonoDestinatario,
        direccionDestino,
        peso,
        descripcion,
        fecha,
        tarifa,
      ]
    );

    const [solicitud] = await pool.query(
      "SELECT * FROM solicitudes WHERE id = ?",
      [result.insertId]
    );
    res
      .status(201)
      .json({ message: "Solicitud creada", solicitud: solicitud[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerSolicitudes = async (req, res) => {
  try {
    const { estado } = req.query;
    let query = "SELECT * FROM solicitudes";
    const params = [];

    if (estado) {
      query += " WHERE estado = ?";
      params.push(estado);
    }

    query += " ORDER BY fechaSolicitud DESC";
    const [solicitudes] = await pool.query(query, params);

    const stats = {
      total: solicitudes.length,
      recibidas: solicitudes.filter((s) => s.estado === "RECIBIDA").length,
      enTransito: solicitudes.filter((s) => s.estado === "EN_TRANSITO").length,
      entregadas: solicitudes.filter((s) => s.estado === "ENTREGADA").length,
      totalRecaudado: solicitudes.reduce(
        (sum, s) => sum + parseFloat(s.tarifa),
        0
      ),
    };

    res.json({ solicitudes, estadisticas: stats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerSolicitudPorId = async (req, res) => {
  try {
    const [solicitud] = await pool.query(
      "SELECT * FROM solicitudes WHERE id = ?",
      [req.params.id]
    );
    if (solicitud.length === 0)
      return res.status(404).json({ error: "No encontrada" });
    res.json(solicitud[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const actualizarEstado = async (req, res) => {
  try {
    const { estado } = req.body;
    await pool.query("UPDATE solicitudes SET estado = ? WHERE id = ?", [
      estado,
      req.params.id,
    ]);
    const [solicitud] = await pool.query(
      "SELECT * FROM solicitudes WHERE id = ?",
      [req.params.id]
    );
    res.json({ message: "Actualizada", solicitud: solicitud[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const eliminarSolicitud = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM solicitudes WHERE id = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "No encontrada" });
    res.json({ message: "Solicitud eliminada" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
