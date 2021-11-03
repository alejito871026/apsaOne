<template>
    <div>
        <h1 class="text-center p-4">Creditos activos </h1>
        <br>
        <div v-if="busqueda">
            <div class="input-group mb-3">
                    <input class="form-control mr-sm-2" type="text" @keyup="buscando"  v-model="x"  placeholder="Buscar">
                    
            </div>
        </div>
        <div v-if="alerta" class="text-center">
            <div class="alert alert-danger">
                <strong>Oops!</strong> No existen <a class="alert-link">creditos aprobados, asociados a este numero de cedula</a>.
            </div>
        </div>
        <div v-if="alerta2" class="text-center">
            <div class="alert alert-danger">
                <strong>Oops!</strong> Esta vacio <a class="alert-link">Debes escribir un numero de cedula</a>.
            </div>
        </div>
        <div v-if="alerta3" class="text-center">
            <div class="alert alert-danger">
                <strong>Oops!</strong> Son letras <a class="alert-link">Debes escribir un numero de cedula</a>.
            </div>
        </div>
        <div v-if="encabezado" class="text-center">
            <h2 class="p-4">Creditos aprobados asociados al numero de cedula: {{this.buscar}}</h2>
        </div>
        <div style="height: auto; max-height: 800px; overflow-y: scroll;" v-if="!verCred">
            <table class="table table-hover border table-sm bg-white text-dark table-responsive-sm">
                <thead class="sticky-top text-white bg-dark">
                    <tr>
                        <th>index</th>
                        <th># credito</th>
                        <th>Nombre</th>
                        <th>telefonos Cliente</th>
                        <th>Direccion</th>
                        <th>Servicio</th>
                        <th>Valor cuota</th>
                        <th>fp</th>
                        <th>En mora</th>
                        <th class="text-center">Ver</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(credito, index) in Creditos.slice().reverse()" :key="credito.id" @click="verCreditoUnico(credito._id)">
                        <td>{{index+1}}</td>
                        <td>{{credito.numeroCredito}}</td>
                        <td>{{credito.nombreCliente}}</td>
                        <td>{{credito.telefono}}</td>
                        <td>{{credito.direccion}}</td>
                        <td>{{credito.servicio}}</td>
                        <td>{{credito.valCuotaMens}}</td>
                        <td>{{fecha2(credito.Fp)}}</td>
                        <td v-if="!credito.enMora"></td>
                        <td v-if="credito.enMora" class="bg-danger">En mora</td>
                        <td class="text-center">
                            <button  class="btn btn-primary btn-sm"><i class="fa fa-eye"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-if="verCred">
            <div class="card text-center">
                <div id="imprimir">
                    <div class="card-header">
                        <h2>Credito # {{verCreditoU.numeroCredito}}</h2>
                    </div>
                </div>
                <div class="card-body">
                    <div id="imprimir1">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <label class="input-group-text"> Nombre del cliente </label>
                            </div>
                            <div id class="form-control" v-if="yes">{{cliente.nombreCliente}} {{cliente.primerApellidoCliente}} {{cliente.segundoApellidoCliente}}</div>
                            <div id class="form-control" v-if="!yes">{{verCreditoU.nombreCliente}}</div>
                        </div>
                        <div class="input-group mb-3" v-if="yes">
                            <div class="input-group-prepend">
                                <label class="input-group-text"> # Telefono celular </label>
                            </div>
                            <div id class="form-control">{{cliente.celularUno}}</div>
                            <div class="input-group-prepend">
                                <label class="input-group-text">Otro # de contacto</label>
                            </div>
                            <div id class="form-control">{{cliente.celularDos}}</div>
                        </div>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <label class="input-group-text">Servicio</label>
                            </div>
                            <div id class="form-control">{{verCreditoU.servicio}}</div>
                            <div class="input-group-prepend">
                                <label class="input-group-text">Monto Aprobado</label>
                            </div>
                            <div id class="form-control">{{verCreditoU.cantidad}}</div>
                        </div>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <label class="input-group-text">proximo pago</label>
                            </div>
                            <div id class="form-control">{{Fn}} por valor de {{verCreditoU.valCuotaMens}}</div>
                                <div class="input-group-prepend">
                                <label class="input-group-text">Total credito</label>
                            </div>
                            <div id class="form-control">{{valTotalCredito}}</div>
                            <div class="input-group-prepend">
                                <label class="input-group-text">Fecha solicitud</label>
                            </div>
                            <div id class="form-control">{{verCreditoU.fechaAgregado}}</div>
                        </div>   
                        <div class="btn btn-block bg-info text-white" @click="infoAdicional = true"><strong>ver informacion adicional</strong></div>  
                        <div v-if="infoAdicional">
                            <div class="row" v-if="rff">
                                <div class="col-md-6">
                                    <div class="container p-3"><strong><h3>Ref Familiares</h3></strong></div>
                                    <table class="table table-hover table-danger">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Nombre</th>
                                                <th>Direccion</th>
                                                <th># Telefonico</th>
                                                <th>Parentesco</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>{{rfamiliaruno.nombreRF}}</td>                                            
                                            <td>{{rfamiliaruno.direccionRF}}</td>
                                            <td>{{rfamiliaruno.telefonoRF}}</td>
                                            <td>{{rfamiliaruno.parentescoRF}}</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>{{rfamiliardos.nombreRF}}</td>                                            
                                            <td>{{rfamiliardos.direccionRF}}</td>
                                            <td>{{rfamiliardos.telefonoRF}}</td>
                                            <td>{{rfamiliardos.parentescoRF}}</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>{{rfamiliartres.nombreRF}}</td>                                            
                                            <td>{{rfamiliartres.direccionRF}}</td>
                                            <td>{{rfamiliartres.telefonoRF}}</td>
                                            <td>{{rfamiliartres.parentescoRF}}</td>
                                        </tr>
                                    </tbody>
                                    </table>
                                </div>
                                <div class="col-md-6">
                                    <div class="container p-3"><strong><h3>Ref personales</h3></strong></div>
                                    <table class="table table-hover table-danger">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Nombre</th>
                                                <th>Direccion</th>
                                                <th># Telefonico</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>{{rfpersonaluno.nombreRF}}</td>                                            
                                                <td>{{rfpersonaluno.direccionRF}}</td>
                                                <td>{{rfpersonaluno.telefonoRF}}</td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>{{rfpersonaldos.nombreRF}}</td>                                            
                                                <td>{{rfpersonaldos.direccionRF}}</td>
                                                <td>{{rfpersonaldos.telefonoRF}}</td>
                                            </tr>
                                            <tr>
                                                <td>3</td>
                                                <td>{{rfpersonaltres.nombreRF}}</td>                                            
                                                <td>{{rfpersonaltres.direccionRF}}</td>
                                                <td>{{rfpersonaltres.telefonoRF}}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div v-if="!rff" class="col-lg-12 bg-white border p-4">
                                <h3 class="text-center"><strong>No existen referencias</strong></h3>
                            </div>
                            <br>
                            <div class="infoFiador">
                                <div v-if="Fiador.fiador_o_prenda == 'prenda'">
                                    <div class="card p-4">
                                        <div class="card-head text-center">
                                            <h2 class="p-4">Informacion Prenda</h2>
                                        </div>
                                        <div class="card-body">
                                            <div class="row form-group">
                                                <div class="col-md-6">
                                                    <span>tipo vehiculo</span>
                                                    <div class="form-control">{{Fiador.tipoVehiculo}}</div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <span>Marca</span>
                                                    <div class="form-control">{{Fiador.marca}}</div>
                                                </div>
                                            </div>
                                            <div class="row form-group">
                                                <div class="col-lg-4">
                                                    <span>Linea</span>
                                                    <div class="form-control">{{Fiador.linea}}</div>
                                                </div>
                                                <div class="col-lg-4">
                                                    <span>Modelo</span>
                                                    <div class="form-control">{{Fiador.modelo}}</div>
                                                </div>
                                                <div class="col-lg-4">
                                                    <span>Carroceria tipo</span>
                                                    <div class="form-control">{{Fiador.modelo}}</div>
                                                </div>
                                            </div>
                                            <div class="row form-group">
                                                <div class="col-lg-4">
                                                    <span>Color</span>
                                                    <div class="form-control">{{Fiador.color}}</div>
                                                </div>
                                                <div class="col-lg-4">
                                                    <span>Manifiesto</span>
                                                    <div class="form-control">{{Fiador.manifiesto}}</div>
                                                </div>
                                                <div class="col-lg-4">
                                                    <span>Licencia de transito</span>
                                                    <div class="form-control">{{Fiador.licTransito}}</div>
                                                </div>
                                            </div>
                                            <div class="row form-group">
                                                <div class="col-lg-4">
                                                    <span>Placa</span>
                                                    <div class="form-control">{{Fiador.placa}}</div>
                                                </div>
                                                <div class="col-lg-4">
                                                    <span># de Motor</span>
                                                    <div class="form-control">{{Fiador.motor}}</div>
                                                </div>
                                                <div class="col-lg-4">
                                                    <span># de Chasis</span>
                                                    <div class="form-control">{{Fiador.chasis}}</div>
                                                </div>
                                            </div>
                                            <div class="row form-group">
                                                <div class="col-md-6">
                                                    <span>Servicio</span>
                                                    <div class="form-control">{{Fiador.servicio}}</div>
                                                </div>
                                                <div class="col-md-6">
                                                    <span>Cilindraje</span>
                                                    <div class="form-control">{{Fiador.cilindraje}}</div>
                                                </div>
                                            </div>
                                            <div class="row form-group">
                                                <div class="col-md-4">
                                                    <span>Seguro activo</span>
                                                    <div class="form-control">{{Fiador.seguro}}</div>
                                                </div>
                                                <div class="col-md-4">
                                                    <span>Fecha vencimiento Seguro</span>
                                                    <div class="form-control">{{Fiador.venceSeguro}}</div>
                                                </div>
                                                <div class="col-md-4">
                                                    <span># de seguro</span>
                                                    <div class="form-control">{{Fiador.numSeguro}}</div>                                                    
                                                </div>
                                            </div>
                                            <div class="row form-group">
                                                <div class="col-md-6">
                                                    <span>Tecnomecanica activa</span>
                                                    <div class="form-control">{{Fiador.tecnicomecanica}}</div>
                                                </div>
                                                <div class="col-md-6">
                                                    <span>Fecha vencimiento tecnicomecania</span>
                                                    <div class="form-control">{{Fiador.venceTecno}}</div>
                                                </div>
                                            </div>
                                            <div class="row form-group">
                                                <div class="col-md-6">
                                                    <span>Nombre del propietario</span>
                                                    <div class="form-control">{{Fiador.nombrePropietario}}</div>
                                                </div>
                                                <div class="col-md-6">
                                                    <span># CC propietario</span>
                                                    <div class="form-control">{{Fiador.ccPropietario}}</div>
                                                </div>
                                            </div>
                                            <div class="card p-4" v-if="fiadorP">
                                                <div class="card-head text-center">
                                                    <h2 class="p-4">Fiador prenda</h2>
                                                </div>
                                                <div class="form-group">
                                                    <span>Nombre Fiador</span>
                                                    <div class="form-control">{{fiadorPrenda.nombreFiador}}</div>
                                                </div>
                                                <div class="row form-group">
                                                    <div class="col-lg-6">
                                                        <span>1 Apellido fiador</span>
                                                        <div class="form-control">{{fiadorPrenda.primerApellidoFiador}}</div>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <span>2 apellido fiador</span>
                                                        <div class="form-control">{{fiadorPrenda.segundoApellidoFiador}}</div>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <span>Numero de Cedula fiador</span>
                                                    <div class="form-control">{{fiadorPrenda.cedulaFiador}}</div>
                                                </div>
                                                <div class="row form-group">
                                                    <div class="col-lg-6">
                                                        <span>Celular</span>
                                                        <div class="form-control">{{fiadorPrenda.celularUnoFiador}}</div>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <span>Otro Numero de contacto</span>
                                                        <div class="form-control">{{fiadorPrenda.celularDosFiador}}</div>
                                                    </div>
                                                </div>
                                                <div class="row form-group">
                                                    <div class="col-md-4">
                                                        <span>Direccion</span>
                                                        <div class="form-control">{{fiadorPrenda.direccionFiador}}</div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <span>Barrio</span>
                                                        <div class="form-control">{{fiadorPrenda.barrioFiador}}</div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <span>Ciudad</span>
                                                        <div class="form-control">{{fiadorPrenda.ciudadFiador}}</div>
                                                    </div>
                                                </div>
                                                <div class="row form-group">
                                                    <div class="col-md-4">
                                                        <span>Tipo de vivienda</span>
                                                        <div class="form-control">{{fiadorPrenda.tViviendaFiador}}</div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <span>Ocupacion</span>
                                                        <div class="form-control">{{fiadorPrenda.ocupacionFiador}}</div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <span>Personas a cargo</span>
                                                        <div class="form-control">{{fiadorPrenda.PcargoFiador}}</div>
                                                    </div>
                                                </div>
                                                <div class="row form-group">
                                                    <div class="col-md-6">
                                                        <span>Email</span>
                                                        <div class="form-control">{{fiadorPrenda.emailFiador}}</div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <span>Edad</span>
                                                        <div class="form-control">{{fiadorPrenda.edadFiador}}</div>
                                                    </div>
                                                </div>
                                                <br>                                             
                                                <div class="col-md-12 p-2" v-if="infolabfiadorP">
                                                    <h2 class="text-center">Informacion laboral Fiador</h2>                                                          
                                                    <div class="input-group mb-3">
                                                        <div class="input-group-prepend">
                                                            <label class="input-group-text">Nombre de la empresa</label>
                                                        </div>
                                                        <div class="form-control">{{infolabfiadorPrenda.nombreEmpresa}}</div>
                                                    </div>
                                                    <div class="input-group mb-3">
                                                        <div class="input-group-prepend">
                                                            <label class="input-group-text">Ciudad</label>
                                                        </div>
                                                        <div class="form-control">{{infolabfiadorPrenda.ciudadEmpresa}}</div>
                                                    </div>
                                                    <div class="input-group mb-3">
                                                        <div class="input-group-prepend">
                                                            <label class="input-group-text">Cargo</label>
                                                        </div>
                                                        <div class="form-control">{{infolabfiadorPrenda.cargoEmpleado}}</div>
                                                    </div>
                                                    <div class="input-group mb-3">
                                                        <div class="input-group-prepend">
                                                            <label class="input-group-text">Salario</label>
                                                        </div>
                                                        <div class="form-control">{{infolabfiadorPrenda.salarioEmpleado}}</div>
                                                    </div>
                                                    <div class="input-group mb-3">
                                                        <div class="input-group-prepend">
                                                            <label class="input-group-text">Direccion</label>
                                                        </div>
                                                        <div class="form-control">{{infolabfiadorPrenda.direccionEmpresa}}</div>
                                                    </div>
                                                    <div class="input-group mb-3">
                                                        <div class="input-group-prepend">
                                                            <label class="input-group-text">Telefono</label>
                                                        </div>
                                                        <div class="form-control">{{infolabfiadorPrenda.telefonoEmpresa}}</div>
                                                    </div>
                                                    <div class="input-group mb-3">
                                                        <div class="input-group-prepend">
                                                            <label class="input-group-text">Correo laboral</label>
                                                        </div>
                                                        <div class="form-control">{{infolabfiadorPrenda.correoLaboral}}</div>
                                                    </div>
                                                    <div class="input-group mb-3">
                                                        <div class="input-group-prepend">
                                                            <label class="input-group-text">Otros Ingresos</label>
                                                        </div>
                                                        <div class="form-control">{{infolabfiadorPrenda.otrosIngresosEmpleado}}</div>
                                                    </div>
                                                </div>
                                            </div>    
                                        </div>
                                    </div>          
                                </div>             
                                <div v-if="Fiador.fiador_o_prenda == 'fiador'">
                                    <div class="border border-dark">
                                        <div class="card p-4">
                                            <div class="card-head text-center">
                                                <h2 class="p-4">Fiador</h2>
                                            </div>
                                            <div class="card-body">
                                                <div class="form-group">
                                                    <span>Nombre Fiador</span>
                                                    <div class="form-control">{{Fiador.nombreFiador}}</div>
                                                </div>
                                                <div class="row form-group">
                                                    <div class="col-lg-6">
                                                    <span>1 Apellido fiador</span>
                                                    <div class="form-control">{{Fiador.primerApellidoFiador}}</div>
                                                    </div>
                                                    <div class="col-lg-6">
                                                    <span>2 apellido fiador</span>
                                                    <div class="form-control">{{Fiador.segundoApellidoFiador}}</div>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <span>Numero de Cedula fiador</span>
                                                    <div class="form-control">{{Fiador.cedulaFiador}}</div>                                            
                                                </div>
                                                <div class="row form-group">
                                                    <div class="col-lg-6">
                                                    <span>Celular</span>
                                                    <div class="form-control">{{Fiador.celularUnoFiador}}</div>
                                                    </div>
                                                    <div class="col-lg-6">
                                                    <span>Otro Numero de contacto</span>
                                                    <div class="form-control">{{Fiador.celularDosFiador}}</div>
                                                    </div>
                                                </div>
                                                <div class="row form-group">
                                                    <div class="col-md-4">
                                                    <span>Direccion</span>
                                                    <div class="form-control">{{Fiador.direccionFiador}}</div>
                                                    </div>
                                                    <div class="col-md-4">
                                                    <span>Barrio</span>
                                                    <div class="form-control">{{Fiador.barrioFiador}}</div>
                                                    </div>
                                                    <div class="col-md-4">
                                                    <span>Ciudad</span>
                                                    <div class="form-control">{{Fiador.ciudadFiador}}</div>
                                                    </div>
                                                </div>
                                                <div class="row form-group">
                                                    <div class="col-md-4">
                                                    <span>Tipo de vivienda</span>
                                                    <div class="form-control">{{Fiador.tViviendaFiador}}</div>
                                                    </div>
                                                    <div class="col-md-4">
                                                    <span>Ocupacion</span>
                                                    <div class="form-control">{{Fiador.Ocupacion}}</div>
                                                    </div>
                                                    <div class="col-md-4">
                                                    <span>Personas a cargo</span>
                                                    <div class="form-control">{{Fiador.PcargoFiador}}</div>
                                                    </div>
                                                </div>
                                                <div class="row form-group">
                                                    <div class="col-md-6">
                                                    <span>Email</span>
                                                    <div class="form-control">{{Fiador.emailFiador}}</div>
                                                    </div>
                                                    <div class="col-md-6">
                                                    <span>Edad</span>
                                                    <div class="form-control">{{Fiador.edadFiador}}</div>
                                                    </div>
                                                </div>
                                                <div id="infoLabFiador" v-if="infolabfiadorP">
                                                    <h2 class="text-center">Informacion laboral Fiador</h2>
                                                    <div class="input-group mb-3">
                                                        <div class="input-group-prepend">
                                                        <label class="input-group-text">Nombre de la empresa</label>
                                                        </div>
                                                        <div class="form-control">{{infoLabFiador.nombreEmpresa}}</div>
                                                    </div>
                                                    <div class="input-group mb-3">
                                                        <div class="input-group-prepend">
                                                        <label class="input-group-text">Ciudad</label>
                                                        </div>
                                                        <div class="form-control">{{infoLabFiador.ciudadEmpresa}}</div>
                                                    </div>
                                                    <div class="input-group mb-3">
                                                        <div class="input-group-prepend">
                                                        <label class="input-group-text">Cargo</label>
                                                        </div>
                                                        <div class="form-control">{{infoLabFiador.cargoEmpleado}}</div>
                                                    </div>
                                                    <div class="input-group mb-3">
                                                        <div class="input-group-prepend">
                                                        <label class="input-group-text">Salario</label>
                                                        </div>
                                                        <div class="form-control">{{infoLabFiador.salarioEmpleado}}</div>
                                                    </div>
                                                    <div class="input-group mb-3">
                                                        <div class="input-group-prepend">
                                                        <label class="input-group-text">Direccion</label>
                                                        </div>
                                                        <div class="form-control">{{infoLabFiador.direccionEmpresa}}</div>
                                                    </div>
                                                    <div class="input-group mb-3">
                                                        <div class="input-group-prepend">
                                                        <label class="input-group-text">Telefono</label>
                                                        </div>
                                                        <div class="form-control">{{infoLabFiador.telefonoEmpresa}}</div>
                                                    </div>
                                                    <div class="input-group mb-3">
                                                        <div class="input-group-prepend">
                                                        <label class="input-group-text">Correo laboral</label>
                                                        </div>
                                                        <div class="form-control">{{infoLabFiador.correoLaboral}}</div>
                                                    </div>
                                                    <div class="input-group mb-3">
                                                        <div class="input-group-prepend">
                                                        <label class="input-group-text">Otros Ingresos</label>
                                                        </div>
                                                        <div class="form-control">{{infoLabFiador.otrosIngresosEmpleado}}</div>
                                                    </div>
                                                </div>    
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="verCreditoU.fiador == null" class="col-lg-12 bg-white border p-4">
                                    <h3 class="text-center"><strong>No existen fiador o prenda</strong></h3>
                                </div>
                            </div>
                            <div class="btn btn-block btn-success" @click="infoAdicional = false">cerrar</div>
                        </div>
                        <div style="height: auto;">
                            <table class="table table-hover border table-sm bg-white text-dark table-responsive-sm">
                                <thead class="sticky-top text-white bg-dark">
                                <tr>

                                    <th># pagare</th>
                                    <th>Fecha para pago</th>
                                    <th>Valor cuota</th>
                                    <th>Abono</th>
                                    <th>Capital</th>
                                    <th>Interes</th>
                                    <th>Opciones</th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(pags,index) in pagg" :key="index">
                                        <td>{{index+1}}</td>
                                        <td>{{pags.dia +'/'+pags.mes+'/'+pags.ano}}</td>
                                        <td><input type="text" class="form-control" disabled v-money="money" v-model="pags.valCuotaMensual"></td>
                                        <td @click="imprimirReciboAbono(pags.ano,pags.mes,pags.dia,pagg.length,pags.abono,pags.valorCuota,index,
                                        pags.interesCuota,verCreditoU.numeroCredito, verCreditoU.nombreCliente, verCreditoU.telefono,verCreditoU.servicio,'Abono a cuota',debeAlaFecha)"
                                         class="btn btn-outline-warning">{{pags.abono}}</td>
                                        <td><input type="text" class="form-control" disabled v-money="money" v-model="pags.valorCuota"></td>
                                        <td><input type="text" class="form-control" disabled v-money="money" v-model="pags.interesCuota"></td>
                                        <td v-if="pags.estado == true"><div  class="btn btn-success">Cancelado</div></td>
                                        <td v-if="pags.estado == true">
                                            <div  class="btn btn-success"  @click=" imprimirRecibo(pags.ano,pags.mes,pags.dia,pagg.length,pags.abono,pags.valorCuota,index,
                                            pags.interesCuota,verCreditoU.numeroCredito, verCreditoU.nombreCliente, verCreditoU.telefono,verCreditoU.servicio,'Pago cuota',debeAlaFecha)">imprimir</div>
                                        </td>
                                        <td v-if=" pags.estadoImpresion==true">
                                            <div   class="btn btn-success" @click=" imprimirRecibo(pags.ano,pags.mes,pags.dia,pagg.length,pags.abono,pags.valorCuota,index,
                                            pags.interesCuota,verCreditoU.numeroCredito, verCreditoU.nombreCliente, verCreditoU.telefono,verCreditoU.servicio,'UltimaCuota',0)">imprimir</div>
                                        </td>                                 
                                        <td v-if="pags.estado == false"><div  class="btn btn-warning" @click="spiner=true, pagarCuota(pags.valorCuota,verCreditoU.pagares,index,
                                        verCreditoU.valCuotaMens,verCreditoU._id,pags.interesCuota,verCreditoU.numeroCredito, verCreditoU.nombreCliente)">Pagar cuota</div></td>
                                        <td v-if="pags.estado == false">
                                            <div v-if="btn_Abono" class="btn btn-warning" @click="abono(index,verCreditoU.numeroCredito,
                                        verCreditoU.nombreCliente)" >Abonar</div>
                                            <div v-if="pags.abonar==true"><input class="input-form" type="number" v-model="valAbono">
                                                <div  class="btn btn-primary" @click="spiner = true, btn_Abono = true, pags.abonar = false, guardarAbono(valAbono, index, verCreditoU.pagares,
                                                    verCreditoU.valCuotaMens,verCreditoU._id,pags.abono,pags.valorCuota,pags.interesCuota,verCreditoU.numeroCredito,
                                                    verCreditoU.nombreCliente)">guardar
                                                </div>
                                                <div  class="btn btn-warning" @click="btn_Abono = true, valAbono = 0, pags.abonar = false">cancelar</div>                                            
                                            </div>
                                        </td>                                    
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <b-modal v-model="reciboImpresion" hide-footer hide-header-close hide-header centered size="md" >
                            <div  id="impresion" style=" padding-left:65px;" >
                                <div>
                                    <img src="/img/logos/logo.jpeg" style="height:100px; max-width:320px; width:320px;" >  
                                </div>
                                <div >
                                    <div class="head" style="font-size: 13px; font-family:'sans-serif', 'verdana';text-align: center;align-content: center;"><br>
                                        .......................Nit: 1112786485-9.....................<br>
                                        .........................Cra 6 # 16 - 57.........................<br> 
                                        .............................Cartago................................<br>
                                        ......................Tels: 311 679 3772.....................<br>
                                        _________________________________________
                                    </div>
                                    <div style="font-size: 13px; font-family: 'sans-serif', 'verdana'; padding-left: 30px; padding-top: 10px;">
                                        <div class="row">
                                            <div class="col-md-4">
                                                ...Fecha: <br>
                                                ...# Credito: <br>
                                                ...Servicio: <br>
                                                ...Cliente : <br>
                                                ...Tels: <br>
                                                ...Cajero:
                                            </div>
                                            <div class="col-md-8">
                                                 {{verFecha(new Date())}} Hora: {{impresion.hora}} <br>
                                                 {{impresion.numero}}<br>
                                                 {{impresion.servicio}} <br>
                                                 {{impresion.nombre}}<br>
                                                 {{impresion.telefono}}<br>
                                                 {{user.nombre}} {{user.apellidouno}}
                                            </div>
                                        </div>                                            
                                        ________________________________________     
                                    </div>              
                                </div>            
                                <div style="font-size: 13px; font-family: 'sans-serif', 'verdana';padding-left: 30px; padding-top: 10px;">
                                    <div class="row">
                                        <div class="col-md-6">
                                            ...Tipo transaccion: <br>
                                            ...Fecha para pago: <br>
                                            ...Cuota # <br>
                                            ...Valor cuota $ <br>
                                            ...Abonos $ <br>
                                            ...Valor a pagar $ <br>
                                            ...Resta a credito $
                                        </div>
                                        <div class="col-md-6">
                                            {{impresion.tipoRecibo}}<br>
                                            {{impresion.fechaEstablecida}}<br>
                                            {{impresion.index}} de {{impresion.totalPagares}}<br>
                                            {{impresion.valorMess}}<br>
                                            {{impresion.abono}}<br>
                                            {{impresion.valApagar}}<br>
                                            {{impresion.resta}}
                                        </div>                                        
                                    </div>
                                    ________________________________________
                                </div>
                                <div  class="row" style="font-size: 13px; font-family: 'sans-serif', 'verdana'; padding-top: 10px; padding-left: 30px;">
                                    <div class="col-sm-6">
                                        ...Valor a cancelado
                                    </div>
                                    <div class="col-sm-6">
                                        $ {{impresion.valApagar}}
                                    </div>
                                    <br><br>
                                </div>
                            </div>                            
                            <div class="modal-footer border-white">
                                <div class="row mx-auto">
                                    <div class="col-lg-6 btn btn-warning" @click="reciboImpresion=false">Regresar</div>
                                    <div class="col-lg-6 btn btn-danger" @click="impRecibo(impresion)">Imprimir</div>
                                </div>
                            </div>
                        </b-modal>
                        <b-modal v-model="modal" hide-footer hide-header-close centered>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nuevo valor capital</th>
                                        <th>Nuevo valor interes</th>
                                        <th>Nuevo valor cuota</th>
                                        <th>Cuotas por pagar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td v-if="p[b-1]!=undefined">{{p[b-1].valorCuota}}</td>
                                        <td v-if="p[b-1]!=undefined">{{p[b-1].interesCuota}}</td>
                                        <td v-if="p[b-1]!=undefined">{{p[b-1].valCuotaMensual}}</td>
                                        <td>{{t}}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="modal-footer">
                                <div class="row">
                                    <div class="col-lg-6 btn btn-warning" @click="si=false, modal=false">Regresar</div>
                                    <div class="col-lg-6 btn btn-danger" @click="spiner = true, siGuardar(p,abMinInteres,verCreditoU.Fp,val,verCreditoU._id,verCreditoU.numeroCredito,
                                        verCreditoU.nombreCliente)">Guardar</div>
                                </div>
                            </div>
                        </b-modal>
                    <div>
                        <br>
                        <div class="input-group mb-3" id="imprimir2">
                            <div class="input-group-prepend">
                                <label class="input-group-text">Debe a la fecha</label>
                            </div>
                            <input type="text" class="form-control" disabled v-money="money" v-model="debeAlaFecha">
                            <div class="input-group-prepend">
                                <label class="input-group-text">debe a capital</label>
                            </div>
                            <input type="text" class="form-control" disabled v-money="money" v-model="aCapital" >
                            <div class="input-group-prepend">
                                <label class="input-group-text">debe a intereses</label>
                            </div>
                            <input type="text" class="form-control" disabled v-money="money" v-model="aInteres">
                        </div>
                        <br><br>
                            <div class="form border border-info  p-3" v-if="!tieneUnaCuota">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text">capital</label>
                                    </div>
                                    <div id class="form-control"><input type="text" class="form-control" disabled v-money="money" v-model="aCapital">
                                    </div>
                                    <div class="input-group-prepend">
                                        <label class="input-group-text">interes</label>
                                    </div>
                                    <div id class="form-control"><input type="text" class="form-control" disabled v-money="money" v-model="ipt">
                                    </div>
                                    <div class="input-group-prepend">
                                        <label class="input-group-text">valor total</label>
                                    </div>
                                    <div id class="form-control"><input type="text" class="form-control" disabled v-money="money" v-model="vtp">
                                    </div>
                                </div>
                                <div class="alert alert-danger" v-if="atrasado">
                                    dias de atraso: {{atraso}}
                                </div>
                                <br>
                                <div class="input-group mb-3">
                                    <div class="btn btn-warning btn-block" @click="spiner = true, cancelar(aCapital,interesPagoTotal,verCreditoU._id,verCreditoU.numeroCredito,
                                        verCreditoU.nombreCliente)" >pagar totalidad del credito</div>
                                </div>
                            </div>
                            <br><br>
                            
                        <div v-if="!menosDeDosCuotas">
                            <div class="form border border-warning  p-3" v-if="this.verCreditoU.frecuencia!='pagoUnico'">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text">Abono min a capital</label>
                                    </div>
                                    <div id class="form-control"><input type="text" class="form-control" disabled v-money="money" v-model="abMinCapital">
                                    </div>
                                    <div class="input-group-prepend">
                                        <label class="input-group-text">Abono min a interes</label>
                                    </div>
                                    <div id class="form-control"><input type="text" class="form-control" disabled v-money="money" v-model="abMinInteres">
                                    </div>
                                    <div class="input-group-prepend">
                                        <label class="input-group-text">Total minimo a abonar</label>
                                    </div>
                                    <div id class="form-control"><input type="text" class="form-control" disabled v-money="money" v-model="abMinTotal">
                                    </div>
                                </div>
                                <br>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text">Ingrese valor a abonar</label>
                                    </div>
                                    <div id class="form-control"><input type="text" class="form-control"  v-money="money" v-model="abMinCap">
                                    </div>
                                    <br>
                                    <div v-if="alerta" class="text-center">
                                        <div class="alert alert-danger">
                                            <strong>Oops!</strong> Ten cuidado <a class="alert-link">ingresaste un valor menor al minimo establecido posible</a>.
                                        </div>
                                    </div>
                                </div>
                                <br>
                                <div class="input-group mb-3">
                                    <div class="btn btn-warning btn-block" @click="spiner = true, abonoCapital(abMinCapital,abMinInteres,abMinTotal,verCreditoU._id, verCreditoU.pagares,aCapital,abMinCap,verCreditoU.Fp,verCreditoU.numeroCredito,
                                        verCreditoU.nombreCliente),modal==true" >Abonar a capital</div>
                                </div>
                            </div>
                            <div class="form border border-warning  p-3" v-if="this.verCreditoU.frecuencia == 'pagoUnico'">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text">Abono min a capital</label>
                                    </div>
                                    <div id class="form-control"><input type="text" class="form-control" disabled v-money="money" v-model="abMinCapital">
                                    </div>
                                    <div class="input-group-prepend">
                                        <label class="input-group-text">Abono min a interes</label>
                                    </div>
                                    <div id class="form-control"><input type="text" class="form-control" disabled v-money="money" v-model="abMinInteres">
                                    </div>
                                    <div class="input-group-prepend">
                                        <label class="input-group-text">Total minimo a abonar</label>
                                    </div>
                                    <div id class="form-control"><input type="text" class="form-control" disabled v-money="money" v-model="abMinTotal">
                                    </div>
                                </div>
                                <br>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text">Ingrese valor a abornar</label>
                                    </div>
                                    <div id class="form-control"><input type="text" class="form-control"  v-money="money" v-model="abMinCap">
                                    </div>
                                    <br>
                                    <div v-if="alerta" class="text-center">
                                        <div class="alert alert-danger">
                                            <strong>Oops!</strong> Ten cuidado <a class="alert-link">ingresaste un valor menor al minimo establecido posible</a>.
                                        </div>
                                    </div>
                                </div>
                                <br>
                                <div class="input-group mb-3">
                                    <div class="btn btn-warning btn-block" @click="spiner = true, abonoCapital(abMinCapital,abMinInteres,abMinTotal,verCreditoU._id, verCreditoU.pagares,aCapital,abMinCap,verCreditoU.Fp,verCreditoU.numeroCredito,
                                        verCreditoU.nombreCliente),abMinCap,modal==true" >Abonar a capital</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <div  class="text-center"> 
                        <div class="btn btn-info btn-block" v-if="verCreditoU.frecuencia=='pagoUnico'" @click="history(verCreditoU._id,'pagUn',verCreditoU.numeroCredito), historial = true">Historial movimientos pu</div>
                        <div class="btn btn-info btn-block" v-if="verCreditoU.frecuencia!='pagoUnico'" @click="history(verCreditoU._id,'otro',verCreditoU.numeroCredito), historial = true">Historial movimientos</div>
                        <div v-if="historial">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Fecha</th>
                                        <th>Valor</th>
                                        <th>Interes</th>
                                        <th>Concepto</th>
                                        <th>Descripcion</th>
                                    </tr>
                                </thead>
                                <tbody v-for="ingresos in ingresosCredUnico" :key="ingresos.index">
                                    <tr>
                                        <td>{{ingresos.fechaIngresoEfectivo}} </td>
                                        <td>{{ingresos.valor}}</td>
                                        <td>{{ingresos.interes}}</td>
                                        <td>{{ingresos.concepto}}</td>
                                        <td>{{ingresos.descripcion}}</td>
                                    </tr>
                                </tbody>
                                <tbody v-for="ingresos in ingresosCredUnicoo" :key="ingresos.index">
                                    <tr>
                                        <td>{{ingresos.fechaIngresoEfectivo}} </td>
                                        <td>{{ingresos.valor}}</td>
                                        <td>{{ingresos.interes}}</td>
                                        <td>{{ingresos.concepto}}</td>
                                        <td>{{ingresos.descripcion}}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table class="table table-hover alert alert-danger">
                                <thead>
                                    <tr>
                                        <th>Fecha</th>
                                        <th>Valor</th>
                                        <th>Interes</th>
                                        <th>Concepto</th>
                                        <th>Descripcion</th>
                                    </tr>
                                </thead>
                                <tbody v-for="(ingresos,index) in historialPagos" :key="ingresos.index">
                                    <tr>
                                        <td>{{ingresos[index].fechaIngresoEfectivo}}</td>
                                        <td>{{ingresos[index].valor}}</td>
                                        <td>{{ingresos[index].interes}}</td>
                                        <td>{{ingresos[index].concepto}}</td>
                                        <td>{{ingresos[index].descripcion}}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="btn btn-block btn-info" @click="historial = false">Cerrar historial</div>
                            <br>
                        </div>
                        <div class="btn btn-success btn-block" @click="imprimir()">Imprimir</div>
                        <div class="btn btn-primary btn-block" @click="regresar()"><strong><h2>Regresar</h2></strong></div>
                    </div>
                </div>                
            </div>
        </div>        
        <b-modal v-model="spiner" no-close-on-backdrop no-close-on-esc hide-header-close hide-header hide-footer 
        lazy centered size="lg">
            <div class="text-center p-5">
                <div class="spinner-border text-primary p-5"><h2><strong>A</strong></h2></div>
                <div class="spinner-grow text-success p-4"></div>
                <div class="spinner-border text-info p-5"><h2><strong>P</strong></h2></div>
                <div class="spinner-grow text-warning p-4"></div>
                <div class="spinner-border text-danger p-5"><h2><strong>S</strong></h2></div>
                <div class="spinner-grow text-secondary p-4"></div>
                <div class="spinner-border text-dark p-5"><h2><strong>A</strong></h2></div>
            </div>
            <br>
            <div class="text-center"><h2><strong>Cargando !!</strong></h2></div>
        </b-modal>
        <!--<button @click="actualizarFp() ">actualizar</button>-->
    </div>
