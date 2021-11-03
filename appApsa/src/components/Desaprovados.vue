<template>
  <div class="desaprobados">
      <div class="" v-if="!vercred">
    <h1 class="text-center p-4"><strong>Creditos des-aprobados</strong></h1>
      <div style="height: auto; max-height: 390px; overflow-y: scroll;" >
        <table class="table table-hover border table-sm bg-white text-dark table-responsive-sm">
          <thead class="sticky-top text-white bg-dark">
            <tr>
              <th># credito</th>
              <th>CC Cliente</th>
              <th>Servicio</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="credito in Creditos">
              <td>{{credito.numeroCredito}}</td>
              <td>{{credito.cedula}}</td>
              <td>{{credito.servicio}}</td>
              <td>
                <button class="btn btn-primary btn-sm" @click="verCredito(credito._id)">ver</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div id="verCredito" v-if="vercred">
      <br>
      <div class="card">
        <div class="card-header bg-white"><h2 class="text-center p-4"><strong>Credito desaprobado</strong></h2><br></div>
        <div class="card-body">
          <div>
            <textarea class="col-lg-12 bg-white" disabled v-model="texto.texto"></textarea>
          </div>
          <br>
          <div class="row col-lg-12">
            <div class="col-md-6 border border-dark">
              <h2 class="text-center p-2">informacion del cliente</h2>
              <br>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <label class="input-group-text">Nombre</label>
                </div>
                <div id class="form-control">{{cliente.nombreCliente}} {{cliente.primerApellidoCliente}} {{cliente.segundoApellidoCliente}}</div>
              </div>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <label class="input-group-text"> # Telefono celular </label>
                </div>
                <div id class="form-control">{{cliente.celularUno}}</div>
              </div>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <label class="input-group-text"> # otro numero de Telefon</label>
                </div>
                <div id class="form-control">{{cliente.celularDos}}</div>
              </div>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <label class="input-group-text"> Direccion </label>
                </div>
                <div id class="form-control">{{cliente.direccionCliente}}</div>
              </div>
            </div>
            <div class="col-md-6 border border-dark">
              <h2 class="text-center p-2">solicitud</h2>
              <br>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <label class="input-group-text">Cantidad solicitada</label>
                </div>
                <div id class="form-control">{{credito.cantidad}}</div>
              </div>
              <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01">Tipo de Servicio</label>
                  </div>
                <div id class="form-control">{{credito.servicio}}</div>
              </div>    
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <label class="input-group-text">Interes</label>
                </div>
                <div id class="form-control">{{credito.interes}}</div>
              </div>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <label class="input-group-text">Tiempo</label>
                </div>
                <div id class="form-control">{{credito.interes}}</div>
              </div>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <label class="input-group-text">Frecuencia</label>
                </div>
                <div id class="form-control">{{credito.interes}}</div>
              </div>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <label class="input-group-text">Creado por</label>
                </div>
                <div id class="form-control">{{credito.creadoPor}}</div>
              </div>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <label class="input-group-text">Fecha creacion</label>
                </div>
                <div id class="form-control">{{credito.fechaAgregado}}</div>
              </div>
            </div>
          </div>
          <div class="row col-lg-12">
            <div class="col-md-6 border border-dark">
              <h2 class="text-center p-2">informacion laboral</h2>
              <br>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <label class="input-group-text">Nombre empresa</label>
                </div>
                <input type="text" v-model="credito.infoLab.nombreEmpresa" class="form-control"/>
              </div>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <label class="input-group-text">Ciudad</label>
                </div>
                <input type="text" v-model="credito.infoLab.ciudadEmpresa" class="form-control"/>
              </div>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <label class="input-group-text">telefono</label>
                </div>
                <input type="text" v-model="credito.infoLab.telefonoEmpresa" class="form-control"/>
              </div>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <label class="input-group-text"> Direccion </label>
                </div>
                <input type="text" v-model="credito.infoLab.direccionEmpresa" class="form-control"/>
              </div>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <label class="input-group-text"> Salario </label>
                </div>
                <input type="text" v-model="credito.infoLab.salarioEmpleado" class="form-control"/>
              </div>
            </div>
            <div class="col-md-6 border border-dark">
              <div class="bg-white border p-4" >
                <h2 class="text-center">Referencias Familiares</h2>
                <br />
                <div class="text-center p-4">
                  <table class="table table-sm col-md-12">
                    <thead class="sticky-top text-white bg-dark">
                      <tr>
                        <th>#</th>
                        <th>nombre</th>
                        <th>direccion</th>
                        <th>telefono</th>
                        <th>parentesco</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>
                          <input
                            type="text"
                            v-model="rfamiliaruno.nombreRF"
                            class="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            v-model="rfamiliaruno.direccionRF"
                            class="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            v-model="rfamiliaruno.telefonoRF"
                            class="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            v-model="rfamiliaruno.parentescoRF"
                            class="form-control"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>
                          <input
                            type="text"
                            v-model="rfamiliardos.nombreRF"
                            class="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            v-model="rfamiliardos.direccionRF"
                            class="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            v-model="rfamiliardos.telefonoRF"
                            class="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            v-model="rfamiliardos.parentescoRF"
                            class="form-control"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>
                          <input
                            type="text"
                            v-model="rfamiliartres.nombreRF"
                            class="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            v-model="rfamiliartres.direccionRF"
                            class="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            v-model="rfamiliartres.telefonoRF"
                            class="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            v-model="rfamiliartres.parentescoRF"
                            class="form-control"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <h2 class="text-center">Referencias Personales</h2>
                <br />
                <div class="text-center p-4">
                  <table class="table table-sm col-md-12">
                    <thead class="sticky-top text-white bg-dark">
                      <tr>
                        <th>#</th>
                        <th>nombre</th>
                        <th>direccion</th>
                        <th>telefono</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>
                          <input
                            type="text"
                            v-model="rfpersonaluno.nombreRF"
                            class="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            v-model="rfpersonaluno.direccionRF"
                            class="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            v-model="rfpersonaluno.telefonoRF"
                            class="form-control"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>
                          <input
                            type="text"
                            v-model="rfpersonaldos.nombreRF"
                            class="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            v-model="rfpersonaldos.direccionRF"
                            class="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            v-model="rfpersonaldos.telefonoRF"
                            class="form-control"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>
                          <input
                            type="text"
                            v-model="rfpersonaltres.nombreRF"
                            class="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            v-model="rfpersonaltres.direccionRF"
                            class="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            v-model="rfpersonaltres.telefonoRF"
                            class="form-control"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="row col-lg-12">
            <div class="col-md-6 border border-dark">
              <div v-if="Fiador.fiador_o_prenda == 'prenda'">
                <div class="card p-4">
                  <div class="card-head text-center">
                    <h2 class="p-4">Informacion Prenda</h2>
                  </div>
                  <div class="card-body">
                        <div class="row form-group">
                          <div class="col-md-6">
                            <span>tipo vehiculo</span>
                            <select v-model="Fiador.tipoVehiculo" @change="cambios()" required class="custom-select">
                              <option value="Automovil">Automovil</option>
                              <option value="Motocicleta">Motocicleta</option>
                              <option value="Motocarro">Motocarro</option>
                              <option value="VehiculoElectrico">Vehiculo Electrico</option>
                            </select>
                          </div>
                          <div class="col-lg-6">
                            <span>Marca</span>
                            <input
                              v-model="Fiador.marca"
                              required
                              type="text"
                              placeholder="marca"
                              class="form-control"
                              @keyup="change = true, actualizado=false"
                            />
                          </div>
                        </div>
                        <div class="row form-group">
                          <div class="col-lg-4">
                            <span>Linea</span>
                            <input
                              v-model="Fiador.linea"
                              required
                              type="text"
                              placeholder="linea"
                              class="form-control"
                              @keyup="cambios()"
                            />
                          </div>
                          <div class="col-lg-4">
                            <span>Modelo</span>
                            <input
                              v-model="Fiador.modelo"
                              required
                              type="number"
                              min="2005"
                              class="form-control"
                              @keyup="cambios()"
                            />
                          </div>
                          <div class="col-lg-4">
                            <span>Carroceria tipo</span>
                            <input
                              v-model="Fiador.tipo"
                              required
                              type="text"
                              placeholder="tipo de carroceria"
                              class="form-control"
                              @keyup="cambios()"
                            />
                          </div>
                        </div>
                        <div class="row form-group">
                          <div class="col-lg-4">
                            <span>Color</span>
                            <input
                              v-model="Fiador.color"
                              required
                              type="text"
                              placeholder="color"
                              class="form-control"
                              @keyup="cambios()"
                            />
                          </div>
                          <div class="col-lg-4">
                            <span>Manifiesto</span>
                            <input
                              v-model="Fiador.manifiesto"
                              required
                              type="text"
                              placeholder="modelo"
                              class="form-control"
                              @keyup="cambios()"
                            />
                          </div>
                          <div class="col-lg-4">
                            <span>Licencia de transito</span>
                            <input
                              v-model="Fiador.licTransito"
                              required
                              type="text"
                              placeholder="Licencia de transito"
                              class="form-control"
                              @keyup="cambios()"
                            />
                          </div>
                        </div>
                        <div class="row form-group">
                          <div class="col-lg-4">
                            <span>Placa</span>
                            <input
                              v-model="Fiador.placa"
                              required
                              type="text"
                              placeholder="Placa"
                              class="form-control"
                              @keyup="cambios()"
                            />
                          </div>
                          <div class="col-lg-4">
                            <span># de Motor</span>
                            <input
                              v-model="Fiador.motor"
                              required
                              type="text"
                              placeholder="# de modelo"
                              class="form-control"
                              @keyup="cambios()"
                            />
                          </div>
                          <div class="col-lg-4">
                            <span># de Chasis</span>
                            <input
                              v-model="Fiador.chasis"
                              required
                              type="text"
                              placeholder="# de chasis"
                              class="form-control"
                              @keyup="cambios()"
                            />
                          </div>
                        </div>
                        <div class="row form-group">
                          <div class="col-md-6">
                            <span>Servicio</span>
                            <input
                              v-model="Fiador.servicio"
                              required
                              type="text"
                              min="13"
                              placeholder="Servicio"
                              class="form-control"
                              @keyup="cambios()"
                            />
                          </div>
                          <div class="col-md-6">
                            <span>Cilindraje</span>
                            <input
                              v-model="Fiador.cilindraje"
                              required
                              type="text"
                              placeholder="precio"
                              class="form-control"
                              @keyup="cambios()"
                            />
                          </div>
                        </div>
                        <div class="row form-group">
                          <div class="col-md-4">
                            <span>Seguro activo</span>
                            <select v-model="Fiador.seguro" class="custom-select" @change="cambios()">
                              <option value="vencido">Vencido</option>
                              <option value="activo">Activo</option>
                            </select>
                          </div>
                          <div class="col-md-4">
                            <span>Fecha vencimiento Seguro</span>
                            <input v-model="Fiador.venceSeguro" required type="date" class="form-control" @change="cambios()"/>
                          </div>
                          <div class="col-md-4">
                            <span># de seguro</span>
                            <input v-model="Fiador.numSeguro" required type="text" class="form-control" @change="cambios()"/>
                          </div>
                        </div>
                        <div class="row form-group">
                          <div class="col-md-6">
                            <span>Tecnomecanica activa</span>
                            <select v-model="Fiador.tecnicomecanica" required class="custom-select" @change="cambios()">
                              <option value="vencido">Vencido</option>
                              <option value="activo">Activo</option>
                            </select>
                          </div>
                          <div class="col-md-6">
                            <span>Fecha vencimiento tecnicomecania</span>
                            <input v-model="Fiador.venceTecno" required type="date" class="form-control" @change="cambios"/>
                          </div>
                        </div>
                        <div class="row form-group">
                          <div class="col-md-6">
                            <span>Nombre del propietario</span>
                            <input
                              v-model="Fiador.nombrePropietario"
                              required
                              type="text"
                              class="form-control"
                              @keyup="cambios()"
                            />
                          </div>
                          <div class="col-md-6">
                            <span># CC propietario</span>
                            <input
                              v-model="Fiador.ccPropietario"
                              required
                              type="number"
                              class="form-control"
                              @keyup="cambios()"
                            />
                          </div>
                        </div>
                        <div class="card p-4">
                        <div class="card-head text-center">
                          <h2 class="p-4">Fiador prenda</h2>
                        </div>
                        <div class="form-group">
                          <span>Nombre Fiador</span>
                          <input
                            v-model="fiadorPrenda.nombreFiador"
                            required
                            type="text"
                            min="3"
                            placeholder="Nombre"
                            class="form-control"
                            @keyup="cambios()"
                          />
                        </div>
                        <div class="row form-group">
                          <div class="col-lg-6">
                            <span>1 Apellido fiador</span>
                            <input
                              v-model="fiadorPrenda.primerApellidoFiador"
                              required
                              type="text"
                              min="3"
                              placeholder="primer apellido"
                              class="form-control"
                              @keyup="cambios()"
                            />
                          </div>
                          <div class="col-lg-6">
                            <span>2 apellido fiador</span>
                            <input
                              v-model="fiadorPrenda.segundoApellidoFiador"
                              required
                              type="text"
                              min="3"
                              placeholder="segundo apellido"
                              class="form-control"
                              @keyup="cambios()"
                            />
                          </div>
                        </div>
                        <div class="form-group">
                          <span>Numero de Cedula fiador</span>
                          <input
                            v-model="fiadorPrenda.cedulaFiador"
                            required
                            type="text"
                            min="7"
                            placeholder="CC"
                            class="form-control"
                            @keyup="cambios()"
                          />
                        </div>
                        <div class="row form-group">
                          <div class="col-lg-6">
                            <span>Celular</span>
                            <input
                              v-model="fiadorPrenda.celularUnoFiador"
                              required
                              type="text"
                              min="10"
                              placeholder="Celular personal"
                              class="form-control"
                              @keyup="cambios()"
                            />
                          </div>
                          <div class="col-lg-6">
                            <span>Otro Numero de contacto</span>
                            <input
                              v-model="fiadorPrenda.celularDosFiador"
                              required
                              type="text"
                              min="10"
                              placeholder="Otro numero de contacto"
                              class="form-control"
                              @keyup="cambios()"
                            />
                          </div>
                        </div>
                        <div class="row form-group">
                          <div class="col-md-4">
                            <span>Direccion</span>
                            <input
                              v-model="fiadorPrenda.direccionFiador"
                              required
                              type="text"
                              min="13"
                              placeholder="Direccion"
                              class="form-control"
                              @keyup="cambios()"
                            />
                          </div>
                          <div class="col-md-4">
                            <span>Barrio</span>
                            <input
                              v-model="fiadorPrenda.barrioFiador"
                              required
                              type="text"
                              min="13"
                              placeholder="Direccion"
                              class="form-control"
                              @keyup="cambios()"
                            />
                          </div>
                          <div class="col-md-4">
                            <span>Ciudad</span>
                            <input
                              v-model="fiadorPrenda.ciudadFiador"
                              required
                              type="text"
                              min="13"
                              placeholder="Direccion"
                              class="form-control"
                              @keyup="cambios()"
                            />
                          </div>
                        </div>
                        <div class="row form-group">
                          <div class="col-md-4">
                            <span>Tipo de vivienda</span>
                            <select v-model="fiadorPrenda.tViviendaFiador" required class="custom-select" @change="cambios()">
                              <option value="propia">Propia</option>
                              <option value="familiar">Familiar</option>
                              <option value="alquiler">Alquiler</option>
                            </select>
                          </div>
                          <div class="col-md-4">
                            <span>Ocupacion</span>
                            <input
                              v-model="fiadorPrenda.ocupacionFiador"
                              required
                              type="text"
                              placeholder="Ocupacion"
                              class="form-control"
                              @keyup="cambios()"
                            />
                          </div>
                          <div class="col-md-4">
                            <span>Personas a cargo</span>
                            <input
                              v-model="fiadorPrenda.PcargoFiador"
                              required
                              type="number"
                              min="0"
                              class="form-control"
                              @keyup="cambios()"
                            />
                          </div>
                        </div>
                        <div class="row form-group">
                          <div class="col-md-6">
                            <span>Email</span>
                            <input
                              v-model="fiadorPrenda.emailFiador"
                              type="email"
                              min="13"
                              placeholder="Email"
                              class="form-control"
                              @keyup="cambios()"
                            />
                          </div>
                          <div class="col-md-6">
                            <span>Edad</span>
                            <input
                              v-model="fiadorPrenda.edadFiador"
                              required
                              type="number"
                              min="16"
                              class="form-control"
                              @keyup="cambios()"
                            />
                          </div>
                        </div>
                        <br>                  
                        </div>
                        <div class="col-md-12 p-2">
                          <h2 class="text-center">Informacion laboral Fiador</h2>
                        </div>          
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <label class="input-group-text">Nombre de la empresa</label>
                          </div>
                          <input
                            type="text"
                            required
                            class="form-control"
                            v-model="infolabfiadorPrenda.nombreEmpresa"
                            @keyup="cambios()"
                          />
                        </div>
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <label class="input-group-text">Ciudad</label>
                          </div>
                          <input
                            type="text"
                            required
                            class="form-control"
                            v-model="infolabfiadorPrenda.ciudadEmpresa"
                            @keyup="cambios()"
                          />
                        </div>
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <label class="input-group-text">Cargo</label>
                          </div>
                          <input
                            type="text"
                            required
                            class="form-control"
                            v-model="infolabfiadorPrenda.cargoEmpleado"
                            @keyup="cambios()"
                          />
                        </div>
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <label class="input-group-text">Salario</label>
                          </div>
                          <input
                            type="text"
                            required
                            class="form-control"
                            v-model="infolabfiadorPrenda.salarioEmpleado"
                            @keyup="cambios()"
                          />
                        </div>
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <label class="input-group-text">Direccion</label>
                          </div>
                          <input
                            type="text"
                            required
                            class="form-control"
                            v-model="infolabfiadorPrenda.direccionEmpresa"
                            @keyup="cambios()"
                          />
                        </div>
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <label class="input-group-text">Telefono</label>
                          </div>
                          <input
                            type="text"
                            required
                            class="form-control"
                            v-model="infolabfiadorPrenda.telefonoEmpresa"
                            @keyup="cambios()"
                          />
                        </div>
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <label class="input-group-text">Correo laboral</label>
                          </div>
                          <input
                            type="mail"
                            required
                            class="form-control"
                            v-model="infolabfiadorPrenda.correoLabora"
                            @keyup="cambios()"
                          />
                        </div>
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <label class="input-group-text">Otros Ingresos</label>
                          </div>
                          <input
                            type="text"
                            required
                            class="form-control"
                            v-model="infolabfiadorPrenda.otrosIngresosEmpleado"
                            @keyup="cambios()"
                          />
                        </div>
                  </div>
                  <div class="card-footer">    
                    <div class="p-4">
                      <button class="btn btn-block btn-warning" @click="guardarCambiosFiador('guardarPrenda')" v-if="change && !actu">Guardar Prenda</button>
                      <button class="btn btn-block btn-warning" @click="guardarCambiosFiador(credito.fiador)" v-if="change && actu">Actualizar Prenda</button>
                    </div>
                    <div class="p-4">
                        <button class="btn btn-block btn-primary" @click="borrarCambiosFiador(n={id:credito.fiador})" v-if="change">borrar cambios en prenda</button>
                      </div>  
                    <div class="p-4">
                      <button class="btn btn-block btn-success" @click="credito.fiador = null, Fiador.fiador_o_prenda = '',Fiador = {},fiadorPrenda = {}, change=false"
                      v-if="!cancelOff">cancelar</button>
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
                        <input
                          v-model="Fiador.nombreFiador"
                          required
                          type="text"
                          min="3"
                          placeholder="Nombre"
                          class="form-control"
                          @keyup="cambios()"
                        />
                      </div>
                      <div class="row form-group">
                        <div class="col-lg-6">
                          <span>1 Apellido fiador</span>
                          <input
                            v-model="Fiador.primerApellidoFiador"
                            required
                            type="text"
                            min="3"
                            placeholder="primer apellido"
                            class="form-control"
                            @keyup="cambios()"
                          />
                        </div>
                        <div class="col-lg-6">
                          <span>2 apellido fiador</span>
                          <input
                            v-model="Fiador.segundoApellidoFiador"
                            required
                            type="text"
                            min="3"
                            placeholder="segundo apellido"
                            class="form-control"
                            @keyup="cambios()"
                          />
                        </div>
                      </div>
                      <div class="form-group">
                        <span>Numero de Cedula fiador</span>
                        <input
                          v-model="Fiador.cedulaFiador"
                          required
                          type="text"
                          min="7"
                          placeholder="CC"
                          class="form-control"
                          @keyup="cambios()"
                        />
                      </div>
                      <div class="row form-group">
                        <div class="col-lg-6">
                          <span>Celular</span>
                          <input
                            v-model="Fiador.celularUnoFiador"
                            required
                            type="text"
                            min="10"
                            placeholder="Celular personal"
                            class="form-control"
                            @keyup="cambios()"
                          />
                        </div>
                        <div class="col-lg-6">
                          <span>Otro Numero de contacto</span>
                          <input
                            v-model="Fiador.celularDosFiador"
                            required
                            type="text"
                            min="10"
                            placeholder="Otro numero de contacto"
                            class="form-control"
                            @keyup="cambios()"
                          />
                        </div>
                      </div>
                      <div class="row form-group">
                        <div class="col-md-4">
                          <span>Direccion</span>
                          <input
                            v-model="Fiador.direccionFiador"
                            required
                            type="text"
                            min="13"
                            placeholder="Direccion"
                            class="form-control"
                            @keyup="cambios()"
                          />
                        </div>
                        <div class="col-md-4">
                          <span>Barrio</span>
                          <input
                            v-model="Fiador.barrioFiador"
                            required
                            type="text"
                            min="13"
                            placeholder="Direccion"
                            class="form-control"
                            @keyup="cambios()"
                          />
                        </div>
                        <div class="col-md-4">
                          <span>Ciudad</span>
                          <input
                            v-model="Fiador.ciudadFiador"
                            required
                            type="text"
                            min="13"
                            placeholder="Direccion"
                            class="form-control"
                            @keyup="cambios()"
                          />
                        </div>
                      </div>
                      <div class="row form-group">
                        <div class="col-md-4">
                          <span>Tipo de vivienda</span>
                          <select v-model="Fiador.tViviendaFiador" required class="custom-select" @change="cambios()">
                            <option value="propia">Propia</option>
                            <option value="familiar">Familiar</option>
                            <option value="alquiler">Alquiler</option>
                          </select>
                        </div>
                        <div class="col-md-4">
                          <span>Ocupacion</span>
                          <input
                            v-model="Fiador.OcupacionFiador"
                            required
                            type="text"
                            placeholder="Ocupacion"
                            class="form-control"
                            @keyup="cambios()"
                          />
                        </div>
                        <div class="col-md-4">
                          <span>Personas a cargo</span>
                          <input
                            v-model="Fiador.PcargoFiador"
                            required
                            type="number"
                            min="0"
                            class="form-control"
                            @keyup="cambios()"
                          />
                        </div>
                      </div>
                      <div class="row form-group">
                        <div class="col-md-6">
                          <span>Email</span>
                          <input
                            v-model="Fiador.emailFiador"
                            type="email"
                            min="13"
                            placeholder="Email"
                            class="form-control"
                            @keyup="cambios()"
                          />
                        </div>
                        <div class="col-md-6">
                          <span>Edad</span>
                          <input
                            v-model="Fiador.edadFiador"
                            required
                            type="number"
                            min="16"
                            class="form-control"
                            @keyup="cambios()"
                          />
                        </div>
                      </div>
                      <div class="row" id="infoLabFiador">
                        <div class="col-md-12">
                          <h2 class="text-center">Informacion laboral Fiador</h2>
                        </div>
                        <div class="col-md-12 p-4">
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">
                              <label class="input-group-text">Nombre de la empresa</label>
                            </div>
                            <input
                              type="text"
                              required
                              class="form-control"
                              v-model="infoLabFiador.nombreEmpresa"
                              @keyup="cambios()"
                            />
                          </div>
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">
                              <label class="input-group-text">Ciudad</label>
                            </div>
                            <input
                              type="text"
                              required
                              class="form-control"
                              v-model="infoLabFiador.ciudadEmpresa"
                              @keyup="cambios()"
                            />
                          </div>
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">
                              <label class="input-group-text">Cargo</label>
                            </div>
                            <input
                              type="text"
                              required
                              class="form-control"
                              v-model="infoLabFiador.cargoEmpleado"
                              @keyup="cambios()"
                            />
                          </div>
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">
                              <label class="input-group-text">Salario</label>
                            </div>
                            <input
                              type="text"
                              required
                              class="form-control"
                              v-model="infoLabFiador.salarioEmpleado"
                              @keyup="cambios()"
                            />
                          </div>
                        </div>
                        <div class="col-md-12 p-4">
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">
                              <label class="input-group-text">Direccion</label>
                            </div>
                            <input
                              type="text"
                              required
                              class="form-control"
                              v-model="infoLabFiador.direccionEmpresa"
                              @keyup="cambios()"
                            />
                          </div>
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">
                              <label class="input-group-text">Telefono</label>
                            </div>
                            <input
                              type="text"
                              required
                              class="form-control"
                              v-model="infoLabFiador.telefonoEmpresa"
                              @keyup="cambios()"
                            />
                          </div>
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">
                              <label class="input-group-text">Correo laboral</label>
                            </div>
                            <input
                              type="mail"
                              required
                              class="form-control"
                              v-model="infoLabFiador.correoLaboral"
                             @keyup="cambios()"
                            />
                          </div>
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">
                              <label class="input-group-text">Otros Ingresos</label>
                            </div>
                            <input
                              type="text"
                              required
                              class="form-control"
                              v-model="infoLabFiador.otrosIngresosEmpleado" 
                              @keyup="cambios()"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="card-footer">
                      <div class="p-4">
                        <button class="btn btn-block btn-warning" @click="guardarCambiosFiador('guardarFiador')" v-if="change && !actu">Guardar fiador</button>
                        <button class="btn btn-block btn-warning" @click="guardarCambiosFiador(credito.fiador)" v-if="change && actu">Actualizar fiador</button>
                      </div>
                      <div class="p-4">
                        <button class="btn btn-block btn-primary"  @click="borrarCambiosFiador(n={id:credito.fiador})" v-if="change">borrar cambios en fiador</button>
                      </div>  
                      <div class="p-4">
                        <button class="btn btn-block btn-success" @click="credito.fiador= null, Fiador.fiador_o_prenda = '',Fiador = {}, infoLab = {},
                         infoLabFiador = {}, infolabfiadorPrenda = {}, change=false " v-if="!cancelOff">cancelar</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="credito.fiador == null" class="col-lg-12 bg-white border p-4">
                  <h3 class="text-center"><strong>No existen fiador o prenda</strong></h3>
                  <h3 class="text-center">desea agregar alguno</h3>
                  <div class="row col-md-12">
                    <button class="btn btn-primary col-md-6" @click="Fiador.fiador_o_prenda = 'fiador', credito.fiador = {}, actu = false">agregar fiador</button>
                    <button class="btn btn-success col-md-6" @click="Fiador.fiador_o_prenda = 'prenda', credito.fiador = {}, actu = false">agregar prenda</button>
                  </div>
              </div>
            </div>
            <div class="col-md-6 border border-dark">cuatro</div>
          </div>
          </div>
        </div>
        <div class="card-footer">
          <button class="btn btn-warning btn-block" @click="regreso()" v-if="actualizado"><h2><strong>regresar</strong></h2></button>
          <br>
          <div v-if="change"><h3 class="text-center">se han realizado cambios en el fiador</h3><br><h3 class="text-center"><strong>Guardalos para reguardar el credito</strong></h3></div>
          <button class="btn btn-success btn-block" @click="reguardar()" v-if="!change"><h2><strong>guardar</strong></h2></button>
        </div>
    </div>
  </div>
