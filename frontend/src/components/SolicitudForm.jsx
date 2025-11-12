import { useState } from "react";
import { solicitudService } from "../services/api";

export default function SolicitudForm() {
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });

  const [formData, setFormData] = useState({
    nombreRemitente: "",
    telefonoRemitente: "",
    direccionOrigen: "",
    nombreDestinatario: "",
    telefonoDestinatario: "",
    direccionDestino: "",
    peso: "",
    descripcion: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje({ tipo: "", texto: "" });

    try {
      const resultado = await solicitudService.crear(formData);

      setMensaje({
        tipo: "success",
        texto: `Solicitud creada exitosamente. Tarifa: Q${parseFloat(
          resultado.solicitud.tarifa
        ).toFixed(2)}`,
      });

      // Limpiar formulario
      setFormData({
        nombreRemitente: "",
        telefonoRemitente: "",
        direccionOrigen: "",
        nombreDestinatario: "",
        telefonoDestinatario: "",
        direccionDestino: "",
        peso: "",
        descripcion: "",
      });
    } catch (error) {
      setMensaje({
        tipo: "error",
        texto: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Nueva Solicitud de Envío
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

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border-b pb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Información del Remitente
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  name="nombreRemitente"
                  value={formData.nombreRemitente}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Juan Pérez"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  name="telefonoRemitente"
                  value={formData.telefonoRemitente}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="5551-2345"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dirección de Origen *
                </label>
                <input
                  type="text"
                  name="direccionOrigen"
                  value={formData.direccionOrigen}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="5ta Avenida 10-25 zona 1, Guatemala"
                />
              </div>
            </div>
          </div>

          <div className="border-b pb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Información del Destinatario
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  name="nombreDestinatario"
                  value={formData.nombreDestinatario}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="María López"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  name="telefonoDestinatario"
                  value={formData.telefonoDestinatario}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="5551-6789"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dirección de Destino *
                </label>
                <input
                  type="text"
                  name="direccionDestino"
                  value={formData.direccionDestino}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Calzada Roosevelt 15-30 zona 11, Guatemala"
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Información del Paquete
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Peso (libras) *
                </label>
                <input
                  type="number"
                  name="peso"
                  value={formData.peso}
                  onChange={handleChange}
                  required
                  min="0.1"
                  max="15"
                  step="0.1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="5.5"
                />
                <p className="text-xs text-gray-500 mt-1">Máximo 15 libras</p>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción del contenido
                </label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Documentos importantes, ropa, etc."
                />
              </div>
            </div>
          </div>

          {/* Información de Tarifas */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">
              Información de Tarifas
            </h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Horario normal (Lunes a Sábado, 8:00 - 18:00): Q50.00</li>
              <li>• Horario nocturno (fuera del horario normal): Q100.00</li>
            </ul>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Procesando..." : "Crear Solicitud"}
          </button>
        </form>
      </div>
    </div>
  );
}
