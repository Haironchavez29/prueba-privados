import React, { useState } from "react";
import SolicitudForm from "./components/SolicitudForm";
import ReporteSolicitudes from "./components/ReporteSolicitudes";

// --- Iconos ---
const ShipIcon = () => (
  <svg
    className="w-5 h-5 mr-2"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
    />
  </svg>
);

const ReportIcon = () => (
  <svg
    className="w-5 h-5 mr-2"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V7a2 2 0 012-2h11a2 2 0 012 2v8a2 2 0 01-2 2z"
    />
  </svg>
);

export default function App() {
  const [view, setView] = useState("request");

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-blue-600">
                  Envíos Garantizados S.A.
                </h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <button
                  onClick={() => setView("request")}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    view === "request"
                      ? "border-blue-500 text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  <ShipIcon />
                  Solicitar Envío
                </button>
                <button
                  onClick={() => setView("report")}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    view === "report"
                      ? "border-blue-500 text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  <ReportIcon />
                  Ver Reporte
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {view === "request" ? <SolicitudForm /> : <ReporteSolicitudes />}
        </div>
      </main>
    </div>
  );
}
