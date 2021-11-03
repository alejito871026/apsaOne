<template>
  <div>
      <div v-if="!verRenovacion" class="bg-primary text-white">
          <h2 class="p-4" v-if="!masDeCuatro"><strong>El cliente tiene tres creditos, podra aplicar para renovacion de un credito</strong></h2>
          <h2 class="p-4" v-if="masDeCuatro"><strong>El cliente ya alico para renovacion ! dirijase a solicitudes o creditos activos</strong></h2>
            <div class="text-center">
                <table class="text-center col-lg-12">
                    <thead class="border border-white sticky-top text-white bg-dark">
                        <th># Credito</th>
                        <th>Servicio</th>
                        <th>estado</th>
                        <th>en mora</th>
                        <th>Frecuencia</th>
                        <th>Tiempo</th>
                        <th>Total del cred</th>
                        <th>opciones</th>
                    </thead>
                    <tbody v-for="cred in Creditos" v-bind:key="cred.id" class="border border-white">
                        <td>{{cred.numeroCredito}}</td>
                        <td>{{cred.servicio}}</td>
                        <td>{{cred.estado}} {{cred.estadoInterno}}</td>
                        <td v-if="cred.enMora" class="bg-danger ">En mora</td>
                        <td v-if="!cred.enMora">----</td>
                        <td>{{cred.frecuencia}} </td>
                        <td>{{cred.tiempo}} meses</td>
                        <td>{{cred.valTotalCred}} </td>
                        <td v-if="cred.estadoInterno =='entregado'&& !masDeCuatro"><button class="btn btn-danger" @click="ver(cred.pagares, cred._id, cred.servicio)">ver para renovar</button></td>
                    </tbody>
                </table>
            </div>
      </div>
      <div v-if="verRenovacion" class=" container col-ld-12">
          <div class="row">
              <br>
            <div class="col-md-6 border border-dark">
                <br>
                <h3>Cliente: {{cliente.nombreCliente}} {{cliente.primerApellidoCliente}} {{cliente.segundoApellidoCliente}} </h3>
                <h3>Cedula: {{cliente.cedulaId}}</h3>                
                <h3># Celular: {{cliente.celularUno}}</h3>  
                <h3>Otro # de telefono: {{cliente.celularDos}}</h3>              
                <h3>Direccion de residencia: {{cliente.direccionCliente}}</h3>                
                <h3>Barrio: {{this.cliente.cedulaId}}</h3>
                <br>
                <div class="btn btn-danger">
                  <router-link
                    :to="{ name: 'clientes', params: { cc: cliente.cedulaId }}"
                    class="text-white"
                  >Si algun dato del cliente a cambiado porfavor edite los datos</router-link>
                </div>
                <br>
                <div class="bg-primary text-white">
                    <h2 class="border border-white p-2"><strong>Informacion del credito a renovar</strong></h2>
                    <br>
                    <h2>Servicio: {{creditoRenovar.servicio}}</h2>
                    <h2>Cuotas Pagas: {{cuotasPagas}}</h2>
                    <h2>Cuotas sin pagar: {{cuotasSinPagar}}</h2>
                    <h2>Abonado: {{abonado}}</h2>
                    <h2>Debe a la fecha: {{debeAlaFecha}}</h2>
                    <h2 class="bg-danger" v-if="creditoRenovar.enMora">En mora </h2>
                    <h2 class="bg-danger" v-if="creditoRenovar.enMora">fecha de pago vencida: {{creditoRenovar.Fp}}</h2>
                    <h2 v-if="!creditoRenovar.enMora">Prox fecha de pago: {{creditoRenovar.Fp}}</h2>
                    <br>
                </div>                
            </div>
            <br>
            <div class="col-md-6 border border-dark">
                <br>
                <form  @submit.prevent="creditoAgregar(id,servicio,valor,interes,meses,inicial,frecuencia,fDiaPago,debeAlaFecha,cliente.cedulaId)" >
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <label class="input-group-text"> Id credito a renovar</label>
                        </div>
                        <input class="form-control bg-white" type="text" disabled v-model ="id">
                    </div>
                    <div class="input-group mb-3">
                       <div class="input-group-prepend">
                            <label class="input-group-text"> Servicio</label>
                        </div>
                        <select class="form-control" @change="onChange()" v-model ="servicio">
                            <option>Soat</option>
                            <option>Tecnomecanica</option>
                            <option>Soat-Tecnomecanica</option>
                            <option>Licencia</option>
                            <option value="pignoracion">Prestamo sobre prenda</option>
                            <option>Libre Inversion</option>
                            <option >Hipoteca</option>
                        </select> 
                    </div>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <label class="input-group-text">Monto de la solicitud</label>
                        </div>
                        <input class="form-control bg-white" type="text" v-money="money" v-model ="valor">
                    </div>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <label class="input-group-text"> interes</label>
                        </div>
                        <input class="form-control bg-white" type="number"
                        required  min="3" max="15" step="0.01"  v-model ="interes">
                    </div>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <label class="input-group-text">Tiempo en meses</label>
                        </div>
                        <input class="form-control bg-white" type="number" min="1" max="72" v-model ="meses">
                    </div>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <label class="input-group-text"> Cuota inicial</label>
                        </div>
                        <input class="form-control bg-white" type="number"  v-model ="inicial">
                    </div>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <label class="input-group-text"> frecuencia de pago</label>
                        </div>
                        <select class="form-control bg-white" @change="onChange(), tipofecha()" v-model ="frecuencia">
                            <option>mensual</option>
                            <option>quincenal</option>
                            <option>semanal</option>
                            <option>diario</option>
                            <option value="pagoUnico">Unico pago</option>
                        </select>  
                    </div>
                        <div v-if="pagoUnico">
                            <div class="text-center">
                                Se estableceran pagos mensuales de acuerdo al valor de los interes
                                <br />
                                El valor del capital se podra pagar antes de la fecha final {{ hoy}} del
                                <span>&nbsp;{{ mes2 }}&nbsp;</span>del año
                                <span>&nbsp;{{ ano }}&nbsp;</span>&nbsp;siempre y cuando se encuentre al dia con los interes
                            </div>
                        </div>
                        <div v-if="mensual" class="text-center">
                            30 dias luego de 2 dias de estudio y aprovacion y los 6 dias de gracia.
                            <br />
                            Desde {{hoy}} del
                            <span>&nbsp;{{ mes }}</span>
                            hasta {{pfecha}} del
                            <span v-if="!hh">&nbsp;{{ mes }}&nbsp;</span>
                            <span v-if="hh">&nbsp;{{ mes2 }}&nbsp;</span>
                            <div class="p-4 bg-danger" v-if="mayor">
                                <h3>DEBE PAGAR EL PORCENTAJE EQUIVALENTE AL INTERES POR LOS DIAS DE MAS !!!</h3>
                                <button disabled class="btn btn-warning">{{demas}}</button>
                                <h3>ingrese el valor acordado con el cliente</h3>
                                <input type="number" class="input-form" v-model="aumentoPorDias">
                                <h3>Este valor se sumara a la inicial del credito</h3>
                            </div>
                        </div>                       
                        <div v-if="semanal" class="text-center">el cobro se realizara a la semana exacta de entregado el credito</div>
                        <div v-if="diario" class="text-center">
                            el cobro se realizara a partir del siguiente dia de entregado el credito
                        </div>  
                        <div class="input-group mb-3"
                            v-if="!quincenal && !semanal && !diario && !pagoUnico && !M">
                            <div class="input-group-prepend">
                                <label class="input-group-text">Mejor fecha para pago</label>
                            </div>
                            <input
                                type="number"
                                required
                                class="form-control"
                                v-model="fDiaPago"
                                min="1"
                                max="31"
                            />
                        </div>
                        <div v-if="quincenal" class="text-center">
                            15 dias luego de 2 dias de estudio y aprovacion y los 5 dias de gracia.
                            <br />
                            Desde {{hoy}} del
                            <span>&nbsp;{{ mes }}</span>
                            hasta {{ pfecha}} del
                            <span v-if="!hh">&nbsp;{{ mes }}&nbsp;</span>
                            <span v-if="hh">&nbsp;{{ mes2 }}&nbsp;</span>
                        </div>
                        <div class="input-group mb-3" v-if="quincenal">
                            <div class="input-group-prepend">
                                <label class="input-group-text">mejor fecha de pago</label>
                            </div>
                            <input
                                type="number"
                                required
                                class="form-control"
                                v-model="fDiaPago"
                                min="1"
                                max="31"
                            />
                        </div>
                        <div v-if="M">
                            <input type="date" class="input-group" required v-model="date" @change="comparar()">
                        </div>    
                        <div v-if="prenda" class="col-lg-12 bg-white border p-4">
                            <div class="card p-4">
                                <div class="card-head text-center">
                                    <h2 class="p-4">Informacion Prenda</h2>
                                </div>
                                <div class="row form-group">
                                    <div class="col-md-6">
                                        <span>tipo vehiculo</span>
                                        <select v-model="Fiador.tipoVehiculo" required class="custom-select">
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
                                        />
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col-md-4">
                                        <span>Seguro activo</span>
                                        <select v-model="Fiador.seguro" required class="custom-select">
                                        <option value="vencido">Vencido</option>
                                        <option value="activo">Activo</option>
                                        </select>
                                    </div>
                                    <div class="col-md-4">
                                        <span>Fecha vencimiento Seguro</span>
                                        <input v-model="Fiador.venceSeguro" required type="date" class="form-control" />
                                    </div>
                                    <div class="col-md-4">
                                        <span># de seguro</span>
                                        <input v-model="Fiador.numSeguro" required type="text" class="form-control" />
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col-md-6">
                                        <span>Tecnomecanica activa</span>
                                        <select v-model="Fiador.tecnicomecanica" required class="custom-select">
                                        <option value="vencido">Vencido</option>
                                        <option value="activo">Activo</option>
                                        </select>
                                    </div>
                                    <div class="col-md-6">
                                        <span>Fecha vencimiento tecnicomecania</span>
                                        <input v-model="Fiador.venceTecno" required type="date" class="form-control" />
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
                                        />
                                    </div>
                                    <div class="col-md-6">
                                        <span># CC propietario</span>
                                        <input
                                        v-model="Fiador.ccPropietario"
                                        required
                                        type="number"
                                        class="form-control"
                                        />
                                    </div>
                                </div>
                                <div class="btn btn-block btn-primary" v-if="!FiadorPrenda" @click="FiadorPrenda=true">Agregar fiador a este credito</div>
                                <div v-if="FiadorPrenda" class="col-lg-12 bg-white border p-4">
                                <div class="card p-4">
                                <div class="card-head text-center">
                                    <h2 class="p-4">Fiador</h2>
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
                                    />
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col-md-4">
                                    <span>Tipo de vivienda</span>
                                    <select v-model="fiadorPrenda.tViviendaFiador" required class="custom-select">
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
                                    />
                                    </div>
                                </div>
                                <br>
                                <div class="btn btn-block btn-primary" v-if="!InfolabfiadorPrenda" @click="InfolabfiadorPrenda=true">Agregar informacion laboral al fiador</div>
                                <div class="btn btn-danger btn-block" @click="FiadorPrenda = false">Quitar fiador</div>
                                </div>
                                <div class="row" id="infoLabFiadorPrenda" v-if="InfolabfiadorPrenda" >
                                <div class="col-md-12">
                                    <h2 class="text-center">Informacion laboral Fiador</h2>
                                </div>
                                <br />
                                <div class="col-md-6 p-4">
                                    <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text">Nombre de la empresa</label>
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        class="form-control"
                                        v-model="infolabfiadorPrenda.nombreEmpresa"
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
                                        v-money="money"
                                    />
                                    </div>
                                </div>
                                <div class="col-md-6 p-4">
                                    <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text">Direccion</label>
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        class="form-control"
                                        v-model="infolabfiadorPrenda.direccionEmpresa"
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
                                        v-money="money"
                                    />
                                    </div>
                                </div>
                                <div class="btn btn-warning btn-block" v-if="infolabfiadorPrenda" @click="InfolabfiadorPrenda= false">Cerrar informacion laboral fiador</div>
                                </div>
                            </div>
                                <div class="card-footer bg-white">
                                    <button class="btn btn-success btn-block" @click="prenda=false">Quitar prenda</button>
                                </div>
                            </div>
                        </div>                   
                    <button class="btn btn-danger btn btn-block"><h4><strong>Calcular</strong></h4></button>
                </form>
                <br>
            </div>
            <div class="border border-dark col-md-12 text-center">
                <div class="row bg-white border p-4">
                    <div class="col-md-12">
                        <h2 class="text-center">Descripcion Credito</h2>
                        <br />
                        <div class="form-group">
                            <div id class="form-control">Interes Mensual: {{interesMensual}}</div>
                        </div>
                        <div class="form-group">
                            <div id class="form-control">Total Credito: {{valTotalCred}}</div>
                        </div>
                        <div class="form-group">
                            <div id class="form-control">Cantidad Cuotas: {{tTotal}}</div>
                        </div>
                        <div class="form-group">
                            <div id class="form-control">Valor Cuota: {{valCuota}}</div>
                        </div>
                    </div>
                    <button class="btn btn-primary btn-block" @click="guardarCredito()"><h3><strong>Guardar renovacion</strong></h3></button>
                    <div class="col-md-12">
                        <br>
                        <button class="btn btn-warning btn-block" @click="regresar()"><h3><strong>Regresar</strong></h3></button>
                    </div>
                </div>
            </div>       
          </div>
      </div>
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
class respu {
  constructor(respuesta) {
    this.respuesta = respuesta;
  }
}
class prendaa {
  constructor(
    tipoVehiculo,
    marca,
    modelo,
    tipo,
    color,
    manifiesto,
    licTransito,
    placa,
    motor,
    chasis,
    servicio,
    cilindraje,
    seguro,
    venceSeguro,
    venceTecno,
    numseguro,
    tecnicomecanica,
    nombrePropietario,
    ccPropietario
  ){
    this.fiador_o_prenda = "prenda";
    this.tipoVehiculo = tipoVehiculo;
    this.marca = marca;
    this.modelo = modelo;
    this.tipo = tipo;
    this.color = color;
    this.manifiesto = manifiesto;
    this.licTransito = licTransito;
    this.placa = placa;
    this.motor = motor;
    this.chasis = chasis;
    this.servicio = servicio;
    this.cilindraje = cilindraje;
    this.seguro = seguro;
    this.venceSeguro = venceSeguro;
    this.numSeguro = numseguro;
    this.tecnicomecanica = tecnicomecanica;
    this.venceTecno = venceTecno;
    this.nombrePropietario = nombrePropietario;
    this.ccPropietario = ccPropietario;
    this.fiadorPrenda = "";
    this.infolabfiadorPrenda = "";
  }
}
class infolaboral {
  constructor(
    nombreEmpresa,
    ciudadEmpresa,
    cargoEmpleado,
    salarioEmpleado,
    direccionEmpresa,
    telefonoEmpresa,
    correoLaboral,
    otrosIngresosEmpleado
  ) {
    this.nombreEmpresa = nombreEmpresa;
    this.ciudadEmpresa = ciudadEmpresa;
    this.cargoEmpleado = cargoEmpleado;
    this.salarioEmpleado = salarioEmpleado;
    this.direccionEmpresa = direccionEmpresa;
    this.telefonoEmpresa = telefonoEmpresa;
    this.correoLaboral = correoLaboral;
    this.otrosIngresosEmpleado = otrosIngresosEmpleado;
  }
}
class fiadorr {
  constructor(
    nombreFiador,
    primerApellidoFiador,
    segundoApellidoFiador,
    cedulaFiador,
    celularUnoFiador,
    celularDosFiador,
    direccionFiador,
    barrioFiador,
    ciudadFiador,
    tViviendaFiador,
    OcupacionFiador,
    PcargoFiador,
    emailFiador,
    edadFiador
  ) {
    this.fiador_o_prenda = "fiador";
    this.nombreFiador = nombreFiador;
    this.primerApellidoFiador = primerApellidoFiador;
    this.segundoApellidoFiador = segundoApellidoFiador;
    this.cedulaFiador = cedulaFiador;
    this.celularUnoFiador = celularUnoFiador;
    this.celularDosFiador = celularDosFiador;
    this.direccionFiador = direccionFiador;
    this.barrioFiador = barrioFiador;
    this.ciudadFiador = ciudadFiador;
    this.tViviendaFiador = tViviendaFiador;
    this.OcupacionFiador = OcupacionFiador;
    this.PcargoFiador = PcargoFiador;
    this.emailFiador = emailFiador;
    this.edadFiador = edadFiador;
  }
}
class pag { 
  constructor(){
    this.numero = "",
    this.pagares = ""
  }
}
import f from "../funciones/functionsValid";
import { VMoney } from "v-money";
const formatDecimal = require("format-decimal");
import ff from "../funciones/funciones.js";

