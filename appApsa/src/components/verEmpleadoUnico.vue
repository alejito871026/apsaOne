<template>
    <div>
        <br>
      <div class="card text-center">
          <div class="card-header bg-primary p-4">
              <h1 class=" text-white"><strong>Empleado</strong></h1>
          </div>
          <div class="card-body">
              <div class="form-group border-bottom border-primary">
                <h3><span>Nombre cliente:</span></h3>
                  <h2><strong>{{personaUnica.nombreE}} {{personaUnica.primerApellidoE}}  {{personaUnica.segundoApellidoE}}</strong></h2>
              </div>
              <div class="form-group border-bottom border-primary">
                <h3><span># cedula:</span></h3>
                  <h2><strong>{{personaUnica.cedulaE}}</strong></h2>
              </div>
              <div class="row border-bottom border-primary">
                <div class="form-group col-md-6">
                  <h3><span># Celular:</span></h3>
                    <h2><strong>{{personaUnica.celularE}}</strong></h2>
                </div>
                <div class="form-group col-md-6">
                  <h3><span># Direccion:</span></h3>
                    <h2><strong>{{personaUnica.direccionE}}</strong></h2>
                </div>
              </div>
              <div class="row border-bottom border-primary p-3">
                <div class="form-group col-md-4">
                  <h3><span>Email:</span></h3>
                    <h2><strong>{{personaUnica.emailE}}</strong></h2>
                </div>
                <div class="form-group col-md-4">
                  <h3><span>Fecha Nacimiento:</span></h3>
                    <h2><strong>{{personaUnica.fechaNacE}}</strong></h2>
                </div>
                <div class="form-group col-md-4">
                  <h3><span>Fecha agregado:</span></h3>
                    <h2><strong>{{personaUnica.fechaAgregado}}</strong></h2>
                </div>
              </div>
              <div class="row border-bottom border-primary p-3">
                <div class="form-group col-md-12">
                  <h3><span>Rol:</span></h3>
                    <h2><strong>{{personaUnica.rol}}</strong></h2>
                </div>
              </div>
          </div>
        </div>
    </div>
</template>

<script>
import f from "../funciones/funciones.js";

export default {
    name:'verEmpleadoUnico',
    props:['id'],
    data(){
        return {
            personaUnica:{},
            uri:''
        }
    },
    created(){
      this.uri = f.uri
    },
    mounted(){
        this.verEmpleado(this.id)
    },
    methods:{
       verEmpleado(id){
            let idd = {
               cc:id.cedulaE
           }
           this.axios.post(this.uri+'/api/login/verCreador',idd)
           .then(res=>{
               this.personaUnica = res.data.data
           })
           .catch(err=>{console.log(err)})
       } 
    }
}
</script>

<style>

</style>