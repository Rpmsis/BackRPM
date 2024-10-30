const mysql = require('mysql');
const connection = mysql.createConnection({
  host: '192.168.1.195',
  user: 'BrisaP',
  password: '4dm1n.Rpm$',
  database: 'STEELPRO'
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión: ', err);
    return;
  }

  console.log('Conectado a la base de datos!');
});

module.exports = connection 