export default {
    name:'renovacion',
    props:['Clientee'],
    components: {
  },
    data(){
        return {
            credd: false,
            inicial:0,
            date:'',
            Creditos:{},
            pagg:{},
            cliente:{},
            cuotasSinPagar:0,
            cuotasPagas:0,
            totalCredito:0,
            abonado:0,
            debeAlaFecha:0,
            verRenovacion:false,
            id:'',
            valor:'',
            meses:0,
            servicio:'',
            frecuencia:'',
            money: new moneey(),
            interes:0,
            pagoUnico: false,
            diario: false,
            semanal: false,
            quincenal: false,
            mensual: false,
            hoy: 0,
            pfecha: 0,
            mes: 0,
            mes2: 0,
            ano: 0,
            hh: false,
            M:false,
            fDiaPago:0,
            demas:0,
            mmes:0,
            messs:0,
            ddia:0,
            aumentoPorDias:0,
            mayor:false,
            interesMensual:0,
            tot:0,
            valTotalCred:'',
            creditoRenovar:{},
            valCuota:'',
            user:{},
            tTotal:0,
            Fiador:{},
            prenda:false,
            FiadorPrenda:false,
            InfolabfiadorPrenda:false,
            infolabfiadorPrenda:new infolaboral(),
            fiadorPrenda:new fiadorr(),
            fiadore:'',
            credito:{},
            respuesta: new respu(1),
            capital:0,
            intereses:0,
            u:0,
            enmora:false,
            masDeCuatro:false,
            uri:'',
        }
    },
    created(){
        this.uri = ff.uri
        if (localStorage.getItem("token") === null) {
            this.$router.push("/inicioSesion");
        }else{
        this.axios
        .get(this.uri+"/api/login/usuario", {
            headers: { token: localStorage.getItem("token") }
        })
        .then(res => {
            this.user = res.data.user;
        })
        .catch(err => {
            localStorage.clear();
                    
        });
        }
        this.creditosActivos(this.Clientee)
        this.verCliente(this.Clientee.cedulaId)
        this.fetchCreditos()
    },
    methods:{
        regresar(){
            this.verRenovacion = false,this.servicio ='',this.valor = '',this.interes=0,
            this.meses=0,this.inicial=0,this.frecuencia='',this.fDiaPago=0,this.date ='',this.Fiador={},this.fiadorPrenda={},
            this.infolabfiadorPrenda={},this.interesMensual=0,this.valTotalCred='',this.tTotal=0,this.valCuota='',
            this.prenda=false,this.FiadorPrenda=false
        },
        fetchCreditos() {
            //const uri = "http://localhost:3000/api/clientes"
            this.axios
            .get(this.uri+"/api/creditos/cuentaCreditos")
            .then(res => {
            this.tot = res.data + 1;
            })
            .catch(err => console.log(err));
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
        creditosActivos(cc) {
            this.axios.post(this.uri+"/api/creditos/creditosCliente", cc)
            .then(res => {
                this.Creditos = res.data;
                    if(this.Creditos.length >3){
                        this.masDeCuatro = true
                    }
                for(let y = 0; y<=(res.data.length-1); y++){
                    if(this.Creditos[y].enMora){
                        this.enmora = true
                    }
                }
            })
            .catch(err => console.log(err));
        },
        verCliente(id){
            let cedulaCliente={
                cedula : id,
                }
            this.axios.post(this.uri+"/api/verCliente", cedulaCliente)
            .then(res => {
                this.cliente = res.data[0];
            })
            .catch(err => console.log(err));            
        },
        ver(id_p,idC,service){
            let idd = {
                id : id_p   
            }
            this.verCredito(idC)
            this.axios.post(this.uri+"/api/creditos/pagares", idd)
            .then(res => {  
                this.cuotasSinPagar = 0 
                this.cuotasPagas = 0 
                this.abonado = 0
                this.debeAlaFecha = 0  
                this.capital = 0
                this.intereses = 0 
                let t = res.data.pagares.length -1 
                this.u = 0
                for(let a = 0; a <= t; a++){
                    if(res.data.pagares[a].estado == false ){
                        this.cuotasSinPagar = this.cuotasSinPagar + 1  
                        this.debeAlaFecha = this.debeAlaFecha + (res.data.pagares[a].valorCuota + res.data.pagares[a].interesCuota - res.data.pagares[a].abono)
                        this.capital = this.capital + res.data.pagares[a].valorCuota
                        this.intereses = this.intereses + res.data.pagares[a].interesCuota
                        this.u = this.u + res.data.pagares[a].abono
                    }else{
                        this.cuotasPagas = this.cuotasPagas + 1  
                        this.abonado = this.abonado + res.data.pagares[a].valorCuota + res.data.pagares[a].interesCuota                     
                    }                    
                }
                this.abonado = this.abonado+this.u
                this.capital = this.capital - this.u
                this.id = idC                
                this.verRenovacion = true            
            })
            .catch(err => console.log(err));
        },
        quitarGuiones(x){
            let valer = "" 
            let val = x
            for (let n = 0; n <= val.length - 1; n++) {
                if (val[n] == "-" ) {
                    n++;
                }
                valer = valer + val[n];
            }
            return(valer)
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
            return(valer)
        },
        onChange(){
            if(this.servicio =='pignoracion' && this.creditoRenovar.servicio != 'pignoracion'){
                this.Fiador = new prendaa()
                this.prenda = true
            }else{
                this.prenda = false
            }
        },
        tipofecha(){
            var tipf = this.frecuencia;
            if (tipf == "quincenal") {
                this.hoy = new Date().getDate();
                this.mes = new Date().getMonth();
                this.hoy = this.hoy + 7;
                this.mes = this.mes + 1;
                if (this.mes > 12) {
                this.mes = 1;
                }
                this.messs = this.mes;

                if (this.hoy > 30) {
                this.hoy = this.hoy - 30;
                this.mes = this.mes + 1;
                }

                this.pfecha = this.hoy + 15;

                if (this.pfecha > 30) {
                this.pfecha = this.pfecha - 30;
                this.hh = true;
                this.mes2 = this.mes + 1;
                }else{
                this.mes2 = this.mes
                }
                if (this.mes == 2 && this.pfecha > 28) {
                this.pfecha = this.pfecha - 28;
                this.hh = true;
                this.mes2 = this.mes + 1;
                }
                if (this.mes2 > 12) {
                this.mes2 = 1;
                }
                this.quincenal = true;
            } else {
                this.quincenal = false;
            }
            if (tipf == "mensual") {
                this.M = true
                this.mes = new Date().getMonth();
                this.mes = this.mes + 1;
                if (this.mes > 12) {
                this.mes = 1;
                }
                this.hoy = new Date().getDate();
                this.hoy = this.hoy + 7;
                let d = this.hoy
                if(this.hoy >= 31){
                d = d-31
                this.hoy = d
                this.mes++
                }
                if (this.mes == 2 && this.hoy > 28) {
                this.hoy = this.hoy - 28;
                this.mes++;
                this.pfecha = this.hoy ;
                this.mes2 = this.mes + 1;
                } else {
                this.pfecha = this.hoy ;
                this.hh = true;
                this.mes2 = this.mes + 1;
                if (this.mes2 > 12) {
                    this.mes2 = 1;
                }
                if (this.mes2 == 2 && this.pfecha > 28) {
                    this.pfecha = this.hoy - 28;
                    this.mes2 = this.mes + 2;
                }
                }
                this.mensual = true;
            } else {
                this.M = false
                this.mensual = false;
            }
            if (tipf == "semanal") {
                this.semanal = true;
            } else {
                this.semanal = false;
            }
            if (tipf == "diario") {
                this.hoy = new Date().getDate() + 2;
                this.mes = this.mes + 1;
                if (this.mes > 12) {
                this.mes = 1;
                }
                if (this.hoy > 30) {
                this.hoy = this.hoy - 30;
                this.mes = this.mes + 1;
                if (this.mes > 12) {
                    this.mes = 1;
                }
                }
                this.diario = true;
            } else {
                this.diario = false;
            }
            if (tipf == "pagoUnico") {
                this.pagoUnico = true;
                this.mes = new Date().getMonth() + 1;
                let t = this.meses;
                this.mes2 = this.mes;
                this.hoy = new Date().getDate();
                this.ano = new Date().getFullYear();
                for (let x = 1; x <= t; x++) {
                this.mes2++;
                if (this.mes2 > 12) {
                    this.mes2 = 1;
                    this.ano++;
                }
                }
            } else {
                this.pagoUnico = false;
            }
        },
        comparar(){
            let n = this.quitarGuiones(this.date)
            let d = ''
            let m = 0
            let aa = new Date().getFullYear();
            for(let u = 0; u <= n.length-1;u++){
                if( u > 3 && u<=5){
                m = m + n[u]
                }
            if( u > 5 && u <= 7){
                d = d + n[u]
                }
                }
            m=parseInt(m)
            d = parseInt(d)
            if(m > this.mes2 || d > this.pfecha && m >= this.mes2){
                this.mayor = true
            }else{
                this.mayor = false
            }
            let meses = []
            if (((aa % 4 == 0) && (aa % 100 != 0 )) || (aa % 400 == 0)){
                meses = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
            }else{
                meses = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
            }    
            let a
            let pf = this.pfecha
            let x = 0
            let sumadias = 0
            for(let mm = this.mes2+1; mm <= m-1;mm++){
                x++
                sumadias = sumadias + meses[mm]
            }
                if(d < pf && m > this.mes2){
                a = ( meses[this.mes2-1] - pf) + d + sumadias
                }
                if(d >= pf){
                a =  ( meses[this.mes2-1] - pf+1) + d + sumadias
                }
                if(d > this.pfecha && m == this.mes2){
                a = d - pf
                }
            this.demas = a
            this.mmes = m
            this.ddia = d
        },
        verCredito(idC){
            let id = {
                id:idC
            }
            this.axios.post(this.uri+'/api/creditos/verCredito',id)
            .then( res => {
                this.creditoRenovar = res.data
                this.creditoRenovar.Fp = this.fecha(this.creditoRenovar.Fp)
            })
            .catch(err => console.log(err));
        },
        creditoAgregar(id,servicio,valor,interes,meses,inicial,frecuencia,fDiaPago,debeAlaFecha,ccCliente){  
            if(valor<=debeAlaFecha){
                alert('el valor debe ser mayor al credito a renovar')
                return
            }else{                   
                if (this.frecuencia == "quincenal") {
                    if (this.hoy <= this.pfecha) {
                    if (
                        this.fDiaPago < this.hoy ||
                        this.fDiaPago > this.pfecha
                    ){  
                        alert('fecha de pago establecida esta fuera del rango permitido')
                        return;
                    } else {
                        this.messs = this.mes;
                    }
                    } else {
                    //cuando this.hoy sea mayor que this.pfecha
                    if (this.fDiaPago <= this.pfecha || this.fDiaPago >= this.hoy) {
                        if (this.fDiaPago <= this.pfecha) {
                        this.messs = 1 + this.mes;
                        if (this.messs > 12) {
                            this.messs = 1;
                            var sumaAno = 1;
                        }
                        }
                        if (this.fDiaPago >= this.hoy) {
                        this.messs = this.mes;
                            
                        }
                    } else {
                        alert('fecha de pago establecida esta fuera del rango permitido')
                        return;
                    }
                    }
                }
                if (this.   frecuencia == "pagoUnico") {
                    this.   fDiaPago = this.hoy;
                }
                if (this.   frecuencia == "mensual") {
                        fDiaPago = this.ddia
                        let fMesPago = this.mmes
                        this.fDiaPago = this.ddia;
                    }
                let valorr = this.quitarPuntos(valor) 
                var interess = f.calcularInteresMensual(valorr, interes);
                interess = Math.round(interess)
                var totalC = f.totalCredito(meses, valorr, interess); 
                this.interesMensual = formatDecimal(interess); 
                totalC = parseInt(totalC)
                this.valTotalCred = formatDecimal(totalC)
                var pagaresCuotas = f.pagares(fDiaPago, meses, frecuencia, totalC, this.messs,
                sumaAno, interes,valorr, this.mmes);
                this.valCuota = pagaresCuotas.valCuotas;
                this.valCuota = formatDecimal(this.valCuota)
                this.tTotal = pagaresCuotas.totalPagos;
                let cuotaIni = parseInt(this.aumentoPorDias) + parseInt(inicial)
                this.inicial = cuotaIni
                for(let f = 0; f<=pagaresCuotas.totalPagos-1;f++){
                    if(frecuencia=='pagoUnico'){
                    pagaresCuotas.pagares[f].interesCuota = Math.round(interess) 
                    pagaresCuotas.pagares[f].valorCuota = 0
                    pagaresCuotas.valCuotas = 0 
                    pagaresCuotas.pagares[f].valCuotaMensual = 0     
                    if(f == pagaresCuotas.totalPagos-1 ){
                        let pre = valorr
                        pre = parseInt(pre)
                        pagaresCuotas.pagares[f].valorCuota = pre
                        pagaresCuotas.pagares[f].valCuotaMensual = pre
                    }
                    }
                    if(frecuencia=='quincenal' || frecuencia=='semanal' || frecuencia=='diario'){
                        pagaresCuotas.pagares[f].interesCuota = Math.round(interess * meses / pagaresCuotas.totalPagos)
                        pagaresCuotas.pagares[f].valorCuota = Math.round(valorr / pagaresCuotas.totalPagos)                       
                    }
                    if(frecuencia =='mensual'){                        
                        pagaresCuotas.pagares[f].interesCuota = Math.round(interess) 
                        pagaresCuotas.pagares[f].valorCuota = Math.round(valorr / pagaresCuotas.totalPagos)
                    }
                }
                if(this.prenda){                    
                    if(this.FiadorPrenda){
                        this.Fiador.fiadorPrenda = this.fiadorPrenda
                    }else{
                        this.Fiador.fiadorPrenda = null
                    }
                    if(this.InfolabfiadorPrenda){
                        this.Fiador.infolabfiadorPrenda = this.infolabfiadorPrenda
                    }else{
                        this.Fiador.infolabfiadorPrenda = null
                    }
                this.fiadore = this.Fiador
                }else{
                this.fiadore = this.creditoRenovar.fiador
                }    
                let credit = {
                    cedula:ccCliente,
                    cantidad:valor,
                    servicio: servicio,
                    tiempo: meses,
                    interes: interes,
                    frecuencia: frecuencia,
                    fDiaPago:fDiaPago,
                    fechaAgregado: new Date().getFullYear() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getDate(),
                    interesMensual: this.interesMensual,
                    valTotalCred : totalC,
                    creadoPor:this.user.codigo,
                    numeroCredito: this.tot,
                    fiador:this.fiadore,
                    infoLab:this.creditoRenovar.infoLab,
                    referidos:this.creditoRenovar.referidos,
                    pagares:pagaresCuotas.pagares,
                    valCuotaMens:'',
                    valCuotaMens:pagaresCuotas.valCuotas,
                    cuotaInicial:'',
                    cuotaInicial:cuotaIni,
                    renovacion:true,
                    aEditar:{
                        idCredito:this.id,
                        valor:debeAlaFecha,
                        capital:this.capital,
                        interes:this.intereses,
                        paga:false
                    },
                }
                this.aumentoPorDias = new Number
                this.credito = credit
            }
        },
        guardarCredito() { 
            let fiador = this.credito.fiador;
            if(this.prenda==false){
                this.agregarPagares();
            }else{
                    this.axios
                    .post(this.uri+"/api/creditos/guardarPrenda", fiador)
                        .then(res => {
                        alert("se agrego correctamente la prenda con su informacion ");
                        this.credito.fiador = res.data.data;
                        this.agregarPagares();
                    })
                    .catch(err => {
                        alert("error al agregar la prenda");
                        return;
                    });
                    
                }
            },
            agregarPagares() {
                let paga = new pag()
                paga.numero = this.tot,
                paga.pagares = this.credito.pagares      
                this.axios.post(this.uri+"/api/creditos/guardarPagares",paga)
                .then(res => {
                    alert("se agregaron correctamente los pagares");
                    this.credito.pagares = res.data.data;
                    this.agregarCredito();
                })
                .catch(err => {
                    alert("error al agregar los pagares");
                    this.borrarFiador()
                    return;
                });
            },
            borrarFiador(){
            let f = {
                    id_fiador: this.credito.fiador
                };
                this.axios.post(this.uri+"/api/creditos/borrarFiador", f) 
                .then(res => {
                    alert("se a borrado correctamente el fiador");
                })
                .catch(err => {
                    alert("error al borrar el fiador debe recargar la pagina");
                    this.borrarFiador()
                })
            },
            borrarPagares(){
            let p = {
                    pag: this.credito.pagares
                };
                this.axios.post(this.uri+"/api/creditos/borrarPagares", p) 
                .then(res => {
                    alert("se an borrado correctamente los pagares");
                })
                .catch(err => {
                    alert("error al borrar los pagares debe recargar la pagina");
                    this.borrarPagares()
                })
            },
            agregarCredito() {
            const resp = this.credito;
            this.axios.post(this.uri+"/api/creditos/guardarCredito", resp)
            .then(res => {
                alert('se a guardado correctamente el credito')
                this.credito = {}
                this.$router.go(0)
            })
            .catch(err => {
                alert('error al guardar el credito')
                this.borrarPagares()
                this.borrarFiador()
                return
            });
        },
    }
}
</script>

<style>

</style>