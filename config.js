//Configuración de conexión de base de datos.
const { Pool } = require("pg");
const pool = new Pool({
    user: "manu",
    host: "localhost",
    password: "canta0912",
    database: "banco",
    port: 5432,
});
  
module.exports = pool;