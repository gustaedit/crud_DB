const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "inanely-changeable-chub.data-1.use1.tembo.io",
  database: "postgres",
  password: "XNQJ84BbUlCLDhww",
  port: 5432,
  ssl: {
    rejectUnauthorized: false, // Necessário para conexões externas
  },
});

pool.connect()
  .then(() => console.log("🟢 Conectado ao PostgreSQL"))
  .catch((err) => console.error("🔴 Erro ao conectar ao PostgreSQL:", err));

module.exports = pool;
