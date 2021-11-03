<template>
<div>
  <div class="text-center p-4" v-if="!verCredito">
      <h1>Creditos aprobados</h1>
  </div>
  <br>
    <div v-if="busqueda">
        <div class="input-group mb-3">
            <form class="form-inline"  @submit.prevent="buscando(buscar)">
                <input class="form-control mr-sm-2" type="text" v-model="buscar" @keyup.delete="recargar()" placeholder="Buscar">
                <button class="btn btn-success">buscar</button>
            </form>
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
    <div style="height: auto; max-height: 390px; overflow-y: scroll;" v-if="!verCredito">
        <table class="table table-hover border table-sm bg-white text-dark table-responsive-sm">
            <thead class="sticky-top text-white bg-dark">
            <tr>
                <th># credito</th>
                <th>CC Cliente</th>
                <th>Servicio</th>
                <th  class="text-center">Ver</th>
                <th  class="text-center">Cliente informado</th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="credito in Creditos">
                <td>{{credito.numeroCredito}}</td>
                <td>{{credito.cedula}}</td>
                <td>{{credito.servicio}}</td>
                <td class="text-center">
                    <button class="btn btn-primary btn-sm" @click="verCliente(credito.cedula, credito._id)"><i class="fa fa-eye"></i></button>
                </td>
                <td class="text-center">
                    <button v-if="credito.clienteInformado == true" class="btn btn-success btn-sm"><i class="fa fa-phone"></i></button>
                    <button v-if="credito.clienteInformado == false" class="btn btn-danger btn-sm"><i class="fa fa-times"></i></button>
                </td>
                </tr>
            </tbody>
        </table>
        <div v-if="encabezado" class="text-center">
            <div class="btn btn-primary btn-block" @click="encabezado = false, fetchCreditos(), buscar=''">Regresar</div>
        </div>
    </div>
    <div v-if="verCredito">
        <div class="card text-center">
            <div class="card-header">
                <h2>Credito por entregar # {{credito.numeroCredito}}</h2>
            </div>
            <div class="card-body">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text"> Nombre del cliente </label>
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
                    <label class="input-group-text">Otro # de contacto</label>
                  </div>
                  <div id class="form-control">{{cliente.celularDos}}</div>
                </div>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text">Servicio</label>
                  </div>
                  <div id class="form-control">{{credito.servicio}}</div>
                </div>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text">Monto Aprobado</label>
                  </div>
                  <div id class="form-control">{{credito.cantidad}}</div>
                </div>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text">Fecha solicitud</label>
                  </div>
                  <div id class="form-control">{{credito.fechaAgregado}}</div>
                </div>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text">Cuota inicial</label>
                  </div>
                  <div id class="form-control">{{credito.cuotaInicial}}</div>
                  <div  v-if="cuotaIni" class="btn btn-success">validado</div>
                  <div v-if="!cuotaIni" class="btn btn-danger" @click="spiner=true, validarIngresoInicialCaja(credito._id,credito.cuotaInicial, user.codigo,'inicial',cliente.cedulaId)">ingreso a caja cuota inicial</div>
                </div>
                <div class="input-group mb-3" v-if="credito.renovacion">
                  <div class="input-group-prepend">
                    <label class="input-group-text">Valor a pagar del credito anterior</label>
                  </div>
                  <div id class="form-control">{{credito.aEditar.valor}}</div>
                  <div class="input-group-prepend">
                    <label class="input-group-text">capital</label>
                  </div>
                  <div id class="form-control">{{credito.aEditar.capital}}</div>
                  <div class="input-group-prepend">
                    <label class="input-group-text">interes</label>
                  </div>
                  <div id class="form-control">{{credito.aEditar.interes}}</div>
                  <div  v-if="credito.aEditar.paga" class="btn btn-success">validado</div>
                  <div v-if="!credito.aEditar.paga" class="btn btn-danger" @click="spiner = true,cancelar(credito.aEditar.capital, credito.aEditar.interes, credito.aEditar.idCredito,credito._id)">ingreso a caja del credito a renovar</div>
                </div>
            </div>
            <div class="card-footer">
                <div v-if="mostrar">
                    <h2>el valor a entregar es de {{credito.cantidad}} menos el valor  del credito renovado {{credito.aEditar.valor}} para un total de: <button class="bg-danger"> {{tott}}</button></h2>
                </div>
                <div class="btn-group mb-3 col-lg-12">
                    <button class="btn btn-primary text-white" v-if="!informado" @click="marcarInformado(credito._id)"><h2><strong>Marcar como informado</strong></h2></button>
                    <button class="btn btn-success" v-if="informado"><h2><strong>informado </strong></h2></button>
                    <button class="btn btn-warning" @click="verCredito = false, regresando()"><h2><strong>regresar</strong></h2></button>
                </div>
                <br>  
                <div class="input-group mb-3">
                    <div class="btn btn-info col-md-10" @click="verDocumento(credito)"><h2><strong> Imprimir certificado de credito</strong></h2></div>
                    <div class="btn col-md-2 bg-success p-2">
                        <input type="checkbox" class="mx-auto p-2" style="width:20px;height:20px;" v-model="impreso"><br>
                        <span class="text-white">ya esta impreso?</span>
                    </div>
                </div>  
                <div class="btn btn-primary btn-block" @click="spiner=true,entregado(credito.producto,credito._id,credito.cantidad,user.codigo,credito.numeroCredito,credito.servicio,credito.cuotaInicial,credito)" v-if="informado==true && btn==true && credito.aEditar.paga==true && impreso == true"><h2><strong>Entregar Credito</strong></h2></div>                
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
    <b-modal v-model="verImpresion" id="verImpresion" no-close-on-backdrop centered no-close-on-esc hide-header-close hide-header hide-footer lazy size="xl">
        <div class="card border border-white" id="imprimiendo">
            <div class="card-header bg-white text-right border-white">
                <br>
                Cartago {{new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate()}}<br>
                <br><br>
                    <div class="card-header bg-white text-center border-white ">
                        <img src="/img/logos/logo.jpeg" alt="" style="width:400px;height:100px;"><br><br>               
                        <h2><strong> Certificado entrega credito # {{credito.numeroCredito}} </strong></h2>              
                    </div> 
                <br><br>
            </div>
            <div class="card-body border-white">
                <br>
                Se hace entrega al señor(a) {{cliente.nombreCliente}} {{cliente.primerApellidoCliente}} {{cliente.segundoApellidoCliente}} 
                identificado con la CC# {{credito.cedula}} la suma de {{credito.cantidad}} por el servicio de {{credito.servicio}}, el cual sera cancelado 
                en cuotas {{credito.frecuencia}}es por un periodo de  {{credito.tiempo}} mes(es).
                el valor total del credito es de {{credito.valTotalCred}}, las cuotas mensuales tendran un valor de {{credito.valCuotaMens}} pesos. <br>
                <div v-if="credito.cuotaInicial>0">
                    Para el credito el cliente cancelo una cuota incial de {{credito.cuotaInicial}} pesos
                </div>
                <br><br><br>
                Para constancia se firma en Cartago el dia {{new Date().getDate()}} del mes {{(new Date().getMonth()+1)}} del año {{new Date().getFullYear()}}
                <br><br><br>
                <div class="row">
                    <div class="col-lg-6">
                        Firma cliente <br>
                        <br>_______________________________________________________
                    </div>
                    <div class="col-lg-6">
                        Firma gerente<br>
                        <br>_______________________________________________________
                    </div>
                </div>

            </div>
            <div class="card-footer bg-white border-white text-center" id="botones">
                <div @click="impripdf()" class="btn btn-info col-md-6"><h2><strong>Imprimir</strong></h2></div>
                <div @click="verImpresion = false" class="btn btn-warning col-md-6"><h2><strong>Cancelar</strong></h2></div>
            </div>
        </div>
    </b-modal>
