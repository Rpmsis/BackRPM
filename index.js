const express = require('express')
const cors = require('cors');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const most = require('./query/mostrar');
const mostPreg = require('./query/mostPreg');
const Folio = require('./query/folio')
const inserPre = require('./query/insertPregunta');
const inser = require('./query/insertar');
const inserMante = require('./query/insertMant');
const inserInsumos = require('./query/insertInsumos');
const elim = require('./query/eliminar');
const editPreg = require('./query/actualizarPreg');
const verificar_Token = require('./middleware/Valida_Token');
const app = express()
const port = 3001
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
const fecha = moment().format("DD-MM-YY");

app.get('/activosFijos', (req, res) => {
    most(function (error, respuesta) {

        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            res.status(200).json({
                respuesta
            })
        }
        console.log(respuesta);
    })
}
)

app.get('/folio', (req, res) => {
    Folio(function (error, respuesta) {

        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            res.status(200).json({
                respuesta
            })
        }
        console.log(respuesta);
    })
}
)


app.get('/preguntas', (req, res) => {
    mostPreg(function (error, respuesta) {

        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            res.status(200).json({
                respuesta
            })
        }
        console.log(respuesta);
    })
}
)

app.post('/insertarForms', verificar_Token, (req, res) => {
    const usuario = req.usuario;
    console.log(usuario)
    if (usuario.nombre && req.body.pregunta && req.body.areas && req.body.periodo && req.body.activo && fecha && req.body.inconformidad && req.body.estatus) {
        inserPre(usuario.nombre, req.body.pregunta, req.body.areas, req.body.periodo, req.body.activo, fecha, req.body.inconformidad, req.body.estatus, function (error, respuesta) {

            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuesta.mensaje
                })
            }
            else {
                res.status(200).json({
                    mensaje: respuesta.mensaje
                })
            }
            //console.log(respuesta);
        })

    }
    else {
        console.log("Existen datos vacíos");
        res.status(400).json({
            mensaje: "Existen datos vacíos"
        });
    }
})

/* Enviar los datos de un solo id para mostrar, actualizar o eliminar
 app.put('/personas/:id', (req, res) => {
    console.log(req.params)
    }
) */

app.post('/insertarFolio', (req, res) => {
    // Llamamos a la función que obtiene el folio
    Folio(function (error, respuesta) {
        if (error) {
            console.log(error);
            res.status(500).json({
                mensaje: "Error al obtener el folio"
            });
        } else {
            // Una vez que tenemos el folio, procedemos con la inserción
            const folio = respuesta.folio;
            console.log("Folio obtenido: ", folio)
            if (folio && fecha && req.body.falta && req.body.descrip) {
                inser(folio, fecha, req.body.falta, req.body.descrip, function (error, respuesta) {
                    if (error) {
                        console.log(error);
                        res.status(404).json({
                            mensaje: respuesta.mensaje
                        });
                    } else {
                        res.status(200).json({
                            mensaje: respuesta.mensaje,
                            folio: folio
                        });
                    }
                });
            } else {
                console.log("Existen datos vacíos");
                res.status(400).json({
                    mensaje: "Existen datos vacíos"
                });
            }
        }
    });
});

app.post('/insertarInsumos', (req, res) => {
    Folio(function (error, respuesta) {
        if (error) {
            console.log(error);
            res.status(500).json({
                mensaje: "Error al obtener el folio"
            });
        } else {
            // Una vez que tenemos el folio, procedemos con la inserción
            const folio = respuesta.folio;
            console.log("Folio obtenido: ", folio)
            if (folio && fecha && req.body.falta && req.body.descrip && req.body.prov && req.body.fDOS && req.body.monto && req.body.fadqui && req.body.numserie) {
                inserInsumos(folio, fecha, req.body.falta, req.body.descrip, req.body.prov, req.body.fDOS, req.body.monto, req.body.fadqui, req.body.numserie, function (error, respuesta) {

                    if (error) {
                        console.log(error)
                        res.status(404).json({
                            mensaje: respuesta.mensaje
                        })
                    }
                    else {
                        res.status(200).json({
                            mensaje: respuesta.mensaje
                        })
                    }
                    //console.log(respuesta);
                })
            } else {
                console.log("Existen datos vacíos");
                res.status(400).json({
                    mensaje: "Existen datos vacíos"
                });
            }

        }
    })

})

app.post('/insertarMante', (req, res) => {
    Folio(function (error, respuesta) {
        if (error) {
            console.log(error);
            res.status(500).json({
                mensaje: "Error al obtener el folio"
            });
        } else {
            // Una vez que tenemos el folio, procedemos con la inserción
            const folio = respuesta.folio;
            console.log("Folio obtenido: ", folio)
            if (folio && fecha && req.body.falta && req.body.descrip) {
                inserMante(folio, fecha, req.body.falta, req.body.descrip, function (errorMante, respuestaMante) {
                    if (errorMante) {
                        console.error(errorMante);
                        return res.status(404).json({ mensaje: respuestaMante.mensaje });
                    }

                    inser(folio, fecha, req.body.falta, req.body.descrip, function (errorInser, respuestaInser) {
                        if (errorInser) {
                            console.error(errorInser);
                            return res.status(404).json({ mensaje: respuestaInser.mensaje });
                        }

                        // Si no hay errores en ninguna de las inserciones, envía una respuesta exitosa
                        res.status(200).json({
                            mensaje: "Ambas inserciones realizadas con éxito",
                            respuestaMante: respuestaMante,
                            respuestaInser: respuestaInser
                        });
                    });
                });

            } else {
                console.log("Existen datos vacíos");
                res.status(400).json({
                    mensaje: "Existen datos vacíos"
                });
            }

        }
    })


})

app.put('/actualizarPreg', (req, res) => {
    if (req.body.idForms && req.body.preguntas && req.body.estatus) {
        editPreg(req.body.idForms, req.body.preguntas, req.body.estatus, function (error, respuesta) {

            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuesta.mensaje
                })
            }
            else {
                res.status(200).json({
                    mensaje: respuesta.mensaje
                })
            }
            console.log(respuesta);
        })
    }
    else {
        console.log("Existen datos vacíos");
        res.status(400).json({
            mensaje: "Existen datos vacíos"
        });
    }
})


app.delete('/eliminar', (req, res) => {
    if (req.body.id) {
        elim(req.body.id, function (error, respuesta) {

            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuesta.mensaje
                })
            }
            else {
                res.status(200).json({
                    mensaje: respuesta.mensaje
                })
            }
            console.log(respuesta);
        })
    } else {
        console.log("Existen datos vacíos");
        res.status(400).json({
            mensaje: "Existen datos vacíos"
        });
    }
})



app.listen(port, () => {
    console.log(`Port => ${port}`)
    console.log(`Fecha => ${fecha}`)
})