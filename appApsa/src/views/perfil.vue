<template>
  <div class="perfil">
      <div><Barra></Barra></div>
      <verEmpleado v-if="verEmpleadoUnico" class="container" :id="emplead"/>
  </div>
</template>

<script>
import Barra from '../components/Barra.vue'
import verEmpleado from '../components/verEmpleadoUnico.vue'
import f from "../funciones/funciones.js";

export default {
    name:'perfil',
    components:{
        Barra,
        verEmpleado
    },
    data(){
        return{
            emplead:{},
            uri:'',
            user:{},
            verEmpleadoUnico:false
        }
    },
    created(){
        this.uri = f.uri
        this.axios.get(this.uri+'/api/login/usuario', {headers:{token:localStorage.getItem('token')}})
            .then(res => {
            this.user=res.data.user
            this.emplead={}
            this.emplead.cedulaE = this.user.codigo
            this.verEmpleadoUnico = true
            })
            .catch(err => {
            localStorage.clear()
            });
    },
    mounted(){
    },
    
    methods:{
    }
}
</script>

<style>

</style>