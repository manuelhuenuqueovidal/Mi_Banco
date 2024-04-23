//Importación de archivo de configuración.
const pool = require("./config");

//Constantes para consultar usando argumentos. 
const argumentos = process.argv.slice(2);
const tipo_transaccion = argumentos[0];
const cuenta = argumentos[1];
const fecha = argumentos[2];
const descripcion = argumentos[3];
const monto = argumentos[4];
const cuentaDestino = argumentos[5];

//Consulta tabla transferencias y retorno de los últimos 10 registros de una cuenta.
const consulta = async ({ cuenta }) => {
  const { rows } = await pool.query(
    `select * from transferencias where cuenta_origen = ${cuenta} ORDER BY fecha DESC LIMIT 10;`
  );
  console.log(` Las ultimas 10 transferencias de la cuenta ${cuenta} son:`);
  console.log(rows);
};

//Consulta de saldo de una cuenta.
const consultaSaldo = async ({ cuenta }) => {
  const {
    rows: [{ saldo }],
  } = await pool.query(`select saldo from cuentas where id = ${cuenta}`);
  console.log(`El saldo de la cuenta ${cuenta} es: ${saldo}`);
};

//Transacción de fondos.
const nueva = async ({ descripcion, fecha, monto, cuenta, cuentaDestino }) => {
  const actualizarCuentaOrigen = {
    text: `UPDATE cuentas SET saldo = saldo - $1 WHERE id = $2 RETURNING *`,
    values: [monto, cuenta],
  };
  const actualizarCuentaDestino = {
    text: `UPDATE cuentas SET saldo = saldo + $1 WHERE id = $2 RETURNING *`,
    values: [monto, cuentaDestino],
  };

  const nueva = {
    text: "INSERT INTO transferencias values ($1, $2, $3, $4, $5) returning *",
    values: [descripcion, fecha, monto, cuenta, cuentaDestino],
  };

  try {
    await pool.query("BEGIN");
    const result = await pool.query(nueva);
    await pool.query(actualizarCuentaOrigen);
    await pool.query(actualizarCuentaDestino);
    await pool.query("COMMIT");
    console.log("Transacción realizada con éxito");
    console.log("Ultima transacción: ", result.rows[0]);
  } catch (e) {
    await pool.query("ROLLBACK");
    throw e;
  }
};

const funciones = {
  nueva,
  consulta,
  "consulta-saldo": consultaSaldo,
};

(async () => {
  try {
    await funciones[tipo_transaccion]({
      cuenta,
      fecha,
      descripcion,
      monto,
      cuentaDestino,
    });
  } catch (error) {
    console.log("Error", error);
  } finally {
    pool.end();
  }
})();

module.exports = { consulta, consultaSaldo, nueva }

