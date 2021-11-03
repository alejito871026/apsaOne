<template>
<div>
  <div class="" v-if="!vercred && !verCupos">
    <h1 class="text-center p-4">Solicitudes</h1>
  </div>
<div class="d-none" v-on="ff()">{{pros.respuesta.respuesta}}</div>
      <br/>
      <div v-if="!verCupos">
        <div style="height: auto; max-height: 390px; overflow-y: scroll;" v-if="!vercred">
        <table class="table table-hover border table-sm bg-white text-dark table-responsive-sm">
          <thead class="sticky-top text-white bg-dark">
            <tr>
              <th># credito</th>
              <th>CC Cliente</th>
              <th>Nombre Cliente</th>
              <th>Servicio</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="credito in Creditos" :key="credito.id">
              <td>{{credito.numeroCredito}}</td>
              <td>{{credito.cedula}}</td>
              <td>{{credito.nombreCliente}}</td>
              <td>{{credito.servicio}}</td>
              <td>
                <button class="btn btn-primary btn-sm" @click="spiner = true, verCredito(credito._id)">ver</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
      <br>
        <div v-if="cupo">
          <h2 class="text-center p-4">Cupos</h2>
        <table class="table table-hover border table-sm bg-white text-dark table-responsive-sm">
          <thead class="sticky-top text-white bg-dark">
            <tr>
              <th># cupo</th>
              <th>CC Cliente</th>
              <th>Monto aprobado</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cupo, index in cupos">
              <td>{{index}}</td>
              <td>{{cupo.clienteCedulaId}}</td>
              <td>{{cupo.montoAprobado}}</td>
              <td>
                <button class="btn btn-primary btn-sm" @click="spiner = true, verCupo(cupo._id)">ver</button>
              </td>
            </tr>
          </tbody>
        </table>
        </div>
  <div v-if="vercred">
      <div id="infoDeudor">
          <div class="card">
              <div class="card-header border">
                  <h1 class="text-center">Solicitud credito # {{verCred.numeroCredito}}</h1>
              </div>
              <div class="card-body border">
                  <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                            <div id class="form-control">Cliente: {{cliente.nombreCliente}}</div>
                        </div>
                        <div class="form-group">
                            <div id class="form-control">CC: {{cliente.cedulaId}}</div>
                        </div>
                        <div class="form-group">
                            <div id class="form-control">cel: {{cliente.celularUno}}</div>
                        </div>
                      </div>
                      <div class="col-md-6">
                          <div class="form-group">
                            <div id class="form-control">Servicio: {{verCred.servicio}}</div>
                        </div>
                        <div class="form-group">
                            <div id class="form-control">Monto solicitado: {{verCred.cantidad}}</div>
                        </div>
                        <div class="form-group">
                            <div id class="form-control">Fecha de agregado: {{verCred.fechaAgregado}}</div>
                        </div>
                      </div>                      
                  </div>
                  <div v-if="producto">
                    existe Producto {{verCred.producto}}
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                            <div id class="form-control">Producto: {{productoCredito.tipoProducto}}</div>
                        </div>
                        <div class="form-group">
                            <div id class="form-control">Modelo: {{productoCredito.modelo}}</div>
                        </div>
                        <div class="form-group">
                            <div id class="form-control">Referencia: {{productoCredito.referencia}}</div>
                        </div>
                      </div>
                      <div class="col-md-6">
                          <div class="form-group">
                            <div id class="form-control">Valor venta: {{productoCredito.valorVenta}}</div>
                        </div>
                        <div class="form-group">
                            <div id class="form-control">Estado: {{productoCredito.estado}}</div>
                        </div>
                      </div>                      
                  </div>
                  </div>
                  <div class="btn-group col-lg-12" role="group" aria-label="">
                    <div class="form-control">Credito creado por: {{creador.nombreE}} {{creador.primerApellidoE}} {{creador.segundoApellidoE}}</div>
                  </div>  
                    <br><br>
                    <div class="col-md-12 btn btn-primary" v-if="che1"  @click="aumentar(valor), che1=false">
                      {{valor}}% Validar informacion correcta <i class="fa fa-check s:5x"></i></div>
                    <div class="btn-group col-lg-12" role="group" aria-label="">
                      <div class="btn btn-success" v-if="!che1">Informacion correcta <i class="fa fa-check s:5x"></i></div>
                      <div class="btn btn-danger" v-if="!che1"  @click="borrar(valor), che1=true">Quitar validacion <i class="fa fa-trash"></i></div>
                    </div>
              </div>
          </div>
      </div>
      <div id="infolaboral" v-if="infolaboral">
          <div class="card">
              <div class="card-header border">
                  <h2 class="text-center">Informacion Laboral Deudor</h2>
              </div>
              <div class="card-body border">
                  <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                            <div id class="form-control" v-if="!independiente">Nombre Empresa: {{verCred.infoLab.nombreEmpresa}}</div>
                            <div id class="form-control" v-if="independiente">Actividad o negocio: {{verCred.infoLab.nombreEmpresa}}</div>
                        </div>
                        <div class="form-group">
                            <div id class="form-control">Ciudad: {{verCred.infoLab.ciudadEmpresa}}</div>
                        </div>
                        <div class="form-group">
                            <div id class="form-control">Cargo: {{verCred.infoLab.cargoEmpleado}}</div>
                        </div>
                      </div>
                      <div class="col-md-6">
                          <div class="form-group">
                            <div id class="form-control">Direccion: {{verCred.infoLab.direccionEmpresa}}</div>
                        </div>
                        <div class="form-group">
                            <div id class="form-control">Telefono Empresa: {{verCred.infoLab.telefonoEmpresa}}</div>
                        </div>
                        <div class="form-group">
                            <div id class="form-control">Salario: {{verCred.infoLab.salarioEmpleado}}</div>
                        </div>
                      </div>
                  </div>
                  <div v-if="!independiente">
                    <div class="col-md-12 btn btn-primary" v-if="che2"  @click="aumentar(10), che2=false">
                        10 % Validar informacion laboral <i class="fa fa-check s:5x"></i>
                    </div>
                    <div class="btn-group col-lg-12" role="group" aria-label="">
                      <div class="btn btn-success" v-if="!che2">Informacion laboral correcta <i class="fa fa-check s:5x"></i></div>
                      <div class="btn btn-danger" v-if="!che2"  @click="borrar(10), che2=true">Quitar validacion <i class="fa fa-trash"></i></div>
                    </div>
                  </div>
                  
                  <div v-if="independiente">
                    <div class="col-md-12 btn btn-primary" v-if="che2"  @click="aumentar(10), che2=false">
                        10 % Validar informacion laboral <i class="fa fa-check s:5x"></i>
                    </div>
                  </div>
              </div>
          </div>
      </div>
      <div id="referenciasFamiliares" v-if="ref">
          <div class="card">
              <div class="card-header border">
                  <h2 class="text-center">Referencias Familiares</h2>
              </div>
              <div class="card-body border"> 
                  <div>
                      <table class="table table-hover border table-sm bg-white text-dark table-responsive-sm col-lg-12 text-center">
                        <thead class="sticky-top text-white bg-dark">
                            <tr>
                                <th>nombre referencia</th>
                                <th>Direccion</th>
                                <th>Telefono</th>
                                <th>Parentesco</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="referencias,index in verCred.referidos" >
                                <td>{{referencias.nombreRF}}</td>
                                <td>{{referencias.direccionRF}}</td>
                                <td>{{referencias.telefonoRF}}</td>
                                <td>{{referencias.parentescoRF}}</td>
                                <td>

                                <div class="btn-group " role="group" aria-label=""> 
                                  <div v-if="quitar[index]"> 
                                  <div class=" btn btn-primary" v-if="che[index]"  @click="aumentar(10), che[index]=false, sinRespuesta [index] = false">
                                    10% Validar informacion referencia <i class="fa fa-check s:5x"></i></div>
                                  </div>  
                                  <div class=" btn btn-danger" v-if="sinRespuesta[index]"  @click="aumentarFallas(10), volverLlamar[index]=true, sinRespuesta[index] = false, quitar[index]=false">
                                    No contestan -- No lo conocen  <i class="fa fa-times s:5x"></i></div> 
                                  <div class=" btn btn-success" v-if="volverLlamar[index]"  @click="borrarFallas(10), aumentar(10), che[index] = false, volverLlamar[index]=false">
                                    10% Revalidar informacion referencia <i class="fa fa-check s:5x"></i></div> 
                                </div>    
                                  <div class="btn-group " role="group" aria-label="">
                                  <div class="btn btn-success" v-if="!che[index]">Informacion correcta  <i class="fa fa-check s:5x"></i></div>
                                  <div class="btn btn-danger" v-if="!che[index]"  @click="borrar(10),sinRespuesta[index]=true,  che[index]=true, quitar[index]=true">
                                    Quitar validacion <i class="fa fa-trash"></i></div>
                                </div>
                              </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      </div>
      <div id="infoFiador" v-if="fiad">
          <div class="card">
              <div class="card-header border">
                  <h2 class="text-center">Informacion {{fiador.fiador_o_prenda}}</h2>
              </div>
              <div class="card-body border" v-if="prendaa">
                  <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                            <div id class="form-control">Tipo Vehiculo: {{fiador.tipoVehiculo}}</div>
                        </div>
                        <div class="form-group">
                            <div id class="form-control">Modelo: {{fiador.modelo}}</div>
                        </div>
                        <div class="form-group">
                            <div id class="form-control">Color: {{fiador.color}}</div>
                        </div>
                        <div class="form-group">
                            <div id class="form-control">Licencia de transito: {{fiador.licTransito}}</div>
                        </div>
                        <div class="form-group">
                            <div id class="form-control"># Motor: {{fiador.motor}}</div>
                        </div>
                        <div class="form-group">
                            <div id class="form-control">Servicio: {{fiador.servicio}}</div>
                        </div>
                        <div class="form-group">
                            <div id class="form-control">Estado seguro: {{fiador.seguro}}</div>
                        </div>
                        <div class="form-group">
                            <div id class="form-control">Estado Tecnicomecanica: {{fiador.tecnicomecanica}}</div>
                        </div>
                        <div class="form-group">
                            <div id class="form-control">Nombre propietario: {{fiador.nombrePropietario}}</div>
                        </div>
                      </div>
                      <div class="col-md-6">
                          <div class="form-group">
                            <div id class="form-control">Marca: {{fiador.marca}}</div>
                        </div>
                        <div class="form-group">
                            <div id class="form-control">Tipo: {{fiador.tipo}}</div>
                        </div>
                        <div class="form-group">
                            <div id class="form-control">Manifiesto: {{fiador.manifiesto}}</div>
                        </div>
                        <div class="form-group">
                            <div id class="form-control">Placa: {{fiador.placa}}</div>
                        </div>
                        <div class="form-group">
                            <div id class="form-control"># Chasis: {{fiador.chasis}}</div>
                        </div>
                        <div class="form-group">
                            <div id class="form-control">Cilindraje: {{fiador.cilindraje}}</div>
                        </div>
                        <div class="form-group">
                            <div id class="form-control">Fecha vencimiento seguro: {{fiador.venceSeguro}}</div>
                        </div>
                        <div class="form-group">
                            <div id class="form-control">Fecha vencimiento tecnicomecanica: {{fiador.venceTecno}}</div>
                        </div>
                        <div class="form-group">
                            <div id class="form-control"># CC  propietario: {{fiador.ccPropietario}}</div>
                        </div>
                      </div>
                  </div>
              </div>
              <div class="card-body border" v-if="fiadorr || fiador.fiadorPrenda">
                <div v-if="fiador.fiadorPrenda" class="text-center"><h2>Fiador del credito con prenda</h2></div>
                  <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <div id class="form-control" v-if="!fiadorr">Nombre fiador: {{fiador.fiadorPrenda.nombreFiador}}</div>
                            <div id class="form-control" v-if="fiadorr">Nombre fiador: {{fiador.nombreFiador}}</div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <div id class="form-control" v-if="!fiadorr"> 1 Apellido: {{fiador.fiadorPrenda.primerApellidoFiador}}</div>
                            <div id class="form-control" v-if="fiadorr"> 1 Apellido: {{fiador.primerApellidoFiador}}</div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <div id class="form-control" v-if="!fiadorr"> 2 Apellido: {{fiador.fiadorPrenda.segundoApellidoFiador}}</div>
                            <div id class="form-control" v-if="fiadorr"> 2 Apellido: {{fiador.segundoApellidoFiador}}</div>
                        </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <div id class="form-control" v-if="!fiadorr">Cedula: {{fiador.fiadorPrenda.cedulaFiador}}</div>
                            <div id class="form-control" v-if="fiadorr">Cedula: {{fiador.cedulaFiador}}</div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <div id class="form-control" v-if="!fiadorr"> # Celular: {{fiador.fiadorPrenda.celularUnoFiador}}</div>
                            <div id class="form-control" v-if="fiadorr"> # Celular: {{fiador.celularUnoFiador}}</div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <div id class="form-control" v-if="!fiadorr"> Otro # de celular: {{fiador.fiadorPrenda.celularDosFiador}}</div>
                            <div id class="form-control" v-if="fiadorr"> Otro # de celular: {{fiador.celularDosFiador}}</div>
                        </div>
                    </div>
                  </div>
                  <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                            <div id class="form-control" v-if="!fiadorr">Edad : {{fiador.fiadorPrenda.edadFiador}}</div>
                            <div id class="form-control" v-if="fiadorr">Edad : {{fiador.edadFiador}}</div>
                        </div>
                        
                      </div>
                      <div class="col-md-6">
                          <div class="form-group">
                            <div id class="form-control" v-if="!fiadorr">Email: {{fiador.fiadorPrenda.emailFiador}}</div>
                            <div id class="form-control" v-if="fiadorr">Email: {{fiador.emailFiador}}</div>
                        </div>
                      </div>
                  </div>
                  <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <div id class="form-control" v-if="!fiadorr">Direccion: {{fiador.fiadorPrenda.direccionFiador}}</div>
                            <div id class="form-control" v-if="fiadorr">Direccion: {{fiador.direccionFiador}}</div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <div id class="form-control" v-if="!fiadorr"> Barrio: {{fiador.fiadorPrenda.barrioFiador}}</div>
                            <div id class="form-control" v-if="fiadorr"> Barrio: {{fiador.barrioFiador}}</div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <div id class="form-control" v-if="!fiadorr"> Ciudad: {{fiador.fiadorPrenda.ciudadFiador}}</div>
                            <div id class="form-control" v-if="fiadorr"> Ciudad: {{fiador.ciudadFiador}}</div>
                        </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <div id class="form-control" v-if="!fiadorr">Tipo vivienda: {{fiador.fiadorPrenda.tViviendaFiador}}</div>
                            <div id class="form-control" v-if="fiadorr">Tipo vivienda: {{fiador.tViviendaFiador}}</div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <div id class="form-control" v-if="!fiadorr"> ocupacion: {{fiador.fiadorPrenda.ocupacionFiador}}</div>
                            <div id class="form-control" v-if="fiadorr"> ocupacion: {{fiador.ocupacionFiador}}</div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <div id class="form-control" v-if="!fiadorr"> Personas a cargo: {{fiador.fiadorPrenda.PcargoFiador}}</div>
                            <div id class="form-control" v-if="fiadorr"> Personas a cargo: {{fiador.PcargoFiador}}</div>
                        </div>
                    </div>
                  </div>
                  <div v-if="!fiadorr">
                    <div class="col-md-12 btn btn-primary" v-if="che4"  @click="aumentar(valor2), che4=false">
                        {{valor2}} % Validar informacion fiador credito con prenda <i class="fa fa-check s:5x"></i>
                    </div>
                    <div class="btn-group col-lg-12" role="group" aria-label="">
                      <div class="btn btn-success" v-if="!che4">Informacion fiador credito con prenda correcta <i class="fa fa-check s:5x"></i></div>
                      <div class="btn btn-danger" v-if="!che4"  @click="borrar(valor2), che4=true">Quitar validacion <i class="fa fa-trash"></i></div>
                    </div>
                  </div>
                  <div id="infolaboralfiadorPrenda" v-if="infolaboralFP || infolabFiador">
                    <div class="card">
                        <div class="card-header border" v-if="infolaboralFP">
                            <h2 class="text-center">Informacion Laboral fiador del credito con prenda</h2>
                        </div>
                        <div class="card-header border" v-if="infolabFiador">
                            <h2 class="text-center">Informacion Laboral fiador</h2>
                        </div>
                        <div class="card-body border">
                            <div class="row">
                                <div class="col-md-6">
                                  <div class="form-group">
                                      <div id class="form-control" v-if="infolabFiador">Nombre Empresa: {{fiador.infolaboralFiador.nombreEmpresa}}</div>
                                      <div id class="form-control" v-if="fiador.infolabfiadorPrenda">Nombre Empresa: {{fiador.infolabfiadorPrenda.nombreEmpresa}}</div>
                                  </div>
                                  <div class="form-group">
                                      <div id class="form-control" v-if="infolabFiador">Ciudad: {{fiador.infolaboralFiador.ciudadEmpresa}}</div>
                                      <div id class="form-control" v-if="fiador.infolabfiadorPrenda">Ciudad: {{fiador.infolabfiadorPrenda.ciudadEmpresa}}</div>
                                  </div>
                                  <div class="form-group">
                                      <div id class="form-control" v-if="infolabFiador">Cargo: {{fiador.infolaboralFiador.cargoEmpleado}}</div>
                                      <div id class="form-control" v-if="fiador.infolabfiadorPrenda">Cargo: {{fiador.infolabfiadorPrenda.cargoEmpleado}}</div>
                                  </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                      <div id class="form-control" v-if="infolabFiador">Direccion: {{fiador.infolaboralFiador.direccionEmpresa}}</div>
                                      <div id class="form-control" v-if="fiador.infolabfiadorPrenda">Direccion: {{fiador.infolabfiadorPrenda.direccionEmpresa}}</div>
                                  </div>
                                  <div class="form-group">
                                      <div id class="form-control" v-if="infolabFiador">Telefono Empresa: {{fiador.infolaboralFiador.telefonoEmpresa}}</div>
                                      <div id class="form-control" v-if="fiador.infolabfiadorPrenda">Telefono Empresa: {{fiador.infolabfiadorPrenda.telefonoEmpresa}}</div>
                                  </div>
                                  <div class="form-group">
                                      <div id class="form-control" v-if="infolabFiador">Salario: {{fiador.infolaboralFiador.salarioEmpleado}}</div>
                                      <div id class="form-control" v-if="fiador.infolabfiadorPrenda">Salario: {{fiador.infolabfiadorPrenda.salarioEmpleado}}</div>
                                  </div>
                                </div>
                            </div>
                            <div v-if="infolaboralFP">
                              <div class="col-md-12 btn btn-primary" v-if="che5  "  @click="aumentar(valor3), che5=false">
                                 {{valor3}} % Validar informacion laboral <i class="fa fa-check s:5x"></i>
                              </div>
                              <div class="btn-group col-lg-12" role="group" aria-label="">
                                <div class="btn btn-success" v-if="!che5">Informacion laboral correcta <i class="fa fa-check s:5x"></i></div>
                                <div class="btn btn-danger" v-if="!che5"  @click="borrar(valor3), che5=true">Quitar validacion <i class="fa fa-trash"></i></div>
                              </div>
                            </div>
                            <div v-if="infolabFiador">
                              <div class="col-md-12 btn btn-primary" v-if="che6  "  @click="aumentar(10), che6=false">
                                 10 % Validar informacion laboral fiador <i class="fa fa-check s:5x"></i>
                              </div>
                              <div class="btn-group col-lg-12" role="group" aria-label="">
                                <div class="btn btn-success" v-if="!che6">Informacion laboral correcta <i class="fa fa-check s:5x"></i></div>
                                <div class="btn btn-danger" v-if="!che6"  @click="borrar(10), che6=true">Quitar validacion <i class="fa fa-trash"></i></div>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
              </div>              
              <div class="card-footer border">
                <div class="btn btn-primary col-lg-12 " v-if="che3"  @click="aumentar(valor2), che3=false">
                    {{valor2}} % Validar informacion fiador o prenda<i class="fa fa-check s:5x"></i>
                </div>
                <div class="btn-group col-lg-12" role="group" aria-label="">
                  <div class="btn btn-success" v-if="!che3">Informacion fiador o prenda correcta <i class="fa fa-check s:5x"></i></div>
                  <div class="btn btn-danger" v-if="!che3"  @click="borrar(valor2), che3=true">Quitar validacion <i class="fa fa-trash"></i></div>
                </div>
              </div>      
          </div>
      </div>
      <br>
      <div class="progress">
        <div  class="progress-bar progress-bar-striped" role="progressbar" v-bind:style="n">{{progres}}%</div>
        <div class="progress-bar progress-bar-striped bg-success" role="progressbar" v-bind:style="m">{{fallas}}%></div>
      </div> 
      <br>
      <div class="btn btn-success btn-block" v-if="aceptar && !modal && verCred.servicio=='cupo'" @click=" crearCupo(cliente.cedulaId, verCred.cantidad, user.codigo)"><h4><strong>Aprobar cupo</strong></h4></div>
      <div class="btn btn-success btn-block" v-if="aceptar && !modal && verCred.servicio!='cupo'" @click="spiner = true, validar(user.codigo)"><h4><strong>Aprobar servicio</strong></h4></div>
      <br>
      <div class="btn btn-warning btn-block" @click="modal=true, modal2 = false"><h4 class="text-white"><strong>No aprobar</strong></h4></div>
      <br>
      <div v-if="modal" class="col-lg-12 border border-dark p-3">
        <h4 class="text-center"><strong>ingrese el motivo por el cual el credito se desaprueba</strong></h4>
        <textarea class="col-md-12" required v-model="texto"></textarea>
        <br><br>
          <div v-if="alerta" class="text-center">
              <div class="alert alert-danger">
                  <strong>Oops!</strong> Ten cuidado <a class="alert-link">escribe un poco mas del porque desaprueba el credito</a>.
              </div>
          </div>
          <button class="btn btn-primary btn-block col-sm-12" v-if="modal" @click="guardar(texto)"><h4><strong>Guardar</strong></h4></button>
          <button class="btn  btn-danger btn-block col-sm-12" v-if="modal" @click="modal = false, texto ='',alert = false"><h4><strong>Cancelar la desaprobacion</strong></h4></button>
      </div>
      <br>
      <div class="btn btn-danger btn-block"  @click="modal2 = true, modal = false"><h4><strong>Negar</strong></h4></div>
      <br>
      <div v-if="modal2" class="col-lg-12 border border-dark p-3">
        <h4 class="text-center"><strong>ingrese el motivo por el cual se niega el credito</strong></h4>
        <textarea class="col-md-12" required v-model="texto"></textarea>
        <br><br>
          <div v-if="alerta2" class="text-center">
              <div class="alert alert-danger">
                  <strong>Oops!</strong> Ten cuidado <a class="alert-link">escribe un poco mas del porque niega el credito</a>.
              </div>
          </div>
          <button class="btn btn-primary btn-block col-sm-12" v-if="modal2" @click=" negar(texto)"><h4><strong>Enviar a negados</strong></h4></button>
          <button class="btn  btn-danger btn-block col-sm-12" v-if="modal2" @click="modal2 = false, texto ='',alert2 = false"><h4><strong>Cancelar la negacion</strong></h4></button>
      </div>
      <br>
      <div class="btn btn-primary btn-block" @click="volver()"><h4><strong>Regresar</strong></h4></div>
  </div>  
      <br><br>
      <div v-if="verCupos">
        <div class="card">
          <div class="card-header">
              <h2 class="text-center">CUPO</h2>
          </div>
          <div class="card-body">
            <br>
            <h2 class="text-center">Monto a aprobar</h2>
            <div class="form-control" >{{cupoUnico.montoAprobado}}</div><br>
            <h3 class="text-center">datos del cliente</h3>
              <span>Nombre</span>
              <div class="form-control" >{{cliente.nombreCliente}} {{cliente.primerApellidoCliente}} {{cliente.segundoApellidoCliente}}</div><br>
              <span>cedula</span>
              <div class="form-control" >{{cliente.cedulaId}}</div><br>
              <span>telefonos</span>
              <div class="row col-md-12">
                <div class="form-control col-md-6" >{{cliente.celularUno}}</div><br>
                <div class="form-control col-md-6" >{{cliente.celularDos}}</div><br>
              </div>
              
              <span>direccion</span>
              <div class="form-control" >{{cliente.direccionCliente}}</div><br>
              <span>Barrio</span>
              <div class="form-control" >{{cliente.barrioCliente}}</div><br>
              <span>ciudad</span>
              <div class="form-control" >{{cliente.ciudadCliente}}</div><br>
              <span>Creditos que a tenido el cliente</span>
              <div class="form-control" >{{cantidadCreditosCliente}}</div><br>
              <span>ciudad</span>
              <div class="form-control" >{{cliente.ciudadCliente}}</div><br>
          </div>
          <div class="card-footer">
            <button class="btn btn-primary btn-block" @click="spiner = true, aprobarCupo(cupoUnico)"><h3><strong>Aprobar cupo</strong></h3></button>
            <button class="btn btn-success btn-block" @click="cerrarCupo()"><h3><strong>Cerrar cupo</strong></h3></button>
          </div>
        </div>
      </div>
    <b-modal v-model="spiner" no-close-on-backdrop no-close-on-esc hide-header-close hide-header hide-footer 
    lazy centered size="lg">
      <div class="text-center">
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
</div>
</template>