</div>  
</template>x

<script>
import f from "../funciones/funciones.js";
import print from 'print-js'
export default {
    name : 'Aprovados',
    data(){
        return{
            spiner:false,
            encabezado: false,
            Creditos: {},
            Capital:{},
            verCredito:false,
            credito:{},
            cliente:{},
            informado:false,
            buscar:'',
            creditosCliente:{},
            alerta : false,
            alerta2: false,
            alerta3:false,
            busqueda : true,
            cuotaIni:false,
            btn: false,
            user:{},
            mostrar:false,
            tott:0,
            codigo:0,
            pagg:{},
            uri:'',
            verImpresion:false,
            impreso:false,
        }
    },
    created() {
        this.uri = f.uri
        this.fetchCreditos();
    },
    mounted() {
        this.axios.get(this.uri+'/api/login/usuario', {headers:{token:localStorage.getItem('token')}})
            .then(res => {
            this.user=res.data.user
            this.codigo = this.user.codigo
            }) 
            .catch(err => {
            localStorage.clear()
            if(localStorage.getItem ('token') === null){
            this.$router.push('/inicioSesion')
            }
        });
        localStorage.removeItem('cc')
    },
    methods :{
            fetchCreditos() {
            //const uri = "http://localhost:3000/api/clientes"
            this.axios 
                .get(this.uri+"/api/creditos/aprobados")
                .then(res => {
                    this.Creditos = res.data;
                })
                .catch(err => console.log(err));
            },
            imprimir(credito){
                console.log(credito)
                if(credito.numeroCredito %2 == 0){
                    return true
                }else{
                    return false
                }
            },
            verDocumento(credito){
                this.verImpresion = true
                
            },
            impripdf() {
                print({
                    printable: 'imprimiendo',
                    targetStyles: ['*'],
                    type: 'html',
                    maxWidth:1200,
                    style: '@page { landscape; }',
                    ignoreElements:['botones'],
                })
            },
            entregado(producto,id,valor,codigo,cn,cs,cuotainicial,credito){
                if(this.imprimir(credito)){
                    console.log('se imprimio')   
                }  else {
                    console.log('no se imprimio')   
                }       
                let entregado ={
                    id : id,
                    cc : codigo ,
                    Fp : new Date(parseInt(this.pagg[0].ano)+'-'+parseInt(this.pagg[0].mes)+'-'+parseInt(this.pagg[0].dia))                       
                }
                this.axios.post(this.uri+"/api/creditos/entregar", entregado)
                .then(res => {
                    this.guardarPrimeraVezTotales(id,valor)                        
                    this.buscar = ''                        
                    this.verCredito = false
                    if(producto == null){
                        this.egresoDesembolso(id,valor,cn,cs,cuotainicial)
                    }else{
                        this.entregarProducto(producto)
                    }
                    
                })
                .catch(err => console.log(err));
                
            },
            entregarProducto(id){
                let idd={
                    id:id
                }
                this.axios.post(this.uri+ '/api/productos/entregarProducto',idd)
                .then(res => {
                    console.log('se a actualizado elproducto')
                    this.spiner = false
                    
                })
                .catch(err => console.log(err));
            },
        guardarPrimeraVezTotales(id,valor){
                valor = this.quitarPuntos(valor)
                valor = parseInt(valor)
                let total  = this.quitarPuntos(this.credito.valTotalCred)
                total = parseInt(total)
                const interes = this.credito.valTotalCred - valor
                const datos={
                    id : id,
                    numeroC:this.credito.numeroCredito,
                    cedula:this.credito.cedula,
                    nombreCliente:this.cliente.nombreCliente+' '+this.cliente.primerApellidoCliente+' '+this.cliente.segundoApellidoCliente,
                    enMora:false,
                    interes:interes,
                    capital:valor,
                    total: total
                }
            this.axios.post(this.uri+'/api/creditos/guardarEstado',datos)
            .then(res=>{
                this.fetchCreditos()
                this.regresando()
            })
            .catch(err=>{console.log(err)})
        },
            egresoDesembolso(id,n,cn,cs,cuotainicial){
                let valer = "" 
                let val = n 
                for (let n = 0; n <= val.length - 1; n++) {
                    if (val[n] == ".") {
                        n++;
                    }
                    valer = valer + val[n];
                }
                valer = parseInt(valer)
                let dia = new Date().getDate();
                let mes = new Date().getMonth()+1;
                let ano = new Date().getFullYear();
                let f_o_v = false
                let fre
                if(cs == 'Libre Inversion' || cs == 'pignoracion' || cs == 'Hipoteca' ){
                    f_o_v = true
                    fre = new Date()
                } else {
                    f_o_v = false
                    fre =''
                }
                let egreso = {
                    concepto : 'desembolso',
                    valor: valer,
                    descripcion: 'desembolso '+cs,
                    codigoEmpleado : this.codigo,
                    idCredito:id,
                    cuotaInicial:cuotainicial,
                    numCredito:cn,
                    fechaEgreso: ano + "-" + mes + "-" + dia,   
                    egreso : f_o_v ,
                    codigoEmpleadoReflejadoEgreso: 0,  
                    fechaReflejadoEgreso: fre,
                    numeroC:this.credito.numeroCredito,
                    cedula:this.credito.cedula,
                    nombreCliente:this.cliente.nombreCliente+' '+this.cliente.primerApellidoCliente+' '+this.cliente.segundoApellidoCliente,           
                }
                this.axios
                    .post(this.uri+"/api/contabilidad/guardarEgreso", egreso)
                    .then(res => {
                    let r = res.data.data
                    this.spiner=false
                    })
                    .catch(err => {
                    console.log(err);
                    });
            
            },
            verCliente(n,id){
                this.encabezado = false
                this.busqueda = false
                let cedulaCliente={
                    cedulaId : n,
                    id:id
                }
                this.axios.post(this.uri+"/api/busqueda", cedulaCliente)//este esta en la api clientes
                .then(res => {
                    this.cliente = res.data[0];
                    this.verCredito = true
                    this.vercredito(cedulaCliente)
                })
                .catch(err => console.log(err));
            },
            vercredito(z){
                this.axios
                .post(this.uri+"/api/creditos/verCredito", z)
                .then(res => {
                this.credito= res.data;
                let cs = this.credito.servicio
                    if(this.credito.renovacion == true){
                        if(cs == 'Libre Inversion' || cs == 'pignoracion' || cs == 'Hipoteca'){
                            this.mostrar = true
                        } else {
                            this.mostrar=false
                        }
                    }else{
                        this.mostrar = false
                        this.credito.aEditar.paga = true
                    }
                    
                    if(this.credito.clienteInformado==true){
                        this.informado = true
                    }else{
                        this.informado = false
                    }
                    if(this.credito.cuotaInicialEntregada){
                        this.cuotaIni = true
                    }else{
                        this.cuotaIni = false
                    }
                    if(this.credito.cuotaInicial == 0){
                        this.cuotaIni = true
                    }
                    if(this.cuotaIni == false){
                        this.btn = false
                    }else{
                       this.btn = true 
                    }                    
                    let cantidad = this.quitarPuntos(this.credito.cantidad)
                    cantidad = parseInt(cantidad)
                    this.tott = cantidad-this.credito.aEditar.valor
                    this.verPagares(this.credito.pagares)
                })
                .catch(err => console.log(err));
            },
            marcarInformado(id){
                let informado ={
                id : id
                }
                this.axios.post(this.uri+"/api/creditos/marcarInformado", informado)
                .then(res => {
                    alert('se a actualizado')
                    this.informado = true
                    this.fetchCreditos()
                    return
                })
                .catch(err => console.log(err));
            },
            verPagares(id){
                let idPagares={
                id : id,
                }
                this.axios.post(this.uri+"/api/creditos/pagares", idPagares)
                .then(res => {
                    this.pagg = res.data.pagares
                })
                .catch(err => console.log(err));
            },
        buscando(x){
            this.encabezado = false
            if (x == "") {
                this.fetchCreditos()
                this.alerta2 = true
                    if(this.alerta2 = true){
                        setTimeout(function(){
                            this.alerta2 = false
                        }.bind(this),2000)
                    } 
                return
            } else {
                if (isNaN(x)) {
                    this.alerta3 = true
                        if(this.alerta3 = true){
                            setTimeout(function(){
                                this.alerta3 = false
                            }.bind(this),2000)
                        }
                    return
                } else {
                    let cedulaCliente={
                        cedulaId : x,
                    }
                    this.axios.post(this.uri+"/api/creditos/creditosClienteAprobado", cedulaCliente)
                    .then(res => {
                        if(res.data == ''){
                            this.alerta = true
                                if(this.alerta = true){
                                    setTimeout(function(){
                                        this.alerta = false
                                    }.bind(this),2000)
                                }   
                           this.fetchCreditos()
                        }else{
                           this.Creditos = res.data; 
                           this.encabezado = true
                        }
                    })
                    .catch(err => console.log(err));
                }
            }
        },
        recargar(){
            this.encabezado = false 
            this.buscar = ''
            this.fetchCreditos()
        },
        regresando(){
            if(this.buscar!=''){
                this.encabezado = true
                this.busqueda = true
            }else{
                this.encabezado = false
                this.busqueda = true
            }
        },
        validarIngresoInicialCaja(id,cuotaInicial,codigo,ic,cedulaCliente){
            let ingresoInicial ={
                id : id,
                cc : codigo 
            }
            this.axios.post(this.uri+"/api/creditos/recibidaInicial", ingresoInicial)
            .then(res => {
                this.verCliente(cedulaCliente,id)
                this.ingresoInicialCredito(id,cuotaInicial,codigo,ic)
                return
            })
            .catch(err => console.log(err));
        },
        ingresoInicialCredito(idCredito,cuotaInicial, codigo, ic){
            let dia = new Date().getDate();
            let mes = new Date().getMonth()+1;
            let ano = new Date().getFullYear();
            let valores = {
                concepto: ic,
                valor:cuotaInicial,
                descripcion:'cuota inicial',
                idCredito : idCredito,
                codigoEmpleado : codigo,
                fechaIngresoEfectivo:ano + "-" + mes + "-" + dia,
                cedula:this.credito.cedula,
                nombreCliente:this.cliente.nombreCliente+' '+this.cliente.primerApellidoCliente+' '+this.cliente.segundoApellidoCliente,
            }
            this.axios.post(this.uri+"/api/contabilidad/guardarIngreso", valores)
            .then(res => {
                this.spiner = false
                alert('se a guardado el ingreso')
                let r = res.date
            })
            .catch(err => {
                console.log(err);
            });
        },
        cancelar(capital,interes,idc,idMarcarPago){
            capital = capital.toString()
            interes = interes.toString()
            capital = this.quitarPuntos(capital)
            interes = this.quitarPuntos(interes)
            interes = parseInt(interes)
            capital = parseInt(capital)
            let t = capital + interes
            let dia = new Date().getDate();
            let mes = new Date().getMonth()+1;
            let ano = new Date().getFullYear();
            let valores = {
                concepto : 'capitalCreditos',
                valor: capital ,
                descripcion: 'ingreso pago totalidad capital credito',
                codigoEmpleado : this.codigo,
                fechaIngresoEfectivo : ano + "-" + mes + "-" + dia,
                idCredito: idc
            }
            this.axios.post(this.uri+"/api/contabilidad/guardarIngreso", valores)
            .then(res => {
                this.guardarIngresoInteresesTotal(interes,idc,idMarcarPago)
            })
            .catch(err => {
                console.log(err);
            });
        },
        guardarIngresoInteresesTotal(valorr,idc,idMarcarPago) {
            let dia = new Date().getDate();
            let mes = new Date().getMonth()+1;
            let ano = new Date().getFullYear();
            let valores = {
                concepto : 'interesCreditos',
                valor: valorr ,
                descripcion: 'ingreso pago totalidad intereses credito',
                codigoEmpleado : this.codigo,
                fechaIngresoEfectivo : ano + "-" + mes + "-" + dia,
                idCredito: idc,
                cedula:this.credito.cedula,
                nombreCliente:this.cliente.nombreCliente+' '+this.cliente.primerApellidoCliente+' '+this.cliente.segundoApellidoCliente,
            }  
            this.axios
            .post(this.uri+"/api/contabilidad/guardarIngreso", valores)
            .then(res => {
                this.cancelarCredito(idc,idMarcarPago)
            })
            .catch(err => {
                console.log(err);
            });
        },
        cancelarCredito(idd,idMarcarPago){
            const Id = {
                id : idd
            }
            this.axios.post(this.uri+"/api/creditos/cancelar", Id)
            .then(res => {
                this.marcarPagoRenovacion(idMarcarPago)
            })
            .catch(err => console.log(err));
        },
        marcarPagoRenovacion(id){
            let pagoRenovacion ={
                id : id
            }
            this.axios.post(this.uri+"/api/creditos/marcaPagoRenovacion", pagoRenovacion)
            .then(res => {
                this.spiner=false
                alert('se a actualizado')

                this.vercredito(pagoRenovacion)
                return
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
            return(valer)
        },
    }
}


</script>

<style>

</style>