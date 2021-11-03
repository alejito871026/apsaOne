<template>
  <div>
   <div class="row">
      <div class="container p-4  col-md-5">
        <div class="card text-center bg-primary text-white">
          <div class="card-header">
            <h3 class="p-2">Registrar Empleado</h3>
          </div>
          <div class="card-body">
            <form method="post" @submit.prevent="guardarEmpleado()">
              <div class="form-group">
                <span>
                  <h4>Nombre del Empleado</h4>
                </span>
                <input
                  v-model="empleado.nombreE"
                  type="text"
                  placeholder="Nombre completo"
                  class="form-control"
                />
              </div>
              <div class="row form-group">
                <div class="col-lg-6">
                  <span>1 Apellido</span>
                  <input
                    v-model="empleado.primerApellidoE"
                    required
                    type="text"
                    min="3"
                    placeholder="primer apellido"
                    class="form-control"
                  />
                </div>
                <div class="col-lg-6">
                  <span>2 apellido</span>
                  <input
                    v-model="empleado.segundoApellidoE"
                    required
                    type="text"
                    min="3"
                    placeholder="segundo apellido"
                    class="form-control"
                  />
                </div>
              </div>
              <div class="row form-group">
                <div class="col-lg-6">
                  <span>Cedula</span>
                  <input
                    v-model="empleado.cedulaE"
                    type="text"
                    placeholder="cedula"
                    class="form-control"
                  />
                </div>
                <div class="col-lg-6">
                  <span>Contraseña</span>
                  <input
                    v-model="empleado.contrasenaE"
                    type="password"
                    placeholder="Contraseña"
                    class="form-control"
                    disabled
                  />
                </div>
              </div>
              <div class="row">
                <div class="form-group col-lg-6">
                  <span>Telefono</span>
                  <input
                    v-model="empleado.celularE"
                    type="text"
                    placeholder="Telefono"
                    class="form-control"
                  />
                </div>
                <div class="form-group col-lg-6">
                  <span>Email</span>
                  <input
                    type="email"
                    placeholder="Email"
                    class="form-control"
                    v-model="empleado.emailE"
                  />
                </div>
              </div>
              <div class="row">
                <div class="form-group col-lg-6">
                  <span>fecha de nacimiento</span>
                  <input
                    v-model="empleado.fechaNacE"
                    type="date"
                    placeholder="Fecha de nacimiento"
                    class="form-control"
                  />
                </div>
                <div class="form-group col-lg-6">
                  <span>Rol</span>
                  <select v-model="empleado.rol" required class="col-lg-12 form-control">
                    <option v-if="suadmin">SUPERADMIN</option>
                    <option v-if="!suadmin">ADMIN</option>
                    <option v-if="!suadmin">EMPLEADO</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <span>Direccion</span>
                <input
                  v-model="empleado.direccionE"
                  type="text"
                  placeholder="Direccion"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <button class="btn btn-success btn-block">Guardar</button>
              </div>
            </form>
            <div class="form-group">
              <a class="btn btn-danger btn-block">regresar</a>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-7">
        <div v-if="!empleadoAbierto">
          <div v-if="!empleados">
            <h2 class="text-center p-4"> No existen Empleados registrados<br><strong>Registra el primero</strong></h2>
          </div>
          <div class="p-4" v-if="empleados">
            <h2 class="text-center p-4 bg-primary text-white">Empleados</h2>
            <br>          
            <div style="height: auto; max-height: 850px ; overflow-y: scroll;">
              <table class="table table-hover border table-sm  bg-white text-dark table-responsive-sm">
                <thead class="sticky-top text-white bg-dark">
                  <tr>
                    <th># Cedula</th>
                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th>Cel 1</th>
                    <th>Fecha agregado</th>
                    <th>Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="persona in empleados">
                    <td>{{persona.cedulaE}}</td>
                    <td>{{persona.nombreE}}</td>
                    <td>{{persona.primerApellidoE}} {{persona.segundoApellidoE}}</td>
                    <td>{{persona.celularE}}</td>
                    <td>{{persona.fechaAgregado}}</td>
                    <button class="btn btn-primary btn-sm" @click="verEmpleadoUnico(persona.cedulaE)">ver empleado</button>                
                    <button class="btn btn-primary btn-sm" @click="enviarMensaje(persona.cedulaE)">msn</button>             
                  </tr>
                </tbody>
              </table>
            </div>        
          </div>
        </div>
        <div>
          <verEmpleado v-if="empleadoUnico" class="container" :id="emplead"/>
          <div v-if="empleadoUnico" class="container">
            <br>
            <button  class="btn btn-warning btn-block" @click="empleadoUnico=false, empleadoAbierto=false"><h2><strong>Cerrar empleado</strong></h2></button>
          </div>
        </div>
      </div>
   </div>
  </div>
