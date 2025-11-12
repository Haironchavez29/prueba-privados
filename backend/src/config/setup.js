import pool from "./database.js";

const setup = async () => {
  const connection = await pool.getConnection();

  //Un pequeño escript para ejecutar la creación de la tablas
  try {
    await connection.query(`
      CREATE TABLE solicitudes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombreRemitente VARCHAR(255) NOT NULL,
        telefonoRemitente VARCHAR(50),
        direccionOrigen TEXT NOT NULL,
        nombreDestinatario VARCHAR(255) NOT NULL,
        telefonoDestinatario VARCHAR(50),
        direccionDestino TEXT NOT NULL,
        peso DECIMAL(5,2) NOT NULL,
        descripcion TEXT,
        fechaSolicitud DATETIME NOT NULL,
        tarifa DECIMAL(10,2) NOT NULL,
        estado VARCHAR(20) DEFAULT 'RECIBIDA',
        mensajeroAsignado VARCHAR(255),
        fechaCreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log("Tabla creada");
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    connection.release();
    process.exit(0);
  }
};

setup();
