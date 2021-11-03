<template>
  <div class="agregarCliente">
    <div>
      <Barra />
    </div>
    <div class="row">
      <div class="container p-4 col-md-5">
        <div class="mx-auto">
          <div class="card bg-primary text-white">
            <div class="card-head p-2">
              <div class="p-2 bg-primary text-center">
                <h2 v-if="registrar" class="p-3"><strong>Agregar nuevo Cliente</strong></h2>
                <h2 v-if="reguardar" class="p-3"><strong>Editando Cliente</strong></h2>
              </div>
            </div>
            <div class="card-body">
              <form @submit.prevent="validarCliente">
                <div class="form-group">
                  <span>Nombre Cliente</span>
                  <input
                    v-model="cliente.nombreCliente" required type="text" min="3" placeholder="Nombre" class="form-control"/>
                </div>
                <div class="row form-group">
                  <div class="col-lg-6">
                    <span>1 Apellido</span>
                    <input
                      v-model="cliente.primerApellidoCliente" required type="text" min="3" placeholder="primer apellido" class="form-control" />
                  </div>  
                  <div class="col-lg-6">
                    <span>2 apellido</span>
                      <input
                      v-model="cliente.segundoApellidoCliente" required type="text" min="3" placeholder="segundo apellido" class="form-control"/>
                  </div>
                </div>  
                <div v-if="registrar">
                <div class="form-group" >
                  <span>Numero de Cedula cliente</span>
                  <input
                    v-model="cliente.cedulaId"
                    required
                    type="text"
                    min="7"
                    placeholder="CC"
                    class="form-control"
                  />
                </div>
                </div>
                <div  v-if="reguardar"> 
                <div class="form-group" >
                  <span>Numero de Cedula cliente</span>
                  <input
                    v-model="cliente.cedulaId"
                    disabled
                    type="text"
                    class="form-control"
                  />
                </div>
                <div class="form-group" >
                  <span>Descripcion de la modificacion</span>
                  <textarea
                    v-model="cliente.modificacion"
                    required
                    type="text"
                    class="form-control"
                  />
                </div>
                </div>
                <div class="row form-group">
                  <div class="col-lg-6">
                    <span>Celular</span>
                    <input
                    v-model="cliente.celularUno"
                    required
                    type="text"
                    min="10"
                    placeholder="Celular personal"
                    class="form-control "
                  />
                  </div>  
                  <div class="col-lg-6">
                    <span>Otro Numero de contacto</span>
                     <input
                    v-model="cliente.celularDos"
                    required
                    type="text"
                    min="10" placeholder="Otro numero de contacto" class="form-control"
                  />
                  </div>
                </div> 
                <div class="row form-group">
                <div class=" col-md-4">
                  <span>Direccion</span>
                  <input
                    v-model="cliente.direccionCliente"
                    required
                    type="text"
                    min="13"
                    placeholder="Direccion"
                    class="form-control"
                  />
                </div>
                <div class="col-md-4">
                  <span>Barrio</span>
                  <input
                    v-model="cliente.barrioCliente"
                    required
                    type="text"
                    min="13"
                    placeholder="Direccion"
                    class="form-control"
                  />
                </div>
                <div class="col-md-4">
                  <span>Ciudad</span>
                  <input
                    v-model="cliente.ciudadCliente"
                    required
                    type="text"
                    min="13"
                    placeholder="Direccion"
                    class="form-control"
                  />
                </div>                
                </div>               
                
                <div class="row form-group">
                <div class=" col-md-4">
                  <span>Tipo de vivienda</span>
                  <select v-model="cliente.tViviendaCliente" required  class="custom-select">
                    <option value="propia">Propia</option>
                    <option value="familiar">Familiar</option>
                    <option value="alquiler">Alquiler</option>
                  </select>
                </div>
                <div class="col-md-4">
                  <span>Ocupacion</span>
                  <input
                    v-model="cliente.OcupacionCliente"
                    required
                    type="text"
                    placeholder="Ocupacion"
                    class="form-control"
                  />
                </div>
                <div class="col-md-4">
                  <span>Personas a cargo</span>
                  <input
                    v-model="cliente.PcargoCliente"
                    required
                    type="number"
                    min="0"
                    class="form-control"
                  />
                </div>                
                </div>
                <div class="row form-group">
                <div class="col-md-6">
                  <span>Email</span>
                  <input
                    v-model="cliente.email"
                    type="email"
                    min="13"
                    placeholder="Email"
                    class="form-control"
                  />
                </div>
                <div class=" col-md-6">
                  <span>Edad</span>
                  <input
                    v-model="cliente.edadCliente"
                    required
                    type="number"
                    min="16"
                    class="form-control"
                  />
                </div>              
                </div>
                <div class="form-group" v-if="registrar">
                  <button class="btn btn-success btn-block"><h2><strong>Registrar Cliente</strong></h2></button>
                </div>
              </form>
              
              <div class="" v-if="registrar">
                  <button class="btn btn-danger btn-block" @click="cancelar()"><h2><strong>Cancelar</strong></h2></button>
                </div>
                <div class="form-group" v-if="reguardar" >
                  <button class="btn btn-success btn-block" @click="reguardarCliente(cliente)"><h2><strong>Guardar Cliente</strong></h2></button>
                   <button @click="cerrarPersona()" class="btn btn-danger btn-block"><h2><strong>Cancelar</strong></h2></button>
                </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container p-4 col-lg-7" v-if="creditos">
        <h2 class="text-center p-4 bg-primary text-white">Clientes Activos</h2>
        <br>
        <div v-if="busqueda">
            <div class="input-group mb-3">
                <form class="form-inline"  @submit.prevent="buscandoNombre(buscar2,buscar3)">
                  <span><h2><strong>Buscar por Nombre </strong> </h2></span>
                    <input class="form-control mr-sm-2" type="text" v-model="buscar2" placeholder="Nombres">
                    <input class="form-control mr-sm-2" type="text" v-model="buscar3" placeholder="Primer apellido">
                    <button class="btn btn-success">Buscar</button>
                </form>
            </div>
            <div class="input-group mb-3">
                <form class="form-inline"  @submit.prevent="buscando(buscar)">
                  <span><h2><strong>Buscar por # cedula </strong> </h2></span>
                    <input class="form-control mr-sm-2" type="number" v-model="buscar" @keyup.delete="recargar()" @focus="buscar2='',buscar3=''">
                    <button class="btn btn-success">Buscar</button>
                </form>
            </div>
            <button class="btn btn-block btn-primary" v-if="mostrarTodo" @click="fetchClientes(), recargar()">Mostrar todos</button>
        </div>
        <div v-if="alerta" class="text-center">
            <div class="alert alert-danger">
                <strong>Oops!</strong> No existen <a class="alert-link">creditos aprobados, asociados a este numero de cedula</a>.
            </div>
        </div>
        <div v-if="alerta2" class="text-center">
            <div class="alert alert-danger">
                <strong>Oops!</strong> Esta vacio <a class="alert-link">Debes escribir un numero de cedula</a>.
            </div>
        </div>
        <div v-if="alerta3" class="text-center">
            <div class="alert alert-danger">
                <strong>Oops!</strong> Son letras <a class="alert-link">Debes escribir un numero de cedula</a>.
            </div>
        </div>
        <div v-if="alerta4" class="text-center">
            <div class="alert alert-danger">
                <strong>Oops!</strong> Esta vacio <a class="alert-link">Debes escribir un nombre</a>.
            </div>
        </div>
        <div v-if="alerta5" class="text-center">
            <div class="alert alert-danger">
                <strong>Oops!</strong> Contiene numeros <a class="alert-link">Debes escribir solo letras para la busqueda</a>.
            </div>
        </div>
        <div v-if="alerta6" class="text-center">
            <div class="alert alert-danger">
                <strong>Oops!</strong> No existen <a class="alert-link">creditos aprobados, asociados a este nombre</a>.
            </div>
        </div>        
        <div v-if="sinClientes">
          <h2 class="text-center p-4"> No existen Clientes Registrados<br>Registra el primero</h2>
        </div>
        <div style="height: auto; max-height: 850px ; overflow-y: scroll;" v-if="clientesActivos">
          <table class="table table-hover border table-sm  bg-white text-dark table-responsive-sm">
            <thead class="sticky-top text-white bg-dark">
              <tr>
                <th># Cedula</th>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Cel 1</th>
                <th>Fecha agregado</th>
                <th>cupo</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="persona in clientesitos">
                <td>{{persona.cedulaId}}</td>
                <td>{{persona.nombreCliente}}</td>
                <td>{{persona.primerApellidoCliente}} {{persona.segundoApellidoCliente}}</td>
                <td>{{persona.celularUno}}</td>
                <td>{{persona.fechaAgregado}}</td>
                <td v-if="persona.estadoCupo">cupo activo</td>
                <td v-if="!persona.estadoCupo">Sin cupo asignado</td>
                <button class="btn btn-primary btn-sm" @click="verCliente(persona.cedulaId)">ver cliente</button>
                <button class="btn btn-info btn-sm" @click="almacenar(persona.cedulaId)">copiar cedula</button>                
              </tr>
            </tbody>
          </table>
        </div>
        
      </div>
      <div v-if="verPersona" class="col-md-7  p-4"> 
        <div class="card text-center">
          <div class="card-header bg-primary p-4">
              <h1 class=" text-white"><strong>Cliente</strong></h1>
          </div>
          <div class="card-body">
              <div class="form-group border-bottom border-primary">
                <h3><span>Nombre cliente:</span></h3>
                  <h2><strong>{{personaUnica.nombreCliente}} {{personaUnica.primerApellidoCliente}}  {{personaUnica.segundoApellidoCliente}}</strong></h2>
              </div>
              <div class="form-group border-bottom border-primary">
                <h3><span># Cedula:</span></h3>
                  <h2><strong>{{personaUnica.cedulaId}}</strong></h2>
              </div>
              <div class="row border-bottom border-primary">
                <div class="form-group col-md-6">
                  <h3><span># Celular principal:</span></h3>
                    <h2><strong>{{personaUnica.celularUno}}</strong></h2>
                </div>
                <div class="form-group col-md-6">
                  <h3><span># Otro numero de contacto:</span></h3>
                    <h2><strong>{{personaUnica.celularDos}}</strong></h2>
                </div>
              </div>
              <div class="row border-bottom border-primary p-3">
                <div class="form-group col-md-4">
                  <h3><span>Direccion:</span></h3>
                    <h2><strong>{{personaUnica.direccionCliente}}</strong></h2>
                </div>
                <div class="form-group col-md-4">
                  <h3><span>Barrio:</span></h3>
                    <h2><strong>{{personaUnica.barrioCliente}}</strong></h2>
                </div>
                <div class="form-group col-md-4">
                  <h3><span>Ciudad:</span></h3>
                    <h2><strong>{{personaUnica.ciudadCliente}}</strong></h2>
                </div>
              </div>
              <div class="row border-bottom border-primary p-3">
                <div class="form-group col-md-4">
                  <h3><span>Tipo vivienda:</span></h3>
                    <h2><strong>{{personaUnica.tViviendaCliente}}</strong></h2>
                </div>
                <div class="form-group col-md-4">
                  <h3><span>Ocupacion:</span></h3>
                    <h2><strong>{{personaUnica.OcupacionCliente}}</strong></h2>
                </div>
                <div class="form-group col-md-4">
                  <h3><span>Personas a cargo:</span></h3>
                    <h2><strong>{{personaUnica.PcargoCliente}}</strong></h2>
                </div>
              </div>
              <div class="row border-bottom border-primary p-3">
                <div class="form-group col-md-6">
                  <h3><span>Email:</span></h3>
                    <h2><strong>{{personaUnica.email}}</strong></h2>
                </div>
                <div class="form-group col-md-3">
                  <h3><span>Edad:</span></h3>
                    <h2><strong>{{personaUnica.edadCliente}}</strong></h2>
                </div>
                <div class="form-group col-md-3">
                  <h3><span>Estado cupo:</span></h3>
                  <h2 v-if="personaUnica.estadoCupo"><strong>Cupo asignado</strong></h2>
                  <h2 v-if="!personaUnica.estadoCupo"><strong> Sin cupo asignado</strong></h2>
                </div>
              </div>
          </div>
          <div class="card-footer bg-white">
            <button @click="verEdiciones(personaUnica.cedulaId)" class="btn btn-warning  btn-block text-white"><h2><strong>Ver Ediciones</strong></h2></button>
            <button @click="editarPersona(personaUnica.cedulaId)" class="btn btn-success btn-block"><h2><strong>Editar</strong></h2></button>
            <button @click="cerrarPersona()" class="btn btn-primary btn-block"><h2><strong>Volver Atras</strong></h2></button>
            <br>
            <div  v-if="ediciones" >
              <h2 class="text-center p-4 bg-primary text-white">Estas son las ediciones para {{personaUnica.nombreCliente}}</h2>
              <div style="height: auto; max-height: 390px; overflow-y: scroll;">
                
                <table class="table table-hover border table-sm  bg-white text-dark table-responsive-sm">
                  <thead class="sticky-top text-white bg-dark">
                    <tr>
                      <th># Cedula</th>
                      <th>Nombre</th>
                      <th>apellidos</th>
                      <th>Celular 1</th>
                      <th>Telefono 2</th>
                      <th>Direccion</th>
                      <th>Email</th>
                      <th>Fecha agregado</th>
                      <th>Editò</th>
                      <th>Fecha Editado</th>
                      <th>Modificacion</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="edit in editados">
                      <td>{{edit.datosAnteriores[0].email}}</td>
                      <td>{{edit.datosAnteriores[0].nombreCliente}}</td>
                      <td>{{edit.datosAnteriores[0].primerApellidoCliente}}  {{edit.datosAnteriores[0].segundoApellidoCliente}}</td>
                      <td>{{edit.datosAnteriores[0].celularUno}}</td>
                      <td>{{edit.datosAnteriores[0].celularDos}}</td>
                      <td>{{edit.datosAnteriores[0].direccionCliente}}</td>
                      <td>{{edit.datosAnteriores[0].email}}</td>
                      <td>{{edit.datosAnteriores[0].fechaAgregado}}</td>
                      <td><button class="btn btn-primary" @click="edito(edit.cedulaIdEmpleado)">{{edit.cedulaIdEmpleado}}</button></td>
                      <td>{{edit.fechaEdicion}}</td>     
                      <td>{{edit.modificacion}}</td>         
                    </tr>
                  </tbody>
                </table>
              </div>
              <button @click="ediciones=false" class="btn btn-primary btn-block"><h2><strong>Cerrar Ediciones</strong></h2></button>
            </div>
          </div>
        </div>       
        <div class="historial">
          <table class="table table-hover border table-sm  bg-white text-dark table-responsive-sm">
            <thead class="sticky-top text-white bg-dark">
              <tr>
                <th># Credito</th>
                <th>Tipo credito</th>
                <th>Cantidad solicitada</th>
                <th>Interes</th>
                <th>Interes total</th>
                <th>Total credito</th>
                <th>Estado</th>
                <th>Fecha Solicitado</th>
                <th>en mora</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="c in creditosCliente" :key="creditos.index">
                <td>{{c.numeroCredito}}</td> 
                <td>{{c.servicio}}</td>             
                <td>{{c.cantidad}}</td>              
                <td>{{c.interes}}</td>              
                <td>{{c.valTotalCred - quitarPuntos(c.cantidad)}}</td>              
                <td>{{c.valTotalCred}}</td>              
                <td>{{c.estadoInterno}}</td>              
                <td>{{c.fechaAgregado}}</td>            
                <td v-if="c.enMora" class="bg-danger">En mora</td>            
                <td v-if="!c.enMora" class="bg-success">------</td>            
              </tr>
            </tbody>
          </table>
        </div>   
      </div>
    </div> 
  </div>
