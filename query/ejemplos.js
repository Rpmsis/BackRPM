const mysql = require('../database/index');
const fechaFolio = "abc";
async function ejemploF(callback) {
    mysql.query(`select folioActivo from activosfijos order by idActfijos desc limit 1`, function (error, respuesta) {
        if (error) {
            console.log(error)

        }
        else {
           // console.log(respuesta)
            fechaFolio = respuesta[0].folioActivo
            callback(null, {
                fechaFolio

            }
            )
        }
    })
}
module.exports = ejemploF