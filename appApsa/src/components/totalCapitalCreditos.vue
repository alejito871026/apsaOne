<template>
    <div class="col-lg-12">
        <div style="height: auto;" class="col-md-12  border border-danger p-4">
            <!--<div class="container input-group mb-3"><h2>Buscar por cedula o nombre</h2><input type="text" class="form-control" v-model="nombreOcedula" @keyup="busqueda()"></div>-->
            <table class="table table-hover border table-sm bg-white text-dark table-responsive-sm">
                <thead class="sticky-top text-white bg-dark">
                <tr>
                    <th>*</th>
                    <th>#</th>
                    <th>Nombre cliente</th>
                    <th>Cedula cliente</th>
                    <th>A interes:<input type="text" class="form-control bg-white" disabled v-money="money" v-model="interes"></th>
                    <th>A capital:<input type="text" class="form-control bg-white" disabled v-money="money" v-model="capital"></th>
                    <th>Total: <input type="text" class="form-control bg-white" disabled v-money="money" v-model="total"></th>
                    <br>
                    <button class="btn btn-warning btn-sm" v-if="!ver" @click="ver=true">ver</button>
                    <button class="btn btn-warning btn-sm" v-if="ver" @click="ver=false">ocultar</button>
                </tr>
                </thead>
                <tbody v-if="ver">
                    <tr v-for="estado,index in estados">
                        <td>{{index+1}}</td>
                        <td><input type="text" class="form-control bg-white" disabled v-model="estado.numeroC"></td></td>
                        <td><input type="text" class="form-control bg-white" disabled v-model="estado.nombreCliente"></td>
                        <td><input type="text" class="form-control bg-white" disabled v-model="estado.cedula"></td>
                        <td><input type="text" class="form-control bg-white" disabled v-money="money" v-model="estado.interes"></td>
                        <td><input type="text" class="form-control bg-white" disabled v-money="money" v-model="estado.capital"></td>
                        <td><input type="text" class="form-control bg-white" disabled v-money="money" v-model="estado.total"></td>                               
                    </tr>
                </tbody>
            </table> 
        </div>
        <b-modal v-model="viendoPagos" size='xl' noCloseOnBackdrop centered hideFooter hideHeader >
            <div class="card">
                <div class="card-header text-center bg-primary"><h2><strong>INFORMACION DEL CREDITO # {{unico.numeroC}}</strong></h2></div>
                <div class="card-body">
                    <div class="input-group mb-3">
                        <span class="input-group-text" >Nombre del Cliente</span>
                        <div class="form-control">{{unico.nombreCliente}}</div>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text">Capital Prestado</span>
                        <div class="form-control">{{totalCapitalCredito}}</div>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text">Tasa de interes Mensual</span>
                        <div class="form-control">{{vInteres}}</div>
                        <span class="input-group-text">Interes Mensual</span>
                        <div class="form-control">{{totalInteres}}</div>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text">Total Credito</span>
                        <div class="form-control">{{totalCredito}}</div>
                    </div>
                     <div class="input-group mb-3">
                        <span class="input-group-text">Saldo a capita</span>
                        <div class="form-control">{{unico.capital}}</div>
                    </div>
                     <div class="input-group mb-3">
                        <span class="input-group-text" >Saldo a interes</span>
                        <div class="form-control">{{unico.interes}}</div>
                    </div>
                     <div>
                        <h2 class="text-center"><strong>PAGARES</strong></h2>
                        <div class="input-group mb-1 sm" v-for="(pagos, index) in unico.pagares" :key="index">
                            <span class="input-group-text bg-success" v-if="pagos.estado">Pagare # {{index+1}}</span>
                            <span class="input-group-text bg-warning" v-if="pagos.estado ==false">Pagare # {{index+1}}</span>
                            <div class="form-control">Capital: {{pagos.valorCuota}}</div>
                            <div class="form-control">Interes: {{pagos.interesCuota}}</div>
                            <div class="form-control" v-if="pagos.abono>0">Abono: {{pagos.abono}}</div>
                            <div class="form-control alert alert-primary" v-if="pagos.abono>0">Total: {{pagos.valorCuota+pagos.interesCuota-pagos.abono}}</div>
                            <div class="form-control alert alert-primary" v-else>Total: {{pagos.valorCuota+pagos.interesCuota}}</div>
                            <div class="form-control bg-primary text-white">fp: {{pagos.ano+'-'+pagos.mes+'-'+pagos.dia}}</div>
                            <div class="form-control btn  btn-info text-white" v-if="!pagos.estado" @click="pagarCuota(pagos)">Pagar Cuota</div>                                                      
                            <div class="form-control btn  btn-secondary text-white" v-if="!pagos.estado && pagos.estado ==false" @click="abonarCuota(pagos.valorCuota,pagos.interesCuota,pagos.abono,index)">Abonar</div>                                                 
                        </div>
                     </div>
                </div>
                <div class="card-footer">
                    <div class="btn btn-danger btn-block" @click="viendoPagos=false"> Cerrar</div>
                </div>
            </div>
        </b-modal>
        <b-modal v-model="abonar" size='sm' noCloseOnBackdrop centered hideFooter hideHeader>
            <h2 class="text-center">Guardar abono en cuota # {{indexx + 1}}</h2>
            <div class="input-group mb-1">
                <span class="input-group-text">Valor cuota</span>
                <div class="form-control">{{valorCuota}}</div>    
            </div>
            <div class="input-group mb-1">
                <input class="form-control " v-if="abonar" v-model="valorAbono">
                <div class="form-control btn  btn-primary" v-if="abonar" @click="guardarAbono()">Guardar</div>    
            </div>
            <div class="form-control btn  btn-danger" v-if="abonar" @click="cancelarAbono()">Cancelar</div>
        </b-modal>
        <br><br>
        <!--<button @click="agregarCreditosBase()">agregarNuevos</button>-->
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
import { VMoney } from "v-money";
import f from '../funciones/funciones';
import { parse, resolve } from 'path';
export default {
    name:'tcc',
    data(){
        return {
            money: new moneey(),
            total:0,
            uri:'',
            estados:[],
            estadoss:[],
            total:0,
            capital:0,
            interes:0,
            ver:false,
            activos:[],
            pagares:[],
            viendoPagos:false,
            unico:{},
            totalCapitalCredito:0,
            totalInteres:0,
            totalCredito:0,
            valorAbono:0,
            valorCuota:0,
            abonar:false,
            indexx:0,
            nombreOcedula:0,
            fecha: '',
            vInteres:0,
            intt : 0,
            creditos:[],
        }
    },
    created(){
        this.uri = f.uri
    },
    mounted(){
        this.sumarTotalCapital()
        //this.actualizar()
        //this.agregate()
        
    },
    methods:{
        agregate(){
            this.axios.get(this.uri+'/api/creditos/duplicados')
            .then(res=>{
                console.log(res.data)
                
            })
            .catch(err=>{console.log(err)})
        },
        busqueda(){
            let persona = {}
            if(this.nombreOcedula!=''){
                let res = isNaN(this.nombreOcedula)
                if(res){
                    persona.nombre = this.nombreOcedula
                    this.axios.post(this.uri+'/api/creditos/busquedaNombre',persona)
                    .then(res=>{
                        if(res.data.length){
                            this.estados = res.data
                            this.ver =  true
                        }else{
                            this.estados = this.estadoss
                            this.ver =  false
                        }                        
                    })
                    .catch(err=>{console.log(err)
                    this.ver =  false})
                }else{
                    persona.cedula = this.nombreOcedula
                    this.axios.post(this.uri+'/api/creditos/busquedaCedula',persona)
                    .then(res=>{
                        console.log(res.data)
                        if(res.data.length){
                            this.estados = res.data
                            this.ver =  true
                        }else{
                            this.estados = this.estadoss
                            this.ver =  false
                        } 
                    })
                    .catch(err=>{console.log(err)
                    this.ver=false})                    
                }
            }else{
                this.estados = this.estadoss
                this.ver = false
            }  
        },
        pagarCuota(cuota){
            console.log(cuota)
        },
        abonarCuota(capital,interes,abono,index){
            this.indexx = index 
            this.valorCuota = capital+interes-abono
            this.abonar = true
        },
        cancelarAbono(){
            this.abonar = false
        },
        verPagos(estado){
            this.unico = estado
            //this.verFecha(this.unico._id)
            this.totalCapitalCredito = this.unico.pagares[0].valorCuota* this.unico.pagares.length
            this.totalInteres = this.unico.pagares[0].interesCuota
            let totalInteress = this.unico.pagares[0].interesCuota* this.unico.pagares.length
            this.totalCredito = this.totalCapitalCredito + totalInteress
            this.vInteres = this.totalInteres * 100 / this.totalCapitalCredito
            let interes = this.vInteres
            if (interes >1.5&& interes<3){
                this.vInteres = this.vInteres*2
            }
            if(interes <=1.5){
                this.vInteres = this.vInteres*4
            }
            this.vInteres = Math.round(this.vInteres * 100) / 100
            this.viendoPagos = true
            let  valores={ 
                totalCC : this.unico.pagares[0].valorCuota* this.unico.pagares.length,
                totalIn : this.unico.pagares[0].interesCuota* this.unico.pagares.length,
                inte : this.vInteres,
            }
            return valores
        },
        verFecha(id){
            let idd = {
                id
            }
            this.axios.post(this.uri+'/api/creditos/fechaC',idd)
            .then(res=>{
                this.fecha = res.data
            })
            .catch(err=>{console.log(err)})
        },
        sumarTotalCapital(){
            this.axios.get(this.uri+'/api/creditos/verEstadoPagos')
            .then(res=>{
                this.activos = res.data
                //this.guardarPagaresCreditosActivos()
                this.estados = res.data
                this.estadoss = res.data
                this.sumar(this.estados)
                //this.crearCreditos()
            })
            .catch(err=>{console.log(err)})
        },
        crearCreditos(){
            console.log('se esat ejecutando')
            let dia = new Date().getDate();
            let mes = new Date().getMonth()+1;
            let ano = new Date().getFullYear(); 
            let credito = {}
            let creditos = this.estadoss
            let nuevos = []
            for (let a = 0; a < creditos.length; a++) {
                if(creditos[a].numeroC<642){
                    credito = {};
                    let valores = this.verPagos(creditos[a])
                    credito.nombreCliente = creditos[a].nombreCliente;
                    credito.cedula = creditos[a].cedula;
                    credito.servicio = 'Recuperacion';
                    credito.cantidad = valores.totalCC;
                    credito.interes = valores.inte;
                    credito.cuotaInicial = 0;
                    credito.cuotaInicialEntregada = true;
                    credito.cuotaInicialRecibidaPor = null;
                    credito.tiempo = 100;
                    credito.frecuencia = 'quincenall';
                    credito.interesMensual = 'xxxxxx';
                    credito.valTotalCred = valores.totalCC + valores.totalIn;
                    credito.valCuotaMens = 'xxxxxx';
                    credito.fechaAgregado = (ano+'-'+mes+'-'+dia);
                    credito.estado = 'activo';
                    credito.estadoInterno = 'entregado';
                    credito.clienteInformado = true;
                    credito.pagares = creditos[a].idPags,
                    credito.numeroCredito = creditos[a].numeroC;
                    credito.Fp = null;
                    credito.fiador = null;
                    credito.infoLab = '';
                    credito.referidos = null;
                    credito.creadoPor = '1112762846';
                    credito.aprovadoRechazadoPor = '1112762846';
                    credito.valorTotal = valores.totalCC + valores.totalIn;
                    nuevos.push(credito) 
                }
                               
            }
            console.log(nuevos)
            this.creditos = nuevos
        },
        agregarCreditosBase(){
            for(let a = 2 ; a <= this.creditos.length-1 ; a++){
                let b = {}
                b = this.creditos[a]
                this.axios.post(this.uri+'/api/creditos/nuevos',b)
                .then(res=>{
                    console.log('exito')
                })
                .catch(err=>{console.log(err)})
            }
        },
        sumar(datos){
            let total = 0
            let interes = 0
            let capital = 0
            for(let a = 0; a<=datos.length-1; a++){
                total = total+datos[a].total
                interes = interes+datos[a].interes
                capital = capital+datos[a].capital
            }
            this.total = total
            this.interes = interes
            this.capital = capital
        },
        guardarPagaresCreditosActivos(){
            let numero = {}
            for(let a  = 0; a <this.activos.length;a++){
                if(this.activos[a].numeroC>2){
                    //this.actualizar(this.activos[a].numeroC)
                }else{
                    console.log('esuno')
                }
                
            }
        },
        actualizar(numero){
            let n ={
                numero
            }
            this.axios.post(this.uri+'/api/creditos/actualizarActivos',n)
                .then(res=>{
                    console.log(res.data.numero)
                    this.enviarId(res.data)
                })
                .catch(err=>{console.log(err)})
        },
        enviarapagas(pags){
            this.axios.post(this.uri+"/api/creditos/agregarPags",pags)
            .then(res=>{
                   console.log(res.data)
                })
            .catch(err=>{
                console.log(err)
            })
        },
        enviarId(pags){
            console.log(pags._id)
            this.axios.post(this.uri+"/api/creditos/agregarId",pags)
            .then(res=>{
                   console.log(res.data)
                })
            .catch(err=>{
                console.log(err)
            })
        },
    }
}
</script>

<style>

</style>