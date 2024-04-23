Mi Banco.

En el siguiente trabajo se solicita crear una aplicación para un banco donde se pueda realizar transacciones y consultas, y también controlar los movimientos bancarios.
Para desarrollar el trabajo se utilizó:

-Base de datos Postgres.
-La dependencia PG.

A continuación se establecen las instrucciones para desarrollar la actividad:

Instrucciones

-----------
Hola, Aquí tenemos instrucciones para ejecutar el programa;

Orden de argumentos:
node index.js <tipo_transaccion> <cuenta_origen> <fecha> <descripcion> <monto> <cuenta_destino>

-----------

EJEMPLOS:

Nueva transacción:
node index.js nueva 1 "16/10/2020" "Empanadas para el 18" 30000


Consulta de últimas transferencias para la cuenta 1
node index.js consulta 1


Consulta de saldo para la cuenta 1
node index.js consulta-saldo 1