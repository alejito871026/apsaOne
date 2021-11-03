<template>
  <div class="contabilidad">
    <div>
      <Barra></Barra>
    </div>
    <div class="bg-primary p-4">
      <h2 class="text-center text-white">TOTAL GENERAL</h2>
      <br />
      <div class="container">
        <h3><input type="text" class="p-3 bg-white col-lg-12" v-money="money" disabled v-model="tp"></h3>
      </div>
    </div>
    <br />
    <div class="row col-lg-12">
      <div class="btn-group col-lg-6">
        <button type="button" class="btn btn-primary">Realizar Ingreso</button>
        <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span class="sr-only">Toggle Dropdown</span>
        </button>
        <div class="dropdown-menu">
          <div class="dropdown-item" @click="ingreso = true, ingresoDineroCreditos =false, egreso =false">Ingreso Efectivo</div>
          <div class="dropdown-item" @click="ingresoDineroCreditos = true, ingreso =false, egreso =false">Ingreso Dinero creditos ADS</div>  
        </div>
      </div>
      <div class="btn-group col-lg-6">
        <button type="button" class="btn btn-primary">Egreso Efectivo</button>
        <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span class="sr-only">Toggle Dropdown</span>
        </button>
        <div class="dropdown-menu">
          <div class="dropdown-item btn btn-warning" @click="egreso = true, ingresoDineroCreditos =false, ingreso =false">Egreso Efectivo</div> 
        </div>
      </div>
    </div>
    <br />
    <div v-if="ingreso" class="col-md-12 row">
      <div  class="col-md-12 row">
        <div class="col-md-4"></div>
          <div class="card col-md-4">
            <div class="card-header bg-white">
              <h1 class="text-center">ingreso de efectivo al sistema</h1>
            </div>
              <div class="card-body justify-content-center">
                <h3 class="text-center p-4">Valor a ingresar $</h3>           
                <input type="number" min="0" class="col-md-12" required v-model="Ingreso.valor">            
                <h3 class="text-centerc p-4">Descripcion del ingreso</h3>            
                <textarea class="col-md-12" rows="4" required v-model="Ingreso.descripcion"></textarea>
            </div>
            <div class="card-footer bg-white">
              <div class="btn-group mb-3 col-lg-12">
                <div class="btn btn-warning" @click="spiner=true, guardarIngreso('otros','dos',Ingreso.valor)">Guardar Ingreso</div>
                <div class="btn btn-danger" @click="ingreso = false">Volver</div>
              </div>
            </div>
          </div>
          <div class="col-md-4"></div>
      </div>
    </div>
    <div v-if="ingresoDineroCreditos" class="col-md-12 row">
      <div  class="col-md-12 row">
        <div class="col-md-4"></div>
          <div class="card col-md-4">
            <div class="card-header bg-white">
              <h1 class="text-center">ingreso de efectivo al sistema</h1>
            </div>
              <div class="card-body justify-content-center">
                <h3 class="text-center p-4">Valor capital $</h3>           
                <input type="number" min="0" class="col-md-12" required v-model="Ingreso.valor">   
                <h3 class="text-center p-4">Valor interes $</h3>           
                <input type="number" min="0" class="col-md-12" required v-model="Ingreso.intereses">          
                <h3 class="text-centerc p-4">Descripcion del ingreso</h3>            
                <textarea class="col-md-12" rows="4" required v-model="Ingreso.descripcion"></textarea>
            </div>
            <div class="card-footer bg-white">
              <div class="btn-group mb-3 col-lg-12">
                <div class="btn btn-warning" @click="spiner=true, guardarIngreso('dineroCreditoADS','dos',Ingreso.valor,Ingreso.intereses)">Guardar Ingreso</div>
                <div class="btn btn-danger" @click="ingresoDineroCreditos = false">Volver</div>
              </div>
            </div>
          </div>
          <div class="col-md-4"></div>
      </div>
    </div>
    <div v-if="egreso" class="col-md-12 row">
      <div  class="col-md-12 row">
        <div class="col-md-4"></div>
          <div class="card col-md-4">
            <div class="card-header bg-white">
              <h1 class="text-center">Egreso de efectivo </h1>
            </div>
              <div class="card-body justify-content-center">
                 <h3 class="text-center p-4">Concepto</h3>
                <select name="" id="" class="custom-select" required v-model="egresoEfectivo.concepto">
                  <option value="compras">Compras</option>
                  <option value="funcionamiento">Funcionamiento</option>
                  <option value="nomina">Nomina</option>
                  <option value="avance">Avance</option>
                </select>
                <h3 class="text-center p-4">Valor $</h3>           
                <input type="number" min="0" class="col-md-12" required v-model="egresoEfectivo.valor">            
                <h3 class="text-centerc p-4">Descripcion del egreso</h3>            
                <textarea class="col-md-12" rows="4" required v-model="egresoEfectivo.descripcion"></textarea>
            </div>
            <div class="card-footer bg-white">
              <div class="btn-group mb-3 col-lg-12">
                <div class="btn btn-warning" @click="spiner=true, guardarEgresoEfectivo('dos',egresoEfectivo.valor, egresoEfectivo.concepto)">Guardar Egreso</div>
                <div class="btn btn-danger" @click="egreso = false">Volver</div>
              </div>
            </div>
          </div>
          <div class="col-md-4"></div>
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
    <div class="col-lg-12 p-4">
      <div class="row border p-4">
        <div class="col-lg-12 bg-success"><h2 class="text-center p-2 text-white">Ingresos <input v-if="user.rol=='ADMIN' || user.rol =='SUPERADMIN'" disabled class="col-lg-2" type="text" v-money="money"  v-model="ingre">
          <div class="btn btn-primary" v-if="!cerrar" @click="cerrar = true, verTablasIngresos = true">ver tablas</div>
          <div class="btn btn-primary" v-if="cerrar" @click="cerrar = false, verTablasIngresos = false">ocultar tablas</div>
          </h2>
        </div>
          <div class="col-md-12 border-dark" v-if="verTablasIngresos">
            <br>
            <div class="card text-center">
              <div class="card-head bg-white">
                <h3 class="p-3">Pagos cuotas creditos capital - intereses</h3>
              </div>
              <div class="card-body">
                <div style="height: auto; max-height: 200px; overflow-y: scroll;" v-if="">
                  <table class="table table-hover border table-sm bg-white text-dark table-responsive-sm">
                      <thead class="sticky-top text-white bg-dark">
                      <tr>
                          <th># ingreso</th>
                          <th>Capital</th>
                          <th>Interes</th>
                          <th>Total</th>
                          <th># Credito</th>
                          <th>Cliente</th>
                          <th>Descripcion</th>
                          <th>Empleado</th>
                          <th>Fecha</th>
                      </tr>
                      </thead>
                      <tbody>
                          <tr v-for="ingresosCapitalInteres,index in IngresosCapital.slice().reverse()">
                            <td>{{IngresosCapital.length - index}}</td>                            
                            <td>{{ingresosCapitalInteres.valor}}</td>
                            <td>{{ingresosCapitalInteres.interes}}</td>
                            <td>{{ingresosCapitalInteres.valor+ingresosCapitalInteres.interes}}</td>
                            <td>{{ingresosCapitalInteres.numero}}</td>
                            <td>{{ingresosCapitalInteres.nombre}}</td>
                            <td>{{ingresosCapitalInteres.descripcion}}</td>
                            <td>{{ingresosCapitalInteres.codigoEmpleado}}</td>
                            <td>{{ingresosCapitalInteres.fechaIngresoEfectivo}}</td>
                          </tr>
                      </tbody>
                  </table>
              </div>
              </div>
              <div class="card-footer bg-white">
                <h4 class="p-3">Total ingresos capital creditos: </h4><h3><input type="text" class="bg-white" v-money="money" disabled v-model="valCapCred" v-if="user.rol=='ADMIN' || user.rol =='SUPERADMIN'"></h3>
                <h4 class="p-3">Total ingresos interes creditos: </h4><h3><input type="text" class="bg-white" v-money="money" disabled v-model="valIntCred" v-if="user.rol=='ADMIN' || user.rol =='SUPERADMIN'"></h3>
              </div>
            </div>
          </div>
          <div class="col-md-12 border-dark" v-if="verTablasIngresos">
            <br>
            <div class="card text-center border border-dark">
              <div class="card-head bg-white">
                <h3 class="p-3">Ingresos creditos ADS</h3>
              </div>
              <div class="card-body">
                <div style="height: auto; max-height: 200px; overflow-y: scroll;" v-if="">
                  <table class="table table-hover border table-sm bg-white text-dark table-responsive-sm">
                      <thead class="sticky-top text-white bg-dark">
                      <tr>
                          <th># ingreso</th>
                          <th>Capital</th>
                          <th>Interes</th>
                          <th>Total</th>
                          <th>Descripcion</th>
                          <th>Empleado</th>
                          <th>Fecha</th>
                      </tr>
                      </thead>
                      <tbody>
                          <tr v-for="IngresoscreditosADS,index in IngresosCreditosADS.slice().reverse()">
                            <td>{{IngresosCreditosADS.length - index}}</td>
                            <td>{{IngresoscreditosADS.valor}}</td>
                            <td>{{IngresoscreditosADS.interes}}</td>
                            <td>{{IngresoscreditosADS.valor + IngresoscreditosADS.interes}}</td>
                            <td>{{IngresoscreditosADS.descripcion}}</td>
                            <td>{{IngresoscreditosADS.codigoEmpleado}}</td>
                            <td>{{IngresoscreditosADS.fechaIngresoEfectivo}}</td>
                          </tr>
                      </tbody>
                  </table>
              </div>
              </div>
              <div class="card-footer bg-white">
                <h4 class="p-3">Total ingresos capital creditos ADS: </h4><h3><input type="text" class="bg-white" v-money="money" disabled v-model="valCapCredADS" v-if="user.rol=='ADMIN' || user.rol =='SUPERADMIN'"></h3>
                <h4 class="p-3">Total ingresos interes creditos ADS:</h4><h3><input type="text" class="bg-white" v-money="money" disabled v-model="valIntCredADS" v-if="user.rol=='ADMIN' || user.rol =='SUPERADMIN'"></h3>
              </div>
            </div>          
          </div>
          <div class="col-md-12 " v-if="verTablasIngresos">
            <br>
            <div class="card text-center border border-dark">
              <div class="card-head bg-white">
                <h3 class="p-3">Inversiones y otros ingresos</h3>
              </div>
              <div class="card-body">
                <div style="height: auto; max-height: 200px; overflow-y: scroll;" v-if="">
                  <table class="table table-hover border table-sm bg-white text-dark table-responsive-sm">
                      <thead class="sticky-top text-white bg-dark">
                      <tr>
                          <th># ingreso</th>
                          <th>Valor</th>
                          <th>Descripcion</th>
                          <th>Empleado</th>
                          <th>Fecha</th>
                      </tr>
                      </thead>
                      <tbody>
                          <tr v-for="IngresoscreditosADS,index in IngresosOtros.slice().reverse()">
                            <td>{{IngresosOtros.length - index}}</td>
                            <td>{{IngresoscreditosADS.valor}}</td>
                            <td>{{IngresoscreditosADS.descripcion}}</td>
                            <td>{{IngresoscreditosADS.codigoEmpleado}}</td>
                            <td>{{IngresoscreditosADS.fechaIngresoEfectivo}}</td>
                          </tr>
                      </tbody>
                  </table>
              </div>
              </div>
              <div class="card-footer bg-white">
                <h4 class="p-3">Total Inversiones y otros: </h4><h3><input type="text" class="bg-white" v-money="money" disabled v-model="valOtros" v-if="user.rol=='ADMIN' || user.rol =='SUPERADMIN'"></h3>
              </div>
            </div>          
          </div>
          <div class="col-md-12 " v-if="verTablasIngresos">
            <br>
            <div class="card text-center border border-dark">
              <div class="card-head bg-white">
                <h3 class="p-3">ventas en efectivo</h3>
              </div>
              <div class="card-body">
                <div style="height: auto; max-height: 200px; overflow-y: scroll;" v-if="">
                  <table class="table table-hover border table-sm bg-white text-dark table-responsive-sm">
                      <thead class="sticky-top text-white bg-dark">
                      <tr>
                          <th># ingreso</th>
                          <th>Cliente</th>
                          <th>Valor</th>
                          <th>Descripcion</th>
                          <th>Empleado</th>
                          <th>Fecha</th>
                      </tr>
                      </thead>
                      <tbody>
                          <tr v-for="(IngresosVentas,index) in ingresosVentasEfectivo.slice().reverse()" :key="index">
                            <td>{{ingresosVentasEfectivo.length - index}}</td>
                            <td>{{IngresosVentas.nombre}}</td>
                            <td>{{IngresosVentas.valor}}</td>
                            <td>{{IngresosVentas.descripcion}}</td>
                            <td>{{IngresosVentas.codigoEmpleado}}</td>
                            <td>{{IngresosVentas.fechaIngresoEfectivo}}</td>
                          </tr>
                      </tbody>
                  </table>
              </div>
              </div>
              <div class="card-footer bg-white">
                <h4 class="p-3">Total Inversiones y otros: </h4><h3><input type="text" class="bg-white" v-money="money" disabled v-model="valVentaTotal" v-if="user.rol=='ADMIN' || user.rol =='SUPERADMIN'"></h3>
              </div>
            </div>          
          </div>
          <div class="col-md-12 " v-if="verTablasIngresos">
            <br>
            <div class="card text-center border border-dark">
              <div class="card-head bg-white">
                <h3 class="p-3">Ingresos cuotas Iniciales</h3>
              </div>
              <div class="card-body">
                <div style="height: auto; max-height: 200px; overflow-y: scroll;" v-if="">
                  <table class="table table-hover border table-sm bg-white text-dark table-responsive-sm">
                      <thead class="sticky-top text-white bg-dark">
                      <tr>
                          <th># ingreso</th>
                          <th>Valor</th>
                          <th>Descripcion</th>
                          <th>Empleado</th>
                          <th>Fecha</th>
                      </tr>
                      </thead>
                      <tbody>
                          <tr v-for="Ingresosiniciales,index in IngresosIniciales.slice().reverse()">
                            <td>{{IngresosIniciales.length - index}}</td>
                            <td>{{Ingresosiniciales.valor}}</td>
                            <td>{{Ingresosiniciales.descripcion}}</td>
                            <td>{{Ingresosiniciales.codigoEmpleado}}</td>
                            <td>{{Ingresosiniciales.fechaIngresoEfectivo}}</td>
                          </tr>
                      </tbody>
                  </table>
              </div>
              </div>
              <div class="card-footer bg-white">
                <h4 class="p-3">Total ingresos cuota inicial: </h4><h3><input type="text" class="bg-white" v-money="money" disabled v-model="valIniciales" v-if="user.rol=='ADMIN' || user.rol =='SUPERADMIN'"></h3>
              </div>
            </div>          
          </div>
          <div class="col-md-12 " v-if="verTablasIngresos">
            <br>
            <div class="card text-center border border-dark">
              <div class="card-head bg-white">
                <h3 class="p-3">Ingresos comision</h3>
              </div>
              <div class="card-body">
                <div style="height: auto; max-height: 200px; overflow-y: scroll;" v-if="">
                  <table class="table table-hover border table-sm bg-white text-dark table-responsive-sm">
                      <thead class="sticky-top text-white bg-dark">
                      <tr>
                          <th># ingreso</th>
                          <th>Valor</th>
                          <th>Descripcion</th>
                          <th>Empleado</th>
                          <th>Fecha</th>
                      </tr>
                      </thead>
                      <tbody>
                          <tr v-for="Ingresoscomision,index in IngresosComision.slice().reverse()">
                            <td>{{IngresosComision.length - index}}</td>
                            <td>{{Ingresoscomision.valor}}</td>
                            <td>{{Ingresoscomision.descripcion}}</td>
                            <td>{{Ingresoscomision.codigoEmpleado}}</td>
                            <td>{{Ingresoscomision.fechaIngresoEfectivo}}</td>
                          </tr>
                      </tbody>
                  </table>
              </div>
              </div>
              <div class="card-footer bg-white">
                <h4 class="p-3">Total ingresos comision: </h4><h3><input type="text" class="bg-white" v-money="money" disabled v-model="valComision" v-if="user.rol=='ADMIN' || user.rol =='SUPERADMIN'"></h3>
              </div>
            </div>          
          </div>
    </div>
    <br>
    <div class="row border border-dark p-4">
      <div class="col-lg-12 bg-secondary"><h2 class="text-center p-2 text-white">Egresos <input  v-if="user.rol=='ADMIN' || user.rol =='SUPERADMIN'" disabled class="col-lg-2" type="text" v-money="money"  v-model="egre">
        <div class="btn btn-primary" v-if="!cerrarE" @click="cerrarE = true, verTablasEgresos = true">ver tablas</div>
        <div class="btn btn-primary" v-if="cerrarE" @click="cerrarE = false, verTablasEgresos = false">ocultar tablas</div>
        </h2>
      </div>
        <div class="col-md-12" id="egresoscreditos" v-if="verTablasEgresos">
          <br>
          <div class="card text-center ">
            <div class="card-head bg-white">
              <h3>Egresos de creditos</h3>
            </div>
            <div class="card-body">
              <div style="height: auto; max-height: 200px; overflow-y: scroll;" v-if="">
                  <table class="table table-hover border table-sm bg-white text-dark table-responsive-sm">
                      <thead class="sticky-top text-white bg-dark">
                      <tr>
                          <th># Egreso</th>
                          <th>Valor</th>
                          <th>Inicial</th>
                          <th>Cedula cliente</th>  
                          <th>nombreCliente</th>  
                          <th>Descripcion</th>
                          <th>CC Empleado</th>
                          <th>Fecha Egreso</th>
                          <th>Empleado ref egreso</th>
                          <th>Fecha ref egreso</th>
                          <th>Opciones</th>
                          <!--<th>ACTUALIZAR </th>-->
                      </tr>
                      </thead>
                      <tbody>
                          <tr v-for="Egresoscreditos,index in Egresos.slice().reverse()">
                            <td>{{totE-index}}</td>
                            <td>{{Egresoscreditos.valor}}</td>
                            <td>{{Egresoscreditos.cuotaInicial}}</td>
                            <td>{{Egresoscreditos.cedula}}</td>
                            <td>{{Egresoscreditos.nombreCliente}}</td>
                            <td>{{Egresoscreditos.descripcion}}</td>
                            <td>{{Egresoscreditos.codigoEmpleado}}</td>
                            <td>{{Egresoscreditos.fechaEgreso}}</td>
                            <td>{{Egresoscreditos.codigoEmpleadoReflejadoEgreso}}</td>
                            <td>{{Egresoscreditos.fechaReflejadoEgreso}}</td>
                            <td v-if="Egresoscreditos.egreso == true"><div  class="btn btn-success">Cancelado</div></td>
                            <td v-if="Egresoscreditos.egreso == false">
                              <div  class="btn btn-warning btn-sm" v-if="!Egresoscreditos.senalado"  @click="reflejarDesembolso(Egresoscreditos.idCredito,user.codigo,
                                 Egresoscreditos.valor, Egresoscreditos.cuotaInicial, Egresoscreditos.descripcion, totE-index, Egresoscreditos._id)">
                                Reflejar desembolso
                              </div>
                               <div  class="btn btn-primary btn-sm" v-if="Egresoscreditos.senalado">
                                 esperando desembolso
                               </div>
                            </td>
                            <!--<td><div class="btn btn-primary btn-sm" @click="actualizarDatos(Egresoscreditos.idCredito)">ac</div></td>-->
                          </tr>
                      </tbody>
                  </table>
              </div>
            </div>
            <div class="card-footer bg-white">
              <div class="row">
                <div class="col-lg-6">
                  <div class="card" v-if="C">
                    <div class="card-header">
                      <h2>A egresar por celular</h2>  
                    </div>
                    <div class="card-body">
                      <table class="table table-hover border table-sm bg-white text-dark table-responsive-sm">
                          <thead class="sticky-top text-white bg-dark">
                          <tr>
                              <th># Egreso</th>
                              <th>Valor</th>
                              <th>Id credito</th>  
                              <th>Fecha ref egreso</th>
                              <th>Borrar</th>
                          </tr>
                          </thead>
                          <tbody>
                              <tr v-for="DescuentosSoat,index in descuentosSoat.slice().reverse()">
                                <td>{{totalDS-index}}</td>
                                <td>{{DescuentosSoat.valor}}</td>
                                <td>{{DescuentosSoat.idCredito}}</td>
                                <td>{{DescuentosSoat.fechaEgresoEfectivoSoat}}</td>
                                <td><div class="btn btn-success" @click="quitarSoat(totalDS-index, DescuentosSoat.index)">x</div></td>
                              </tr>
                          </tbody>
                      </table>
                    </div>
                    <div class="card-footer">
                      <div class="row">
                        <div class="col-md-6">
                          <h4 class="p-3">Total  a Egresar: </h4><h3><input type="text" class="bg-white" v-money="mone" disabled v-model="valEgresoCredSoat"></h3>
                        </div>
                        <div class="col-md-6">
                          <h4 class="p-3">Ingrese valor comisiones: </h4><h3><input type="text" class="bg-white" v-money="mone" v-model="valComiS"></h3>
                        </div>
                        <div class="btn btn-block btn-success" @click="spiner=true, realizarDesembolso(valEgresoCredSoat,valComiS,descuentosSoat,'s')">
                          realizar desembolso
                        </div>
                      </div>                  
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="card" v-if="S">
                    <div class="card-header">
                      <h2>A egresar por soat</h2>  
                    </div>
                    <div class="card-body">
                      <table class="table table-hover border table-sm bg-white text-dark table-responsive-sm">
                          <thead class="sticky-top text-white bg-dark">
                          <tr>
                              <th># Egreso</th>
                              <th>Valor</th>
                              <th>Id credito</th>  
                              <th>Fecha ref egreso</th>
                              <th>Borrar</th>
                          </tr>
                          </thead>
                          <tbody>
                              <tr v-for="DescuentosSoat,index in descuentosSoat.slice().reverse()">
                                <td>{{totalDS-index}}</td>
                                <td>{{DescuentosSoat.valor}}</td>
                                <td>{{DescuentosSoat.idCredito}}</td>
                                <td>{{DescuentosSoat.fechaEgresoEfectivoSoat}}</td>
                                <td><div class="btn btn-success" @click="quitarSoat(totalDS-index, DescuentosSoat.index)">x</div></td>
                              </tr>
                          </tbody>
                      </table>
                    </div>
                    <div class="card-footer">
                      <div class="row">
                        <div class="col-md-6">
                          <h4 class="p-3">Total  a Egresar: </h4><h3><input type="text" class="bg-white" v-money="mone" disabled v-model="valEgresoCredSoat"></h3>
                        </div>
                        <div class="col-md-6">
                          <h4 class="p-3">Ingrese valor comisiones: </h4><h3><input type="text" class="bg-white" v-money="mone" v-model="valComiS"></h3>
                        </div>
                        <div class="btn btn-block btn-success" @click="spiner=true, realizarDesembolso(valEgresoCredSoat,valComiS,descuentosSoat,'s')">
                          realizar desembolso
                        </div>
                      </div>                  
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                    <div class="card" v-if="T">
                      <div class="card-header">
                        <h2>A egresar por Tecnomecanica</h2>  
                      </div>
                    <div class="card-body">
                      <table class="table table-hover border table-sm bg-white text-dark table-responsive-sm">
                          <thead class="sticky-top text-white bg-dark">
                          <tr>
                              <th># Egreso</th>
                              <th>Valor</th>
                              <th>Id credito</th>  
                              <th>Fecha ref egreso</th>
                              <th>Borrar</th>
                          </tr>
                          </thead>
                          <tbody>
                              <tr v-for="DescuentosTecno,index in descuentosTecno.slice().reverse()">
                                <td>{{totalDT-index}}</td>
                                <td>{{DescuentosTecno.valor}}</td>
                                <td>{{DescuentosTecno.idCredito}}</td>
                                <td>{{DescuentosTecno.fechaEgresoEfectivoTecno}}</td>
                                <td><div class="btn btn-success" @click="quitarTecno(totalDT-index, DescuentosTecno.index)">x</div></td>
                              </tr>
                          </tbody>
                      </table>
                    </div>
                    <div class="card-footer">
                      <div class="row">
                        <div class="col-md-6">
                          <h4 class="p-3">Total  a Egresar: </h4><h3><input type="text" class="bg-white" v-money="mone" disabled v-model="valEgresoCredTecno"></h3>
                        </div>
                        <div class="col-md-6">
                          <h4 class="p-3">Ingrese valor comisiones: </h4><h3><input type="text" class="bg-white" v-money="mone" v-model="valComiT"></h3>
                        </div>
                        <div class="btn btn-block btn-success" @click="spiner=true, realizarDesembolso(valEgresoCredTecno,valComiT,descuentosTecno,'t')">
                          realizar desembolso
                        </div>
                      </div>                  
                    </div>
                  </div> 
                </div>
                <div class="col-lg-6">
                    <div class="card" v-if="ST">
                      <div class="card-header">
                        <h2>A egresar por Soat-Tecnomecanica</h2>  
                      </div>
                    <div class="card-body">
                      <table class="table table-hover border table-sm bg-white text-dark table-responsive-sm">
                          <thead class="sticky-top text-white bg-dark">
                          <tr>
                              <th># Egreso</th>
                              <th>Valor</th>
                              <th>Id credito</th>  
                              <th>Fecha ref egreso</th>
                              <th>Borrar</th>
                          </tr>
                          </thead>
                          <tbody>
                              <tr v-for="DescuentosSoatTecno,index in descuentosSoatTecno.slice().reverse()">
                                <td>{{descuentosSoatTecno.tot-index}}</td>
                                <td>{{DescuentosSoatTecno.valor}}</td>
                                <td>{{DescuentosSoatTecno.idCredito}}</td>
                                <td>{{DescuentosSoatTecno.fechaEgresoEfectivoTecno}}</td>
                                <td><div class="btn btn-success" @click="quitarSoatTecno(descuentosSoatTecno.tot-index, DescuentosSoatTecno.index)">x</div></td>
                              </tr>
                          </tbody>
                      </table>
                    </div>
                    <div class="card-footer">
                      <div class="row">
                        <div class="col-md-6">
                          <h4 class="p-3">Total  a Egresar: </h4><h3><input type="text" class="bg-white" v-money="mone" disabled v-model="valEgresoCredSoatTecno"></h3>
                        </div>
                        <div class="col-md-6">
                          <h4 class="p-3">Ingrese valor comisiones: </h4><h3><input type="text" class="bg-white" v-money="mone" v-model="valComiST"></h3>
                        </div>
                        <div class="btn btn-block btn-success" @click="spiner=true, realizarDesembolso(valEgresoCredSoatTecno,valComiST,descuentosSoatTecno,'st')">
                          realizar desembolso
                        </div>
                      </div>                  
                    </div>
                  </div> 
                </div>
                <div class="col-lg-6">
                    <div class="card" v-if="L">
                      <div class="card-header">
                        <h2>A egresar por Licencia</h2>  
                      </div>
                    <div class="card-body">
                      <table class="table table-hover border table-sm bg-white text-dark table-responsive-sm">
                          <thead class="sticky-top text-white bg-dark">
                          <tr>
                              <th># Egreso</th>
                              <th>Valor</th>
                              <th>Id credito</th>  
                              <th>Fecha ref egreso</th>
                              <th>Borrar</th>
                          </tr>
                          </thead>
                          <tbody>
                              <tr v-for="DescuentosLic,index in descuentosLic.slice().reverse()">
                                <td>{{descuentosLic.tot-index}}</td>
                                <td>{{DescuentosLic.valor}}</td>
                                <td>{{DescuentosLic.idCredito}}</td>
                                <td>{{DescuentosLic.fechaEgresoEfectivoLic}}</td>
                                <td><div class="btn btn-success" @click="quitarLic(descuentosLic.tot-index, DescuentosLic.index)">x</div></td>
                              </tr>
                          </tbody>
                      </table>
                    </div>
                    <div class="card-footer">
                      <div class="row">
                        <div class="col-md-6">
                          <h4 class="p-3">Total  a Egresar: </h4><h3><input type="text" class="bg-white" v-money="mone" disabled v-model="valEgresoCredLic"></h3>
                        </div>
                        <div class="col-md-6">
                          <h4 class="p-3">Ingrese valor comisiones: </h4><h3><input type="text" class="bg-white" v-money="mone" v-model="valComiL"></h3>
                        </div>
                        <div class="btn btn-block btn-success" @click="spiner=true, realizarDesembolso(valEgresoCredLic,valComiL,descuentosLic,'l')">
                          realizar desembolso
                        </div>
                      </div>                  
                    </div>
                  </div> 
                </div>
              </div>              
              <h4 class="p-3">Total Egresos Creditos: </h4><h3><input type="text" class="bg-white" v-money="money" disabled v-model="valEgresoCred"></h3>
            </div>
          </div>
        </div>       
        <div class="col-md-12" id="comprasEinversiones" v-if="verTablasEgresos">
          <br>
          <div class="card text-center border border-dark">
              <div class="card-head bg-white">
                <h3 class="p-3">Egresos compras e inversiones</h3>
              </div>
              <div class="card-body">
                <div style="height: auto; max-height: 200px; overflow-y: scroll;" v-if="">
                  <table class="table table-hover border table-sm bg-white text-dark table-responsive-sm">
                      <thead class="sticky-top text-white bg-dark">
                      <tr>
                          <th>#</th>
                          <th>Valor</th>
                          <th>Descripcion</th>
                          <th>Empleado</th>
                          <th>Fecha</th>
                      </tr>
                      </thead>
                      <tbody> 
                          <tr v-for="egreosC,index in EgresosC">
                            <td>{{EgresosC.tot-index}}</td>
                            <td>{{egreosC.valor}}</td>
                            <td>{{egreosC.descripcion}}</td>
                            <td>{{egreosC.codigoEmpleado}}</td>
                            <td>{{egreosC.fechaEgreso}}</td>
                          </tr>
                      </tbody>
                  </table>
              </div>
              </div>
              <div class="card-footer bg-white">
                <h4 class="p-3">Total compras e inversiones: </h4><h3><input type="text" class="bg-white" v-money="mone" disabled v-model="valEgresoC"></h3>
              </div>
            </div> 
        </div>
        <div class="col-md-12" id="funcionamiento" v-if="verTablasEgresos">
          <br>
          <div class="card text-center border border-dark">
              <div class="card-head bg-white">
                <h3 class="p-3">Egresos gastos funcionamiento</h3>
              </div>
              <div class="card-body">
                <div style="height: auto; max-height: 200px; overflow-y: scroll;" v-if="">
                  <table class="table table-hover border table-sm bg-white text-dark table-responsive-sm">
                      <thead class="sticky-top text-white bg-dark">
                      <tr>
                          <th>#</th>
                          <th>Valor</th>
                          <th>Descripcion</th>
                          <th>Empleado</th>
                          <th>Fecha</th>
                      </tr>
                      </thead>
                      <tbody>
                          <tr v-for="egreosF,index in EgresosF">
                            <td>{{EgresosF.tot-index}}</td>
                            <td>{{egreosF.valor}}</td>
                            <td>{{egreosF.descripcion}}</td>
                            <td>{{egreosF.codigoEmpleado}}</td>
                            <td>{{egreosF.fechaEgreso}}</td>
                          </tr>
                      </tbody>
                  </table>
              </div>
              </div>
              <div class="card-footer bg-white">
                <h4 class="p-3">Total egresos gastos de funcionamiento: </h4><h3><input type="text" class="bg-white" v-money="mone" disabled v-model="valEgresoF"></h3>
              </div>
            </div> 
        </div>
        <div class="col-md-12" id="nominas" v-if="verTablasEgresos">
          <br>
            <div class="card text-center border border-dark">
              <div class="card-head bg-white">
                <h3 class="p-3">Egresos Nominas</h3>
              </div>
              <div class="card-body">
                <div style="height: auto; max-height: 200px; overflow-y: scroll;" v-if="">
                  <table class="table table-hover border table-sm bg-white text-dark table-responsive-sm">
                      <thead class="sticky-top text-white bg-dark">
                      <tr>
                          <th>#</th>
                          <th>Valor</th>
                          <th>Descripcion</th>
                          <th>Empleado</th>
                          <th>Fecha</th>
                      </tr>
                      </thead>
                      <tbody>
                          <tr v-for="egreosN,index in EgresosN">
                            <td>{{EgresosN.tot-index}}</td>
                            <td>{{egreosN.valor}}</td>
                            <td>{{egreosN.descripcion}}</td>
                            <td>{{egreosN.codigoEmpleado}}</td>
                            <td>{{egreosN.fechaEgreso}}</td>
                          </tr>
                      </tbody>
                  </table>
              </div>
              </div>
              <div class="card-footer bg-white">
                <h4 class="p-3">Total egresos nomina: </h4><h3><input type="text" class="bg-white" v-money="mone" disabled v-model="valEgresoNom"></h3>
              </div>
            </div>          
          </div>         
        </div>
        <div class="col-md-12" id="avances" v-if="verTablasEgresos">
          <br>
            <div class="card text-center border border-dark">
              <div class="card-head bg-white">
                <h3 class="p-3">Egresos avances</h3>
              </div>
              <div class="card-body">
                <div style="height: auto; max-height: 200px; overflow-y: scroll;" v-if="">
                  <table class="table table-hover border table-sm bg-white text-dark table-responsive-sm">
                      <thead class="sticky-top text-white bg-dark">
                      <tr>
                          <th>#</th>
                          <th>Valor</th>
                          <th>Descripcion</th>
                          <th>Empleado</th>
                          <th>Fecha</th>
                      </tr>
                      </thead>
                      <tbody>
                          <tr v-for="avances,index in avance">
                            <td>{{avance.tot-index}}</td>
                            <td>{{avances.valor}}</td>
                            <td>{{avances.descripcion}}</td>
                            <td>{{avances.codigoEmpleado}}</td>
                            <td>{{avances.fechaEgreso}}</td>
                          </tr>
                      </tbody>
                  </table>
              </div>
              </div>
              <div class="card-footer bg-white">
                <h4 class="p-3">Total egresos avances: </h4><h3><input type="text" class="bg-white" v-money="mone" disabled v-model="valEgresoAvances"></h3>
              </div>
            </div>          
        </div>         
        <div class="col-lg-12" id="terceros" v-if="verTablasEgresos">
          <div class="card text-center">
            <div class="card-header bg-white">
              <h2>Registro Pagos a terceros</h2>  
            </div>
            <div class="card-body">
              <table class="table table-hover border table-sm bg-white text-dark table-responsive-sm">
                  <thead class="sticky-top text-white bg-dark">
                  <tr>
                      <th># </th>
                      <th>valor</th>
                      <th>fecha</th>
                      <th>Entidad</th>  
                      <th>Empleado</th>
                  </tr>
                  </thead>
                  <tbody>
                      <tr v-for="terceros,index in Terceros.slice().reverse()">
                        <td>{{Terceros.tot-index}}</td>
                        <td>{{terceros.valor}}</td>
                        <td>{{terceros.fecha}}</td>
                        <td>{{terceros.entidad}}</td>
                        <td>{{terceros.codigoEmpleado}}</td>
                      </tr>
                  </tbody>
              </table>
            </div>
            <div class="card-footer bg-white">
                              
            </div>
          </div>
        </div>
    </div>
    
    <tcc  v-if="user.rol=='ADMIN' || user.rol =='SUPERADMIN'"/>
  <reporteFechas class="col-md-12" /><br><br><br>
  </div>  
