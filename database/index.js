const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'admin_activos',
  password: 'sL-jX2v96qyo@h*!',
  database: 'activosbd'
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión: ', err);
    return;
  }

  console.log('Conectado a la base de datos!');
});

module.exports = connection 