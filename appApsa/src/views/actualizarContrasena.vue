<template>
  <div class="container p-4">
      <div>
   <nav class="navbar navbar-expand-lg navbar-dark bg-dark justify-content-end sticky-top">
  <a class="navbar-brand" href="/">
    Convenios Apsa
  </a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse  justify-content-end container" id="navbarNav">
    <ul class="navbar-nav ">
        <li class="nav-item">
          <a @click="salir"  class="nav-link">Salir</a>
        </li>
    </ul>
  </div>
</nav>
</div>
      <div class="card">
          <div class="card-header bg-primary text-center">
              <h2>señor {{nombreUser}} aca editaras la contraseña</h2>
          </div>
          <div class="card-body text-center">
                <form @submit.prevent="nuevaContrasena">
                    <div>
                        <span>Nueva contraseña</span>
                        <div class="col-lg-12 input-group mb-3">
                            <input v-if="!ver"
                                @keyup="validacion()"
                                v-model="contrasena1"
                                type="password"
                                class="form-control"
                            />
                            <input v-if="ver"
                                @keyup="validacion()"
                                v-model="contrasena1"
                                type="text"
                                class="form-control"
                            />
                            <div class="input-group-append">
                                <button class="btn-primary btn" @click="ver=true" v-if="!ver"><b-icon-eye-fill></b-icon-eye-fill></button>
                            </div>
                            <div class="input-group-append">
                                <button class="btn-info btn" @click="ver=false" v-if="ver"><b-icon-eye-slash-fill></b-icon-eye-slash-fill></button>
                            </div>
                            <div class="input-group-append">
                                <button v-if="!ok" class="btn-danger btn"><b-icon-x-square></b-icon-x-square></button>
                            </div>
                            <div class="input-group-append">
                                <button v-if="ok" class="btn-primary btn"><b-icon-check-all></b-icon-check-all></button>
                            </div>
                        </div>
                        <div class="alert alert-warning alert-dismissible" v-if="!ok">
                            <strong>Debe contener mas de 10 caracteres</strong> entre mayusculas, minusculas,  caracteres especiales y numeros.
                        </div>
                        <div >
                            <span>Repetir contraseña</span>
                            <div class="col-lg-12 input-group mb-3">
                                <input v-if="!ver2"
                                    @keyup="validacion2()"
                                    v-model="contrasena2"
                                    type="password"
                                    class="form-control"
                                />
                                <input v-if="ver2"
                                    @keyup="validacion2()"
                                    v-model="contrasena2"
                                    type="text"
                                    class="form-control"
                                />
                                <div class="input-group-append">
                                    <button class="btn-primary btn" @click="ver2=true" v-if="!ver2"><b-icon-eye-fill></b-icon-eye-fill></button>
                                </div>
                                <div class="input-group-append">
                                    <button class="btn-info btn" @click="ver2=false" v-if="ver2"><b-icon-eye-slash-fill></b-icon-eye-slash-fill></button>
                                </div>
                                <div class="input-group-append">
                                    <button v-if="!ok2" class="btn-danger btn"><b-icon-x-square></b-icon-x-square></button>
                                </div>
                                <div class="input-group-append">
                                    <button v-if="ok2" class="btn-primary btn"><b-icon-check-all></b-icon-check-all></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button class="btn btn-primary btn-block" v-if="botonGuardar">Guardar contraseña</button>
                </form>
          </div>
      </div>  
  </div>
</template>

<script>
import f from "../funciones/funciones.js";

export default {
    name : 'actualizarContrasena',
    data(){
        return {
            aprobado:false,
            contrasena1:'',
            contrasena2:'',
            ok:false,
            ver:false,
            ver2:false,
            ok2:false,
            botonGuardar:false,
            uri:'',
            user:'',
            nombreUser:''
        }
    },
    created(){
        this.uri = f.uri
        if (localStorage.getItem("primeravez") === null ) {
            this.$router.push('/inicioSesion')
        } 
        if (localStorage.getItem("token") != null ){
            this.$router.push('/Creditos')
        }
        this.axios.get(this.uri+'/api/login/usuario', {headers:{token:localStorage.getItem('primeravez')}})
        .then(res => {
        this.user=res.data.user.codigo
        this.nombreUser= res.data.user.nombre+' '+res.data.user.apellidouno+' '+res.data.user.apellidoDos
        })
        .catch(err => {
        localStorage.clear()
        if(localStorage.getItem ('token') === null){
        this.$router.push('/inicioSesion')
        }
        });
    },
    methods:{
        validacion(){
            if(this.contrasena1 == ''){
               this.botonGuardar = false
            }
            if (this.contrasena1.match(/[a-z]/) && this.contrasena1.match(/[0-9]/) && this.contrasena1.match(/[A-Z]/) 
            && this.contrasena1.length > 10 && this.contrasena1.match(/[!#$/¡?¿%&*]/)){
                this.ok = true
            }else{
                this.ok =false
            }
            if (this.contrasena1 === this.contrasena2){
                this.botonGuardar = true
                this.ok2 = true
            }else{
                this.botonGuardar = false
                this.ok2 = false
            }
        },
        validacion2(){
            if(this.contrasena2 == ''){
               this.botonGuardar = false
            }
            if (this.contrasena2 === this.contrasena1){
                this.ok2 = true
            }else{
                this.ok2 =false
                this.botonGuardar = false
            }
            if(this.ok && this.ok2){
                this.botonGuardar = true
            }
        },
        nuevaContrasena(){
            let datos = {
                cc:this.user,
                contrasenaNueva:this.contrasena2
            }
            this.axios.post(this.uri+'/api/empleados/cambioContrasena',datos)
            .then(res=>{
                localStorage.clear()
                this.$router.push('/inicioSesion')
            })
            .catch(err=>{
                console.log(err)
            })
        },
        salir(){
            localStorage.clear()
            this.$router.push('/inicioSesion')
        },
    }
}
</script>