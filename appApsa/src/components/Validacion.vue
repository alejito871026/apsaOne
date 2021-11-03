<template>
  <div class="validacion">
    <div class="p-4 col-md-12 text-center bg-primary">
      <button class="btn btn-warning col-md-4 p-2 text-white" v-if="botoon" @click="agregar()">
        <h4>Agregar nueva solicitud de crédito</h4>
      </button>
      <button class="btn btn-danger col-md-4 p-2" v-if="botoondos" @click="regreso()">
        <h4>Cancelar solicitud de credito</h4>
      </button>
    </div>
    <div v-if="crearCre" class>
      <div class="mx-auto col-md-12 p-4" v-if="ocultar">
        <div class="card bg-primary text-white">
          <div class="card-body">
            <div class="p-2 bg-primary text-center">
              <h2>Agregar nuevo Credito</h2>
              <h2>Buscar Cliente por numero de cedula</h2>
            </div>
            <div class="form-group">
              <form class="form-inline" method="post" @submit.prevent="buscando()">
                <input @keyup.delete="recargar()" v-model="persona.cedulaId"  type="text" class="col-lg-12" autofocus />
                <button class="btn btn-danger">buscar</button>
              </form>
            </div>

            <div v-if="si_existe">
              <div class="text-center" v-for="clie in cliente" :key="clie._id">
                <h3>{{clie.nombreCliente}} {{clie.primerApellidoCliente}} {{clie.segundoApellidoCliente}}</h3>
                <h3>CC : {{clie.cedulaId}}</h3>
                <br>
                <div class="btn btn-warning p-4" v-if="!clie.estadoCupo" @click="soloAgregar('cupo')"><h2><strong>Aun no tiene cupo !!! </strong></h2></div>
                <div class="btn btn-success p-4" v-if="clie.estadoCupo"><h2><strong> Ya cuenta con cupo asiganado </strong></h2></div>
              </div>
              <div class="form-group text-center" v-if=" conCreditos">
                <div class="text-center">
                  <span></span>
                  <p><strong>el cliente tiene {{totalCpersona}} </strong> Creditos activos de los cuales {{enmora.length}} Estan en mora</p>
                  <!--<p>El comportamiento del cliente a sido {{enmora.length}}</p>-->
                  <table class="text-center col-lg-12 border">
                    <thead class="sticky-top text-white bg-dark">
                      <th># Credito</th>
                      <th>Servicio</th>
                      <th>estado</th>
                    </thead>
                     <tbody v-for="cred in activos" :key="cred">
                      <td>{{cred._id}}</td>
                      <td>{{cred.servicio}}</td>
                      <td>{{cred.estadoInterno}}</td>
                    </tbody>
                  </table>
                </div>
                <button class="btn btn-success btn-block" @click="soloAgregar('servicio')">agregar Credito</button>
              </div>
              <div class="text-center" v-if="sinCreditos">
                <h2>No existen Creditos asociados a este nombre</h2>
                <button class="btn btn-success btn-block" @click="soloAgregar('servicio')">agregar Credito</button>
              </div>
            </div>

            <div class="text-center" v-if="es_una_palabra">
              <h2>Debes buscar por numero de cedula</h2>
            </div>
            
            <div class="text-center" id="palabra" v-if="escribirCedula">
              <h2>Debes escribir numero de cedula</h2>
            </div>
            <div class="text-center" v-if="no_existe">
              <h2>cliente no existe</h2>
              <p>puede buscar de nuevo o ingresar un cliente</p>
              <router-link to="/clientes" class="nav-link btn btn-success">Agregar Cliente</router-link>
            </div>
          </div>
        </div>
      </div>
      <div v-if="mostrar" class="col-md-12 p-4 border">
        <div class="card p-4 bg-primary" v-for="clie in cliente" :key="clie._id">
          <h2 class="text-center text-white" >Credito a Agregar # </h2><h2 class="text-center text-white" v-bind:value="credit.numeroCredito=tot">{{tot}}</h2>
          <form @submit.prevent="creditoAgregar(clie.cedulaId)">
            <br />
            <div class="row border bg-white p-4">
              <div class="col-md-1"></div>
              <div class="col-md-5">
                <h2 class="text-center col-md-10">Informacion Cliente</h2>
                <br />
                <div class="form-group">
                  <h4>Nombre {{clie.nombreCliente+' '+clie.primerApellidoCliente +' '+ clie.segundoApellidoCliente}}</h4>
                </div>
                <div class="form-group">
                  <h4>Cedula: {{clie.cedulaId}}</h4>
                </div>
                <div class="form-group">
                  <h4>Celular principal: {{clie.celularUno}}</h4>
                </div>
                <div class="form-group">
                  <h4>Otro numero de contacto: {{clie.celularDos}}</h4>
                </div>
                <div class="form-group">
                  <h4>Direccion residencia: {{clie.direccionCliente}}</h4>
                </div>
                <div class="form-group">
                  <h4>Barrio: {{clie.barrioCliente}}</h4>
                </div>
                 <div class="form-group" v-if="clie.email">
                  <h4>Email: {{clie.email}}</h4>
                </div>  
                <div class="btn btn-danger">
                  <router-link
                    :to="{ name: 'clientes', params: { cc: clie.cedulaId }}"
                    class="text-white"
                  >Si algun dato a cambiado porfavor edite los datos del cliente</router-link>
                </div>
              </div>
              <div class="col-md-1">
                <div>
                  <select v-model="creditoArticulo" @change="tipoCredito()">
                    <option >Credito</option>
                    <option >Articulo</option>
                  </select>
                </div>
              </div>
              <div class="col-md-5">
                <h2 class="text-center">Solicitud Credito</h2>
                <br />
                <div class="input-group mb-3" v-if="creditoArticulo=='Articulo'">
                  <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01">Tipo Articulo</label>
                  </div>
                  <select v-model="credit.servicio" class="form-control"  @change="quitarBoton(), validTipo(credit.servicio)">
                    <option v-for="(tipo,index) in tipos" :key="index">{{tipo.tipoProducto}}</option>
                  </select>
                </div>
                <div class="input-group mb-3" v-if="productoAvender && creditoArticulo=='Articulo'">
                  <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01">Articulo</label>
                  </div>
                  <select v-model="credit.producto" class="form-control"  @change="quitarBoton(), referirProducto(credit.producto)">
                    <option v-for="(productos,index) in productosTipo" :key="index" v-bind:value="productos._id">{{productos.modelo}}  {{productos.referencia}}</option>
                  </select>
                </div>
                <div class="input-group mb-3" v-if="creditoArticulo=='Articulo'" >
                  <div class="input-group-prepend">
                    <label class="input-group-text">Cantidad Solicitada</label>
                  </div>
                  <input
                    v-model="credit.cantidad"
                    v-money="money"
                    type="text"
                    id="salida"
                    required
                    disabled
                    class="form-control"
                    @keyup="quitarBoton()"
                  />
                </div>
                <div class="input-group mb-3" v-if="creditoArticulo=='Credito'">
                  <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01">Tipo de Servicio</label>
                  </div>
                  <select
                    v-model="credit.servicio"
                    required
                    class="custom-select"
                    @change="quitarBoton(), validService()"
                    >
                    <option>Celular</option>
                    <option>Soat</option>
                    <option>Tecnomecanica</option>
                    <option>Soat-Tecnomecanica</option>
                    <option>Licencia</option>
                    <option value="pignoracion">Prestamo sobre prenda</option>
                    <option>Libre Inversion</option>
                    <option>Hipoteca</option>
                  </select>
                </div>
                <div class="input-group mb-3" v-if="creditoArticulo=='Credito'">
                  <div class="input-group-prepend">
                    <label class="input-group-text">Cantidad Solicitada</label>
                  </div>
                  <input
                    v-model="credit.cantidad"
                    v-money="money"
                    type="text"
                    id="salida"
                    required
                    class="form-control"
                    @keyup="quitarBoton()"
                  />
                </div>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text">Interes %</label>
                  </div>
                  <input
                    
                    type="number"
                    required
                    @keyup="quitarBoton()"
                    class="form-control"
                    v-model="credit.interes"
                    min="1"
                    max="15"
                    step="0.01"
                  />
                </div>
                <div class="input-group mb-3" v-if="creditoArticulo=='Credito'">
                  <div class="input-group-prepend">
                    <label class="input-group-text">Cuota Inicial</label>
                  </div>
                  <input
                    type="number"
                    required
                    @keyup="quitarBoton()"
                    class="form-control"
                    v-model="credit.cuotaInicial"
                    placeholder="(no requerida)"
                  />
                </div>
                <div class="input-group mb-3" v-if="creditoArticulo=='Articulo'">
                  <div class="input-group-prepend">
                    <label class="input-group-text">Cuota Inicial</label>
                  </div>
                  <input
                    type="number"
                    required
                    @keyup="quitarBoton(),restarCantidad()"
                    class="form-control"
                    v-model="credit.cuotaInicial"
                    placeholder="(no requerida)"
                  />
                </div>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text">Tiempo en meses</label>
                  </div>
                  <input
                    type="number"
                    required
                    @keyup="quitarBoton()"
                    class="form-control"
                    v-model="credit.tiempo"
                    min="1"
                    max="72"
                  />
                </div>
                <div class="input-group mb-3" v-if="credit.tiempo">
                  <div class="input-group-prepend">
                    <label class="input-group-text">Valor total</label>
                  </div>
                  <div class="form-control">{{sumar}}</div>
                  
                </div>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text">frecuencia de pago</label>
                  </div>
                  <select
                    v-model="credit.frecuencia"
                    required
                    class="custom-select"
                    @change="quitarBoton(), tipofecha()"
                  > 
                    
                    <option value="mensual">Mensual</option>
                    <option value="quincenal">Quincenal</option>
                    <option value="semanal">Semanal</option>
                    <option value="diario">Diario</option>
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
                    @keyup="quitarBoton()"
                    class="form-control"
                    v-model="credit.fDiaPago"
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
                    @keyup="quitarBoton()"
                    class="form-control"
                    v-model="credit.fDiaPago"
                    min="1"
                    max="31"
                  />
                </div>
                <div v-if="M">
                  <input type="date" class="input-group" v-model="date" @change="comparar()">
                </div>
              </div>
            </div>
            <br />
            <div class="bg-white text-center row border p-4">
              <br/>
              <div class="form-group col-md-12">
                <div class="btn-group col-md-12">
                <div class="btn btn-primary btn-block" @click="infoLabF = false, emplee='empleado', indepp= false, btn = true" v-if="tEmple">
                  Si es empleado</div>
                  <div class="btn btn-warning" v-if="indepp"><i class="fa fa-times"></i></div>
                  <div class="btn btn-success" v-if="emplee"><i class="fa fa-check"></i></div>
                </div>   
              </div>   
                <br> 
                <div class="form-group col-md-12">
                <div class="btn-group col-md-12">
                  <div class="btn btn-primary btn-block" @click="emplee=false,  indepp= 'independiente', btn = true" v-if="tEmple">
                  Si es independiente</div>
                  <div class="btn btn-warning" v-if="emplee"><i class="fa fa-times"></i></div>
                  <div class="btn btn-success" v-if="indepp"><i class="fa fa-check"></i></div>
                </div>                 
              </div>
              <br/>
              <div class="btn btn-danger btn-block" v-if="btn" @click="emplee=false, indepp= false, btn=false">Quitar informacion Empleado</div>
              <div class="btn btn-success btn-block" v-if="!btn">Para agregar informacion de empleo presione si es empleado o independiente</div>
            </div>
            <br/>
            <div class="row p-4 bg-white" v-if="emplee || indepp">
              <div class="col-md-12" v-if="emplee">
                <h2 class="text-center">Informacion laboral {{emplee}}</h2>
              </div>
              <div class="col-md-12" v-if="indepp">
                <h2 class="text-center">Informacion laboral {{indepp}}</h2>
              </div>
              <br />
              <div class="col-md-6 p-4">
                <div class="input-group mb-3" >
                  <div class="input-group-prepend" v-if="emplee">
                    <label class="input-group-text">Nombre de la empresa</label>
                  </div>
                  <div class="input-group-prepend" v-if="indepp">
                    <label class="input-group-text">Actividad o negocio</label>
                  </div>
                  <input
                    type="text"
                    required
                    @keyup="quitarBoton()"
                    class="form-control"
                    v-model="infoLab.nombreEmpresa"
                  />
                </div>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text">Ciudad</label>
                  </div>
                  <input
                    type="text"
                    required
                    @keyup="quitarBoton()"
                    class="form-control"
                    v-model="infoLab.ciudadEmpresa"
                  />
                </div>
                <div class="input-group mb-3" v-if="emplee">
                  <div class="input-group-prepend" >
                    <label class="input-group-text">Cargo</label>
                  </div>
                  <input
                    type="text"
                    required
                    @keyup="quitarBoton()"
                    class="form-control"
                    v-model="infoLab.cargoEmpleado"
                  />
                </div>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text">Salario</label>
                  </div>
                  <input
                    type="text"
                    required
                    @keyup="quitarBoton()"
                    class="form-control"
                    v-model="infoLab.salarioEmpleado"
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
                    @keyup="quitarBoton()"
                    class="form-control"
                    v-model="infoLab.direccionEmpresa"
                  />
                </div>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text">Telefono</label>
                  </div>
                  <input
                    type="text"
                    required
                    @keyup="quitarBoton()"
                    class="form-control"
                    v-model="infoLab.telefonoEmpresa"
                  />
                </div>
                <div class="input-group mb-3" v-if="emplee">
                  <div class="input-group-prepend">
                    <label class="input-group-text">Correo laboral</label>
                  </div>
                  <input
                    type="mail"
                    required
                    @keyup="quitarBoton()"
                    class="form-control"
                    v-model="infoLab.correoLaboral"
                  />
                </div>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text">Otros Ingresos</label>
                  </div>
                  <input
                    type="text"
                    required
                    @keyup="quitarBoton()"
                    class="form-control"
                    v-model="infoLab.otrosIngresosEmpleado"
                    v-money="money"
                  />
                </div>
              </div>
            </div>
            <br/>
            <div class="row bg-white border p-4">
                <div class="btn btn-danger btn-block" v-if="btnn" @click="f_o_p=false, btnn=false">Quitar informacion fiador o prenda</div>
                <div class="btn btn-success btn-block" v-if="!btnn" @click="f_o_p=true, btnn=true">Agregar informacion de fiador o prenda </div>
              </div>    
              <div class="row" v-if="f_o_p">
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
                  <div class="btn btn-danger btn-block"   @click="FiadorPrenda = false">Quitar fiador</div>
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
                          @keyup="quitarBoton()"
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
                          @keyup="quitarBoton()"
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
                          @keyup="quitarBoton()"
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
                          @keyup="quitarBoton()"
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
                          @keyup="quitarBoton()"
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
                          @keyup="quitarBoton()"
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
                          @keyup="quitarBoton()"
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
                          @keyup="quitarBoton()"
                          class="form-control"
                          v-model="infolabfiadorPrenda.otrosIngresosEmpleado"
                          v-money="money"
                        />
                      </div>
                    </div>
                    <div class="btn btn-warning btn-block" v-if="infolabfiadorPrenda" @click="InfolabfiadorPrenda= false">Cerrar informacion laboral fiador</div>
                  </div>
                  </div>
                </div>
              </div>     
              <div v-if="fiador" class="col-lg-12 bg-white border p-4">
                <div class="card p-4">
                  <div class="card-head text-center">
                    <h2 class="p-4">Fiador</h2>
                  </div>
                  <div class="form-group">
                    <span>Nombre Fiador</span>
                    <input
                      v-model="Fiador.nombreFiador"
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
                        v-model="Fiador.primerApellidoFiador"
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
                        v-model="Fiador.segundoApellidoFiador"
                        required
                        type="text"
                        min="3"
                        placeholder="segundo apellido"
                        class="form-control"
                      />
                    </div>
                  </div>
                  <div class="form-group mb-3">
                    <span>Numero de Cedula fiador</span>
                    <div class="input-group mb-3">
                      <input
                      v-model="Fiador.cedulaFiador"
                      required
                      type="text"
                      min="7"
                      placeholder="CC"
                      class="form-control"
                    />
                    <div class="input-group-append btn btn-warning" @click="validarFiador(Fiador.cedulaFiador)"> validar Fiador</div>
                    </div>                    
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
                      />
                    </div>
                  </div>
                  <div class="row form-group">
                    <div class="col-md-4">
                      <span>Tipo de vivienda</span>
                      <select v-model="Fiador.tViviendaFiador" required class="custom-select">
                        <option value="propia">Propia</option>
                        <option value="familiar">Familiar</option>
                        <option value="alquiler">Alquiler</option>
                      </select>
                    </div>
                    <div class="col-md-4">
                      <span>Ocupacion</span>
                      <input
                        v-model="Fiador.ocupacionFiador"
                        required
                        type="text"
                        placeholder="Ocupacion"
                        class="form-control"
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
                      />
                    </div>
                  </div>
                </div>
                <div class="row" id="infoLabFiador" v-if="infoLabF" >
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
                        @keyup="quitarBoton()"
                        class="form-control"
                        v-model="infoLabFiador.nombreEmpresa"
                      />
                    </div>
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <label class="input-group-text">Ciudad</label>
                      </div>
                      <input
                        type="text"
                        required
                        @keyup="quitarBoton()"
                        class="form-control"
                        v-model="infoLabFiador.ciudadEmpresa"
                      />
                    </div>
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <label class="input-group-text">Cargo</label>
                      </div>
                      <input
                        type="text"
                        required
                        @keyup="quitarBoton()"
                        class="form-control"
                        v-model="infoLabFiador.cargoEmpleado"
                      />
                    </div>
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <label class="input-group-text">Salario</label>
                      </div>
                      <input
                        type="text"
                        required
                        @keyup="quitarBoton()"
                        class="form-control"
                        v-model="infoLabFiador.salarioEmpleado"
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
                        @keyup="quitarBoton()"
                        class="form-control"
                        v-model="infoLabFiador.direccionEmpresa"
                      />
                    </div>
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <label class="input-group-text">Telefono</label>
                      </div>
                      <input
                        type="text"
                        required
                        @keyup="quitarBoton()"
                        class="form-control"
                        v-model="infoLabFiador.telefonoEmpresa"
                      />
                    </div>
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <label class="input-group-text">Correo laboral</label>
                      </div>
                      <input
                        type="mail"
                        required
                        @keyup="quitarBoton()"
                        class="form-control"
                        v-model="infoLabFiador.correoLaboral"
                      />
                    </div>
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <label class="input-group-text">Otros Ingresos</label>
                      </div>
                      <input
                        type="text"
                        required
                        @keyup="quitarBoton()"
                        class="form-control"
                        v-model="infoLabFiador.otrosIngresosEmpleado" 
                        v-money="money"
                      />
                    </div>
                  </div>
                </div>
                <br>
                <div class="btn btn-warning btn-block" v-if="infoLabF" @click="infoLabF= false">Cerrar informacion laboral fiador</div>
                <div class="btn btn-primary btn-block" v-if="!infoLabF" @click="infoLabF= true">Agregar informacion laboral fiador</div>
              </div> 
            </div>
            <br />
            <div class="row bg-white border p-4">
                <div class="btn btn-danger btn-block" v-if="btnnn" @click="refr=false, btnnn=false">Quitar Referencias</div>
                <div class="btn btn-success btn-block" v-if="!btnnn" @click="refr=true, btnnn=true">Agregar informacion de referencias </div>
            </div>
            <div class="row bg-white border p-4" v-if="refr">
              <div class="col-md-6">
                <h2 class="text-center">Referencias Familiares</h2>
                <br />
                <div class="row text-center p-4">
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
                            required
                            v-model="rfamiliaruno.nombreRF"
                            class="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            required
                            v-model="rfamiliaruno.direccionRF"
                            class="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            required
                            v-model="rfamiliaruno.telefonoRF"
                            class="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            required
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
                            required
                            v-model="rfamiliardos.nombreRF"
                            class="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            required
                            v-model="rfamiliardos.direccionRF"
                            class="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            required
                            v-model="rfamiliardos.telefonoRF"
                            class="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            required
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
                            required
                            v-model="rfamiliartres.nombreRF"
                            class="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            required
                            v-model="rfamiliartres.direccionRF"
                            class="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            required
                            v-model="rfamiliartres.telefonoRF"
                            class="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            required
                            v-model="rfamiliartres.parentescoRF"
                            class="form-control"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="col-md-6">
                <h2 class="text-center">Referencias Personales</h2>
                <br />
                <div class="row text-center p-4">
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
                            required
                            v-model="rfpersonaluno.nombreRF"
                            class="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            required
                            v-model="rfpersonaluno.direccionRF"
                            class="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            required
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
                            required
                            v-model="rfpersonaldos.nombreRF"
                            class="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            required
                            v-model="rfpersonaldos.direccionRF"
                            class="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            required
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
                            required
                            v-model="rfpersonaltres.nombreRF"
                            class="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            required
                            v-model="rfpersonaltres.direccionRF"
                            class="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            required
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
            <br />
            <div class="row bg-white border p-4">
              <div class="col-md-12">
                <h2 class="text-center">Descripcion Credito</h2>
                <br />
                <div class="form-group">
                  <div id class="form-control">Interes Mensual: {{credi.interesMensual}}</div>
                </div>
                <div class="form-group">
                  <div id class="form-control">Total Credito: {{Vcred}}</div>
                </div>
                <div class="form-group">
                  <div id class="form-control">Cantidad Cuotas: {{credi.tTotal}}</div>
                </div>
                <div class="form-group">
                  <div id class="form-control">Valor Cuota: {{valCuotaMensual}}</div>
                </div>
              </div>
            </div>
            <br />
            <div class="row bg-white border p-4">
              <div class="col-md-12">
                <div class="form-group" v-if="boton">
                  <button
                    class="btn btn-primary btn-block"
                    @click="spiner=true, guardarCredito()"
                  >Guardar Credito</button>
                </div>
                <div class="form-group">
                  <button class="btn btn-success btn-block">calcular</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div v-if="agregarCupo">
        <br>
        <div class="container">
          <div class="card">
            <div class="card-header">
              <h2 class="text-center">Cupo</h2>
            </div>
            <div class="card-body">
              <span>cedula</span>
              <input type="number" class="form-control" v-model="cedulaCupo"  disabled><br>
              <span>cantidad</span>
              <input type="number" class="form-control" v-model="montoAprobadoCupo"><br>
              <div v-if="alert10" class="text-center">
                  <div class="alert alert-danger">
                      <strong>Oops!</strong> Ten cuidado <a class="alert-link">el valor debe ser mayor a 100.000 y menor a 600.000</a>.
                  </div>
              </div>             
            </div>
            <div class="card-footer">
              <button class="btn btn-primary btn-block" @click="guardarCupo(cedulaCupo,montoAprobadoCupo)"><h2><strong>guardar</strong></h2></button>
              <button @click="agregarCupo = false, ocultar = true, si_existe = true" class="btn btn-warning btn-block"><h2><strong>Regresar</strong></h2></button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center col-md-12 p-4" v-if="tieneTres">
      <renovacion :Clientee="persona"/>
    </div>    
    <div class="col-md-12 p-4" v-if="credd">
      <Credito :respu="respuesta"/>
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
    ocupacionFiador,
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
    this.ocupacionFiador = ocupacionFiador;
    this.PcargoFiador = PcargoFiador;
    this.emailFiador = emailFiador;
    this.edadFiador = edadFiador;
    this.infolaboralFiador = {}
  }
}
class pag { 
  constructor(){
    this.numero = "",
    this.pagares = ""
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
class person {
  constructor(cedulaId) {
    this.cedulaId = cedulaId;
  }
}
class respu {
  constructor(respuesta) {
    this.respuesta = respuesta;
  }
}
class credito {
  constructor(
    servicio,
    cantidad,
    interes,
    cuotaInicial,
    tiempo,
    frecuencia,
    fDiaPago
  ) {
    this.nombreCliente = "";
    this.cedula = "";
    this.servicio = servicio;
    this.cantidad = cantidad;
    this.interes = interes;
    this.cuotaInicial = cuotaInicial;
    this.tiempo = tiempo;
    this.frecuencia = frecuencia;
    this.fDiaPago = fDiaPago;
    this.pagares = [];
    this.interesMensual = "";
    this.valTotalCred = "";
    this.valCuotaMens = "";
    this.tTotal = "";
    this.fechaAgregado =
      new Date().getFullYear() +
      "/" +
      (new Date().getMonth() + 1) +
      "/" +
      new Date().getDate();
    this.numeroCredito = "";
    this.referidos = [];
    this.creadoPor = "";
    this.aprovadoRechazadoPor = "";
    this.entregadoPor = "";
    this.fiador = "";
    this.infoLab = "";
  }
}
class usuario {
  constructor() {
    this.nombre = "";
    this.apellidos = "";
    this.codigo = "";
    this.direccion = "";
    this.celular = "";
    this.rol = "";
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
class moneey {
  constructor() {
    this.thousands = ".";
    this.precision = 0;
    this.masked = false;
  }
}
import axios from "axios";
import Credito from "../components/Credito.vue";
import renovacion from "../components/renovacion.vue"
import f from "../funciones/functionsValid";
const cryp = require ('crypto')
const formatDecimal = require("format-decimal");

import ff from "../funciones/funciones.js";


export default {
  name: "Validacion",
  components: {
    Credito,
    renovacion,
  },
  props: {
    
  },
  data() {
    return {
      valorTotal:0,
      productosTipo:[],
      tipos:[],
      creditoArticulo:'Credito',
      spiner:false,
      rrr:0,
      montoAprobadoCupo:0,
      cedulaCupo:0,
      date:'',
      btn:true,
      btnn:true,
      btnnn:true,
      refr:true,
      f_o_p:true,
      FiadorPrenda : false,
      InfolabfiadorPrenda : false,  
      infoLabF : false,
      fiadorPrenda: new fiadorr(),
      infolabfiadorPrenda: new infolaboral(),
      infoLabFiador: new infolaboral(),
      infoLab: new infolaboral(),
      cancelPrenda: false,
      pagoUnico: false,
      emplee: "empleado",
      indepp: false,
      money: new moneey(),
      diario: false,
      semanal: false,
      messs: 0,
      Fiador: {},
      rfamiliaruno: new rf(),
      rfamiliardos: new rf(),
      rfamiliartres: new rf(),
      rfpersonaluno: new rf(),
      rfpersonaldos: new rf(),
      rfpersonaltres: new rf(),
      checked: "",
      tEmple: true,
      fiador: true,
      crearCre: false,
      botoon: true,
      botoondos: false,
      credd: true,
      persona: new person(),
      credit: new credito(),
      user: new usuario(),
      respuesta: new respu(1),
      cliente: {},
      Creditos: {},
      activos: {},
      credi: {},
      si_existe: false,
      no_existe: false,
      es_una_palabra: false,
      escribirCedula: false,
      sinCreditos: false,
      conCreditos: false,
      ocultar: true,
      mostrar: false,
      boton: false,
      tieneTres: false,
      totalCpersona: "",
      enmora: "",
      prenda: false,
      tot: 0,
      ref: [],
      referencias: {},
      quincenal: false,
      mensual: false,
      hoy: 0,
      pfecha: 0,
      mes: 0,
      mes2: 0,
      ano: 0,
      hh: false,
      paraSeguir: 0,
      pagos: [],
      Vcred:'',
      valCuotaMensual:'',
      M:false,
      mayor:false,
      demas:0,
      mmes:0,
      ddia:0,
      aumentoPorDias:0,
      activo:false,
      agregarCupo:false,
      alert10:false,
      uri:'',
      productoAvender:false,
      valorVenta :0,
    };
  },
  computed:{
    sumar : function(){
      let canti = 0
      let interesTotal = 0
      let interesTotall = 0
      if(this.credit.cantidad!=undefined){
         canti = this.quitarPuntoss(this.credit.cantidad)
      }
      if(this.credit.interes!=undefined){
       interesTotal = canti * this.credit.interes /100 
      }
      if(this.credit.tiempo!=undefined){
       interesTotall = parseInt(interesTotal) * this.credit.tiempo 
      }
      return this.valorTotal = parseInt(canti) + parseInt(this.credit.cuotaInicial) + parseInt(interesTotall)
    }
    
  },
  created() {
    this.uri = ff.uri
  },
  mounted(){
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
    this.fetchCreditos();
    this.verTipos()
  },
  watch:{
    
  },
  methods: {  
    tipoCredito(){
      this.credit.servicio = ''
      this.credit.interes = ''
      this.credit.cantidad = ''
      this.productoAvender=false
    },
    restarCantidad(){
      this.credit.cantidad = this.valorVenta
      this.credit.cantidad = this.credit.cantidad - this.credit.cuotaInicial
    }, 
    referirProducto(id){
      console.log(id)
      const result = this.productosTipo.filter(producto => producto._id == id)
      console.log(result)
      this.valorVenta = result[0].valorVenta
      this.credit.cantidad = result[0].valorVenta
    },
    verTipos(){
            this.axios.get(this.uri+'/api/productos/verTipos')
            .then(res=>{
              console.log('estso son los tipos')
              console.log(res.data)
            this.tipos=res.data
            this.tipos.push({tipoProducto:'NUEVO TIPO'})
            })
            .catch(err=>{console.log(err)})
        },
    validTipo(x){
      let tipo={
        tip:x
      }
      this.axios.post(this.uri+'/api/productos/productosTipo',tipo)
      .then(res=>{console.log(res.data)
          this.productosTipo = res.data
          if(this.productosTipo.length>0){
            this.productoAvender = true
          }else{
            this.productoAvender = false
          }
          
      })
      .catch(err=>{console.log(err)})
    },
    fetchCreditos() {
      //const uri = "http://localhost:3000/api/clientes"
      this.axios
        .get(this.uri+"/api/creditos/cuentaCreditos")
        .then(res => {
          this.tot = res.data + 327;
        })
        .catch(err => console.log(err));
    },
    cuentaCreditos () {
       axios.get(this.uri+'/api/creditos/cuenta')
      .then(res=>{
        this.rrr=res.data +327
      }) 
    },
    validarFiador(cedulaFiador){
      const cc={
        cedulaFiador:cedulaFiador
      }
      this.axios.post(this.uri+'/api/fiadorUnico',cc)
      .then(res=>{
        if(res.data[0] == undefined){
          alert('no existe fiador con esa cedula se procedera a buscar por clientes')
          this.Fiador = new fiadorr()
          this.verClienteFiador(cc)
        }else{
          console.log(res.data)
          this.Fiador = res.data[0]
        }
      })
      .catch(err=>{
        alert('no existe fiador con esta cedula error')
        this.Fiador = new fiadorr()
        })
    },
    verClienteFiador(cedula){
      console.log(cedula.cedulaFiador)
      const ccc = cedula.cedulaFiador
      let cc = {
        cedulaId:ccc
      }
      this.axios.post(this.uri+'/api/busqueda',cc)
      .then(res=>{
        if(res.data[0] == undefined){
          alert('tampoco existe cliente asociado a ese numero de cedula que pueda ser asignado como fiador')
          this.Fiador = new fiadorr()
        }else{
          console.log(res.data)
          this.Fiador.nombreFiador = res.data[0].nombreCliente
          this.Fiador.primerApellidoFiador = res.data[0].primerApellidoCliente
          this.Fiador.segundoApellidoFiador = res.data[0].segundoApellidoCliente
          this.Fiador.cedulaFiador = res.data[0].cedulaId
          this.Fiador.celularUnoFiador = res.data[0].celularUno
          this.Fiador.celularDosFiador = res.data[0].celularDos
          this.Fiador.barrioFiador = res.data[0].barrioCliente
          this.Fiador.tViviendaFiador = res.data[0].tViviendaCliente
          this.Fiador.ocupacionFiador = res.data[0].OcupacionCliente
          this.Fiador.direccionFiador = res.data[0].direccionCliente
          this.Fiador.ciudadFiador = res.data[0].ciudadCliente
          this.Fiador.emailFiador = res.data[0].emailCliente
          this.Fiador.edadFiador = res.data[0].edadCliente
          this.Fiador.PcargoFiador = res.data[0].PcargoCliente
        }
      })
      .catch(err=>{console.log(err)})
    },
    comparar(){
      let n = this.quitarPuntos(this.date)
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
    tipofecha() {
      var tipf = this.credit.frecuencia;
      if (tipf == "quincenal") {
        this.hoy = new Date().getDate();
        this.mes = new Date().getMonth();
        this.hoy = this.hoy + 7;
        this.mes = this.mes + 1;
        if (this.mes > 12) {
          this.mes = 1;
          this.ano++;
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
          this.ano++;
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
            this.ano++;
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
          this.ano++;
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
        let t = this.credit.tiempo;
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
    quitarPuntos(x){
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
    quitarPuntoss(x){
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
    agregar() {
        (this.botoon = false),
        (this.crearCre = true),
        (this.credd = false),
        (this.botoondos = true);
    },
    regreso() {
        (this.botoon = true),
        (this.crearCre = false),
        (this.credd = true),
        (this.botoondos = false);
        (this.ocultar = true),
        (this.infoLab = new infolaboral()),
        (this.infoLabFiador = new infolaboral()),
        (this.Fiador = {}),
        (this.fiadorPrenda = new fiadorr()),
        (this.infolabfiadorPrenda = new infolaboral()),
        (this.persona = new person()),
        (this.credit = new credito()),
        (this.credi = new credito()),
        (this.rfamiliaruno = new rf()),
        (this.rfamiliardos = new rf()),
        (this.rfamiliartres = new rf()),
        (this.rfpersonaluno= new rf()),
        (this.rfpersonaldos = new rf()),
        (this.rfpersonaltres = new rf()),
        (this.si_existe = false),
        (this.mostrar = false),
        (this.semanal = false),
        (this.quincenal = false),
        (this.mensual = false),
        (this.diario = false),
        (this.tieneTres = false),
        (this.cupo = {}),
        (this.agregarCupo = false);
    },
    buscando() {
      var x = this.persona;
        if (x.cedulaId == "") {
          this.escribirCedula = true;
          this.es_una_palabra = false;
          this.no_existe = false;
          this.si_existe = false;
        } else {
        if (isNaN(x.cedulaId)) {
          this.es_una_palabra = true;
          this.persona = new person();
          this.no_existe = false;
          this.escribirCedula = false;
          this.si_existe = false;
        } else {
          this.axios.post(this.uri+"/api/busqueda", x)
          .then(res => {
            this.cliente = res.data;
            if (this.cliente != "") {
              this.si_existe = true;
              this.es_una_palabra = false;
              this.no_existe = false;
              this.escribirCedula = false;
              this.creditosActivos();
            } else {
              this.tieneTres = false
              this.no_existe = true;
              this.es_una_palabra = false;
              this.si_existe = false;
              this.escribirCedula = false;
            }
          });
        }
      }
    },
    creditosActivos() {
      const cedula = this.persona;
      this.axios.post(this.uri+"/api/creditos/creditosCliente", cedula)
      .then(res => {
        this.Creditos = res.data;
        const total = this.Creditos.length;
        if (total > 0 && total < 3) {
          this.conCreditos = true;
          this.activos = this.Creditos;
          this.sinCreditos = false;
          this.tieneTres = false;
          this.totalCpersona = total;
          this.activo = false;
        } else {
          if (total >= 3) {
            this.tieneTres = true;
            this.sinCreditos = false;
            this.conCreditos = false;
            this.totalCpersona = total;
          } else {
            this.sinCreditos = true;
            this.conCreditos = false;
            this.tieneTres = false;
            this.totalCpersona = total;
            this.activo=false;
          }
        }
      });
    },
    validService() {
      if (this.credit.servicio == "pignoracion") {
        
        (this.fiador = false), (this.prenda = true); (this.agrF = false);
        this.Fiador = new prendaa();
      } else {
        (this.fiador = true), (this.prenda = false);
        this.Fiador = new fiadorr();
      }
    },
    recargar(){
      this.es_una_palabra = false
      this.no_existe = false
      this.si_existe = false
      this.tieneTres = false
      this.persona = new person()
    },
    creditoAgregar() {
      if (this.credit.frecuencia == "quincenal") {
        if (this.hoy <= this.pfecha) {
          if (
            this.credit.fDiaPago < this.hoy ||
            this.credit.fDiaPago > this.pfecha
          ){
            alert('fecha de pago establecida esta fuera del rango permitido')
            return;
          } else {
            this.messs = this.mes;
          }
        } else {
          //cuando this.hoy sea mayor que this.pfecha
          if (this.credit.fDiaPago <= this.pfecha || this.credit.fDiaPago >= this.hoy) {
            if (this.credit.fDiaPago <= this.pfecha) {
              this.messs = 1 + this.mes;
              if (this.messs > 12) {
                this.messs = 1;
                var sumaAno = 1;
              }
            }
            if (this.credit.fDiaPago >= this.hoy) {
              this.messs = this.mes;
            }
          } else {
            alert('fecha de pago establecida esta fuera del rango permitido')
            return;
          }
        }
      }
      if (this.credit.frecuencia == "pagoUnico") {
        this.credit.fDiaPago = this.hoy;
      }
      if (this.credit.frecuencia == "mensual") {
        this.credit.fDiaPago = this.ddia;
      }
      if (this.credit.frecuencia == "semanal") {
        var d = new Date();
        this.credit.fDiaPago = f.sumarDias(d,8)
      }
      let valor = "";
      this.credit.nombreCliente = this.cliente[0].nombreCliente+' '+this.cliente[0].primerApellidoCliente+' '+this.cliente[0].segundoApellidoCliente
      this.credit.cedula = this.cliente[0].cedulaId;
      this.credit.telefono = this.cliente[0].celularUno+' ----- '+this.cliente[0].celularDos
      this.credit.direccion = this.cliente[0].direccionCliente
      var x = this.credit;
      for (let n = 0; n <= x.cantidad.length - 1; n++) {
        if (x.cantidad[n] == ".") {
          n++;
        }
        valor = valor + x.cantidad[n];
      }
      valor = parseInt(valor);
      var interes = f.calcularInteresMensual(valor, x.interes);
      var totalC = f.totalCredito(x.tiempo, valor, interes);
      this.credit.interesMensual = formatDecimal(interes);
      this.credit.valTotalCred = totalC;
      this.Vcred = formatDecimal(totalC)
      this.boton = true;
      var pagaresCuotas = f.pagares(x.fDiaPago, x.tiempo, x.frecuencia, totalC, this.messs,
        sumaAno, x.interes,valor,this.mmes);
      this.credit.valCuotaMens = pagaresCuotas.valCuotas;
      this.valCuotaMensual = formatDecimal(this.credit.valCuotaMens)
      this.credit.tTotal = pagaresCuotas.totalPagos;
      this.pagos = pagaresCuotas.pagares;
      this.credit.pagares = pagaresCuotas.pagares; 
      this.aumentoPorDias = parseInt(this.aumentoPorDias) + parseInt(this.credit.cuotaInicial)
      for(let f = 0; f<=pagaresCuotas.totalPagos-1;f++){
        if(this.credit.frecuencia=='pagoUnico'){
          this.credit.pagares[f].interesCuota = Math.round(interes) 
          this.credit.pagares[f].valorCuota = 0 
          this.credit.valCuotaMens = 0 + Math.round(interes)
          this.credit.pagares[f].valCuotaMensual = 0     
          if(f == pagaresCuotas.totalPagos-1 ){
            let pre = this.quitarPuntoss(this.credit.cantidad)
            pre = parseInt(pre)
            this.credit.pagares[f].valorCuota = pre
            this.credit.pagares[f].valCuotaMensual = pre
          }
        }
        if(this.credit.frecuencia=='quincenal' || this.credit.frecuencia=='semanal' || this.credit.frecuencia=='diario'){
          this.credit.pagares[f].interesCuota = Math.round(interes * x.tiempo / pagaresCuotas.totalPagos)
          this.credit.pagares[f].valorCuota = Math.round(valor / pagaresCuotas.totalPagos)                        
        }
        if(this.credit.frecuencia =='mensual'){
          this.credit.pagares[f].interesCuota = Math.round(interes) 
          this.credit.pagares[f].valorCuota = Math.round(valor / pagaresCuotas.totalPagos)

        }
      }
      if(this.refr){
        this.ref = [
        this.rfamiliaruno,
        this.rfamiliardos,
        this.rfamiliartres,
        this.rfpersonaluno,
        this.rfpersonaldos,
        this.rfpersonaltres
        ];
      }else{
        this.ref = null
      }
      this.credit.referidos = this.ref;
      this.credit.creadoPor = this.user.codigo;      
      if(this.f_o_p==true){
        this.credit.fiador = this.Fiador;
        if(this.infoLabF==true){
        this.credit.fiador.infolaboralFiador =  this.infoLabFiador
      }else{
         this.credit.fiador.infolaboralFiador = null
      }
        if(this.FiadorPrenda){
          this.credit.fiador.fiadorPrenda = this.fiadorPrenda
        }else{
          this.credit.fiador.fiadorPrenda = null
        }
        if(this.InfolabfiadorPrenda){
        this.credit.fiador.infolabfiadorPrenda = this.infolabfiadorPrenda
        }else{
          this.credit.fiador.infolabfiadorPrenda = null
        }
      }else{
        this.credit.fiador = null;
      }

      if(this.emplee || this.indepp){
        this.credit.infoLab = this.infoLab;
      }else{
        this.credit.infoLab = "";
      }
      this.credi = this.credit;
      this.credi.cuotaInicial = this.aumentoPorDias
      this.aumentoPorDias = new Number
      console.log(this.credi)
      return this.credi;
    },
    quitarBoton() {
      this.boton = false;
    },
    soloAgregar(servicio) {
      if(servicio == 'servicio'){
         this.ocultar = false;
         this.si_existe = false;
          this.agregarCupo = false;
          this.mostrar = true;
      }else{
        if(servicio == 'cupo'){
          this.ocultar = false;
          this.si_existe = false;
          this.mostrar = false;
          this.tieneTres = false;     
          this.agregarCupo = true;
          this.cedulaCupo = this.cliente[0].cedulaId
        }
      } 
    },
    guardarCupo(CedulaId, montoAprobado){
      montoAprobado = parseInt(montoAprobado)
      if(montoAprobado < 100000 || montoAprobado > 600000){
        this.alert10 = true
        this.alert10 = true
        if(this.alert10 = true){
            setTimeout(function(){
                this.alert10 = false
            }.bind(this),2500)
        } 
        return
      }else{
        let datosCupo = {
          clienteCedulaId: CedulaId,
          montoAprobado: montoAprobado,
          saldo: montoAprobado,
          creadoPor:this.user.codigo
        }
        axios.post(this.uri+'/api/cupoapsa/guardarCupo',datosCupo)
        .then(res => {
          alert('se a guardado correctamente el cupo')
          this.cambiarEstadoCupoCliente(datosCupo.clienteCedulaId)
          this.spiner = false
          this.ocultar = true;
          this.mostrar = false;
          this.si_existe = false;
          this.persona = new person();
          this.crearCre= false;
          this.credd = true;
          this.botoon = true;
          this.botoondos = false;
          this.semanal = false;
          this.quincenal = false;
          this.mensual = false;
          this.diario = false;
          this.pagoUnico = false;
          this.respuesta = new respu(2);
          this.agregarCupo = false;
        })
        .catch(err => {console.log(err)})
      }
    },
    cambiarEstadoCupoCliente(cedula){
      let pass = cryp.randomBytes(10).toString('hex');
      let cc = {cedula:cedula,contrasena:pass}
      axios.post(this.uri+'/api/cambiarEstadoCupoCliente',cc)
      .then(res=>{
        alert('se ha cambiado el estado del cupo en el cliente con exito')
      })
      .catch(err=>{console.log(err)})
    },
    guardarCredito() { 
      let fiador = this.credi.fiador;
      if(fiador == null){
        this.agregarPagares();
      }else{
      if (fiador.fiador_o_prenda == "fiador") {
       this.axios
          .post(this.uri+"/api/creditos/guardarFiador", fiador)
          .then(res => {
            this.credi.fiador = res.data.data;
            this.agregarPagares();
          })
          .catch(error => {
            if(error.response.status == 402){
              this.spiner = false
              this.credi.fiador = error.response.data.data
              this.agregarPagares();
            }else{
              alert("error al agregar fiador");
              return;
            }
          });
      } else {
        if (fiador.fiador_o_prenda == "prenda") {
          this.axios
            .post(this.uri+"/api/creditos/guardarPrenda", fiador)
            .then(res => {
              this.credi.fiador = res.data.data;
              this.agregarPagares();
            })
            .catch(err => {
              this.spiner = false
              alert("error al agregar la prenda");
              return;
            });
        }
      }
      }
    },
    agregarPagares() {
      let paga = new pag()
        paga.numero = this.credit.numeroCredito,
        paga.pagares = this.pagos      
      this.axios
        .post(this.uri+"/api/creditos/guardarPagares",paga)
        .then(res => {
          this.credi.pagares = res.data.data;
          this.agregarCredito(); 
        })
        .catch(err => {
          this.spiner = false
          alert("error al agregar los pagares");
           this.borrarFiador()
          return;
        });
    },
    borrarFiador(){
      let f = {
            id_fiador: this.credi.fiador
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
            pag: this.credi.pagares
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
      console.log(this.credi)
      this.credi.valorTotal = this.valorTotal
      const resp = this.credi;
      this.axios.post(this.uri+"/api/creditos/guardarCredito", resp)
      .then(res => {
      this.rrr = 0;
      this.credi = {};
      this.Vcred = '';
      this.valCuotaMensual = '';
      this.Fiador = {};
      this.infoLab = {};
      this.rfamiliaruno = {};
      this.rfamiliardos = {};
      this.rfamiliartres = {};
      this.rfpersonaluno = {};
      this.rfpersonaldos = {};
      this.rfpersonaltres = {};
      this.ocultar = true;
      this.mostrar = false;
      this.si_existe = false;
      this.persona = new person();
      this.crearCre= false;
      this.credd = true;
      this.botoon = true;
      this.boton = false
      this.botoondos = false;
      this.semanal = false;
      this.quincenal = false;
      this.mensual = false;
      this.diario = false;
      this.pagoUnico = false;
      this.respuesta = new respu(2);
      this.spiner=false
      })
      .catch(err => {
        this.spiner=false
        alert('error al guardar el credito')
        this.borrarPagares()
        this.borrarFiador()
        return
       });
    },
    creditosEnMora(cedula) {
      const r = cedula;
      this.axios.post(this.uri+"/api/creditos/creditosEnMora", r).then(res => {
        this.enMora = res.data;
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
