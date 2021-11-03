<template>
<div class="cupoapsa">
    <div><Barra/></div>
    <h2><strong>aca encontraras los cupos aprovados y todo lo relacionado a los movimientos </strong></h2>
</div>
</template>

<script>
import Barra from '../components/Barra.vue'
import f from "../funciones/funciones.js";

export default {
    name:'Cupo',
    components: {
        Barra,
        uri:'',
    },
    created(){
        this.uri = f.uri
    },
    methods :{
        verCreditos(){}
        
    },
}

</script>

<style>

</style>