const express = require('express')
const cors = require('cors');
const axios = require('axios');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const most = require('./query/mostrar');
const mostPreg = require('./query/mostPreg');
const mostUnidad = require('./query/mostUnidad');
const mostRespuesta = require('./query/mostRespuesta');
const mostActmantt = require('./query/mostActmantt');
const mostmantt = require('./query/mostMantt');
const mostInsumos = require('./query/mostInsumos');
const mostubi = require('./query/mostUbi');
const mostActif = require('./query/mostActvif');
const mostConsumible = require('./query/mostConsumible');
const mostProveedores = require('./query/mostProveedores');
const mostUsuarioprov = require('./query/mostUsuarioprov');
const mostMaterial = require('./query/mostMaterial');
const Folio = require('./query/folio')
const Folioconsumible = require('./query/folioconsumible')
const inserPre = require('./query/insertPregunta');
const inser = require('./query/insertar');
const inserMante = require('./query/insertMant');
const inserInsumos = require('./query/insertInsumos');
const inserUnidad = require('./query/insertUnidad');
const inserRespuesta = require('./query/insertrespuesta');
const inserUbi = require('./query/insertUbi');
const inserActif = require('./query/insertActif');
const inserConsumible = require('./query/insertConsumible');
const insertarProveedor = require('./query/insertProveedores');
const insertarUsuarioprov = require('./query/insertUsuarioprov');
const insertarMaterial = require('./query/insertMaterial');
const editPreg = require('./query/actualizarPreg');
const editDesinsum = require('./query/actualizarDesinsum');
const editMantt = require('./query/actualizarmantt');
const editActi = require('./query/actualizarActi');
const editConsu = require('./query/actualizarConsu');
const editInsumos = require('./query/actualizarInsumos');
const editProv = require('./query/actualizarProv');
const editMaterial = require('./query/actualizarMate');
const elim = require('./query/eliminar');
const elimUsuarioprov = require('./query/eliminarUsuarioprov');
const verificar_Token = require('./middleware/Valida_Token');
const app = express()
const port = 3001
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
const fecha = moment().format("YYYY-MM-DD");

/* Mostrar */
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
        //console.log(respuesta);
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
        //console.log(respuesta);
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
        //console.log(respuesta);
    })
}
)
app.get('/unidades', (req, res) => {
    mostUnidad(function (error, respuesta) {

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
        //console.log(respuesta);
    })
}
)
app.get('/respuestas', (req, res) => {
    mostRespuesta(function (error, respuesta) {

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
        //console.log(respuesta);
    })
}
)
app.get('/actmantt', (req, res) => {
    mostActmantt(function (error, respuesta) {

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
        //onsole.log(respuesta);
    })
}
)
app.get('/mantenimiento', (req, res) => {
    mostmantt(function (error, respuesta) {

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
        //console.log(respuesta);
    })
}
)
app.get('/insumos', (req, res) => {
    mostInsumos(function (error, respuesta) {

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
        //console.log(respuesta);
    })
}
)
app.get('/ubicacion', (req, res) => {
    mostubi(function (error, respuesta) {

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
        //console.log(respuesta);
    })
}
)
app.get('/actividades', (req, res) => {
    mostActif(function (error, respuesta) {

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
        //console.log(respuesta);
    })
}
)
app.get('/folioconsumible', (req, res) => {
    Folioconsumible(function (error, respuesta) {

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
        //console.log(respuesta);
    })
}
)
app.get('/consumibles', (req, res) => {
    mostConsumible(function (error, respuesta) {

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
        //console.log(respuesta);
    })
}
)
app.get('/proveedores', (req, res) => {
    mostProveedores(function (error, respuesta) {

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
        //console.log(respuesta);
    })
}
)
app.get('/Usuarioprov', (req, res) => {
    mostUsuarioprov(function (error, respuesta) {

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
        //console.log(respuesta);
    })
}
)
app.get('/codigo_postal', async (req, res) => {
    /* EJEMPLO DE CONSULTA: `http://localhost:3001/codigo_postal?cp=${cp}` */
    const cp = req.query.cp;
    //console.log(cp)
    if (!cp || !/^\d{5}$/.test(cp)) {
        res.status(404).json({ mensaje: 'El código postal no es correcto' });
    }
    else {
        try {
            const response = await axios.get(`https://api.tau.com.mx/dipomex/v1/codigo_postal`, {
                params: { cp },
                headers: {
                    APIKEY: '7a20c08510d424b52e0e07809120c919163ba494', // Reemplaza con tu API Key
                },
            });
            const datosback = response.data;
            if (response.status === 500) {
                res.status(404).json({ error: 'Error interno en el servidor externo' });
            }
            res.status(200).json({
                datosback
            })
        } catch (error) {
            //console.error('Error al obtener el código postal:', error);
            //res.status(error.response ? error.response.status : 400).json({ error: 'Error al obtener el código postal' });
            return res.status(404).json({ error: 'El código postal no existe' });
        }

    }
});
app.get('/material', (req, res) => {
    mostMaterial(function (error, respuesta) {

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
        //console.log(respuesta);
    })
}
)
/* Fin de mostrar */