</template>
<script>

class Cliente {
  constructor(
    nombreCliente,
    primerApellidoCliente, 
    segundoApellidoCliente,
    cedulaId,
    modificacion,
    celularUno,
    celularDos,
    direccionCliente,
    barrioCliente,
    ciudadCliente,
    tViviendaCliente,
    OcupacionCliente,
    PcargoCliente,
    email,
    edadCliente,
    fechaAgregado,
  ) {
    this.nombreCliente = nombreCliente;
    this.primerApellidoCliente = primerApellidoCliente;
    this.segundoApellidoCliente = segundoApellidoCliente;
    this.cedulaId = cedulaId;
    this.modificacion=modificacion;
    this.celularUno = celularUno;
    this.celularDos = celularDos;
    this.direccionCliente = direccionCliente;
    this.barrioCliente = barrioCliente;
    this.ciudadCliente = ciudadCliente;
    this.tViviendaCliente = tViviendaCliente;
    this.OcupacionCliente = OcupacionCliente;
    this.PcargoCliente = PcargoCliente;
    this.email=email;
    this.edadCliente = edadCliente;
    this.fechaAgregado =new Date().getDate() + "/" +(new Date().getMonth() + 1) + "/" + new Date().getFullYear();
    this.efectividadDePago=100;
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

// @ is an alias to /src
//import HelloWorld from '../components/Validacion.vue'
import Swal from 'sweetalert2'
import Barra from "../components/Barra.vue";
import axios from 'axios'
import f from "../funciones/funciones.js";

export default {
  name: "clientes",
  components: {
    Barra
  },
  data() {
    return {
      cliente: new Cliente(),
      mostrarTodo:false,
      user: new usuario(),
      clientesitos: [],
      persona:[],
      personaUnica:[],
      verPersona:false,
      creditos: true,
      registrar:true,
      ediciones:false,
      reguardar:false,
      editados:{},
      datos:[],
      clientesActivos:true,
      sinClientes:false,
      busqueda:true,
      buscar:'',
      buscar2:'',
      buscar3:'',
      alerta:false,
      alerta2:false,
      alerta3:false,
      alerta4:false,
      alerta5:false,
      alerta6:false,
      estadoCupo:false,
      valorCupo:0,
      uri:'',
      creditosCliente:[],
    };
  },
  created(){
    this.uri = f.uri
     if(localStorage.getItem ('token') === null){
    this.$router.push('/inicioSesion')
    } else {
    axios.get(this.uri+'/api/login/usuario', {headers:{token:localStorage.getItem('token')}})
    .then(res => {
      this.user=res.data.user
      this.fetchClientes()
    })
    .catch(err => {
      localStorage.clear()
      if(localStorage.getItem ('token') === null){
    this.$router.push('/inicioSesion')
    }
    });
    }
    const ususarioAEditar = this.$route.params.cc
    if(ususarioAEditar == null){
      return
    }else{
      this.editarPersona(ususarioAEditar)
    }
    
  },
  methods: {
    quitarPuntos(x) {
      let valer = "";
      let val = x;
      for (let n = 0; n <= val.length - 1; n++) {
        if (val[n] == ".") {
          n++;
        }
        valer = valer + val[n];
      }
      return valer;
    },
    almacenar(x){
            localStorage.setItem('cc',x)
        },
    fetchClientes() {
      //const uri = "http://localhost:3000/api/clientes"
      this.axios
        .get(this.uri+"/api/clientes")
        .then(res => {
          this.clientesitos = res.data;
          if(this.clientesitos.length === 0){
            this.clientesActivos = false
            this.sinClientes = true
          }
        })
        .catch(err => {
          console.log(err)
        });
    },
    recargar(){
            this.buscar = ''
            this.buscar2 = ''
            this.buscar3 = ''
            this.mostrarTodo =  false
            this.fetchClientes()

        },
    agregarCliente() {
      const muestra = confirm(
        "seguro de agrgar cliente" + JSON.stringify(this.cliente)
      );
      if (muestra) {
        this.axios
          .post(this.uri+"/api/agregarCliente",this.cliente)
          .then(res => {
            this.fetchClientes()
            this.sinClientes = false;
            this.clientesActivos = true
            this.cliente = new Cliente();
          })
          .catch(err => {
            alert("error al agregar cliente");
            return;
          });
      }
    },
    validarCliente(){
     const x ={
       cedula:this.cliente.cedulaId
       }
     this.axios.post(this.uri+"/api/verCliente", x)
     .then(res => {
            this.persona = res.data;
            if (this.persona!= "") {
              alert('la cedula: '+this.persona[0].cedulaId+' ya se encuentra registrada a nombre de : '+this.persona[0].nombreCliente)              
            } else {
              this.agregarCliente();
            }
          });
    },
    cancelar(){
      this.cliente = new Cliente();
    },
    verCliente(cc){
      const x = {cedula:cc}
     this.axios.post(this.uri+"/api/verCliente", x)
      .then(res => {
        this.creditos=false
        this.verPersona=true
        this.personaUnica = res.data[0];
      });
      this.verCreditos(x)
    },
    verCreditos(x){
      this.axios.post(this.uri + '/api/creditos/verHistorialCliente',x)
      .then(res=>{this.creditosCliente = res.data, console.log(this.creditosCliente)})
      .catch(err=>{console.log(err)})
    },
    cerrarPersona(){
        this.creditos=true;
        this.verPersona=false;
        this.registrar=true;
        this.reguardar=false;
        this.cliente = new Cliente();
        this.ediciones=false

    },
    editarPersona(cc){
      const x = {cedula:cc}
     this.axios.post(this.uri+"/api/verCliente", x)
     .then(res => {
            this.registrar=false
            this.reguardar=true
            this.cliente = res.data[0];
          });
    },
    reguardarCliente(persona){
      this.modif=this.cliente.modificacion
      if(this.modif==null){
        alert('Debe escribir reseña sobrela modificacion')
      }else if(this.modif.length<=20){
          alert('la reseña no contiene suficiente informacion')
      }else{
        this.ccedula={cedula:persona.cedulaId}
        this.axios.post(this.uri+"/api/actualizarCliente", persona)
        .then(res => {
          this.reguardar=false;
          this.registrar=true;
          this.fetchClientes();
          this.creditos=true;
          this.verPersona=false;
          this.ediciones=false;
          this.cliente=new Cliente();
          });
      }
      
    },
    verEdiciones(cc){
      const x =  {cedula:cc}
     this.axios.post(this.uri+"/api/verEdiciones", x)
      .then(res => {
            this.ediciones=true
            this.editados = res.data;

          });
    },
    edito(ccE){
      var cc={cedulaE:ccE}
     alert(cc.cedulaE)
    },
     buscando(x){
       this.mostrarTodo = true
            if (x == "") {
                this.alerta2 = true
                    if(this.alerta2 = true){
                        setTimeout(function(){
                            this.alerta2 = false
                        }.bind(this),2000)
                    } 
                return
            } else {
                if (isNaN(x)) {
                    this.alerta3 = true
                        if(this.alerta3 = true){
                            setTimeout(function(){
                                this.alerta3 = false
                            }.bind(this),2000)
                        }
                    return
                } else {
                    let cedulaCliente={
                        cedulaId : x,
                    }
                    this.axios.post(this.uri+"/api/busqueda", cedulaCliente)
                    .then(res => {
                        if(res.data == ''){
                            this.alerta = true
                                if(this.alerta = true){
                                    setTimeout(function(){
                                        this.alerta = false
                                    }.bind(this),2000)
                                }   
                           this.fetchClientes()
                        }else{
                           this.clientesitos = res.data; 
                        }
                    })
                    .catch(err => console.log(err));
                }
            }
        },
    buscandoNombre(nombre, apellido){
      this.mostrarTodo = true
            if (nombre == "") {
                this.alerta4 = true
                    if(this.alerta4 = true){
                        setTimeout(function(){
                            this.alerta4 = false
                        }.bind(this),2000)
                    } 
                return
            } else {
                if (nombre.match(/[0-9]/)||apellido.match(/[0-9]/)) {
                    this.alerta5 = true
                        if(this.alerta5 = true){
                            setTimeout(function(){
                                this.alerta5 = false
                            }.bind(this),2000)
                        }
                    return
                } else {
                    let persona={
                        nombre : nombre,
                        apellido:apellido
                    }
                    this.axios.post(this.uri+"/api/busquedaNombre", persona)
                    .then(res => {
                        if(res.data == ''){
                            this.alerta6 = true
                                if(this.alerta6 = true){
                                    setTimeout(function(){
                                        this.alerta6 = false
                                    }.bind(this),2000)
                                }   
                           this.fetchClientes()
                        }else{
                          console.log(res.data)
                           this.clientesitos = res.data; 
                        }
                    })
                    .catch(err => console.log(err));
                }
            }
        },    
  }
};
</script>