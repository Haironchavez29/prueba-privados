import { useState, useEffect } from "react";
import { solicitudService } from "../services/api";

export default function ReporteSolicitudes() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [estadisticas, setEstadisticas] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });
  const [filtros, setFiltros] = useState({
    estado: "",
    fechaInicio: "",
    fechaFin: "",
  });

  const cargarSolicitudes = async () => {
    try {
      setLoading(true);
      const data = await solicitudService.obtenerTodas(filtros);
      setSolicitudes(data.solicitudes);
      setEstadisticas(data.estadisticas);
    } catch (error) {
      console.error("Error al cargar solicitudes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarSolicitudes();
  }, []);

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const aplicarFiltros = () => {
    cargarSolicitudes();
  };

  const limpiarFiltros = () => {
    setFiltros({
      estado: "",
      fechaInicio: "",
      fechaFin: "",
    });
    setTimeout(() => cargarSolicitudes(), 100);
  };

  const cambiarEstado = async (id, nuevoEstado) => {
    try {
      await solicitudService.actualizarEstado(id, { estado: nuevoEstado });
      setMensaje({
        tipo: "success",
        texto: "Estado actualizado correctamente",
      });
      cargarSolicitudes();
      setTimeout(() => setMensaje({ tipo: "", texto: "" }), 3000);
    } catch (error) {
      setMensaje({ tipo: "error", texto: "Error al actualizar estado" });
    }
  };

  const eliminarSolicitud = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar esta solicitud?")) return;

    try {
      await solicitudService.eliminar(id);
      setMensaje({
        tipo: "success",
        texto: "Solicitud eliminada correctamente",
      });
      cargarSolicitudes();
      setTimeout(() => setMensaje({ tipo: "", texto: "" }), 3000);
    } catch (error) {
      setMensaje({ tipo: "error", texto: "Error al eliminar solicitud" });
    }
  };

  const getEstadoBadge = (estado) => {
    const estilos = {
      RECIBIDA: "bg-yellow-100 text-yellow-800",
      EN_TRANSITO: "bg-blue-100 text-blue-800",
      ENTREGADA: "bg-green-100 text-green-800",
    };
    return estilos[estado] || "bg-gray-100 text-gray-800";
  };

  const formatFecha = (fecha) => {
    return new Date(fecha).toLocaleString("es-GT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Reporte de Solicitudes de Envío
      </h1>

      {mensaje.texto && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            mensaje.tipo === "success"
              ? "bg-green-100 text-green-800 border border-green-300"
              : "bg-red-100 text-red-800 border border-red-300"
          }`}
        >
          {mensaje.texto}
        </div>
      )}

      {estadisticas && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-600">Total</p>
            <p className="text-2xl font-bold text-gray-800">
              {estadisticas.total}
            </p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg shadow">
            <p className="text-sm text-yellow-700">Recibidas</p>
            <p className="text-2xl font-bold text-yellow-800">
              {estadisticas.recibidas}
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg shadow">
            <p className="text-sm text-blue-700">En Tránsito</p>
            <p className="text-2xl font-bold text-blue-800">
              {estadisticas.enTransito}
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg shadow">
            <p className="text-sm text-green-700">Entregadas</p>
            <p className="text-2xl font-bold text-green-800">
              {estadisticas.entregadas}
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg shadow">
            <p className="text-sm text-purple-700">Total Recaudado</p>
            <p className="text-2xl font-bold text-purple-800">
              Q{estadisticas.totalRecaudado.toFixed(2)}
            </p>
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Filtros</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estado
            </label>
            <select
              name="estado"
              value={filtros.estado}
              onChange={handleFiltroChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos</option>
              <option value="RECIBIDA">Recibida</option>
              <option value="EN_TRANSITO">En Tránsito</option>
              <option value="ENTREGADA">Entregada</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Desde
            </label>
            <input
              type="date"
              name="fechaInicio"
              value={filtros.fechaInicio}
              onChange={handleFiltroChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hasta
            </label>
            <input
              type="date"
              name="fechaFin"
              value={filtros.fechaFin}
              onChange={handleFiltroChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-end gap-2">
            <button
              onClick={aplicarFiltros}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Aplicar
            </button>
            <button
              onClick={limpiarFiltros}
              className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300"
            >
              Limpiar
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Fecha
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Remitente
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Destinatario
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Origen
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Destino
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Peso
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Tarifa
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Estado
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {solicitudes.length === 0 ? (
                <tr>
                  <td
                    colSpan="10"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No hay solicitudes registradas
                  </td>
                </tr>
              ) : (
                solicitudes.map((sol) => (
                  <tr key={sol.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {sol.id}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {formatFecha(sol.fechaSolicitud)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      <div>{sol.nombreRemitente}</div>
                      <div className="text-xs text-gray-400">
                        {sol.telefonoRemitente}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      <div>{sol.nombreDestinatario}</div>
                      <div className="text-xs text-gray-400">
                        {sol.telefonoDestinatario}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 max-w-xs truncate">
                      {sol.direccionOrigen}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 max-w-xs truncate">
                      {sol.direccionDestino}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {sol.peso} lbs
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      Q{parseFloat(sol.tarifa).toFixed(2)}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={sol.estado}
                        onChange={(e) => cambiarEstado(sol.id, e.target.value)}
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${getEstadoBadge(
                          sol.estado
                        )} border-0 cursor-pointer`}
                      >
                        <option value="RECIBIDA">RECIBIDA</option>
                        <option value="EN_TRANSITO">EN TRÁNSITO</option>
                        <option value="ENTREGADA">ENTREGADA</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => eliminarSolicitud(sol.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