</template>

<script>
class rf {
  constructor() {
    this.nombreRF = "";
    this.direccionRF = "";
    this.telefonoRF = "";
    this.parentescoRF = "";
  }
}
import f from "../funciones/funciones.js";

export default {
    name:'desaprobados',
    data(){
        return{
            Creditos : {},
            vercred : false,
            credito  :{},
            texto : {},
            cliente : {},
            Fiador:{},
            infoLab:{},
            infoLabFiador:{},
            fiadorPrenda:{},
            infolabfiadorPrenda:{},
            prendaa:false,
            fiadorr:false,
            rfamiliaruno: new rf(),
            rfamiliardos: new rf(),
            rfamiliartres: new rf(),
            rfpersonaluno: new rf(),
            rfpersonaldos: new rf(),
            rfpersonaltres: new rf(),
            credito2:{},
            cancelOff:false,
            change:false,
            actu:true,
            actualizado:true,
            tid:'',
            uri:''
        }
    },
    created(){
      this.uri = f.uri
    },
    mounted(){
        this.fetchCreditos()
        localStorage.removeItem('cc')
    },
    methods:{
        fetchCreditos() {
            this.axios 
            .get(this.uri+"/api/creditos/desaprobados")
            .then(res => {
                this.Creditos = res.data;
                this.vercred = false
            })
            .catch(err => console.log(err));
        },
        verCredito(id){
          let idCredito={
            id : id,
          }
          this.axios.post(this.uri+"/api/creditos/verCredito", idCredito)
          .then(res => {
            this.credito = res.data
            console.log(res.data)
            this.verTexto(idCredito)
            this.verCliente(this.credito.cedula)
            if(this.credito.fiador != null){
              this.cancelOff = true
              let idFiador = {
                id : this.credito.fiador
              }
              this.verFiadorPrenda(idFiador)
            }else{
              this.cancelOff = false
            }
            if(this.credito.referidos != null){
              this.rfamiliaruno = this.credito.referidos[0]
              this.rfamiliardos = this.credito.referidos[1]
              this.rfamiliartres = this.credito.referidos[2]
              this.rfpersonaluno = this.credito.referidos[3]
              this.rfpersonaldos = this.credito.referidos[4]
              this.rfpersonaltres = this.credito.referidos[5]
            }
            if(this.credito.infoLab ==''){
              this.credito.infoLab = {}
            }
          })
          .catch(err=>{console.log(err)})
      },
      reguardar(){
        if(this.rfamiliaruno.nombreRF == '' && this.rfamiliardos.nombreRF==''&&this.rfamiliartres.nombreRF==''
        &&this.rfpersonaluno.nombreRF==''&& this.rfpersonaldos.nombreRF==''&& this.rfpersonaltres.nombreRF== ''){
          this.credito.referidos = null
        }else{
          this.credito.referidos = [this.rfamiliaruno,this.rfamiliardos,this.rfamiliartres,this.rfpersonaluno, this.rfpersonaldos,this.rfpersonaltres]
        }
        if (JSON.stringify(this.credito.infoLab)=='{}') {
          this.credito.infoLab = ''
        }else{
          this.credito.infoLab = this.credito.infoLab
        }
        this.credito.estadoInterno = 'cotizacion'
        this.axios.post(this.uri+'/api/creditos/reguardarCredito',this.credito)
        .then(res => {
          this.borrarTexto()
          this.fetchCreditos()
          this.vercre = false
          this.regreso()
        })
        .catch(err=>{console.log(err)})
      },
      cambios(){
         this.change = true
         this.actualizado=false
      },
      regreso(){
        this.vercred = false
        this.credito  ={}
        this.texto = {}
        this.cliente = {}
        this.Fiador={}
        this.infoLab={}
        this.infoLabFiador={}
        this.fiadorPrenda={}
        this.infolabfiadorPrenda={}
        this.prendaa=false
        this.fiadorr=false
        this.rfamiliaruno= {}
        this.rfamiliardos= {}
        this.rfamiliartres= {}
        this.rfpersonaluno= {}
        this.rfpersonaldos= {}
        this.rfpersonaltres= {}
        this.change = false
        this.actu = false
      },
      borrarCambiosFiador(n){
        this.Fiador={}
        this.infoLabFiador={}
        this.fiadorPrenda={}
        this.infolabfiadorPrenda={}
        this.prendaa=false
        this.fiadorr=false
        this.change = false
        this.verFiadorPrenda(n)
      },
      guardarCambiosFiador(n){
        if(this.Fiador.fiador_o_prenda=='prenda'){
          if (JSON.stringify(this.fiadorPrenda)=='{}') {
            this.Fiador.fiadorPrenda = null
          }else{
            this.Fiador.fiadorPrenda = this.fiadorPrenda
          }
          if (JSON.stringify(this.infolabfiadorPrenda)=='{}') {
            this.Fiador.infolabfiadorPrenda = null
          }else{
            this.Fiador.infolabfiadorPrenda = this.infolabfiadorPrenda
          }
          if (n=='guardarPrenda') {
            this.axios.post(this.uri+'/api/creditos/guardarPrenda',this.Fiador)
            .then(res=>{
              let x ={
                id:res.data.data
              }
              this.credito.fiador = res.data.data
              this.verFiadorPrenda(x)
              this.cancelOff = false
              this.change = false
            })
            .catch(err=>{console.log(err)})
          }else{
            this.Fiador._id = n
            this.axios.post(this.uri+'/api/creditos/actualizarPrenda',this.Fiador)
            .then(res=>{
              this.credito.fiador = n
              let v = {
                id : n
              }
              this.verFiadorPrenda(v)
              this.change = false
            })
            .catch(err=>{console.log(err)})
          }
        }
        if(this.Fiador.fiador_o_prenda=='fiador'){
          if (JSON.stringify(this.infoLabFiador)=='{}') {
            this.Fiador.infolaboralFiador = null
          }else{
            this.Fiador.infolaboralFiador = this.infoLabFiador
          }
          if (n=='guardarFiador') {
            this.axios.post(this.uri+'/api/creditos/guardarFiador',this.Fiador)
            .then(res=>{
              let x={
                id:res.data.data
              }
              this.credito.fiador = res.data.data
              this.verFiadorPrenda(x)
              this.cancelOff = false
              this.change = false
            })
            .catch(err=>{console.log(err)})
          }else{
            this.Fiador.id = n
            this.axios.post(this.uri+'/api/creditos/actualizarFiador',this.Fiador)
            .then(res=>{
              this.credito.fiador = n
              let v = {
                id : n
              }
              this.verFiadorPrenda(v)
              this.change = false
            })
            .catch(err=>{console.log(err)})
          }
        }
       
      },

      verFiadorPrenda(n){
        this.axios.post(this.uri+"/api/creditos/FiadorPrenda", n)
          .then(res => {
            this.Fiador = res.data;
            if(this.Fiador.fiador_o_prenda == 'fiador'){
              this.fiadorr = true
              this.prendaa = false
              this.actu = true
              
            }
            if(this.Fiador.fiador_o_prenda == 'prenda'){
              this.prendaa = true
              this.actu = true
              this.fiadorr = false
              if(this.Fiador.fiadorPrenda == null){
                this.fiadorPrenda = {}
              }else{
                this.fiadorPrenda = this.Fiador.fiadorPrenda
              }
              if(this.Fiador.infolabfiadorPrenda == null){
                this.infolabfiadorPrenda = {}
              }else{
                this.infolabfiadorPrenda = this.Fiador.infolabfiadorPrenda
              }
            }
         })
        .catch(err => console.log(err)); 
    },
    borrarTexto(){
      let idd = {
        id : this.tid
      }
      this.axios.post(this.uri+'/api/creditos/borrarDesaprobado',idd)
        .then(res => {
        })
        .catch(err=>{console.log(err)})
    },
      verTexto(id){
        this.axios.post(this.uri+'/api/creditos/desaprobadoU',id)
        .then(res => {
          this.texto = res.data[0]
          console.log('texto')
          console.log(this.texto)
          this.tid = this.texto._id
          this.vercred = true
        })
        .catch(err=>{console.log(err)})
      },
      verCliente(cc){
          this.encabezado = false
          this.busqueda = false
          let cedulaCliente={
            cedulaId :cc
          }
          this.axios.post(this.uri+"/api/busqueda", cedulaCliente)//este esta en la api clientes
          .then(res => {
            this.cliente = res.data[0];
        })
        .catch(err => console.log(err));
        
      },  
    },    
}
</script>

<style>

</style>
