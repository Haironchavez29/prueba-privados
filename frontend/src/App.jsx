import React, { useState } from "react";
import SolicitudForm from "./components/SolicitudForm";
import ReporteSolicitudes from "./components/ReporteSolicitudes";

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

const MenuIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

export default function App() {
  const [view, setView] = useState("request");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (newView) => {
    setView(newView);
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-lg sm:text-xl font-bold text-blue-600">
                Envíos Garantizados S.A.
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden sm:flex sm:space-x-8">
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

            {/* Mobile menu button */}
            <div className="flex items-center sm:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
              >
                {menuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="sm:hidden border-t border-gray-200">
            <div className="pt-2 pb-3 space-y-1">
              <button
                onClick={() => handleNavClick("request")}
                className={`w-full flex items-center px-4 py-2 text-base font-medium ${
                  view === "request"
                    ? "bg-blue-50 border-l-4 border-blue-500 text-blue-700"
                    : "border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                }`}
              >
                <ShipIcon />
                Solicitar Envío
              </button>
              <button
                onClick={() => handleNavClick("report")}
                className={`w-full flex items-center px-4 py-2 text-base font-medium ${
                  view === "report"
                    ? "bg-blue-50 border-l-4 border-blue-500 text-blue-700"
                    : "border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                }`}
              >
                <ReportIcon />
                Ver Reporte
              </button>
            </div>
          </div>
        )}
      </nav>

      <main className="py-6 sm:py-10">
        <div className="max-w-7xl mx-auto">
          {view === "request" ? <SolicitudForm /> : <ReporteSolicitudes />}
        </div>
      </main>
    </div>
  );
}
