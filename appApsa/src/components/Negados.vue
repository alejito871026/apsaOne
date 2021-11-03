<template>
  <div class="negados">
      <div class="" v-if="!vercred">
        <h1 class="text-center p-4">Creditos Negados</h1>
        <div style="height: auto; max-height: 390px; overflow-y: scroll;">
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
              <tr v-for="credito in Creditos.slice().reverse()">
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
          <div class="card-header bg-white"><h2 class="text-center p-4">Credito Negado</h2><br></div>
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
          </div>
          <div class="card-footer">
            <button class="btn btn-success btn-block" @click="vercred = false">regresar</button>
          </div>
        </div>
      </div>  
  </div>
</template>

<script>
import f from "../funciones/funciones.js";

export default {
    name:'Negados',
    data(){
        return{
            Creditos : [],
            credito : {},
            texto:{},
            cliente:{},
            vercred : false,
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
            .get(this.uri+"/api/creditos/negados")
            .then(res => {
                this.Creditos = res.data;
                console.log(this.Creditos)
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
            this.verTexto(idCredito)
            this.verCliente(this.credito.cedula)
          })
          .catch(err=>{console.log(err)})
        },
      verTexto(id){
        this.axios.post(this.uri+'/api/creditos/desaprobadoU',id)
        .then(res => {
          this.texto = res.data[0]
          this.vercred = true
        })
        .catch(err=>{console.log(err)})
      },
      verCliente(cc){
          let cedulaCliente={
            cedulaId :cc
          }
          this.axios.post(this.uri+"/api/busqueda", cedulaCliente)
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