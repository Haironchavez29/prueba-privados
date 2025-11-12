import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import solicitudRoutes from "./routes/solicitudRoutes.js";
import "./config/database.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/solicitudes", solicitudRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "API funcionando correctamente" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
