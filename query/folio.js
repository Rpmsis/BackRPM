const mysql = require('../database/index');
//const moment = require('moment');
//const fecha = moment().format("DDMMYY");
var folio = "";
/* Verifico la fecha del ultimo folio y la comparo con la actual
fechaAct= 0 => fecha+01

fechaAct= fecha.

ultimosdatos+1;

fecha+01

*/
async function mostFolio(fecha, callback) {
    mysql.query(`select folioActivo from activosfijos order by idActfijos desc limit 1`, function (error, respuesta) {
        if (error) {
            console.log(error)
            callback(null, {
                mensaje: error
            })
        }
        else {
            if (respuesta && respuesta.length > 0) {
                const fechaFolio = respuesta[0].folioActivo.toString().substring(0, 6);
                /* console.log("Ultima fecha => " + fechaFolio)
                console.log("Fecha actual => " + fecha) */
                if (fecha === fechaFolio) {
                    const numFolio = respuesta[0].folioActivo.toString().substring(6);
                    /* console.log("Número de folio=> "+numFolio) */
                    if (numFolio < 9) {
                        const digitos1 = ("0" + (parseInt(numFolio) + 1).toString().slice(-2))
                        folio = fecha + digitos1;
                        /* console.log("Nuevo folio => "+folio) */
                        callback(null, {
                            folio
                        })
                    }
                    else {
                        const digito2 = (parseInt(numFolio) + 1).toString()
                        folio = fecha + digito2;
                        /* console.log("Mayor a 10 => " + folio); */
                        callback(null, {
                            folio
                        })
                    }
                } else {
                    folio = fecha + "01";
                    /* console.log("Primer folio del dia => "+folio) */
                    callback(null, {
                        folio
                    })
                }

            }
            else {
                folio = fecha + "01";
                /* console.log("Primer folio del dia => "+folio) */
                callback(null, {
                    folio
                })
            }
        }
    })

}

module.exports = mostFolio

