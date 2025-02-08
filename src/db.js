const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false, // Necessário para conexões externas
  },
});

pool.connect()
  .then(() => console.log("🟢 Conectado ao PostgreSQL"))
  .catch((err) => console.error("🔴 Erro ao conectar ao PostgreSQL:", err));

module.exports = pool;