</template>

<script>
class moneey {
  constructor() {
    this.prefix = '$ ';
    this.thousands = ".";
    this.precision = 0;
    this.masked = false;
  }
}
class moneey2 {
  constructor() {
    this.thousands = ".";
    this.precision = 0;
    this.masked = false;
  }
}
class capital {
  constructor() {
    this.totalIngresosEgresos = 0;
    this.totalCapital = 0;
    this.totalIntereses = 0;
    this.egresos = 0
    this.totalEgresos = 0;
    this.totalPrestamos = 0;
  }
}
class ingreso {
  constructor (){
    this.concepto = '';  
    this.valor = '';
    this.intereses = '';
    this.descripcion = '';
    this.idCredito = '';
    this.codigoEmpleado = '';
    this.fechaIngresoEfectivo = '';
  }
}
class EgresoEfectivo {
  constructor(){
    this.concepto = '';
    this.valor = '';
    this.descripcion = '';
    this.fechaEgreso = '';
    this.codigoEmpleado = '';
    this.egreso = true;
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
import { VMoney } from "v-money";
import Barra from "../components/Barra.vue";
import tcc from "../components/totalCapitalCreditos.vue";
import reporteFechas from'../components/reportePorFechas.vue'
import { parse } from 'path';
import f from "../funciones/funciones.js";

export default {
  name: "contabilidad",
  components: {
    Barra,
    tcc,
    reporteFechas,
  },
  data() {
    return {
      avance:{},
      S:false,
      T:false,
      ST:false,
      L:false,
      C:false,
      ingresoDineroCreditos: false,
      egreso : false,
      Ingreso: new ingreso (),
      user : new usuario (),
      codigo : '',
      ingreso: false,
      Capital: {},
      interes : false,
      money: new moneey(),
      mone: new moneey2(),
      egresoEfectivo: new EgresoEfectivo(),
      tp : '',
      egre:'',
      ingre:'',
      valCapCred : '',
      valIntCred : '',
      valCapCredADS: '',
      valOtros:'',
      valComision:'',
      valIniciales:'',
      valIntCredADS : '',
      valEgresoCred: '',
      valEgresoCredSoat: '',
      valEgresoCredTecno: '',
      valEgresoCredSoatTecno:'',
      valEgresoCredLic:'',
      valEgresoNom:'',
      valEgresoAvances:'',
      valComiS:'',
      valComiT:'',
      valComiST:'',
      valTerceros:'',
      valComiL:'',
      valEgresoF:'',
      valEgresoC:'',
      EgresosC:'', 
      EgresosF:{},      
      valTotalIngresos : 0,
      Egresos: {},
      IngresosCreditosADS: {},
      IngresosOtros: {},
      IngresosInteresesADS : {},
      IngresosCapital: {},
      IngresoIntereses:{},
      IngresosIniciales:{},
      IngresosComision:{},
      Terceros:{},
      EgresosN:{},
      spiner:false,
      cerrar: false,
      cerrarE:false,
      verTablasIngresos: false,
      verTablasEgresos: false,
      valTotalEgresos:0,
      totE:0,
      totalDS:0,
      descuentosSoat:[],
      totalDT:0,
      descuentosTecno:[],
      descuentosSoatTecno:[],
      descuentosLic:[],   
      uri:'',
      ingresosVentasEfectivo:[],
      valVentaTotal:0
    };
  },
  created() {
    this.uri = f.uri
    if (localStorage.getItem("token") === null) {
      this.adentro = false;
      this.$router.push('/inicioSesion')
    } else {
      this.axios
        .get(this.uri+"/api/login/usuario", {
          headers: { token: localStorage.getItem("token") }
        })
        .then(res => {
          this.user = res.data.user;
          this.codigo = this.user.codigo
        });
    }
    this.verEgresosDesembolso('uno')
    this.verIngresosCapital()
    this.verIngresosInteres()
    this.verIngresosCreditosADS('uno')
    this.verIngresosInteresesADS('uno')
    this.verIngresosOtros('uno')
    this.verIngresosInicial()
    this.verIngresosComision('uno')
    this.verPagosTerceros()
    this.verEgresosNomina('uno')  
    this.verEgresosF('uno')
    this.verEgresosCompras('uno')
    this.verEgresosAvance('uno')
    this.verIngresosVentas()
  },
  methods: {

    //las primeras tres funciones se utlizaron para actulizarvalores en la tabla de egresos 
    //se dejan ahy por si algun dia son de uso
    actualizarDatos(idc){
      const Id={
        id:idc
      }
      this.axios.post(this.uri+'/api/creditos/verCredito',Id)
      .then(res=>{
        console.log(idc)
        let cedula = res.data.cedula
        this.verCliente(idc,cedula)
      })
      .catch(err=>{console.log(err.response)})
    },
    verCliente(a,cedula){
      const cc={
        cedula:cedula
      }
      this.axios.post(this.uri+'/api/verCliente',cc)
      .then(res=>{
        let cliente = res.data[0]
        console.log(cliente.nombreCliente)
        this.actualizarCredito(cliente.cedulaId, cliente.nombreCliente+' '+cliente.primerApellidoCliente+' '+cliente.segundoApellidoCliente,a)
      })
      .catch(err=>{console.log(err)})
    },
    actualizarCredito(a,b,c){
      const datos = {
        cedula:a,
        nombreCliente:b,
        id:c
      }
      this.axios.post(this.uri+'/api/contabilidad/actualizarEgreso',datos)
      .then(res=>{
        console.log('actualizado con exito')
      })
      .catch(err=>{console.log(err.response)})

    },
    actualizarValoresTabla(){
      for(let a = 0;a<=this.IngresosCapital.length-1;a++){
        setTimeout(() => {
          this.verInteres(this.IngresosCapital[a].idCredito)
        }, 500); 
      }
    },
    verInteres(id){
      console.log(id)
      let valores = {
        id:id
      }
      this.axios.post(this.uri + '/api/contabilidad/verInteresCreditoUnico',valores)
      .then(res=>{
        let cli = res.data.data.valor
        setTimeout(() => {
          this.agregarValorInteres(valores.id,cli)
        }, 500);
        
      })
      .catch(err=>{console.log(err)})
    },
    agregarValorInteres(id, interes){
      let valores = {
        id : id,
        interes:interes
      }
      console.log(valores)
      this.axios.post(this.uri + '/api/contabilidad/actualizarValInt',valores)
      .then(res=>{console.log(res.data)})
      .catch(err=>{console.log(err)})
    },
    
    actualizarValoresTablados(){
      for(let a = 0;a<=this.IngresosCreditosADS.length-1;a++){
        console.log(this.IngresosCreditosADS[a].concepto)
        setTimeout(() => {
          this.verInteresDos(this.IngresosCreditosADS[a].descripcion)
        }, 500); 
      }
    },
    verInteresDos(descripcion){
      let valores = {
        descripcion:descripcion
      }
      this.axios.post(this.uri + '/api/contabilidad/verInteresCreditoUnicoADS',valores)
      .then(res=>{
        let cli = res.data.data.valor
        setTimeout(() => {
          this.agregarValorInteresDos(valores.descripcion,cli)
        }, 500);
        
      })
      .catch(err=>{console.log(err)})
    },
    agregarValorInteresDos(descripcion, interes){
      let valores = {
        descripcion : descripcion,
        interes:interes
      }
      console.log(valores)
      this.axios.post(this.uri + '/api/contabilidad/actualizarValIntADS',valores)
      .then(res=>{console.log(res.data)})
      .catch(err=>{console.log(err)})
    },
    guardarIngreso(n,a,b,c) {
      let dia = new Date().getDate();
      let mes = new Date().getMonth()+1;
      let ano = new Date().getFullYear();
      this.Ingreso.concepto = n;
      this.Ingreso.codigoEmpleado = this.codigo;
      this.Ingreso.interes=c
      this.Ingreso.fechaIngresoEfectivo =  new Date(ano,mes, dia),
      this.axios
        .post(this.uri+"/api/contabilidad/guardarIngreso", this.Ingreso)
        .then(res => {
          if(n=='dineroCreditoADS'){
          this.guardarIngresoIntereses('interesesADS')
          this.Ingreso = new Object()
          this.ingreso = false,
          this.ingresoDineroCreditos = false
          this.verIngresosCreditosADS(a,b)
          this.verIngresosInteresesADS(a,c)
          }else{
            this.Ingreso = new Object()
            this.ingreso = false,
            this.ingresoDineroCreditos = false
            this.verIngresosOtros(a,b)
            this.spiner = false
          }        
        })
        .catch(err => {
          console.log(err);
        });
        
    },
    guardarIngresoIntereses(n) {
      let dia = new Date().getDate();
      let mes = new Date().getMonth()+1;
      let ano = new Date().getFullYear();
      this.Ingreso.concepto = n;
      this.Ingreso.codigoEmpleado = this.codigo;
      this.Ingreso.fechaIngresoEfectivo =  new Date(ano,mes, dia),
      this.Ingreso.valor = this.Ingreso.intereses
      this.axios
        .post(this.uri+"/api/contabilidad/guardarIngreso", this.Ingreso)
        .then(res => {
          let r = res.data.data
          this.spiner = false
        })
        .catch(err => {
          console.log(err);
        });
    },
    guardarEgresoEfectivo(a,valor,concepto) {
      let dia = new Date().getDate();
      let mes = new Date().getMonth();
      let ano = new Date().getFullYear();
      this.egresoEfectivo.codigoEmpleado = this.codigo;
      this.egresoEfectivo.fechaEgreso = ano + "-" + (mes +1)  + "-" + dia;
      this.egresoEfectivo.fechaReflejadoEgreso = new Date(ano,mes,dia)
      this.axios
        .post(this.uri+"/api/contabilidad/guardarEgreso", this.egresoEfectivo)
        .then(res => {
          let r = res.data.data
          if(concepto=='compras'){
          this.verEgresosCompras(a,valor)
          }
          if(concepto=='funcionamiento'){
          this.verEgresosF(a,valor)
          }
          if(concepto=='nomina'){
          this.verEgresosNomina(a,valor)
          }
          if(concepto=='avance'){
          this.verEgresosAvance(a,valor)
          }
          this.egresoEfectivo = new Object()
          this.egreso = false
          this.spiner = false
        })
        .catch(err => {
          console.log(err);
        });
    },
    verIngresosCreditosADS(a,b){
      this.axios.get(this.uri+'/api/contabilidad/verIngresosCreditosADS')
        .then(res => {
          this.IngresosCreditosADS = res.data; 
          let tot = this.IngresosCreditosADS.length - 1 
          let sv=[]
          let sumaValor = 0
          for(let x = 0; x<= tot ;x++){
            sv[x] = this.IngresosCreditosADS[x].valor
            sumaValor = sumaValor + sv[x]
          }
          sumaValor = Math.round(sumaValor) 
          let v = sumaValor
          this.valCapCredADS = v.toString()
          if(a=='uno'){
            this.sumarIngresos(sumaValor)
          }
          if(a=='dos'){
            this.sumarIngresos(b)
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    verIngresosOtros(a,b,c){
      this.axios.get(this.uri+'/api/contabilidad/verIngresosOtros')
        .then(res => {
          this.IngresosOtros = res.data; 
          let tot = this.IngresosOtros.length - 1 
          let sv=[]
          let sumaValor = 0
          for(let x = 0; x<= tot ;x++){
            sv[x] = this.IngresosOtros[x].valor
            sumaValor = sumaValor + sv[x]
          }
          sumaValor = Math.round(sumaValor) 
          let v = sumaValor
          this.valOtros = v.toString()
          if(a=='uno'){
            this.sumarIngresos(sumaValor)
          }
          if(a=='dos'){
            this.sumarIngresos(b)
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    verIngresosInicial(){
      this.axios.get(this.uri+'/api/contabilidad/verIngresosInicial')
        .then(res => {
          this.IngresosIniciales = res.data; 
          let tot = this.IngresosIniciales.length - 1 
          let sv=[]
          let sumaValor = 0
          for(let x = 0; x<= tot ;x++){
            sv[x] = this.IngresosIniciales[x].valor
            sumaValor = sumaValor + sv[x]
          }
          sumaValor = Math.round(sumaValor) 
          let v = sumaValor
          this.valIniciales = v.toString()
          this.sumarIngresos(sumaValor)
        })
        .catch(err => {
          console.log(err);
        });
    },
    verIngresosCapital(){
      this.axios.get(this.uri+'/api/contabilidad/verIngresosCapital')
        .then(res => {
          this.IngresosCapital = res.data; 
          let tot = this.IngresosCapital.length - 1 
          let sv=[]
          let sumaValor = 0
          for(let x = 0; x<= tot ;x++){
            sv[x] = this.IngresosCapital[x].valor
            sumaValor = sumaValor + sv[x]
          }
          sumaValor = Math.round(sumaValor) 
          let v = sumaValor
          this.valCapCred = v.toString()
          this.sumarIngresos(sumaValor)
        })
        .catch(err => {
          console.log(err);
        });
    },
    verIngresosVentas(){
      this.axios.get(this.uri+'/api/contabilidad/verIngresosVentasEfectivo')
        .then(res => {
          console.log(res.data)
          this.ingresosVentasEfectivo = res.data; 
          let tot = this.ingresosVentasEfectivo.length - 1 
          let sv=[]
          let sumaValor = 0
          for(let x = 0; x<= tot ;x++){
            sv[x] = parseInt(this.ingresosVentasEfectivo[x].valor)
            sumaValor = sumaValor + sv[x]
          }
          sumaValor = Math.round(sumaValor) 
          let v = sumaValor
          this.valVentaTotal = v.toString()
          this.sumarIngresos(sumaValor)
        })
        .catch(err => {
          console.log(err);
        });
    },
    verIngresosInteresesADS(a,c){
      this.axios.get(this.uri+'/api/contabilidad/verIngresosInteresesADS')
        .then(res => {
          this.IngresosInteresesADS = res.data; 
          let tot = this.IngresosInteresesADS.length - 1 
          let sv=[]
          let sumaValor = 0
          for(let x = 0; x<= tot ;x++){
            sv[x] = this.IngresosInteresesADS[x].valor
            sumaValor = sumaValor + sv[x]
          }
          sumaValor = Math.round(sumaValor) 
          let v = sumaValor
          this.valIntCredADS = v.toString()
          if(a=='uno'){
            this.sumarIngresos(sumaValor)
          }
          if(a=='dos'){
            this.sumarIngresos(c)
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    verIngresosInteres(){
      this.axios.get(this.uri+'/api/contabilidad/verIngresosIntereses')
        .then(res => {
          this.IngresoIntereses = res.data; 
          let tot = this.IngresoIntereses.length - 1 
          let sv=[]
          let sumaValor = 0
          for(let x = 0; x<= tot ;x++){
            sv[x] = this.IngresoIntereses[x].valor
            sumaValor = sumaValor + sv[x]
          }
          sumaValor = Math.round(sumaValor) 
          let v = sumaValor
          this.valIntCred = v.toString()
          this.sumarIngresos(sumaValor)
        })
        .catch(err => {
          console.log(err);
        });
    },
    verIngresosComision(a,val){
      this.axios.get(this.uri+'/api/contabilidad/verIngresosComision')
        .then(res => {
          this.IngresosComision = res.data; 
          let tot = this.IngresosComision.length - 1 
          let sv=[]
          let sumaValor = 0
          for(let x = 0; x<= tot ;x++){
            sv[x] = this.IngresosComision[x].valor
            sumaValor = sumaValor + sv[x]
          }
          sumaValor = Math.round(sumaValor) 
          let v = sumaValor
          this.valComision = v.toString()
          if(a=='uno'){
            this.sumarIngresos(sumaValor)
          }
          if(a=='dos'){
            this.sumarIngresos(val)
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    verEgresosDesembolso(a,val){
      this.axios.get(this.uri+'/api/contabilidad/verEgresosDesembolso')
        .then(res => {
          this.Egresos = res.data;
          console.log(this.Egresos)
          this.totE = this.Egresos.length
          let valor = this.sumarValEgresos(res.data)
          let v = valor
          this.valEgresoCred = v.toString()
          if(a == 'uno'){
           this.sumarEgresos(valor)
          }
          if(a =='dos'){
            this.sumarEgresos(val)
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    verEgresosF(a,val){
      this.axios.get(this.uri+'/api/contabilidad/verEgresosFuncionamiento')
        .then(res => {
          this.EgresosF = res.data;
          this.EgresosF.tot = this.EgresosF.length
          let tot = this.EgresosF.tot - 1
          let sv=[]
          let sumaValor = 0
          for(let x = 0; x<= tot ;x++){
            sv[x] = this.EgresosF[x].valor
            sumaValor = sumaValor + sv[x]
          }
          sumaValor = Math.round(sumaValor) 
          let v = sumaValor
          this.valEgresoF= v.toString()
          if(a == 'uno'){
              this.sumarEgresos(sumaValor)
          }
          if(a=='dos'){
            this.sumarEgresos(val)
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    verEgresosCompras(a,val){
      this.axios.get(this.uri+'/api/contabilidad/verEgresosCompras')
        .then(res => {
          this.EgresosC = res.data;
          this.EgresosC.tot = this.EgresosC.length
          let tot = this.EgresosC.tot - 1
          let sv=[]
          let sumaValor = 0
          for(let x = 0; x<= tot ;x++){
            sv[x] = this.EgresosC[x].valor
            sumaValor = sumaValor + sv[x]
          }
          sumaValor = Math.round(sumaValor) 
          let v = sumaValor
          this.valEgresoC= v.toString()
          if(a == 'uno'){
              this.sumarEgresos(sumaValor)
          }
          if(a=='dos'){
            this.sumarEgresos(val)
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    verEgresosNomina(a,val){
      this.axios.get(this.uri+'/api/contabilidad/verEgresosNomina')
        .then(res => {
          this.EgresosN = res.data;
          this.EgresosN.tot = this.EgresosN.length
          let tot = this.EgresosN.tot - 1
          let sv=[]
          let sumaValor = 0
          for(let x = 0; x<= tot ;x++){
            sv[x] = this.EgresosN[x].valor
            sumaValor = sumaValor + sv[x]
          }
          sumaValor = Math.round(sumaValor) 
          let v = sumaValor
          this.valEgresoNom= v.toString()
          if(a == 'uno'){
              this.sumarEgresos(sumaValor)
          }
          if(a=='dos'){
            this.sumarEgresos(val)
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    verEgresosAvance(a,val){
      this.axios.get(this.uri+'/api/contabilidad/verEgresosAvance')
        .then(res => {
          this.avance = res.data;
          this.avance.tot = this.avance.length
          let tot = this.avance.tot - 1
          let sv=[]
          let sumaValor = 0
          for(let x = 0; x<= tot ;x++){
            sv[x] = this.avance[x].valor
            sumaValor = sumaValor + sv[x]
          }
          sumaValor = Math.round(sumaValor) 
          let v = sumaValor
          this.valEgresoAvances= v.toString()
          if(a == 'uno'){
              this.sumarEgresos(sumaValor)
          }
          if(a=='dos'){
            this.sumarEgresos(val)
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    sumarEgresos(n){
      n = parseInt(n)
      this.valTotalEgresos = this.valTotalEgresos + n
      let r = Math.round(this.valTotalEgresos)
      console.log(r)
      this.egre = r.toString()
      this.verTotal() 
    },
    sumarIngresos(n){
      n = parseInt(n)
      this.valTotalIngresos = this.valTotalIngresos + n      
      let r = Math.round(this.valTotalIngresos)
      this.ingre = r.toString()
      this.verTotal() 
    },
    sumarValEgresos(data){
      let datos = data
      let tot = datos.length - 1 
      let sv=[]
      let si=[]
      let sumaValorE = 0
      let sumainteresE = 0
      for(let x = 0; x<= tot ;x++){
        if(datos[x].egreso==true){
          si[x] = datos[x].cuotaInicial
          sv[x] = datos[x].valor
            sumainteresE = sumainteresE + si[x]
            sumaValorE = sumaValorE + sv[x]
        }
      }  
      sumaValorE = Math.round(sumaValorE) + Math.round(sumainteresE)        
      return sumaValorE
    },
    reflejarDesembolso(a,b,c,d,e,f,g){
      console.log(a)
      console.log(b)
      console.log(c)
      console.log(d)
      console.log(e)
      console.log(f)
      console.log(g)
      let ff = parseInt(f)-1
      let dia = new Date().getDate();
      let mes = new Date().getMonth();
      let ano = new Date().getFullYear();    

      if(e=='desembolso Soat'){
        let valores = {
          valor:c + d,
          descripcion:e,
          idCredito : a,
          codigoEmpleado : b,
          fechaEgresoEfectivoSoat:new Date(ano,mes,dia),
          index : ff,
          id:g
        }
        this.descuentosSoat.push(valores)
        this.totalDS = this.descuentosSoat.length
        this.Egresos[ff].senalado = true
        this.S = true
        let tot = this.totalDS - 1 
          let sv=[]
          let sumaValor = 0
          for(let x = 0; x<= tot ;x++){
            sv[x] = this.descuentosSoat[x].valor
            sumaValor = sumaValor + sv[x]
          }
          sumaValor = Math.round(sumaValor) 
          let v = sumaValor
          this.valEgresoCredSoat = v.toString()
      }
      if(e=='desembolso Tecnomecanica'){
        if(d==undefined){
          d=0
        }
        let valores = {
          valor:c + d,
          descripcion:e,
          idCredito : a,
          codigoEmpleado : b,
          fechaEgresoEfectivoTecno:new Date(ano,mes,dia),
          index : ff,
          id:g
        } 
        this.descuentosTecno.push(valores)
        this.totalDT = this.descuentosTecno.length
        this.Egresos[ff].senalado = true
        this.T = true
        let tot = this.totalDT - 1 
          let sv=[]
          let sumaValor = 0
          for(let x = 0; x<= tot ;x++){
            sv[x] = this.descuentosTecno[x].valor
            sumaValor = sumaValor + sv[x]
          }
          sumaValor = Math.round(sumaValor) 
          let v = sumaValor
          this.valEgresoCredTecno = v.toString()
      }
      if(e=='desembolso Soat-Tecnomecanica'){
        if(d==undefined){
          d=0
        }
        let valores = {
          valor:c + d,
          descripcion:e,
          idCredito : a,
          codigoEmpleado : b,
          fechaEgresoEfectivoTecno:new Date(ano,mes,dia),
          index : ff,
          id:g
        } 
        this.descuentosSoatTecno.push(valores)
        this.descuentosSoatTecno.tot = this.descuentosSoatTecno.length
        this.Egresos[ff].senalado = true
        this.ST = true
        let tot = this.descuentosSoatTecno.tot - 1 
          let sv=[]
          let sumaValor = 0
          for(let x = 0; x<= tot ;x++){
            sv[x] = this.descuentosSoatTecno[x].valor
            sumaValor = sumaValor + sv[x]
          }
          sumaValor = Math.round(sumaValor) 
          let v = sumaValor
          this.valEgresoCredSoatTecno = v.toString()
      }
      if(e=='desembolso Licencia'){
        if(d==undefined){
          d=0
        }
        let valores = {
          valor:c + d,
          descripcion:e,
          idCredito : a,
          codigoEmpleado : b,
          fechaEgresoEfectivoLic:new Date(ano,mes,dia),
          index : ff,
          id:g
        } 
        this.descuentosLic.push(valores)
        this.descuentosLic.tot = this.descuentosLic.length
        this.Egresos[ff].senalado = true
        this.L = true
        let tot = this.descuentosLic.tot - 1 
          let sv=[]
          let sumaValor = 0
          for(let x = 0; x<= tot ;x++){
            sv[x] = this.descuentosLic[x].valor
            sumaValor = sumaValor + sv[x]
          }
          sumaValor = Math.round(sumaValor) 
          let v = sumaValor
          this.valEgresoCredLic = v.toString()
      }
    },
    quitarSoat(b,c){
      this.descuentosSoat.splice(b-1,1)
      this.totalDS = this.descuentosSoat.length
      this.Egresos[c].senalado = false
      let tot = this.totalDS - 1 
          let sv=[]
          let sumaValor = 0
          for(let x = 0; x<= tot ;x++){
            sv[x] = this.descuentosSoat[x].valor
            sumaValor = sumaValor + sv[x]
          }
          sumaValor = Math.round(sumaValor) 
          let v = sumaValor
          this.valEgresoCredSoat = v.toString()
      if(this.totalDS == 0){
        this.S= false
      }      
    },
    quitarTecno(b,c){
      this.descuentosTecno.splice(b-1,1)
      this.totalDT = this.descuentosTecno.length
      this.Egresos[c].senalado = false
      let tot = this.totalDT - 1 
          let sv=[]
          let sumaValor = 0
          for(let x = 0; x<= tot ;x++){
            sv[x] = this.descuentosTecno[x].valor
            sumaValor = sumaValor + sv[x]
          }
          sumaValor = Math.round(sumaValor) 
          let v = sumaValor
          this.valEgresoCredTecno = v.toString()
      if(this.totalDT == 0){
        this.T= false
      }      
    },
    quitarSoatTecno(b,c){
      this.descuentosSoatTecno.splice(b-1,1)
      this.descuentosSoatTecno.tot = this.descuentosSoatTecno.length
      this.Egresos[c].senalado = false
      let tot = this.descuentosSoatTecno.tot - 1 
          let sv=[]
          let sumaValor = 0
          for(let x = 0; x<= tot ;x++){
            sv[x] = this.descuentosSoatTecno[x].valor
            sumaValor = sumaValor + sv[x]
          }
          sumaValor = Math.round(sumaValor) 
          let v = sumaValor
          this.valEgresoCredSoatTecno = v.toString()
      if(this.descuentosSoatTecno.tot == 0){
        this.ST= false
      }      
    },
    quitarLic(b,c){
      this.descuentosLic.splice(b-1,1)
      this.descuentosLic.tot = this.descuentosLic.length
      this.Egresos[c].senalado = false
      let tot = this.descuentosLic.tot - 1 
          let sv=[]
          let sumaValor = 0
          for(let x = 0; x<= tot ;x++){
            sv[x] = this.descuentosLic[x].valor
            sumaValor = sumaValor + sv[x]
          }
          sumaValor = Math.round(sumaValor) 
          let v = sumaValor
          this.valEgresoCredLic = v.toString()
      if(this.descuentosLic.tot == 0){
        this.L= false
      }      
    },
    quitarPuntos(x){
            let valer = "" 
            let val = x
            for (let n = 0; n <= val.length - 1; n++) {
                if (val[n] == ".") {
                    n++;
                }
                valer = valer + val[n];
            }
            valer = parseInt(valer)
            return(valer)
    },
    realizarDesembolso(valEgresoCred,valComi, descuentos, y){
      valEgresoCred = this.quitarPuntos(valEgresoCred)
      valEgresoCred = parseInt(valEgresoCred)
      valComi = this.quitarPuntos(valComi)
      valComi = parseInt(valComi)
      let dia = new Date().getDate();
      let mes = new Date().getMonth();
      let ano = new Date().getFullYear();
      let id = []
      let t = descuentos.length
      for(let a = 0; a<=t-1 ; a++ ){
        var n = {
          id: descuentos[a].id,
          fechaReflejadoEgreso: new Date(ano,mes,dia),
          codigoEmpleadoReflejadoEgreso:this.user.codigo
        }
        this.axios.post(this.uri+'/api/contabilidad/agregarDatosEgreso',n)
        .then( res =>{
          this.verEgresosDesembolso('dos',valEgresoCred)
        })
        .catch(err=>{console.log(err)}) 
      }
      let z = ''
      if (y =='s'){
        this.S = false
        z = 'soat'
        this.descuentosSoat = []
        this.valComiS = ''
      }
      if (y =='t'){
        this.T = false
        z='tecnomecanica'
      }
      if (y =='st'){
        this.ST = false
        z='soat y tecno'
      }
      if (y =='l'){
        this.L = false
        z='licencias'
      }
      let pgT = {
        valor: valEgresoCred,
        fecha:  new Date(ano,mes,dia),
        entidad: z,
        codigoEmpleado: this.user.codigo,
      }
      this.guardaPagosTerceros(pgT)
      this.guardarIngresoComision(pgT,valComi)
    },
    guardaPagosTerceros(pgt){
      this.axios.post(this.uri+'/api/contabilidad/guardarPagosTerceros',pgt)
      .then( res =>{
          this.verPagosTerceros()
        })
        .catch(err=>{console.log(err)})
    },
    verPagosTerceros(){
      this.axios.get(this.uri+'/api/contabilidad/verPagosTerceros')
        .then(res => {
          this.Terceros = res.data;
          this.Terceros.tot = res.data.length
          //this.actualizarEgresosPT()
        })
        .catch(err => {
          console.log(err);
        });
    },
    guardarIngresoComision(pgt,valcomi){
      let valores = {
        concepto :'comision',
        valor: valcomi,
        descripcion: 'Comision por '+pgt.entidad,
        idCredito:'',
        codigoEmpleado : this.user.codigo,
        fechaIngresoEfectivo:pgt.fecha
      }
      this.axios.post(this.uri+"/api/contabilidad/guardarIngreso", valores)
        .then(res => {
          this.verIngresosComision('dos',valcomi)
          this.spiner = false
        })
        .catch(err => {
          console.log(err);
        });
    },
    verTotal(){
      let a = this.valTotalIngresos
      let b = this.valTotalEgresos
      let c = a - b
      this.tp = c.toString()
    },
    actualizarEgresosPT(){
      let egreso = {}
      let egresoss = []
      for(let a = 1; a<this.Terceros.length;a++){
        if(this.Terceros[a].n == true){
          console.log(this.Terceros[a].n)          
        }else{
          egreso = {}
          egreso.concepto = 'desembolso'
          egreso.valor = this.Terceros[a].valor
          egreso.descripcion = ('desembolso '+ this.Terceros[a].entidad) 
          egreso.codigoEmpleado = this.Terceros[a].codigoEmpleado
          egreso.idCredito = 'sin id'
          egreso.cuotaInicial = 0
          egreso.numeroCredito = 123456
          egreso.fechaEgreso = this.Terceros[a].fecha
          egreso.egreso = true
          egreso.codigoEmpleadoReflejadoEgreso = this.Terceros[a].codigoEmpleado
          egreso.fechaReflejadoEgreso = this.Terceros[a].fecha
          egreso.cedula = 'sin cedula'
          egreso.nombreCliente = 'En recuperacion de info'
          this.crearEgresos(egreso)
        }              
      }
    },
    crearEgresos(egreso){
      console.log(egreso)
      this.axios.post(this.uri+"/api/contabilidad/nuevoEgreso", egreso)
      .then(res => {
        console.log(res.data)
        console.log('exito')
      })
      .catch(err => {
        console.log(err);
      });
    }  
  }
};
</script>