</template>
<script>
class moneey {
  constructor() {
    this.thousands = ".";
    this.precision = 0;
    this.masked = false;
  }
}
class rf {
  constructor() {
    this.nombreRF = "";
    this.direccionRF = "";
    this.telefonoRF = "";
    this.parentescoRF = "";
  }
}
import f from "../funciones/funciones.js";
import { VMoney } from "v-money";
import { format, parse } from 'path';
const formatDecimal = require('format-decimal')


export default {
    name : 'creditosActivos',
    data (){
        return {
            reciboImpresion:false,
            impresion:{},
            atrasado:false,
            atraso:0,
            historial:false,
            rff:false,
            fiadorP:false,
            infolabfiadorP:false,
            rfamiliaruno: new rf(),
            rfamiliardos: new rf(),
            rfamiliartres: new rf(),
            rfpersonaluno: new rf(),
            rfpersonaldos: new rf(),
            rfpersonaltres: new rf(),
            Fiador:{},
            infoLab:{},
            infoLabFiador:{},
            fiadorPrenda:{},
            prendaa:false,
            fiadorr:false,
            infolabfiadorPrenda:{}, 
            infoAdicional:false,
            spiner:false,
            tieneUnaCuota:false,
            menosDeDosCuotas:false,
            user : {},
            Capital:{},
            Creditos:[],
            verCreditoU:{},
            cliente : {},
            verCred : false,
            valSinInteres : 0,
            vsi:'',
            money: new moneey(),
            intere:'',
            a:0,
            b:0,
            d:0,
            codigo:'',
            totalCapital: 0,
            totalIntereses: 0,
            prestamos:0,
            egresos: 0,
            totalEgresos:0,
            totalPrestamos:0,
            pagg:{},
            senal:false,
            valAbono:0,
            btn_Abono:true,
            valTotalCredito:0,
            debeAlaFecha:'',
            aCapital:'',
            aInteres:'',
            interesPagoTotal:0,
            ipt:'',
            valorTotPago:0,
            vtp:'',
            abMinInteres:'',
            abMinCapital:'',
            abMinTotal:'',
            abMinCap:'',
            alerta:false,
            bol:0,
            p:{},
            modal:false,
            si:false,
            t:0,
            proxFechDia:0,
            proxFechMes:0,
            abC : 0,
            Fn : '',
            buscar:'',
            busqueda:true,
            alerta:false,
            alerta2:false,
            alerta3:false,
            encabezado:false,
            val:0,
            uri:'',
            ingresosCredUnico:[], 
            ingresosCredUnicoo:[] ,
            x:'',
            yes:false,
            nFp : new Date(),
            nfp : [],
            nuevosValores : {},
            hora:new Date(),
            historialPagos:[]
        }
    },
    
    mounted() {
        console.log(this.hora)
        this.axios.get(this.uri+'/api/login/usuario', {headers:{token:localStorage.getItem('token')}})
            .then(res => {
            this.user=res.data.user
            this.codigo = this.user.codigo
            })
            .catch(err => {
            localStorage.clear()
            if(localStorage.getItem ('token') === null){
            this.$router.push(this.uri+'/inicioSesion')
            }
        });
        if(localStorage.getItem('cc')){
            this.buscar = localStorage.getItem('cc')
        } else {
            this.buscar = ''
        }
    },
    created (){
        this.uri = f.uri
        this.verCreditos()
        //this.verCreditoss()
        
    },
    
    methods : {
        horaPago(){
            let hour  = new Date()
            let horaExacta = ''
            return horaExacta = (hour.getHours()+':'+hour.getMinutes()+':'+hour.getSeconds())
        },
        verFecha(fecha){
            let fech = new Date (fecha)
            const  y = fech.getFullYear()+'-'+(fech.getMonth()+1)+'-'+fech.getDate()   
            return y      
        },
        history(id,x,num){
            const idd = {
                id:id
            }
            if(x ==='pagUn'){
                this.axios.post(this.uri + '/api/contabilidad/ingresosCreditopu', idd)
                .then(res=>{
                    this.ingresosCredUnico = res.data
                    this.historialPagos.push(res.data)
                    console.log('uno')
                })
                .catch(err=>{
                    console.log(err)
                })
            }else{
                this.axios.post(this.uri + '/api/contabilidad/ingresosCredito', idd)
                .then(res=>{
                    if(res.data.length>0){
                        console.log('dos')
                        this.history2(idd,num)
                        this.ingresosCredUnico = res.data
                        this.historialPagos.push(res.data)
                    }else{
                        this.history3(num)
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
            }
        },
        history2(id,num){
            this.axios.post(this.uri + '/api/contabilidad/ingresosCreditoo', id)
            .then(res=>{
                if(res.data.length>0){
                    this.ingresosCredUnicoo = res.data
                    this.historialPagos.push(res.data)
                }else{
                    this.history3(num)
                }
            })
            .catch(err=>{
                console.log(err)
            })
        },
        history3(num){
            let n={
                num:num
            }
            this.axios.post(this.uri + '/api/contabilidad/ingresosCreditooo', n)
            .then(res=>{
                console.log('cuatro')
                console.log(res.data)
                this.history4(res.data[0].idCredito)
                this.historialPagos.push(res.data)
            })
            .catch(err=>{
                console.log(err)
            })
        },
        history4(id){
            let idd={
                id
            }
            this.axios.post(this.uri + '/api/contabilidad/ingresosCreditoooo', idd)
            .then(res=>{              
                this.ingresosCredUnico = res.data
                this.historialPagos.push(res.data)
            })
            .catch(err=>{
                console.log(err)
            })
        },
        regresar(){
            this.verCred = false
            this.busqueda = true
            this.rff = false
            this.fiadorP = false
            this.infoAdicional  = false
            this.infolabfiadorP = false
            this.rfamiliaruno = {}
            this.rfamiliardos = {}
            this.rfamiliartres = {}
            this.rfpersonaluno = {}
            this.rfpersonaldos = {}
            this.rfpersonaltres = {}
            this.Fiador = {}
            this.historial = false
        },
        verFiadorPrenda(n){
        this.axios.post(this.uri+"/api/creditos/FiadorPrenda", n)
          .then(res => {
            this.Fiador = res.data;
            if(this.Fiador.fiador_o_prenda == 'fiador'){
              this.fiadorr = true
              this.prendaa = false
            }
            if(this.Fiador.fiador_o_prenda == 'prenda'){
              this.prendaa = true
              this.fiadorr = false
              }
              if(this.Fiador.fiadorPrenda != null){
                  this.fiadorP = true
                this.fiadorPrenda = this.Fiador.fiadorPrenda
              }else{
                  this.fiadorP = false
              }
              if(this.Fiador.infolabfiadorPrenda != null){
                  this.infolabfiadorP = true
                  this.infolabfiadorPrenda = this.Fiador.infolabfiadorPrenda
              }else{
                this.infolabfiadorP = false
              }
         })
        .catch(err => console.log(err)); 
        },
        guardarDatosHoy(){
            const datos={
                id : this.verCreditoU._id,
                cedula:this.verCreditoU.cedula,
                enMora:this.verCreditoU.enMora,
                interes:this.quitarPuntos(this.aInteres),
                capital:this.quitarPuntos(this.aCapital),
                total:this.quitarPuntos(this.debeAlaFecha)
            }
            this.axios.post(this.uri+'/api/creditos/actualizarValoresEstado',datos)
            .then(res=>{this.spiner=false}).catch(err=>{console.log(err)})
        },
        guardarDatosHoyyy(cap,int,total,id)//debemos borrar los valores internos
        {
            const datos={
                id,
                interes:int,
                capital:cap,
                total
            }
            console.log(datos)
            this.axios.post(this.uri+'/api/creditos/actualizarValoresEstado',datos)
            .then(res=>{this.spiner=false}).catch(err=>{console.log(err)})
        },
        guardarDatosCero(){
            const datos={
                id : this.verCreditoU._id,
            }
            this.axios.post(this.uri+'/api/creditos/actualizarValoresEstadoCero',datos)
            .then(res=>{this.spiner=false}).catch(err=>{console.log(err)})
        },
        fecha2(x){

            let xx = new Date(x)
            let r = {}
            r.dia = xx.getDate()
            r.mes = xx.getMonth()+1
            r.ano = xx.getFullYear()
            return (r.ano+'-'+r.mes+'-'+r.dia)
        },
        fecha(x){
            let n = ''
            for(let y = 0; y<=x.length; y++){
                if(y<=9){
                n = n + x[y]
                }
            }
            return n
        },
        imprimir(){
        let prtContent = document.getElementById("imprimir")
        let prtContent1 = document.getElementById("imprimir1")
        let prtContent2 = document.getElementById("imprimir2")
        let ventana = window.open('', '_blank', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0,border=1px');
        ventana.document.write('<html><head><title>' + document.title + '</title>');
        ventana.document.write('<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">');
        ventana.document.write('</head><body >');
        ventana.document.write(prtContent.innerHTML);
        ventana.document.write(prtContent1.innerHTML);
        ventana.document.write(prtContent2.innerHTML);
        ventana.document.write('</body></html>');
        ventana.document.close();
        ventana.focus();
        ventana.print();
        },
        verCreditos(){
            this.axios.get(this.uri+'/api/creditos/entregados')
            .then(res => {
                this.Creditos = res.data                               
            })
            .catch(err => console.log(err))
        },
        verCreditoss(){
            this.axios.get(this.uri+'/api/creditos/todos')
            .then(res => {
                this.Creditos = res.data
                let total =this.Creditos.length-1
                let b = 0            
                for(let a =0; a<=total;a++ ){
                    b=b+1
                    //this.actualizarid(this.Creditos[a].numeroCredito,this.Creditos[a]._id)
                    //this.verPagoss(this.Creditos[a].pagares,this.Creditos[a]._id)                        
                }  
                console.log(b)                                 
            })
            .catch(err => console.log(err))
        },
        verPagoss(id,idc){
            let idPagares={
                id : id,
            }
            this.axios.post(this.uri+"/api/creditos/pagares", idPagares)
            .then(res => {
                console.log(res.data.pagares)
                let pagg = res.data.pagares
                let b = pagg.length-1
                let tot = 0
                let aC = 0
                let aI = 0
                let verd = 0
                let debeAlaFecha
                let aCapital
                let aInteres
                    for (let nb = 0; nb<=b;nb++){
                        if(pagg[nb].estado==false){
                            aC = aC + pagg[nb].valorCuota
                            aI = aI + pagg[nb].interesCuota
                        } 
                    }    
                    if(res.data.pagares[b].estado == true){
                        console.log('es cero')
                        console.log(idc)
                        this.guardarDatosCeroo(idc)
                    }             
                aCapital = Math.round(aC)
                aInteres = Math.round(aI)
                debeAlaFecha = aCapital + aInteres
                this.guardarDatosHoy(aCapital,aInteres,debeAlaFecha,idc)
            })
        },
        guardarDatosCeroo(id){
            const datos={
                id
            }
            this.axios.post(this.uri+'/api/creditos/actualizarValoresEstadoCero',datos)
            .then(res=>{this.spiner=false}).catch(err=>{console.log(err)})
        },
        actualizarid(num,id){
            let valores={
                num,
                id,
            }
            console.log(valores)
            this.axios.post(this.uri+'/api/creditos/pagosPorNumero',valores)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => console.log(err))
        },
        actualizarDireccion(datos){
            console.log(datos)
            this.axios.post(this.uri+"/api/creditos/actualizarDireccionCredito", datos)
            .then(res=>{
                console.log(res.data)
            })
            .catch(err=>{console.log(err.response)})
        },
        verClientes(cc, idCredito){
            let cedulaCliente={
                cedula : cc,
            }
            this.axios.post(this.uri+"/api/verCliente", cedulaCliente)//este esta en la api clientes
            .then(res => {
                if(res.data.length>0){
                    console.log(res.data[0].direccionCliente)
                    let datos = {
                        direccion: res.data[0].direccionCliente,
                        _id: idCredito,
                    }
                    this.actualizarDireccion(datos)
                }else{
                    console.log('sin informacion del cliente ', cc )
                }
            
            })
            .catch(err => console.log(err));            
        },
        actualizarNombre(datos){
            this.axios.post(this.uri+"/api/creditos/actualizarNombreCredito", datos)
            .then(res=>{
                console.log(res.data)
            })
            .catch(err=>{console.log(err.response)})
        },
        recargar(){
            this.encabezado = false 
            this.buscar = ''
            this.verCreditos()
            localStorage.removeItem('cc')
        },
        verCreditoUnico(id){
            let idCredito={
                id : id,
            }
            this.axios.post(this.uri+"/api/creditos/verCredito", idCredito)
            .then(res => {
                this.verCreditoU = res.data;
                console.log(this.verCreditoU)
                if(this.verCreditoU.fiador != null){
                    let idFiador = {
                        id : this.verCreditoU.fiador
                    }
                    this.verFiadorPrenda(idFiador)
                }else{
                    this.Fiador = {}
                }
                if(this.verCreditoU.referidos != null){
                    this.rff = true
                    this.rfamiliaruno = this.verCreditoU.referidos[0]
                    this.rfamiliardos = this.verCreditoU.referidos[1]
                    this.rfamiliartres = this.verCreditoU.referidos[2]
                    this.rfpersonaluno = this.verCreditoU.referidos[3]
                    this.rfpersonaldos = this.verCreditoU.referidos[4]
                    this.rfpersonaltres = this.verCreditoU.referidos[5]
                }else{
                    this.rff = false
                    this.rfamiliaruno = {}
                    this.rfamiliardos = {}
                    this.rfamiliartres = {}
                    this.rfpersonaluno = {}
                    this.rfpersonaldos = {}
                    this.rfpersonaltres = {}
                }
                if(this.verCreditoU.Fp==null){
                   this.Fn = new Date() 
                }else{
                    this.Fn = this.fecha(this.verCreditoU.Fp) 
                } 
                this.val = this.verCreditoU.valCuotaMens
                this.valTotalCredito = parseInt(this.verCreditoU.valTotalCred)
                this.valTotalCredito = formatDecimal(this.valTotalCredito)
                this.verCliente(this.verCreditoU.cedula)
                
                this.verPagos(this.verCreditoU.pagares,this.verCreditoU._id)                
            })
            .catch(err => console.log(err));
        },
        buscando(){
            
        let persona = {}
            if(this.x!=''){
                let res = isNaN(this.x)
                if(res){
                    persona.nombre = this.x
                    this.axios.post(this.uri+"/api/creditos/creditosClienteActivosNombre", persona)
                    .then(res=>{
                        if(res.data.length){
                            this.Creditos = res.data; 
                            this.buscar = ''
                            this.encabezado = true
                        }                      
                    })
                    .catch(err=>{console.log(err)
                    this.ver =  false})
                }else{
                    persona.cedula = this.x
                    this.axios.post(this.uri+"/api/creditos/creditosClienteActivosCedula", persona)
                    .then(res=>{
                        console.log(res.data)
                        if(res.data.length){
                            this.Creditos = res.data; 
                            this.buscar = ''
                            this.encabezado = true
                        } 
                    })
                    .catch(err=>{console.log(err)
                    })                    
                }
            }            
        },
        actualizarNuevoFp(id,num,idc){
            let idPagares={
                id : id,
            }
            let pagares 
            let pagofecha
            let verd = 0
            let credito = {}
            this.axios.post(this.uri+"/api/creditos/pagares", idPagares)
            .then(res => {
                pagares = res.data
                if(pagares.pagares[0].estado==false){
                    credito = {}
                    pagofecha = new Date(pagares.pagares[0].ano,pagares.pagares[0].mes-1,pagares.pagares[0].dia)
                    credito.Fp = pagofecha
                    credito.idCredito = idc
                    credito.valor = pagares.pagares[0].valorCuota + pagares.pagares[0].interesCuota - pagares.pagares[0].abono
                    this.nfp.push(credito)
                }else{
                    for (let nb = 0; nb<=pagares.pagares.length-1;nb++){                     
                        if(pagares.pagares[nb].estado==true){
                            verd = verd + 1
                        }
                    }
                    pagofecha =   new Date(pagares.pagares[verd].ano,pagares.pagares[verd].mes-1,pagares.pagares[verd].dia)
                    credito.Fp = pagofecha
                    credito.idCredito = idc
                    credito.valor = pagares.pagares[verd].valorCuota + pagares.pagares[verd].interesCuota - pagares.pagares[verd].abono
                    this.nfp.push(credito)   
                }
                console.log(this.nfp)
            })
            .catch(err => {
                console.log(err)
                pagofecha = 'error'            
            });   
                    
        },
        actualizarFp(){
            let dia = new Date().getDate()+1;
            let mes = new Date().getMonth()+1;
            let ano = new Date().getFullYear();
            let f = ano+'-'+mes+'-'+dia
            let fecha2 = new Date(f)
            let pf 
            for (let a = 0; a < this.nfp.length; a++) {
                let fecha1 = new Date(this.nfp[a].Fp) 
                if(fecha1<fecha2){
                    this.nfp[a].enMora=true
                }else{
                    this.nfp[a].enMora=false
                }                
                this.axios.post(this.uri+'/api/creditos/actualizarFp',this.nfp[a])
                .then(res => {
                    console.log(res.data)
                })
                .catch(err => {console.log(err)});
            }
        },
        verPagos(id,idc){
            let idPagares={
                id : id,
            }
            console.log(idc)
            this.axios.post(this.uri+"/api/creditos/pagares", idPagares)
            .then(res => {
                this.pagg = res.data.pagares
                this.a = this.quitarPuntos(this.verCreditoU.cantidad)
                this.b = this.pagg.length
                this.valSinInteres = this.a / this.b
                let c  = Math.round(this.valSinInteres)
                this.vsi = c
                this.calcularInteres()
                let tot = 0
                let aC = 0
                let aI = 0
                let r = 0
                let dd = 0 
                let tt = 0
                let ttt = 0
                let verd = 0
                let verdaderos = []
                this.atraso = 0
                if(res.data.pagares[this.b-1].estado == true){
                    this.cancelarCredito(this.verCreditoU._id)
                }
                for (let n = 0; n<=this.b-1;n++){
                    this.pagg[n].valCuotaMensual = this.pagg[n].valorCuota - this.pagg[n].abono + this.pagg[n].interesCuota
                    this.pagg[n].valorCuota = this.pagg[n].valorCuota- this.pagg[n].abono
                    let z = this.pagg[n].valorCuota
                    if(z<1){
                        this.pagg[n].valorCuota = 0
                        this.pagg[n].interesCuota = this.pagg[n].valCuotaMensual
                    }                    
                }
                for (let nb = 0; nb<=this.b-1;nb++){
                    if(this.pagg[nb].estado==true){
                        let dat = new Date(this.pagg[nb].ano,this.pagg[nb].mes-1,this.pagg[nb].dia)
                        verdaderos.push(dat)
                        tot = tot + 0 
                        verd = verd + 1
                    }else{
                        this.nFp = new Date(this.pagg[0].ano,this.pagg[0].mes-1,this.pagg[0].dia)
                        tt=tt+1   
                        ttt=ttt+1                     
                        if(this.pagg[nb].abono>0){
                            tt=tt-1
                        }
                        if(tt == 1){
                           this.proxFechDia =  this.pagg[nb].dia  
                           this.proxFechMes =  this.pagg[nb].mes
                        }
                        tot = tot + this.pagg[nb].valCuotaMensual
                        aC = aC + this.pagg[nb].valorCuota
                        aI = aI + this.pagg[nb].interesCuota
                    } 
                }
                if(ttt<3){
                    this.menosDeDosCuotas = true
                }else{
                    this.menosDeDosCuotas = false
                }
                if(ttt<=1){
                    this.tieneUnaCuota = true
                    this.pagg[this.b-1].estadoImpresion = true

                }else{
                    this.tieneUnaCuota = false
                }

                this.debeAlaFecha = tot
                this.aCapital = Math.round(aC)
                this.aInteres = Math.round(aI)
                console.log(this.debeAlaFecha)
                console.log(this.aCapital)
                console.log(this.aInteres)
                                
                //---------------------------------
                let hoy = new Date()
                let fp 
                let interesPagoTota
                let diasMes
                if(verd > 0 ){
                    fp = verdaderos[verd-1]
                    if(hoy <= fp){
                        console.log('esta cuota ya se encuentra paga por lo tanto los interes son cero')
                        this.interesPagoTotal = 0
                        this.atrasado = false
                    }else{
                        fp = new Date (this.verCreditoU.Fp) 
                        interesPagoTota=(((aC*this.verCreditoU.interes)/100))
                        interesPagoTota = parseInt(interesPagoTota)
                        
                        if(this.verCreditoU.enMora === true ){
                            var fechaInicio = new Date(fp).getTime();
                            var fechaFin    = new Date(hoy).getTime();
                            var diff = fechaFin - fechaInicio;
                            diff = (diff/(1000*60*60*24));                            
                            this.atraso = parseInt(diff);
                            console.log(this.atraso)
                            this.atrasado = true                                 
                            this.interesPagoTotal = interesPagoTota
                        }else{
                            var fechaInicio = new Date(verdaderos[verd-1]).getTime();   
                            var fechaFin    = new Date(hoy).getTime();
                            var diff = fechaFin - fechaInicio;
                            diff = (diff/(1000*60*60*24));  
                            let diasUso =   parseInt(diff)                      
                            let messs = fp.getMonth()+1
                            let anooo = fp.getFullYear()
                            let diasMes = (new Date(anooo,messs,0).getDate())//trae los dias de cada mes segun el año   
                            console.log(interesPagoTota +'/'+diasMes +'*'+ diasUso)
                            this.interesPagoTotal = Math.round((interesPagoTota /diasMes)*diasUso)
                            this.atrasado = false
                        }
                    }
                }  else {   
                    if(hoy <= fp){
                        console.log('debe cancelar la los dias consumidos por el credito')
                        let messs = fp.getMonth()+1
                        let anooo = fp.getFullYear()
                        let diasMes = (new Date(anooo,messs,0).getDate())
                        //---------------------------------------------aca sumamsos los dias que tiene el credito hastala primera fecha de pago 
                        var fechaInicio1 = new Date(this.verCreditoU.fechaAgregado).getTime();   
                        var fechaFin1    = new Date(this.verCreditoU.Fp).getTime();
                        var diff1 = fechaFin1 - fechaInicio1;
                        diff1 = (diff1/(1000*60*60*24));  
                        //-------------------------------------------aca sumamos los dias que aun le quedan desde la fecha hasta la primera fecha de pago 
                        var fechaInicio = new Date(hoy).getTime();   
                        var fechaFin    = new Date(this.verCreditoU.Fp).getTime();
                        var diff = fechaFin - fechaInicio;
                        diff = (diff/(1000*60*60*24)); 
                        //---------------------------------------------aca restamos los resultados para obtener los dias transcurridos desde el dia del prestamo hasta la fecha
                        this.atraso =   parseInt(diff1 - diff)  
                        this.atrasado = true
                        let  interesPagoTota=((((aC*this.verCreditoU.interes)/100)/diasMes)*this.atraso)
                        interesPagoTota = parseInt(interesPagoTota)
                        this.interesPagoTotal = Math.round(interesPagoTota)
                        
                    }else{
                         fp = new Date (this.verCreditoU.Fp)
                        let  interesPagoTota=(((aC*this.verCreditoU.interes)/100))
                        interesPagoTota = parseInt(interesPagoTota)
                        console.log('pagara un amuneto por los interes a la mora')
                        var fechaInicio = new Date(fp).getTime();   
                        console.log(fechaInicio)
                        var fechaFin    = new Date(hoy).getTime();
                        console.log(fechaFin)
                        var diff = fechaFin - fechaInicio;
                        diff = (diff/(1000*60*60*24));                            
                        this.atraso = parseInt(diff); 
                        this.interesPagoTotal = Math.round(interesPagoTota)
                        console.log(this.atraso)
                        this.atrasado = true
                    }                 
                    
                }                
                let y = this.interesPagoTotal
                this.interesPagoTotal=this.interesPagoTotal.toString()
                this.valorTotPago = aC + y
                this.vtp = this.valorTotPago.toString()
                this.ipt = this.interesPagoTotal.toString()
                             
                
                
                //-------------------------------------------------------------
                let nn = 0
                let mm = 0
                if(this.verCreditoU.frecuencia=='pagoUnico'){
                    nn = 0 
                    mm = this.pagg[this.b-1].interesCuota                   
                }else{
                    if(tt<=3){
                        nn = this.pagg[this.b-1].valorCuota *( tt-1)
                        mm = this.pagg[this.b-1].interesCuota * (tt-1 )
                    } else {
                        nn = this.pagg[this.b-1].valorCuota * 3 
                        mm = this.pagg[this.b-1].interesCuota * 3 
                    }                    
                }               
                mm = Math.round(mm)
                this.abMinCapital = Math.round(nn)
                this.abMinInteres = mm
                this.abMinTotal = nn + mm
                this.abMinTotal = Math.round(this.abMinTotal)
                this.t = tt
                //this.guardarDatosHoy()
            })
            .catch(err => console.log(err));
            this.nuevosVal(idPagares)
        },
        nuevosVal(idPagares){
            this.axios.post(this.uri+"/api/creditos/pagares", idPagares)
            .then(res => {
                this.p = res.data.pagares                
            })
        },
        abonoCapital(Capital,Interes,Total,idUno,idDos,aCapital,abMinCap,proxfpago){
            let s =0, n=0
            for(let a = 0; a<= this.pagg.length - 1; a++){
                if(this.p[a].estado==true){
                    s = s + 1                    
                }else{
                    if(this.p[a].abono>0){
                        this.bol = this.p[a].valorCuota - this.p[a].abono
                        s = s + 1
                    }else{
                        n = n + 1
                    }  
                }
            }
            let abCap = 0            
            let capit = this.quitarPuntos(aCapital)-this.bol
            capit = Math.round(capit)
            let capita = this.quitarPuntos(Capital)
            let totall = this.quitarPuntos(Total)
            abCap = this.quitarPuntos(abMinCap)
            abCap = abCap - this.quitarPuntos(Interes)
            this.abC = abCap
            if(abCap < capita ){ 
                this.alerta =  true
                if(this.alerta = true){
                        setTimeout(function(){
                            this.alerta = false
                        }.bind(this),2000)
                    } 
                return
            }else{
                let nuevoValorCuota = 0
                let meses = []
                nuevoValorCuota = (capit - abCap) / n  
                let nvc = (capit - abCap)
                let nuevoValorInteres
                let u = ((s+n)+1)   
                if(this.verCreditoU.frecuencia == 'quincenal'){
                    nuevoValorInteres = (((nvc * this.verCreditoU.interes / 100 ) * (n+1) / (n)) / 2)
                }
                if(this.verCreditoU.frecuencia == 'semanal'){                    
                    nuevoValorInteres = (((((nvc * this.verCreditoU.interes / 100 ) * this.verCreditoU.tiempo ) / (u-1) ) *u ) / (u-1)) 
                }                    
                if(this.verCreditoU.frecuencia == 'diario'){
                    nuevoValorInteres = (((((nvc * this.verCreditoU.interes / 100 ) * this.verCreditoU.tiempo ) / (u-1) ) *u ) / (u-1)) 
                } 
                if(this.verCreditoU.frecuencia == 'mensual'){
                    nuevoValorInteres = ((nvc * this.verCreditoU.interes / 100 ) * (n+1) / (n))  
                }
                if(this.verCreditoU.frecuencia == 'pagoUnico'){
                    nuevoValorInteres = ((nvc * this.verCreditoU.interes / 100 ) * (n+1) / (n)) 
                    this.val = nvc + nuevoValorInteres
                }              
                nuevoValorInteres= Math.round(nuevoValorInteres) 
                nuevoValorCuota = Math.round(nuevoValorCuota)                
                for(let bb = s; bb<= this.pagg.length - 1; bb++){
                    if(this.verCreditoU.frecuencia == 'pagoUnico'){
                        if(bb==this.pagg.length - 1){
                            this.p[bb].valorCuota = Math.round(nvc)
                            this.p[bb].interesCuota = nuevoValorInteres 
                            this.p[bb].valCuotaMensual= nvc + nuevoValorInteres
                            this.val = this.val
                        }else{
                            this.p[bb].valorCuota =0
                            this.p[bb].interesCuota = nuevoValorInteres 
                            this.p[bb].valCuotaMensual= 0 + nuevoValorInteres
                            this.val = this.p[s+1].valCuotaMensual

                        }                        
                    }else{
                        this.p[bb].valorCuota = nuevoValorCuota
                        this.p[bb].interesCuota = nuevoValorInteres
                        this.p[bb].valCuotaMensual=(nuevoValorCuota) + nuevoValorInteres
                        this.val =  this.p[s+1].valCuotaMensual                      
                    }                    
                }
              this.modal=true
            }
        },
        siGuardar(p,interes,fpago,nuevoval,idc,numero,nombre){
            this.proxFechaPago(fpago,idc,nuevoval)
            this.cambiarPagares(p,this.verCreditoU.pagares)
            this.d = this.quitarPuntos(interes)
            this.aplicarAbono(this.abC,this.quitarPuntos(interes),numero,nombre)
            this.guardarIngresoIntereses()
        },
        cambiarPagares(pags,idDos){
             let vars ={
                id:idDos,
                pagares:pags
            } 
            this.axios.post(this.uri+'/api/creditos/editarPagares',vars)
            .then(res=>{
                this.abMinCap = ''
                this.modal = false
                this.verPagos(vars.id,this.verCreditoU._id)
            })
            .catch(err => console.log(err))
        },
        cancelarCredito(idd){
            const Id = {
                id : idd
            }
            this.axios.post(this.uri+"/api/creditos/cancelar", Id)
            .then(res => {
                setTimeout(() => {  this.guardarDatosCero() }, 500);
                this.verCreditos()
                this.verCred = false
            })
            .catch(err => console.log(err));
        },
        abono(index){
            let ind = parseInt(index)   
                if(ind==0){
                    this.btn_Abono = false
                    this.pagg[ind].abonar=true
                }else{             
                    if(this.pagg[ind-1].estado == false){
                    alert('de ser la cuota consecutiva ala ya paga o en su defecto la primera')
                    return
                    }
                }            
            this.btn_Abono = false
            this.pagg[ind].abonar=true
        },
        guardarAbono(vA,inde,id,valorCuota,idc,abon,vC,Vic,numero,nombre){
            //console.log('va'+vA)//valor que se esta abonando
            //console.log('inde'+inde) //index de los pagares 
            //console.log('id'+id)//ID PAGARES
            //console.log('valorCuota'+valorCuota)//valor de la cuota total con interes
            //console.log('idc'+idc)//idCredito
            //console.log('abon'+abon)//lo que ya tenia abonado o cero en su defecto
            //console.log('vc'+vC)//valor de la cuota con abono ya incluido si es que lo ha tenido, es el valor que aparece en la casilla de capital cuota
            //console.log('vic'+Vic)//valor de los interes de la cuota
            //console.log('numero'+numero)//numero del credito
            //console.log('nombre'+nombre)//nombre del cliente
            vA = parseInt(vA)
            abon = parseInt(abon)
            let ind = parseInt(inde)
            vC=this.quitarPuntos(vC)
            vC=parseInt(vC)
            Vic=this.quitarPuntos(Vic)            
            if(vA < 100 || vA > valorCuota){
                this.spiner = false
                this.valAbono = 0
                alert('debes poner valores aptos sin superar el valor de la cuota')
                return
            }else{
                if(vA>vC){
                    valorCuota = parseInt(valorCuota)
                    this.val = vC+Vic-vA//perfecto 
                    let valores = {
                        abono : vA+abon,
                        id:id
                    }
                    //vA cambia  a vc para poder enviar el valor exacto al ingreso por capital en aplicar Abono
                    //x  definimos la operacion mamtematica para la variable que enviaremos por ingreso interes
                    let x = (vA - vC) 
                    this.axios.post(this.uri+'/api/creditos/abonar',valores)
                    .then(res => {
                        this.valAbono = 0
                        this.verPagos(id,valorCuota,idc)
                        this.actualizarValor(idc,this.val)
                        this.aplicarAbono(vC,x,numero,nombre)  
                        this.guardarIngresoIntereses(x) 
                    })
                    .catch(err => console.log(err));
                }else{
                    valorCuota = parseInt(valorCuota)
                    this.val = vC+Vic-vA
                    let valores = {
                        abono : vA+abon,
                        id:id
                    }
                    this.axios.post(this.uri+'/api/creditos/abonar',valores)
                    .then(res => {
                        this.valAbono = 0
                        this.verPagos(id,valorCuota,idc)
                        this.actualizarValor(idc,this.val)
                        this.aplicarAbono(vA,0,numero,nombre)   

                    })
                    .catch(err => console.log(err));
                }
            }    
        },
        
        verCliente(id){
            this.encabezado = false
            this.busqueda = false
            let cedulaCliente={
                cedula : id,
                }
            this.axios.post(this.uri+"/api/verCliente", cedulaCliente)//este esta en la api clientes
            .then(res => {
                if (res.data.length<=0){
                    this.yes = false
                    console.log('este es el cliente 2')
                    console.log (this.verCreditoU.nombreCliente)
                    this.verCred = true
                }else{
                    this.yes = true
                    this.cliente = res.data[0];
                    console.log('este es el cliente')
                    console.log(this.cliente)
                    this.verCred = true 
                }
                this.cliente = res.data[0];
                this.verCred = true
            })
            .catch(err => console.log(err));            
        },
        quitarPuntos(x){
            let valer = "" 
            let val = x
            for (let n = 0; n <= val.length - 1; n++) {
                if (val[n] == "." ) {
                    n++;
                }
                valer = valer + val[n];
            }
            valer = parseInt(valer)
            return(valer)
        },
        calcularInteres(){
            let a = this.quitarPuntos(this.verCreditoU.valTotalCred)//1300000
            a = parseInt(a)
            let b = this.a//1000000
            let c  = a - b
            this.d = c / this.b
            this.d = Math.round(this.d)
            this.intere = this.d
            return
        },
        cancelar(capital,interes,idc,numero,nombre){
            capital = this.quitarPuntos(capital)
            interes = this.quitarPuntos(interes)
            interes = parseInt(interes)
            capital = parseInt(capital)
            let t = capital + interes
            let dia = new Date().getDate();
            let mes = new Date().getMonth();
            let ano = new Date().getFullYear();
            let valores = {
                concepto : 'capitalCreditos',
                valor: capital ,
                interes:interes,
                numero:numero,
                nombre:nombre,
                descripcion: 'ingreso pago totalidad capital credito',
                codigoEmpleado : this.codigo,
                fechaIngresoEfectivo :  new Date(ano,(mes), dia),
                idCredito: this.verCreditoU._id
            }
            this.axios.post(this.uri+"/api/contabilidad/guardarIngreso", valores)
            .then(res => {
                this.guardarIngresoInteresesTotal(interes,idc)

            })
            .catch(err => {
                console.log(err);
            });
        },
        guardarIngresoInteresesTotal(valorr,idc) {
            let dia = new Date().getDate();
            let mes = new Date().getMonth();
            let ano = new Date().getFullYear();
            let valores = {
                concepto : 'interesCreditos',
                valor: valorr ,
                descripcion: 'ingreso pago totalidad intereses credito',
                codigoEmpleado : this.codigo,
                fechaIngresoEfectivo :  new Date(ano,(mes), dia),
                idCredito: this.verCreditoU._id
            }  
            this.axios
            .post(this.uri+"/api/contabilidad/guardarIngreso", valores)
            .then(res => {
                this.cancelarCredito(this.verCreditoU._id)
            })
            .catch(err => {
                console.log(err);
            });
        }, 
        aplicarAbono(valorabono,interes,numero,nombre){
            let dia = new Date().getDate();
            let mes = new Date().getMonth();
            let ano = new Date().getFullYear();
            let valores = {
                concepto : 'capitalCreditos',
                valor: valorabono,
                interes:interes,
                numero:numero,
                nombre:nombre,
                descripcion: 'ingreso abono a credito '+this.verCreditoU._id,
                codigoEmpleado : this.codigo,
                fechaIngresoEfectivo :  new Date(ano,(mes), dia),
                idCredito: this.verCreditoU._id
            } 
            this.axios.post(this.uri+"/api/contabilidad/guardarIngreso", valores)
                .then(res => {
                this.verCreditos()
                setTimeout(() => {  this.guardarDatosHoy() }, 2500); 
            })
                .catch(err => {
                console.log(err);
            });
        },
        imprimirReciboAbono(ano,mes,dia,totalPagares,abono,vsi,index,interes,numero,nombre,telefono,servicio,tipoRecibo,resta){
        let fechaEstablecida = ano+'/'+mes+'/'+dia
        this.reciboImpresion = true
        this.impresion = {}
        index = index +1
        interes = this.quitarPuntos(interes)
        vsi = this.quitarPuntos(vsi)
        let valorMess = vsi+interes+abono
        let hora = this.horaPago()
        let valApagar = abono
        this.impresion = {
                index,
                totalPagares,
                valorMess, 
                abono,            
                valApagar,
                numero,
                nombre,
                telefono,
                servicio,
                tipoRecibo,
                fechaEstablecida,
                resta,
                hora,
            }            
        },
        imprimirRecibo(ano,mes,dia,totalPagares,abono,vsi,index,interes,numero,nombre,telefono,servicio,tipoRecibo,resta){
            let fechaEstablecida = ano+'/'+mes+'/'+dia
            this.reciboImpresion = true
            this.impresion = {}
            let hora = this.horaPago()
            index = index +1
            //console.log('totalPagares'+totalPagares-1)//      
            //console.log('cuota nuemro'+index)//               
            //console.log('valorTotalMes'+valortotalMes)//               
            console.log('capital'+vsi)//               
            console.log('interes'+interes)//      
            console.log('abono'+abono)// 
            //console.log('abono'+servicio)// 
            interes = this.quitarPuntos(interes)
            vsi = this.quitarPuntos(vsi)
            let valorMess = vsi+abono+interes
            let valApagar = valorMess - abono
            this.impresion = {
                    index,
                    totalPagares,
                    valorMess, 
                    abono,            
                    valApagar,
                    numero,
                    nombre,
                    telefono,
                    servicio,
                    tipoRecibo,
                    fechaEstablecida,
                    resta,
                    hora,
                }
            console.log(this.impresion)
             
        },
        impRecibo(){
            printJS({
                printable: 'impresion',
                type: 'html',
                maxWidth:300,
            })
        },
        pagarCuota(vsi,idPagares,index,valorMes,id,interes,numero,nombre) {
            interes = this.quitarPuntos(interes)
            interes = parseInt(interes)
            let Fp
            //lo sigueinte para cuando es el ultimo pagare que se paga
            if(index == this.b-1){
                 Fp = null  
                 this.val = 0

            }else{
                console.log(this.pagg)
                 Fp = new Date(parseInt(this.pagg[index+1].ano)+'-'+parseInt(this.pagg[index+1].mes)+'-'+parseInt(this.pagg[index+1].dia))
                 let a = this.quitarPuntos(this.pagg[index+1].valorCuota)
                 let b = this.quitarPuntos(this.pagg[index+1].interesCuota)
                 this.val = (a+b)
            }
            if(index==0){
                let dia = new Date().getDate();
                let mes = new Date().getMonth();
                let ano = new Date().getFullYear();
                vsi = this.quitarPuntos(vsi)
                let valor = vsi;
                valor = Math.round(valor)
                let valores = {
                    concepto : 'capitalCreditos',
                    valor: valor ,
                    interes:interes,
                    numero:numero,
                    nombre:nombre,
                    descripcion: 'ingreso pago capital credito',
                    codigoEmpleado : this.codigo,
                    fechaIngresoEfectivo : new Date(ano,(mes), dia),
                    idCredito: this.verCreditoU._id
                }
                this.axios.post(this.uri+"/api/contabilidad/guardarIngreso", valores)
                    .then(res => {
                    let r = res.data.data
                    this.proxFechaPago(Fp,this.verCreditoU._id,this.val)
                    this.guardarIngresoIntereses(interes)
                    this.cambiarBotonPago(idPagares,index,valorMes,id)
                    this.verCreditos()
                    setTimeout(() => {  this.guardarDatosHoy() }, 2500); 
                })
                    .catch(err => {
                    console.log(err);
                });                
            }else{
                if(this.pagg[index-1].estado==false){
                    return
                }else{
                    let dia = new Date().getDate();
                    let mes = new Date().getMonth();
                    let ano = new Date().getFullYear();
                    vsi = this.quitarPuntos(vsi)                    
                    let valor = vsi;
                    valor = Math.round(valor)
                    let valores = {
                        concepto : 'capitalCreditos',
                        valor: valor ,
                        interes:interes,
                        numero:numero,
                        nombre:nombre,
                        descripcion: 'ingreso pago capital credito',
                        codigoEmpleado : this.codigo,
                        fechaIngresoEfectivo : new Date(ano,(mes), dia),
                        idCredito: this.verCreditoU._id
                    }
                    this.axios.post(this.uri+"/api/contabilidad/guardarIngreso", valores)
                    .then(res => {
                        let r = res.data.data
                        if(index<this.b-1){
                        this.guardarIngresoIntereses(interes)
                        this.cambiarBotonPago(idPagares,index,valorMes,id)
                        this.proxFechaPago(Fp,this.verCreditoU._id,this.val)
                        this.verCreditos()
                        setTimeout(() => {  this.guardarDatosHoy() }, 2500); 
                        }else{
                            this.guardarIngresoIntereses(interes)
                            this.cambiarBotonPago(idPagares,index,valorMes,id)  
                            this.verCreditos()
                        }
                    })
                    .catch(err => {console.log(err);});                    
                }
            }              
          //this.spiner = true                
        },
        proxFechaPago(Fp,id,val){            
            let dia = new Date().getDate()+1;
            let mes = new Date().getMonth()+1;
            let ano = new Date().getFullYear();
            let f = ano+'-'+mes+'-'+dia
            let fecha1 = new Date(Fp)
            let fecha2 = new Date(f)
            let pf 
            if(fecha1<fecha2){
                pf=true
            }else{
                pf=false
            }
            let valores = {
                id : id,
                Fp : Fp,
                pf: pf,
                val:val,
            }
            this.axios.post(this.uri+"/api/creditos/nuevaFechaPago", valores)
            .then(res => {
                this.verCreditoUnico(id)
                this.verCreditos()
            })
            .catch(err => {console.log(err)});
        },
        guardarIngresoIntereses(valor){
            let dia = new Date().getDate();
            let mes = new Date().getMonth();
            let ano = new Date().getFullYear();
            if(valor){
                let valores = {
                    concepto : 'interesCreditos',
                    valor: valor ,
                    descripcion: 'ingreso pago intereses credito',
                    codigoEmpleado : this.codigo,
                    fechaIngresoEfectivo : new Date(ano,(mes), dia),
                    idCredito: this.verCreditoU._id
                } 
                this.axios
                .post(this.uri+"/api/contabilidad/guardarIngreso", valores)
                .then(res => {
                let r = res.data.data
                //this.actualizarValor(this.verCreditoU._id)
                })
                .catch(err => {
                    console.log(err);
                });
            }else{
                let valores = {
                    concepto : 'interesCreditos',
                    valor: this.d ,
                    descripcion: 'ingreso pago intereses credito',
                    codigoEmpleado : this.codigo,
                    fechaIngresoEfectivo : new Date(ano,(mes), dia),
                    idCredito: this.verCreditoU._id
                }  
                this.axios
                .post(this.uri+"/api/contabilidad/guardarIngreso", valores)
                .then(res => {
                let r = res.data.data
                //this.actualizarValor(this.verCreditoU._id)
                })
                .catch(err => {
                    console.log(err);
                });
            }     
            
        },
        actualizarValor(id,val){
            let idd = {
                id:id,
                val: val
            }
            this.axios.post(this.uri+"/api/creditos/nuevoValorMensual", idd)
            .then(res => {
                let r = res.data.data
                this.verCreditoUnico(id)
            })
            .catch(err => {console.log(err)});
        },
        cambiarBotonPago(idPagares,index,vm,id){
            let valores ={
                id:idPagares,
                index:index
            }
            this.axios.post(this.uri+"/api/creditos/cambiarEstadoCuota", valores)
            .then(res => {
                this.verPagos(idPagares,parseInt(vm),id)
                this.spiner=false
            })
            .catch(err => {
                console.log(err);
            });
        }
    }
}
</script>

    