/* Insertar */
app.post('/insertarForms', verificar_Token, (req, res) => {
    const usuario = req.usuario;
    console.log(usuario)
    if (usuario.nombre && req.body.pregunta && req.body.periodo && fecha && req.body.inconformidad && req.body.estatus) {
        inserPre(usuario.nombre, req.body.pregunta, req.body.periodo, fecha, req.body.inconformidad, req.body.estatus, function (error, respuesta) {

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
app.post('/insertarUnidad', (req, res) => {
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
            if (folio && fecha && req.body.Falta && req.body.descrip) {
                inserUnidad(folio, fecha, req.body.Falta, req.body.descrip, function (errorUnidad, respuestaUnidad) {
                    if (errorUnidad) {
                        console.error(errorUnidad);
                        return res.status(404).json({ mensaje: respuestaUnidad.mensaje });
                    } else {
                        inser(folio, fecha, req.body.Falta, req.body.descrip, function (errorInser, respuestaInser) {
                            if (errorInser) {
                                console.error(errorInser);
                                return res.status(404).json({ mensaje: respuestaInser.mensaje });
                            } else {
                                // Si no hay errores en ninguna de las inserciones, envía una respuesta exitosa
                                res.status(200).json({
                                    mensaje: "Ambas inserciones realizadas con éxito",
                                    respuestaUnidad: respuestaUnidad,
                                    respuestaInser: respuestaInser
                                });
                            }
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
    })
})
app.post('/insertarRes', (req, res) => {
    if (req.body.idPregunta && req.body.folioActivo && fecha && req.body.resp) {
        inserRespuesta(req.body.idPregunta, req.body.folioActivo, fecha, req.body.resp, function (error, respuesta) {

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

//Enviar los datos de un solo id para mostrar, actualizar o eliminar
/* app.put('/personas/:id', (req, res) => {
   console.log(req.params)
   }
)  */

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
            if (folio && fecha && req.body.tipoAct && req.body.falta && req.body.descrip && req.body.proveedor && req.body.folioOC && req.body.monto && req.body.fadqui && req.body.numserie) {
                inserInsumos(folio, fecha, req.body.tipoAct, req.body.falta, req.body.descrip, req.body.proveedor, req.body.folioOC, req.body.monto, req.body.fadqui, req.body.numserie, function (error, respuesta) {

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
                //console.log("Existen datos vacíos");
                res.status(400).json({
                    mensaje: "Existen datos vacíos"
                });
            }

        }
    })

})
app.post('/insertarMante', (req, res) => {
    console.log(req.body);
    Folio(function (error, respuesta) {
        if (error) {
            console.log(error);
            res.status(500).json({
                mensaje: "Error al obtener el folio"
            });
        } else {
            // Una vez que tenemos el folio, procedemos con la inserción
            const folio = respuesta.folio;
            console.log(folio)
            const tipo = req.body.tipoAct;
            console.log("Tipo del activo", req.body.tipoAct);
            const noaplica = "NA";
            if (tipo) {
                if (tipo === "MONTACARGAS" || tipo === "MAQUINARIA" || tipo === "VEHÍCULOS" || tipo === "HERRAMIENTA") {
                    if (tipo === "MONTACARGAS") {
                        if (req.body.folioActivo && fecha && noaplica && req.body.tipoAct && req.body.modelo && req.body.capacidad && req.body.clasificacion && noaplica && noaplica && noaplica && noaplica && noaplica && noaplica) {
                            inserMante(req.body.folioActivo, fecha, noaplica, req.body.tipoAct, req.body.modelo, req.body.capacidad, req.body.clasificacion, noaplica, noaplica, noaplica, noaplica, noaplica, noaplica, req.body.idubicacion, function (errorMante, respuestaMante) {
                                if (errorMante) {
                                    console.error(errorMante);
                                    return res.status(404).json({ mensaje: respuestaMante.mensaje });
                                }
                                else {
                                    // Si no hay errores en ninguna de las inserciones, envía una respuesta exitosa
                                    res.status(200).json({
                                        mensaje: respuestaMante.mensaje,
                                    });
                                }
                            });
                        }
                        else {
                            //console.log("Existen datos vacíos");
                            res.status(400).json({
                                mensaje: "Existen datos vacíos"
                            });

                        }
                    }
                    else {
                        if (tipo === "MAQUINARIA") {
                            if (req.body.folioActivo) {
                                if (fecha && noaplica && req.body.tipoAct && req.body.modelo && req.body.capacidad && req.body.clasificacion && noaplica && noaplica && noaplica && noaplica && noaplica && noaplica && noaplica) {
                                    inserMante(req.body.folioActivo, fecha, noaplica, req.body.tipoAct, req.body.modelo, req.body.capacidad, req.body.clasificacion, noaplica, noaplica, noaplica, noaplica, noaplica, noaplica, req.body.idubicacion, function (errorMante, respuestaMante) {
                                        if (errorMante) {
                                            console.error(errorMante);
                                            return res.status(404).json({ mensaje: respuestaMante.mensaje });
                                        }
                                        else {
                                            // Si no hay errores envía una respuesta exitosa
                                            res.status(200).json({
                                                mensaje: respuestaMante.mensaje,
                                            });
                                        }
                                    });

                                }
                                else {
                                    //console.log("Existen datos vacíos");
                                    res.status(400).json({
                                        mensaje: "Existen datos vacíos"
                                    });

                                }

                            }
                            else {
                                if (folio && fecha && noaplica && req.body.tipoAct && req.body.modelo && req.body.capacidad && req.body.clasificacion && noaplica && noaplica && noaplica && noaplica && noaplica && noaplica && noaplica) {
                                    inserMante(folio, fecha, noaplica, req.body.tipoAct, req.body.modelo, req.body.capacidad, req.body.clasificacion, noaplica, noaplica, noaplica, noaplica, noaplica, req.body.descripgen, req.body.idubicacion, function (errorMante, respuestaMante) {
                                        if (errorMante) {
                                            console.error(errorMante);
                                            return res.status(404).json({ mensaje: respuestaMante.mensaje });
                                        }
                                        else {
                                            inser(folio, fecha, function (errorInser, respuestaInser) {
                                                if (errorInser) {
                                                    console.error(errorInser);
                                                    return res.status(404).json({ mensaje: respuestaInser.mensaje });
                                                } else {
                                                    // Si no hay errores en ninguna de las inserciones, envía una respuesta exitosa
                                                    res.status(200).json({
                                                        mensaje: respuestaMante.mensaje,
                                                        /* respuestaMante: respuestaMante,
                                                        respuestaInser: respuestaInser */
                                                    });
        
                                                    console.log("RESPUESTA",respuestaMante.mensaje)
                                                }
                                            });
                                        }
                                    });

                                }
                                else {
                                    //console.log("Existen datos vacíos");
                                    res.status(400).json({
                                        mensaje: "Existen datos vacíos"
                                    });

                                }
                            }
                        }
                        else {
                            if (tipo === "VEHÍCULOS") {
                                if (req.body.folioActivo && fecha && noaplica && req.body.tipoAct && req.body.modelo && noaplica && req.body.clasificacion && req.body.nmotor && noaplica && noaplica && noaplica && noaplica && noaplica) {
                                    inserMante(req.body.folioActivo, fecha, noaplica, req.body.tipoAct, req.body.modelo, noaplica, req.body.clasificacion, req.body.nmotor, noaplica, noaplica, noaplica, noaplica, noaplica, req.body.idubicacion, function (errorMante, respuestaMante) {
                                        if (errorMante) {
                                            console.error(errorMante);
                                            return res.status(404).json({ mensaje: respuestaMante.mensaje });
                                        }
                                        else {
                                            // Si no hay errores en ninguna de las inserciones, envía una respuesta exitosa
                                            res.status(200).json({
                                                mensaje: respuestaMante.mensaje,
                                            });
                                        }
                                    });
                                }
                                else {
                                    //console.log("Existen datos vacíos");
                                    res.status(400).json({
                                        mensaje: "Existen datos vacíos"
                                    });
                                }
                            } else {
                                if (tipo === "HERRAMIENTA") {
                                    if (req.body.folioActivo && fecha && noaplica && req.body.tipoAct && req.body.modelo && noaplica && noaplica && noaplica && noaplica && noaplica && req.body.marca && noaplica && noaplica && noaplica) {
                                        inserMante(req.body.folioActivo, fecha, noaplica, req.body.tipoAct, req.body.modelo, noaplica, noaplica, noaplica, noaplica, noaplica, req.body.marca, noaplica, noaplica, req.body.idubicacion, function (errorMante, respuestaMante) {
                                            if (errorMante) {
                                                console.error(errorMante);
                                                return res.status(404).json({ mensaje: respuestaMante.mensaje });
                                            }
                                            else {
                                                // Si no hay errores en ninguna de las inserciones, envía una respuesta exitosa
                                                res.status(200).json({
                                                    mensaje: respuestaMante.mensaje,
                                                });
                                            }
                                        });
                                    }
                                    else {
                                        //console.log("Existen datos vacíos");
                                        res.status(400).json({
                                            mensaje: "Existen datos vacíos"
                                        });

                                    }


                                }
                            }
                        }


                    }

                } else {
                    if (tipo === "INFRAESTRUCTURA") {
                        if (folio && fecha && noaplica && req.body.tipoAct && noaplica && noaplica && req.body.clasificacion && noaplica && noaplica && noaplica && noaplica && req.body.descripadi && req.body.descripgen && req.body.idubicacion) {
                            inserMante(folio, fecha, noaplica, req.body.tipoAct, noaplica, noaplica, req.body.clasificacion, noaplica, noaplica, noaplica, noaplica, req.body.descripadi, req.body.descripgen, req.body.idubicacion, function (errorMante, respuestaMante) {
                                if (errorMante) {
                                    console.error(errorMante);
                                    return res.status(404).json({ mensaje: respuestaMante.mensaje });
                                } else {
                                    inser(folio, fecha, function (errorInser, respuestaInser) {
                                        if (errorInser) {
                                            console.error(errorInser);
                                            return res.status(404).json({ mensaje: respuestaInser.mensaje });
                                        } else {
                                            // Si no hay errores en ninguna de las inserciones, envía una respuesta exitosa
                                            res.status(200).json({
                                                mensaje: respuestaMante.mensaje,
                                                /* respuestaMante: respuestaMante,
                                                respuestaInser: respuestaInser */
                                            });

                                            console.log("RESPUESTA",respuestaMante.mensaje)
                                        }
                                    });
                                }
                            });
                        }
                        else {
                            //console.log("Existen datos vacíos");
                            res.status(400).json({
                                mensaje: "Existen datos vacíos"
                            });
                        }


                    }
                    else {
                        if (tipo === "EQUIPOS DE CONTENCIÓN" || tipo === "EQUIPOS PARA MANEJO DE MATERIALES") {
                            if (folio && fecha && req.body.fabricacion && req.body.tipoAct && noaplica && req.body.capacidad && req.body.clasificacion && noaplica && req.body.tipocontmate && req.body.espeficicacion && noaplica && noaplica && req.body.descripgen && req.body.idubicacion) {
                                inserMante(folio, fecha, req.body.fabricacion, req.body.tipoAct, noaplica, req.body.capacidad, req.body.clasificacion, noaplica, req.body.tipocontmate, req.body.espeficicacion, noaplica, noaplica, req.body.descripgen, req.body.idubicacion, function (errorMante, respuestaMante) {
                                    if (errorMante) {
                                        console.error(errorMante);
                                        return res.status(404).json({ mensaje: respuestaMante.mensaje });
                                    } else {
                                        inser(folio, fecha, function (errorInser, respuestaInser) {
                                            if (errorInser) {
                                                console.error(errorInser);
                                                return res.status(404).json({ mensaje: respuestaInser.mensaje });
                                            } else {
                                                // Si no hay errores en ninguna de las inserciones, envía una respuesta exitosa
                                                res.status(200).json({
                                                    mensaje: respuestaMante.mensaje,
                                                    /* respuestaMante: respuestaMante,
                                                    respuestaInser: respuestaInser */
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                            else {
                                //console.log("Existen datos vacíos");
                                res.status(400).json({
                                    mensaje: "Existen datos vacíos"
                                });

                            }

                        }
                    }
                }
            }
            else {
                //console.log("Existen datos vacíos");
                res.status(400).json({
                    mensaje: "Existen datos vacíos"
                });
            }


        }
    })
})
app.post('/insertarUbi', (req, res) => {
    if (fecha && req.body.descrip && req.body.area) {
        inserUbi(fecha, req.body.descrip, req.body.area, function (error, respuesta) {

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
app.post('/insertarActif', (req, res) => {
    //console.log(req.body);
    // timestandar,hora,minutos
    const fam = "NA";
    const proc = "NA";
    if (req.body.unidad&& req.body.responsable && req.body.actividad && fecha && req.body.ubicacion && req.body.minutos) {
        if (req.body.unidad === "SI") {
            if (req.body.kg && req.body.familias && req.body.productos) {
                if (req.body.hora) {
                    if (req.body.hora <= 24 && req.body.hora >= 1 && req.body.minutos <= 55 && req.body.minutos >= 0) {
                        //console.log(req.body.hora, req.body.minutos)
                        var tiempoest = 0;
                        const horaN = parseInt(req.body.hora) * 60;
                        tiempoest = horaN + parseInt(req.body.minutos);
                        console.log(tiempoest);
                        inserActif(req.body.actividad, fecha, req.body.kg, req.body.familias, req.body.productos, req.body.ubicacion, tiempoest, req.body.hora, req.body.minutos, function (error, respuesta) {

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
                        console.log("Algo esta mal en hora y minutos")
                        console.log("Existen datos vacíos");
                        res.status(400).json({
                            mensaje: "Los valores de hora y minutos son incorrectos"
                        });

                    }

                }
                else {
                    if (req.body.minutos <= 55 && req.body.minutos >= 1) {
                        const hora = 0;
                        inserActif(req.body.actividad, fecha, req.body.kg, req.body.familias, req.body.productos, req.body.ubicacion, req.body.minutos, hora, req.body.minutos, function (error, respuesta) {

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
                        console.log("Algo esta mal en hora y minutos")
                        console.log("Existen datos vacíos");
                        res.status(400).json({
                            mensaje: "Los valores de minutos son incorrectos"
                        });

                    }
                }
            }
        }
        else {
            if (req.body.unidad === "NO") {
                if (req.body.hora) {
                    if (req.body.hora <= 24 && req.body.hora >= 1 && req.body.minutos <= 55 && req.body.minutos >= 0) {
                        //console.log(req.body.hora, req.body.minutos)
                        var tiempoest = 0;
                        const horaN = parseInt(req.body.hora) * 60;
                        tiempoest = horaN + parseInt(req.body.minutos);
                        console.log(tiempoest);
                        inserActif(req.body.responsable, req.body.actividad, fecha, req.body.kg, fam, proc, req.body.ubicacion, tiempoest, req.body.hora, req.body.minutos, function (error, respuesta) {

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
                        console.log("Algo esta mal en hora y minutos")
                        console.log("Existen datos vacíos");
                        res.status(400).json({
                            mensaje: "Los valores de hora y minutos son incorrectos"
                        });

                    }

                }
                else {
                    if (req.body.minutos <= 55 && req.body.minutos >= 1) {
                        const hora = 0;
                        inserActif(req.body.responsable, req.body.actividad, fecha, req.body.kg, fam, proc, req.body.ubicacion, req.body.minutos, hora, req.body.minutos, function (error, respuesta) {

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
                        console.log("Algo esta mal en hora y minutos")
                        console.log("Existen datos vacíos");
                        res.status(400).json({
                            mensaje: "Los valores de minutos son incorrectos"
                        });

                    }
                }

            }
        }

    }
    else {
        console.log("Existen datos vacíos");
        res.status(400).json({
            mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
        });
    }
})
app.post('/insertarConsumibles', (req, res) => {
    Folioconsumible(function (error, respuesta) {
        if (error) {
            console.log(error);
            res.status(500).json({
                mensaje: "Error al obtener el folio"
            });
        } else {
            // Una vez que tenemos el folio, procedemos con la inserción
            const folio = respuesta.folio;
            //console.log("Folio obtenido: ", folio)
            if (folio && fecha && req.body.unidadmedida && req.body.fracciones && req.body.tipo && req.body.descripcion) {
                if (req.body.enteros) {
                    if (req.body.enteros >= 1 && req.body.fracciones >= 1 && req.body.fracciones <= 1000) {
                        var canestandar = 0;
                        const Nenteros = parseInt(req.body.enteros) * 1000;
                        canestandar = parseInt(req.body.fracciones) + Nenteros;

                        console.log("Todo bien", canestandar);
                        inserConsumible(folio, fecha, req.body.unidadmedida, req.body.enteros, req.body.fracciones, canestandar, req.body.tipo, req.body.descripcion, function (error, respuesta) {
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
                }
                else {
                    const enteros = 0;
                    inserConsumible(folio, fecha, req.body.unidadmedida, enteros, req.body.fracciones, req.body.fracciones, req.body.tipo, req.body.descripcion, function (error, respuesta) {
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
            } else {
                //console.log("Existen datos vacíos");
                res.status(400).json({
                    mensaje: "Existen datos vacíos"
                });
            }

        }
    })

})
app.post('/insertarProveedor', (req, res) => {
    const foliorpm = "FOLIORPM";
    if (req.body.idusuarioprov && foliorpm && fecha && req.body.nombre && req.body.email && req.body.movil && req.body.tel && req.body.rsocial && req.body.rfc &&
        req.body.rfiscal && req.body.cfdi && req.body.fpago && req.body.calle && req.body.next && req.body.colonia && req.body.ninten && req.body.municipio &&
        req.body.ciudad && req.body.cpostal && req.body.cnombre && req.body.cemail && req.body.cmovil && req.body.ctel && req.body.beneficiario && req.body.nombanco &&
        req.body.clabe && req.body.cuenta && req.body.refpago && req.body.credito) {
        insertarProveedor(foliorpm, fecha, req.body.nombre, req.body.email, req.body.movil, req.body.tel, req.body.rsocial, req.body.rfc,
            req.body.rfiscal, req.body.cfdi, req.body.fpago, req.body.calle, req.body.next, req.body.colonia, req.body.ninten, req.body.municipio,
            req.body.ciudad, req.body.cpostal, req.body.cnombre, req.body.cemail, req.body.cmovil, req.body.ctel, req.body.beneficiario, req.body.nombanco,
            req.body.clabe, req.body.cuenta, req.body.refpago, req.body.credito, req.body.cdias, function (error, respuesta) {

                if (error) {
                    console.log(error)
                    res.status(404).json({
                        mensaje: respuesta.mensaje
                    })
                }
                else {
                    elimUsuarioprov(req.body.idusuarioprov, function (error, respuesta) {

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
                //console.log(respuesta);
            })
    } else {
        //console.log("Existen datos vacíos");
        res.status(400).json({
            mensaje: "Existen datos vacíos"
        });
    }
})
app.post('/insertarUsuariprov', (req, res) => {
    const foliorpm = "FOLIORPM";
    if (foliorpm && fecha && req.body.nombre && req.body.email && req.body.movil && req.body.tel && req.body.rsocial && req.body.rfc &&
        req.body.rfiscal && req.body.cfdi && req.body.fpago && req.body.calle && req.body.next && req.body.colonia && req.body.ninten && req.body.municipio &&
        req.body.ciudad && req.body.cpostal && req.body.cnombre && req.body.cemail && req.body.cmovil && req.body.ctel && req.body.beneficiario && req.body.nombanco &&
        req.body.clabe && req.body.cuenta && req.body.refpago && req.body.credito) {
        insertarUsuarioprov(foliorpm, fecha, req.body.nombre, req.body.email, req.body.movil, req.body.tel, req.body.rsocial, req.body.rfc,
            req.body.rfiscal, req.body.cfdi, req.body.fpago, req.body.calle, req.body.next, req.body.colonia, req.body.ninten, req.body.municipio,
            req.body.ciudad, req.body.cpostal, req.body.cnombre, req.body.cemail, req.body.cmovil, req.body.ctel, req.body.beneficiario, req.body.nombanco,
            req.body.clabe, req.body.cuenta, req.body.refpago, req.body.credito, req.body.cdias, function (error, respuesta) {

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
        //console.log("Existen datos vacíos");
        res.status(400).json({
            mensaje: "Existen datos vacíos"
        });
    }
})
app.post('/insertarMaterial', (req, res) => {
    if (fecha && req.body.fam && req.body.produc) {
        insertarMaterial(fecha, req.body.fam, req.body.produc, function (error, respuesta) {

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
/* Fin de insertar */


/* Actualizar */
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
app.put('/actualizarDesinsum', (req, res) => {
    if (req.body.folioActivo && req.body.descripgen) {
        //console.log(req.body)
        editDesinsum(req.body.folioActivo, req.body.descripgen, function (error, respuesta) {
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
app.put('/actualizarmantt', (req, res) => {
    if (req.body.id && req.body.idubicacion) {
        //console.log(req.body)
        editMantt(req.body.id, req.body.idubicacion, function (error, respuesta) {
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
app.put('/actualizaractivi', (req, res) => {
    console.log(req.body)
    if (req.body.idactividades && req.body.actividad && req.body.hora && req.body.minutos) {
        if (req.body.hora) {
            //console.log(req.body);
            if (req.body.hora <= 24 && req.body.hora >= 1 && req.body.minutos <= 55 && req.body.minutos >= 1) {
                //console.log(req.body.hora, req.body.minutos)
                var tiempoest = 0;
                const horaN = parseInt(req.body.hora) * 60;
                tiempoest = horaN + parseInt(req.body.minutos);
                console.log(tiempoest);
                editActi(req.body.idactividades, req.body.actividad, tiempoest, req.body.hora, req.body.minutos, function (error, respuesta) {

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
                console.log("Algo esta mal en hora y minutos")
                console.log("Existen datos vacíos");
                res.status(400).json({
                    mensaje: "Los valores de hora y minutos son incorrectos"
                });

            }

        }
        else {
            if (req.body.minutos <= 55 && req.body.minutos >= 1) {
                //console.log(req.body);
                const hora = 0;
                editActi(req.body.idactividades, req.body.actividad, req.body.minutos, hora, req.body.minutos, function (error, respuesta) {

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
                console.log("Algo esta mal en hora y minutos")
                console.log("Existen datos vacíos");
                res.status(400).json({
                    mensaje: "Los valores de minutos son incorrectos"
                });

            }
        }

    }
    else {
        console.log("Existen datos vacíos");
        res.status(400).json({
            mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
        });
    }
})
app.put('/actualizarconsu', (req, res) => {

    if (req.body.id && req.body.unidadmedida && req.body.fracciones && req.body.tipo && req.body.descripcion) {
        if (req.body.enteros) {
            if (req.body.enteros >= 1 && req.body.fracciones >= 1 && req.body.fracciones <= 1000) {
                var canestandar = 0;
                const Nenteros = parseInt(req.body.enteros) * 1000;
                canestandar = parseInt(req.body.fracciones) + Nenteros;
                console.log("Todo bien", canestandar);
                editConsu(req.body.id, req.body.unidadmedida, req.body.enteros, req.body.fracciones, canestandar, req.body.tipo, req.body.descripcion, function (error, respuesta) {
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
        }
        else {
            const enteros = 0;
            editConsu(req.body.id, enteros, req.body.fracciones, req.body.fracciones, req.body.tipo, req.body.descripcion, function (error, respuesta) {
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
    } else {
        //console.log("Existen datos vacíos");
        res.status(400).json({
            mensaje: "Existen datos vacíos"
        });
    }


})
app.put('/actualizarInsumos', (req, res) => {
    if (req.body.IdInsumos && req.body.proveedor && req.body.monto && req.body.Numserie && req.body.folioOC) {
        editInsumos(req.body.IdInsumos, req.body.proveedor, req.body.monto, req.body.Numserie, req.body.folioOC, function (error, respuesta) {

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
app.put('/actualizarProv', (req, res) => {
    if (req.body.idproveedor && req.body.nombre && req.body.email && req.body.movil && req.body.tel && req.body.rsocial && req.body.rfc &&
        req.body.rfiscal && req.body.cfdi && req.body.fpago && req.body.calle && req.body.next && req.body.colonia && req.body.ninten && req.body.municipio &&
        req.body.ciudad && req.body.cpostal && req.body.cnombre && req.body.cemail && req.body.cmovil && req.body.ctel && req.body.beneficiario && req.body.nombanco &&
        req.body.clabe && req.body.cuenta && req.body.refpago && req.body.credito) {
        editProv(req.body.idproveedor, req.body.nombre, req.body.email, req.body.movil, req.body.tel, req.body.rsocial, req.body.rfc,
            req.body.rfiscal, req.body.cfdi, req.body.fpago, req.body.calle, req.body.next, req.body.colonia, req.body.ninten, req.body.municipio,
            req.body.ciudad, req.body.cpostal, req.body.cnombre, req.body.cemail, req.body.cmovil, req.body.ctel, req.body.beneficiario, req.body.nombanco,
            req.body.clabe, req.body.cuenta, req.body.refpago, req.body.credito, req.body.cdias, function (error, respuesta) {

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
        //console.log("Existen datos vacíos");
        res.status(400).json({
            mensaje: "Existen datos vacíos"
        });
    }
})
app.put('/actualizarPreg', (req, res) => {
    if (req.body.idmaterial && req.body.familia && req.body.producto) {
        editMaterial(req.body.idmaterial, req.body.familia, req.body.producto, function (error, respuesta) {

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
/* Fin de actualizar */



/* Borrar */
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
/* Fin de borrar */


app.listen(port, () => {
    console.log(`Port => ${port}`)
    console.log(`Fecha => ${fecha}`)
})