<template>
  <div>
    <div class="container">
      <br>
      <table class="table table-hover">
        <thead>
          <tr>
            <th>producto</th>
            <th>valor</th>
            <th>cliente</th>
            <th>fecha de pago</th>
            <th>valor cuota</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(creditos, index) in creditosProd" :key="index">
            <td>{{creditos.servicio}}</td>
            <td>{{creditos.valTotalCred }}</td>
            <td>{{creditos.nombreCliente}}</td>
            <td>{{creditos.Fp}}</td>
            <td>{{creditos.valCuotaMens}}</td>
            <td><div class="btn btn-warning text-white"><b-icon-eye></b-icon-eye> Ver</div></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import f from "../funciones/funciones.js";
export default {
    name:'creditosProductos',
    props:['estado'],
    data() {
      return {
        creditosProd:[]

      }
    },
    created(){
        this.uri = f.uri
    },
    mounted(){
      this.verCreditosProductos()
    },
    methods:{
      verCreditosProductos(){
        this.axios.get(this.uri+'/api/creditos/creditosProductos')
        .then(res=>{
          console.log(res.data)
          this.creditosProd = res.data
        })
        .catch(err=>{console.log(err.response)})
      },
    }
}
</script>

<style>

</style>