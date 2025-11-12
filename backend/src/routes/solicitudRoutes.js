import express from "express";
import {
  crearSolicitud,
  obtenerSolicitudes,
  obtenerSolicitudPorId,
  actualizarEstado,
  eliminarSolicitud,
} from "../controllers/solicitudController.js";

const router = express.Router();

router.post("/", crearSolicitud);

router.get("/", obtenerSolicitudes);

router.get("/:id", obtenerSolicitudPorId);

router.patch("/:id/estado", actualizarEstado);

router.delete("/:id", eliminarSolicitud);

export default router;