</template>

<script>
class empleado {
  constructor(
    nombreE,
    primerApellidoE,
    segundoApellidoE,
    cedulaE,
    contrasenaE,
    celularE,
    direccionE,
    emailE,
    fechaNacE,
    rol,
    fechaAgregado
  ) {
    this.nombreE = nombreE;
    this.primerApellidoE = primerApellidoE;
    this.segundoApellidoE = segundoApellidoE;
    this.cedulaE = cedulaE;
    this.contrasenaE = 123456;
    this.celularE = celularE;
    this.direccionE = direccionE;
    this.emailE = emailE;
    this.rol = rol;
    this.fechaAgregado =
      new Date().getDate() +
      "/" +
      (new Date().getMonth() + 1) +
      "/" +
      new Date().getFullYear();
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
import axios from 'axios'
import verEmpleado from '../components/verEmpleadoUnico.vue'
import f from "../funciones/funciones.js";

export default {
  name: "clientes",
  components: {
    verEmpleado,
  },
  data() {
    return {
      empleado: new empleado(),
      user: new usuario(),
      persona: [],
      suadmin:false,
      uri:'',
      empleados:false,
      emplead:{},
      empleadoUnico:false,
      empleadoAbierto:false,
    };
  },
  created() {
    this.uri = f.uri
    let token = localStorage.getItem('unicaRSU')
    if (token != null){
      const unica = this.CryptoJS.HmacSHA1("*DAhd871026#",'*DAhd871026#')
      const dos = this.CryptoJS.HmacSHA1(unica,'*DAhd871026#') 
        if (token == dos){
          this.suadmin = true
          localStorage.clear()
        }
      }
  },
  mounted() {
    if(this.suadmin == false){
      axios.get(this.uri+'/api/login/usuario', {headers:{token:localStorage.getItem('token')}})
      .then(res => {
        this.user=res.data.user
      })
    }
    this.verEmpleados()
  },
  
  methods: {
    enviarMensaje(cedula){
      const contras = "JDhd950402-*/#$%04286482762111dhAD#d06845620178%$102687JdHd020495dDAhd*#&%"
      cedula=cedula.toString()
      let iid = this.CryptoJS.AES.encrypt(cedula, contras).toString();
      iid = this.CryptoJS.AES.encrypt(iid, contras).toString();
      const dat = {
        Xvalid : iid
      }
        axios.post(this.uri+'/api/empleados/enviarMensaje',dat)
        .then(res => {
          console.log(res.data)
          this.spiner = false
        })    
        .catch(err => {console.log(err),this.spiner=false});  
    },
    guardarEmpleado() {
      const muestra = confirm(
        "seguro de agregar empleado" + JSON.stringify(this.empleado)
      );
      if (muestra) {
        this.axios
          .post(this.uri+"/api/login/registro", this.empleado)
          .then(res => {
            this.empleado = new empleado();
            this.verEmpleados()
          })
          .catch(err => {
            console.log(err.response);
            alert(
              "Empleado no registrado, la Cedula # " +
                this.empleado.cedulaE +
                "  ya se encuentra registrada"
            );
          });
      }
    },
    verEmpleados(){
      this.axios.get(this.uri+'/api/empleados/empleados')
      .then(res=>{
        this.empleados = res.data
      })
      .catch(err=>{})
    },
    verEmpleadoUnico(cedula){
      this.emplead = {}
      this.empleadoAbierto = true
      this.emplead.cedulaE = cedula
      this.empleadoUnico = true
    }
  }
};
</script>

<style>
</style>