<template>
  <div>
    <br>
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
      <div class="input-group-prepend">
        <label class="input-group-text">Fecha inicio</label>
      </div>
      <input class="form-control mr-sm-2" id="uno" type="date" v-model="fUno">
      <div class="input-group-prepend">
        <label class="input-group-text">Fecha fin</label>
      </div>
      <input class="form-control mr-sm-2" id="dos" type="date" v-model="fDos">
      <button class="btn btn-success" @click="fechas(fUno,fDos)">Buscar</button>
    </nav>
    <br>
    
    <div id="tabla">
      <h2 class="p-4 text-center"><strong>Listado de pagos para las fechas establecidas</strong></h2>
      <table class="table table-hover border table-sm bg-white text-dark table-responsive-sm">
        <thead class="sticky-top text-white bg-dark">
          <tr>
            <th id="num">#</th>
            <th id="servicio">servicio</th>
            <th>Cliente</th>
            <th id="frecuencia">Frecuencia</th>
            <th>Fecha pago</th>
            <th>Valor cuota</th>
            <th id="estado">Estado</th>
            <th>Telefonos</th>
            <th>Direccion</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="credito, index in creditosPagar">
            <td id="num">{{credito.numeroCredito}}</td>
            <td id="servicio">{{credito.servicio}}</td>            
            <td >{{credito.nombreCliente}}</td>
            <td id="frecuencia">{{credito.frecuencia}}</td>
            <td>{{fecha(credito.Fp)}}</td>
            <td>{{credito.valCuotaMens}}</td>
            <td class="bg-danger" v-if="credito.enMora" id="estado">en mora</td>
            <td v-else id="estado">al dia</td>
            <td >{{credito.telefono}}</td>
            <td >{{credito.direccion}}</td>
          </tr>
        </tbody>
      </table>
    </div>
      <button class="btn btn-block bg-primary" @click="impripdf()" v-if="creditosPagar.length>0 "><h4><strong>Imprimir</strong></h4></button>
  </div>
</template>

<script>
import f from "../funciones/funciones.js";
import print from 'print-js'
export default {
    name:'listado',
    data(){
      return{
        fUno:'',
        fDos:'',
        creditosPagar:{},
        clientes: {},
        uri:''
      }
    },
    created(){
      this.uri = f.uri
    },
    
    methods:{
      fechas(funo,fdos){
        let valores = {
          funo: new Date(funo),
          fdos: new Date(fdos),
        }
        let a = 0
        let credit = []
        let n = []
        let yy = 0
        this.axios.post(this.uri+'/api/creditos/creditosApagar',valores)
        .then(res=>{          
          credit = res.data
            this.creditosPagar = credit
        })
        .catch(err=>{console.log(err)})        
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
      impripdf() {
       print({
          printable: 'tabla',
          targetStyles: ['*'],
          type: 'html',
          maxWidth:1200,
          style: '@page { landscape; }',
          ignoreElements:['num','estado']
        })
      }
    }    
}
</script>