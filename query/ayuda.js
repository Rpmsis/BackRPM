if (fechaForm === fecha) {
    mostEventostodos(function (error, respuesta) {
        if (error) {
            console.log(error)
        }
        else {
            console.log("registrados:", respuesta.respuesta);
            const registrados = respuesta.respuesta;
            const verificar2 = registrados.find((filtro) => filtro.idusuario === log.deviceUserId && filtro.horafin === "NA");
            //console.log(verificar2);
            //console.log("Se supone que aqui verificas la hora de salida");
            if (verificar2) {
                const fechafinal = moment(verificar2.fecha).add(1, 'days').format('YYYY-MM-DD');
                if (fechaForm === fechafinal) {
                    if (diasemana === "Saturday" || diasemana === "Sunday") {
                        if (verificar2.estatus === "RETARDO") {
                            if (horabio >= verificar.horasalidaMD) {
                                console.log(horabio);
                                const motivo = "NA";
                                editAsistencia(verificar2.idasistencia, horaForm, verificar2.estatus, motivo, function (error, respuesta) {
                                    if (error) {
                                        console.log(error);
                                    }
                                    else {
                                        //console.log(respuesta);
                                        io.emit('escuchando', respuesta);
                                    }
                                    //console.log(respuesta);
                                })
                            } else {
                                console.log("NO TIENE HORA DE SALIDA");

                            }
                        } else {
                            if (verificar2.estatus === "ENTRADA") {
                                if (horabio >= verificar.horasalidaMD) {
                                    const estatus = "ASISTENCIA";
                                    //console.log(horabio);
                                    const motivo = "NA";
                                    editAsistencia(verificar2.idasistencia, horaForm, estatus, motivo, function (error, respuesta) {
                                        if (error) {
                                            console.log(error);
                                        }
                                        else {
                                            //console.log(respuesta);
                                            io.emit('escuchando', respuesta);
                                        }
                                        //console.log(respuesta);
                                    })
                                } else {
                                    //console.log("NO TIENE HORA DE SALIDA");

                                }
                            }
                            else {
                                //console.log("TIENE UN ESTATUS DESCONOCIDO");
                            }

                        }
                    }
                    else {
                        if (verificar2.estatus === "RETARDO") {
                            if (horabio >= verificar.horasalida) {
                                console.log(horabio);
                                const motivo = "NA";
                                editAsistencia(verificar2.idasistencia, horaForm, verificar2.estatus, motivo, function (error, respuesta) {
                                    if (error) {
                                        console.log(error);
                                    }
                                    else {
                                        //console.log(respuesta);
                                        io.emit('escuchando', respuesta);
                                    }
                                    //console.log(respuesta);
                                })
                            } else {
                                console.log("NO TIENE HORA DE SALIDA");

                            }
                        } else {
                            if (verificar2.estatus === "ENTRADA") {
                                if (horabio >= verificar.horasalida) {
                                    const estatus = "ASISTENCIA";
                                    //console.log(horabio);
                                    const motivo = "NA";
                                    editAsistencia(verificar2.idasistencia, horaForm, estatus, motivo, function (error, respuesta) {
                                        if (error) {
                                            console.log(error);
                                        }
                                        else {
                                            //console.log(respuesta);
                                            io.emit('escuchando', respuesta);
                                        }
                                        //console.log(respuesta);
                                    })
                                } else {
                                    //console.log("NO TIENE HORA DE SALIDA");

                                }
                            }
                            else {
                                //console.log("TIENE UN ESTATUS DESCONOCIDO");
                            }

                        }
                    }
                }
            } else {
                mostEventosbio(fecha, function (error, respuesta) {
                    if (error) {
                        console.log(error)
                    }
                    else {
                        console.log("registrados:", respuesta.respuesta);
                        const registrados = respuesta.respuesta;
                        console.log(verificar.turno);
                        if (registrados && registrados.length > 0) {
                            if (diasemana === "Saturday" || diasemana === "Sunday") {
                                //console.log("algo esta mal");
                                //console.log("HORA ENTRADA ", verificar.horaentrada);
                                //console.log("HORA SALIDA ", verificar.horasalida);
                                if (!registrados.find(reg => reg.idusuario === log.deviceUserId)) {

                                    const horaguardada = verificar.horaentradaMD.split(":");
                                    var minutos = parseInt(horaguardada[0]) * 60 + parseInt(horaguardada[1]);
                                    console.log("Minutos unahora antes ", minutos);

                                    const menoshora = minutos - 60;

                                    const horantes = Math.floor(menoshora / 60);
                                    const minutosantes = menoshora % 60;

                                    const unahorantes = horantes + ':' + minutosantes;

                                    if (horabio > unahorantes) {
                                        //console.log("Aqui insertas datos nuevos: ", log.deviceUserId, "bioId", log.userSn, " Fecha: ", fechaForm, "hora: ", horaForm);
                                        if (horabio <= verificar.horaentradaMD) {

                                            const estatus = "ENTRADA";
                                            const motivo = "NA";
                                            const horafin = "NA";
                                            //console.log("estatus ENTRADA");
                                            insertarAsistencia(log.deviceUserId, fechaForm, horaForm, horafin, estatus, motivo, (error, respuesta) => {
                                                if (error) {
                                                    console.error('Error al insertar asistencia:', error.mensaje);
                                                } else {
                                                    //console.log(respuesta);
                                                    io.emit('escuchando', respuesta);

                                                }
                                            });
                                        }
                                        else {
                                            const estatus = "RETARDO";
                                            const motivo = "NA";
                                            const horafin = "NA";
                                            //console.log("Estatus RETARDO");
                                            insertarAsistencia(log.deviceUserId, fechaForm, horaForm, horafin, estatus, motivo, (error, respuesta) => {
                                                if (error) {
                                                    console.error('Error al insertar asistencia:', error.mensaje);
                                                } else {
                                                    //console.log(respuesta);
                                                    io.emit('escuchando', respuesta);

                                                }
                                            });

                                        }
                                    }
                                }
                            }
                            else {
                                if (!registrados.find(reg => reg.idusuario === log.deviceUserId)) {
                                    const horaguardada = verificar.horaentrada.split(":");
                                    var minutos = parseInt(horaguardada[0]) * 60 + parseInt(horaguardada[1]);
                                    console.log("Minutos unahora antes ", minutos);

                                    const menoshora = minutos - 60;

                                    const horantes = Math.floor(menoshora / 60);
                                    const minutosantes = menoshora % 60;

                                    const unahorantes = horantes + ':' + minutosantes;

                                    if (horabio > unahorantes) {
                                        //console.log("Aqui insertas datos nuevos: ", log.deviceUserId, "bioId", log.userSn, " Fecha: ", fechaForm, "hora: ", horaForm);
                                        if (horabio <= verificar.horaentrada) {
                                            const estatus = "ENTRADA";
                                            const motivo = "NA";
                                            const horafin = "NA";
                                            //console.log("estatus ENTRADA");
                                            insertarAsistencia(log.deviceUserId, fechaForm, horaForm, horafin, estatus, motivo, (error, respuesta) => {
                                                if (error) {
                                                    console.error('Error al insertar asistencia:', error.mensaje);
                                                } else {
                                                    //console.log(respuesta);
                                                    io.emit('escuchando', respuesta);

                                                }
                                            });
                                        }
                                        else {
                                            const estatus = "RETARDO";
                                            const motivo = "NA";
                                            const horafin = "NA";
                                            //console.log("Estatus RETARDO");
                                            insertarAsistencia(log.deviceUserId, fechaForm, horaForm, horafin, estatus, motivo, (error, respuesta) => {
                                                if (error) {
                                                    console.error('Error al insertar asistencia:', error.mensaje);
                                                } else {
                                                    //console.log(respuesta);
                                                    io.emit('escuchando', respuesta);

                                                }
                                            });

                                        }
                                    }

                                }

                            }

                        }
                        else {
                            //console.log("no existen registros");

                            if (diasemana === "Saturday" || diasemana === "Sunday") {
                                //console.log("HORA ENTRADA ", verificar.horaentrada);
                                //console.log("HORA SALIDA ", verificar.horasalida);

                                const horaguardada = verificar.horaentradaMD.split(":");
                                var minutos = parseInt(horaguardada[0]) * 60 + parseInt(horaguardada[1]);
                                console.log("Minutos unahora antes ", minutos);

                                const menoshora = minutos - 60;

                                const horantes = Math.floor(menoshora / 60);
                                const minutosantes = menoshora % 60;

                                const unahorantes = horantes + ':' + minutosantes;

                                if (horabio > unahorantes) {
                                    if (horabio <= verificar.horaentradaMD) {
                                        const estatus = "ENTRADA";
                                        const motivo = "NA";
                                        const horafin = "NA";
                                        //console.log("estatus ENTRADA");
                                        insertarAsistencia(log.deviceUserId, fechaForm, horaForm, horafin, estatus, motivo, (error, respuesta) => {
                                            if (error) {
                                                console.error('Error al insertar asistencia:', error.mensaje);
                                            } else {
                                                //console.log(respuesta);
                                                io.emit('escuchando', respuesta);

                                            }
                                        });

                                    }
                                    else {
                                        const estatus = "RETARDO";
                                        const motivo = "NA";
                                        const horafin = "NA";
                                        //console.log("Estatus RETARDO");
                                        insertarAsistencia(log.deviceUserId, fechaForm, horaForm, horafin, estatus, motivo, (error, respuesta) => {
                                            if (error) {
                                                console.error('Error al insertar asistencia:', error.mensaje);
                                            } else {
                                                //console.log(respuesta);
                                                io.emit('escuchando', respuesta);

                                            }
                                        });
                                    }
                                }



                            }
                            else {
                                //console.log("HORA ENTRADA ", verificar.horaentrada);
                                //console.log("HORA SALIDA ", verificar.horasalida);
                                const horaguardada = verificar.horaentrada.split(":");
                                var minutos = parseInt(horaguardada[0]) * 60 + parseInt(horaguardada[1]);
                                console.log("Minutos unahora antes ", minutos);

                                const menoshora = minutos - 60;

                                const horantes = Math.floor(menoshora / 60);
                                const minutosantes = menoshora % 60;

                                const unahorantes = horantes + ':' + minutosantes;

                                if (horabio > unahorantes) {
                                    if (horabio <= verificar.horaentrada) {
                                        const estatus = "ENTRADA";
                                        const motivo = "NA";
                                        const horafin = "NA";
                                        //console.log("estatus ENTRADA");
                                        insertarAsistencia(log.deviceUserId, fechaForm, horaForm, horafin, estatus, motivo, (error, respuesta) => {
                                            if (error) {
                                                console.error('Error al insertar asistencia:', error.mensaje);
                                            } else {
                                                //console.log(respuesta);
                                                io.emit('escuchando', respuesta);

                                            }
                                        });
                                    }
                                    else {
                                        const estatus = "RETARDO";
                                        const motivo = "NA";
                                        const horafin = "NA";
                                        //console.log("Estatus RETARDO");
                                        insertarAsistencia(log.deviceUserId, fechaForm, horaForm, horafin, estatus, motivo, (error, respuesta) => {
                                            if (error) {
                                                console.error('Error al insertar asistencia:', error.mensaje);
                                            } else {
                                                //console.log(respuesta);
                                                io.emit('escuchando', respuesta);

                                            }
                                        });
                                    }

                                }

                            }


                        }
                    }
                })

            }

        }
    })
}