<script>
class person {
  constructor(cedulaId) {
    this.cedulaId = cedulaId;
  }
}
class usuario {
  constructor(){
    this.nombre = '';
    this.apellidos = '';
    this.codigo = '';
    this.direccion = '';
    this.celular = '';
    this.rol= '';
  }
}
import axios from 'axios'
import Swal from'vue-sweetalert2'
import f from "../funciones/funciones.js";

export default {
 name: 'solicitudes',
 data () {
     return {
       producto:false,
       productoCredito:{},
       spiner:false,
       show:true,
       cupoUnico:0,
       cupo:true,
       valor4:0,
       valor:0,
       valor2:0,
       valor3:8,
       infolaboral:true,
       infolaboralFP:false,
       infolabFiador:false,
       ref : true,
       fiad: true,
       che:[true,true,true,true,true,true], 
       che1:true,
       che2:true,
       che3:true,
       che4: true,
       che5:true,
       che6:true,
       volverLlamar:[false,false,false,false,false,false],
       sinRespuesta:[true,true,true,true,true,true],
       quitar:[true,true,true,true,true,true],
        user: new usuario(),
        Creditos: {},
        pros: {},
        verCred: {},
        cliente: {},
        cedul: {},
        vercred:false,
        fiador :{},
        prendaa: false,
        fiadorr : false,
        independiente : false,
        progres : 0,
        fallas:0,
        aceptar:false,
        modal:false,
        idPrincipal:"",
        n: {
          width: "0%",
          valuemin:"0",
          valuemax:"100",
          valuenow:0
        },
        m: {
          width: "0%",
          valuemin:"0",
          valuemax:"100",
          valuenow:0
        },
        creador: {},
        texto:'',
        alerta:false,
        modal2:false,
        alerta2:false,
        ok:false,
        resp:{},
        cupos:{},
        verCupos:false,
        cantidadCreditosCliente:0,
        token:'',
        uri:'',
    }
 },
 props: ["respu"],
 created() {
   this.uri = f.uri
    
  },
mounted() {
    this.verUsuario(1)
    this.fetchCreditos();
    this.fetchCupos();
},
updated(){
  if(this.progres >= 80){
    this.aceptar = true
  }else{
    this.aceptar = false
  }
},
 methods:{
   verProducto(id){
     let idd = {
       id:id
     }
     this.$axios.$post(this.uri+'/api/productos/verProducto',idd)
     .then(res=>{console.log(res.data)
      this.productoCredito = res.data
     })
     .catch(err=>{console.log(err.response)})
   },
   verCupo(idcupo){
     this.verCupos=true
     this.cupo = false
    let id = {idcupo:idcupo}
    this.axios.post(this.uri+'/api/cupoapsa/verCupoUnico',id)
    .then(res=>{
      this.spiner = false
      this.cupoUnico = res.data
      this.verClienteCupo(res.data.clienteCedulaId)
      this.cuentaCreditosCliente(res.data.clienteCedulaId)
    })
    .catch(err=>{
      this.spiner = false
      console.log(err)
    })
    //this.verClienteCupo()
   },
   cuentaCreditosCliente(cc){
     let id = {cedulaId:cc}
     this.axios.post(this.uri+'/api/creditos/cuentaCreditosCliente',id)
     .then(res=>{
       this.cantidadCreditosCliente = res.data
     })
     .catch(err=>{
       console.log(err)
     })
   },
    verClienteCupo(n){
      let cc = {
        cedulaId:n
      }
      this.axios.post(this.uri+"/api/busqueda", cc)
      .then(res => {
        this.cliente = res.data[0]; 
      })
      .catch(err => console.log(err));
    },
   cerrarCupo(){
     this.verCupos = false
     this.cupo = true
   },
   aprobarCupo(cupo){
    let idd = {id:cupo._id}
    axios.post(this.uri+'/api/cupoapsa/cambioEstadoCupo',idd)
    .then(res=>{
      this.enviarCupoApsa(cupo.clienteCedulaId)
    })
    .catch(err=>{console.log(err),this.spiner=false})
   },
   verUsuario(n){
     axios.get(this.uri+'/api/login/usuario', {headers:{token:localStorage.getItem('token')}})
      .then(res => {
        this.user=res.data.user
        if(n===2){
          this.ok = true
        }else{
          if(n===1){
          this.ok = false
          }
        }
        })
      .catch(err => {
        localStorage.clear()
        if(localStorage.getItem ('token') === null){
        this.$router.push('/inicioSesion')
        }
        this.ok = false
    });
   },
     fetchCreditos() {
      //const uri = "http://localhost:3000/api/clientes"
      this.axios 
        .get(this.uri+"/api/creditos/Cotizacion")
        .then(res => {
          this.Creditos = res.data;
        })
        .catch(err => console.log(err));
    },
fetchCupos(){
  this.axios 
  .get(this.uri+"/api/cupoapsa/cuposPorAprobar")
  .then(res => {
    this.cupos = res.data;
  })
  .catch(err => console.log(err));
},    
volver() {
  this.borrar(100),
  this.borrarFallas(100), 
  this.infolaboralFP=false, 
  this.infolabFiador=false,
  this.che1=true,
  this.che2=true,
  this.che3=true,
  this.che5=true,
  this.che6=true,
  this.vercred=false, 
  this.che=[true,true,true,true,true,true], 
  this.sinRespuesta=[true,true,true,true,true,true], 
  this.quitar=[true,true,true,true,true,true], 
  this.volverLlamar=[false,false,false,false,false,false]
  this.cupo = true
},
validar(n) {
    let aprobadoPor ={
      cc : n,
      id : this.idPrincipal
    }
    this.axios.post(this.uri+"/api/creditos/aprobar", aprobadoPor)
    .then(res => {
      this.fetchCreditos()
      this.volver()
      this.spiner = false
    })
    .catch(err => {console.log(err),this.spiner=false}); 
}, 
enviarCupoApsa(cedula){
  const contras = "JDhd950402-*/#$%04286482762111dhAD#d06845620178%$102687JdHd020495dDAhd*#&%"
  cedula=cedula.toString()
  let iid = this.CryptoJS.AES.encrypt(cedula, contras).toString();
  iid = this.CryptoJS.AES.encrypt(iid, contras).toString();
  const dat = {
    Xvalid : iid
  }
  const uri = 'http://localhost:9900/api/cupo/enviarMensaje'
    axios.post(uri,dat)
    .then(res => {
      console.log(res.data)
      this.spiner = false
    })    
    .catch(err => {console.log(err),this.spiner=false});  
},
  aumentar(x){
    this.progres = this.progres + x
    if(this.progres>100){
      this.progres = 100
      return
    }
    this.n = {
          width: this.progres+"%",
          valuemin:"0",
          valuemax:"100",
          valuenow:this.progres
        }
  },
  borrar(x){
    this.progres = this.progres - x
     if(this.progres<0){
      this.progres = 0
      this.n = {
          width: this.progres+"%",
          valuemin:"0",
          valuemax:"100",
          valuenow:this.progres
        }
      return
    }
    this.n = {
          width: this.progres+"%",
          valuemin:"0",
          valuemax:"100",
          valuenow:this.progres
        }
  },
  aumentarFallas(x){
    this.fallas = this.fallas + x
    if(this.fallas>100){
      this.fallas = 100
      return
    }
    this.m = {
          width: this.fallas+"%",
          valuemin:"0",
          valuemax:"100",
          valuenow:this.fallas
        }
  },
  borrarFallas(x){
    this.fallas = this.fallas - x
    if(this.fallas<=0){
      this.fallas = 0
      this.m = {
          width: this.fallas+"%",
          valuemin:"0",
          valuemax:"100",
          valuenow:this.fallas
        }
      return
    }
    this.m = {
          width: this.fallas+"%",
          valuemin:"0",
          valuemax:"100",
          valuenow:this.fallas
        }
  }, 
  guardar(texto){
    if(texto.length<20){
      this.alerta =  true
      if(this.alerta = true){
        setTimeout(function(){
          this.alerta = false
        }.bind(this),3000)
      }
      return
    }else{
      this.spiner = true
      this.alerta = false      
      const datos={        
        idCredito:this.verCred._id,
        texto:texto,
        fechaNoAprobacion:new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate(),
        ccEmpleado:this.user.codigo,
      }
      this.axios.post(this.uri+'/api/creditos/noAprobar',datos)
      .then(res=>{
        this.cambiarNoAprovado(datos.idCredito)
      })
      .catch(err=>{console.log(err)})
    } 
  },
  cambiarNoAprovado(id){  
    let idd = {
      id : id,
    }
    this.axios.post(this.uri+'/api/creditos/desaprobado',idd)
    .then(res=>{
      this.fetchCreditos();
      this.volver();
      this.spiner = false
    })
    .catch(err=>{console.log(err)})
  },
  negar(texto){
    if(texto.length<20){
      this.alerta2 =  true
      if(this.alerta2 = true){
        setTimeout(function(){
          this.alerta2 = false
        }.bind(this),3000)
      }
      return  
    }else{
      this.spiner = true
      this.alerta2 = false      
      const datos={        
        idCredito:this.verCred._id,
        texto:texto,
        fechaNoAprobacion:new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate(),
        ccEmpleado:this.user.codigo,
      }
      this.axios.post(this.uri+'/api/creditos/noAprobar',datos)
      .then(res=>{
        this.cambiarAnegado(datos.idCredito)
      })
      .catch(err=>{console.log(err)})
    } 
  },
  cambiarAnegado(id){
    let idd = {
      id :id,
    }
    this.axios.post(this.uri+'/api/creditos/negar',idd)
    .then(res=>{
      this.fetchCreditos();
      this.volver();
      this.spiner = false
    })
    .catch(err=>{console.log(err)})
  },
    ff() {
      this.pros.respuesta = this.respu;
      if (this.pros.respuesta.respuesta == 2) {
        this.refrescar();
      } else {
        if (this.pros.respuesta.respuesta == 0) {
          return
        }
      }
    },
    refrescar() {
      this.fetchCreditos();
      this.pros.respuesta.respuesta = 0;
    },
    verCreador(n){
      let idd = {
        cc : n
      } 
      this.axios
      .post(this.uri+"/api/login/verCreador",idd )
      .then(res=>{
        this.creador = res.data.data
      })
      .catch(err => console.log(err))
    },
    verCredito(id) {
      this.cupo=false
      this.idPrincipal = id
      let idd = {
        id : id
      }
      this.axios
        .post(this.uri+"/api/creditos/verCredito", idd)
        .then(res => {
          this.spiner = false
          this.verCred = res.data;
          this.verCreador (this.verCred.creadoPor)
          this.valor = 10
          let y = this.valor
          if(this.verCred.infoLab == ""){
            this.infolaboral = false
            y = y + 10
          }else{
            if(this.verCred.infoLab.cargoEmpleado == null){
              this.verCred.infoLab.cargoEmpleado = 'Independiente'
              this.independiente = true
              this.infolaboral = true
               y = this.valor
            }else{
              this.independiente = false
              this.infolaboral = true
              y = this.valor
            }
          }
          if(this.verCred.producto ==null){
            this.producto = false
          }else{
            this.verProducto(this.verCred.producto)
            this.producto = true
          }
          this.valor = y
          if(this.verCred.referidos == null){
            y = y + 60
            this.ref = false
          }else{
            y = this.valor  
            this.ref = true
          }
          this.valor = y
          if(this.verCred.fiador == null){
            this.fiad = false
            this.valor = this.valor + 20
          }else{
            this.fiad = true
            this.valor = y
          }
          this.cccred = this.verCred.cedula;
          this.cedul = new person(this.cccred);
          this.verCliente(this.cedul) 
          let idFiador = {
              id : this.verCred.fiador
          }
          this.verFiadorPrenda(idFiador)
        })  
        .catch(err => {
          console.log(err)
          this.spiner = false
        });
    },
    verCliente(n){
        this.axios.post(this.uri+"/api/busqueda", n)//este esta en la api clientes
          .then(res => {
            this.vercred=true
            this.cliente = res.data[0];
          })
          .catch(err => console.log(err));
    },
    verFiadorPrenda(n){
        this.axios.post(this.uri+"/api/creditos/FiadorPrenda", n)
          .then(res => {
            this.fiador = res.data;
            if(this.fiador.fiador_o_prenda == 'fiador'){
              this.valor2 = 20
              this.fiadorr = true
              this.prendaa = false
              if(this.fiador.infolaboralFiador != null){
                this.valor2 = 10
                this.infolabFiador = true
                this.independiente = true
              }else{
                if(this.independiente == true){
                  this.valor2 = 20
                }
                this.infolabFiador = false
              }
            }else{
              if(this.fiador.fiador_o_prenda == 'prenda'){
                this.prendaa = true
                  this.valor2 = 20
                }
                if(this.fiador.fiadorPrenda != null){    
                  if(this.fiador.infolabfiadorPrenda !=null){
                    this.infolaboralFP = true
                    if(this.independiente){
                      this.valor3 = 18
                    }else{
                      this.valor3 = 8
                    }
                    this.valor2 = 6
                  }else{
                    this.valor3 = 8
                    this.valor2 = 10
                    this.infolaboralFP = false
                  }
                this.fiadorr = false
                this.prendaa = true
              }
            }
         })
        .catch(err => console.log(err));
        
    },
    terminados() {
      //const uri = "http://localhost:3000/api/clientes"
      this.axios
        .get(this.uri+"/api/creditos/terminados")
        .then(res => {
          this.Creditos = res.data;
        })
        .catch(err => console.log(err));
    }, 
    enMora() {
      //const uri = "http://localhost:3000/api/clientes"
      this.axios
        .get(uri+"/api/creditos/enMora")
        .then(res => {
          this.Creditos = res.data;
        })
        .catch(err => console.log(err));
    },
    solicitudes() {
     this.fetchCreditos()
    },
 }
}
</script>

<style>
</style>