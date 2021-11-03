<template>
  <div>
    <div>
      <div>
      <h2 class="text-center p-4 bg-primary text-white">Creditos </h2>
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand href="/">Convenios APSA</b-navbar-brand>
        <b-navbar-toggle target="nav-collaps"></b-navbar-toggle>
        <b-collapse id="nav-collaps" is-nav>
          <b-navbar-nav class="ml-auto">
            <ul class="navbar-nav ">
                <li class="btn btn-warning btn-sm" @click="solicitud = true, validados = false, activo = false, listados =false, desAprobados =false, negados = false, mora = false, terminado = false">
                    Solicitudes
                  </li>
                  <li class="btn btn-success btn-sm" @click="solicitud = false, validados = true, activo = false, listados =false, desAprobados =false, negados = false, mora = false, terminado = false">
                    Aprobados
                  </li>
                  <li class="btn btn-primary btn-sm" @click="activo = true, solicitud = false, validados = false, listados =false, desAprobados =false, negados = false, mora = false, terminado = false">
                    Activos
                  </li>              
                  <li class="btn btn-danger btn-sm" @click="mora = true, solicitud = false, validados = false, activo = false, listados =false,negados = false, desAprobados =false, terminado = false">
                    En mora
                  </li>
                  <li class="btn btn-info btn-sm" @click="desAprobados = true, solicitud = false, validados = false, activo = false, listados =false,negados = false, mora = false, terminado = false">
                    No Aprobados
                  </li>
                  <li class="btn btn-success btn-sm" @click="terminado = true, listados = false, activo = false, solicitud = false, validados = false,desAprobados =false, negados = false, mora = false">
                    terminados
                  </li>
                  <li class="btn btn-primary btn-sm" @click="listados = true, activo = false, solicitud = false, validados = false,desAprobados =false, negados = false, mora = false, terminado = false">
                    listados
                  </li>
              </ul>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <Solicitudes v-if="solicitud" :respu="respues"/>
    <Aprovados v-if="validados" />
    <creditos-activos v-if="activo"/>
    <listado v-if="listados"/>
    <desaprobados v-if="desAprobados"/>
    <enMora v-if="mora"/>
    <terminados v-if="terminado"/> 
  </div>
</div>
</template>

<script>
class respu {
  constructor(respuesta) {
    this.respuesta = respuesta;
  }
}
import axios from 'axios'
import Solicitudes from '../components/Solicitudes.vue'
import Aprovados from '../components/Aprovados.vue'
import creditosActivos from '../components/creditosActivos.vue'
import listado from '../components/listado.vue'
import desaprobados from '../components/Desaprovados.vue'
import enMora from '../components/enMora.vue'
import terminados from '../components/Terminados.vue'
import f from "../funciones/funciones.js";

export default {
  name: "credito",
  components :{
    Solicitudes,
    Aprovados,
    creditosActivos,
    listado,
    desaprobados,
    enMora,
    terminados,
  },
  data() {
    return {
      solicitud :false,
      validados : false,
      activo  : false,
      listados : false,
      desAprobados : false,
      negados:false,
      mora:false,
      terminado:false,
      respuesta: {},
      uri:''
    };
  },
  created(){
    this.uri = f.uri
  },
  mounted() {    
    if (localStorage.getItem("token") === null) {
      this.$router.push("/inicioSesion");
    }else{
    this.axios
      .get(this.uri+"/api/login/usuario", {
        headers: { token: localStorage.getItem("token") }
      })
      .then(res => {
        this.user = res.data.user;
      })
      .catch(err => {
        localStorage.clear();
                  
      });
    }      
    this.respues = new respu()
    this.respues = this.respu
    this.solicitud = true
  },
  props: ["respu"],
  methods: {
    solicitudes() {
      this.solicitud = true
    },
    aprovados(){
      this.solicitud = false
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
