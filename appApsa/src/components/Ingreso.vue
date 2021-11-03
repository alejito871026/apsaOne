<template>
  <div  class="col-md-12 row">
     <div class="col-md-4"></div>
       <div class="card col-md-4">
         <div class="card-header bg-white">
           <h1 class="text-center">ingreso de efectivo al sistema</h1>
         </div>
          <div class="card-body justify-content-center">
            <h3 class="text-center">Valor a ingresar $</h3>
            <br>
            <input type="number" min="0" class="col-md-12" v-model="Ingreso.valor">
            <br>
            <br>  
            <h3 class="text-center">Descripcion del ingreso</h3>
            <br>
            <textarea class="col-md-12" rows="4" v-model="Ingreso.descripcion"></textarea>
         </div>
         <div class="card-footer bg-white">
           <div class="btn-group mb-3 col-lg-12">
            <div class="btn btn-warning" @click="guardarIngreso()">Guardar Ingreso</div>
            <div class="btn btn-warning" @click="verCapital()">ver</div>
          </div>
         </div>
       </div>
       <div class="col-md-4"></div>
   </div>
</template>

<script>
class capital {
  constructor (){
    this.totalIngresosEgresos = '';  
    this.totalCapital = '';
    this.totalIntereses = '';
    this.totalIngresos = '';
    this.totalEgresoso = '';
  }
}
class ingreso {
  constructor (){
    this.concepto = '';  
    this.valor = '';
    this.descripcion = '';
    this.idCredito = '';
    this.codigoEmpleado = '';
    this.fechaIngresoEfectivo = '';
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
import f from "../funciones/funciones.js";

export default {
    name: 'Ingreso',
    props: ["clear"],
    created() {
       this.uri = f.uri
        if(localStorage.getItem ('token') === null){
            this.adentro=false
        }else{
        this.axios.get('/api/login/usuario', {headers:{token:localStorage.getItem('token')}})
            .then(res => {
            this.user=res.data.user
            this.codigo = this.user.codigo
            })
        }
        this.verCapital()
    }, 
    mounted (){
     
    },
    data(){
        return {
            Capital : new capital(),
            Ingreso: new ingreso (),
            user : new usuario (),
            codigo : '',
            uri:''
        }
    },
    methods :{
        guardarIngreso(){
            let dia = new Date().getDate()
            let mes = new Date().getMonth()+1
            let ano = new Date().getFullYear()
            this.Ingreso.concepto = 'otros'
            this.Ingreso.codigoEmpleado = this.codigo
            this.Ingreso.fechaIngresoEfectivo =  new Date(ano,mes, dia), 
            this.axios.post(this.uri+'/api/contabilidad/guardarIngreso',this.Ingreso)
            .then(res =>{
                this.guardarCapital()
            })
            .catch(err =>{console.log(err)})
        },
        guardarCapital(){
            let dia = new Date().getDate()
            let mes = new Date().getMonth()+1
            let ano = new Date().getFullYear()
            this.Ingreso.concepto = 'otros'
            this.Ingreso.codigoEmpleado = this.codigo
            this.Ingreso.fechaIngresoEfectivo =  new Date(ano,(mes+1), dia), 
            this.axios.post(this.uri+'/api/contabilidad/guardarCapital',this.Ingreso)
            .then(res =>{

            })
            .catch(err =>{console.log(err)})
        },
        verCapital(){
            this.axios.get(this.uri+'/api/contabilidad/verCapital')
            .then(res =>{
                this.Capital = res.data
            })
            .catch(err =>{console.log(err)})
        },

    }
}

</script>

<style>

</style>