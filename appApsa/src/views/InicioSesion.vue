<template>
  <div>
    <Barra></Barra>

    <div class="p-4 container-col-lg-12 text-center">
      <div class="mx-auto">
        <div class="card text-center bg-primary text-white">
          <div class="card-header">
            <h3 class="p-2">Iniciar Sesion</h3>
          </div>
          <div class="card-body">
            <form method="post" @submit.prevent="inicioSesionn">
              <div class="form-group">
                <div class="col-lg-12">
                  <span>Cedula</span>
                  <input v-model="cedula" type="number" placeholder="cedula" class="form-control" />
                </div>
                <div class="col-lg-12">
                  <span>Contraseña</span>
                  <input 
                    v-model="contrasena"
                    type="password"
                    placeholder="Contraseña"
                    class="form-control"
                  />
                </div>
              </div>
              <div class="form-group col-lg-12">
                <button class="btn btn-success btn-block">Iniciar Sesion</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Barra from "../components/Barra.vue";
import { mapActions } from "vuex";
import f from "../funciones/funciones.js";

export default {
  name: "inicioSesion",
  components: {
    Barra
  },

  created() {
    this.uri = f.uri
    if (localStorage.getItem("token") != null) {
      this.$router.push("/Creditos");
    }
  },
  mounted(){
    
  },
  data() {
    return {
      cedula: "",
      contrasena: "",
      uri:'',
      contras : "JDhd950402-*/#$%04286482762111dhAD#d06845620178%$102687JdHd020495dDAhd*#&%",
    };
  },
  methods: {
    inicioSesionn() {
      let user = {
        userIdConnect: this.cedula,
        userIdConnectT: this.contrasena
      };
      if (user.userIdConnect == '0000' && user.userIdConnectT == '0000'){
        user.cedula = this.CryptoJS.AES.encrypt(user.userIdConnect,this.contras).toString();
        user.contrasena = this.CryptoJS.AES.encrypt(user.userIdConnectT, this.contras).toString();
        this.axios
          .post(this.uri+"/api/login/registroUnico", user)
          .then(res => {
            if(res.status === 200){    
              const unica = this.CryptoJS.HmacSHA1("*DAhd871026#",'*DAhd871026#')
              const dos = this.CryptoJS.HmacSHA1(unica,'*DAhd871026#') 
              localStorage.setItem('unicaRSU', dos)
              this.$router.push("/rsu");
            } 
          })
          .catch(err => {
            console.log(err.response);
             return
          });
      }else{
        user.userIdConnect = this.CryptoJS.AES.encrypt(user.userIdConnect, this.contras).toString();
        user.userIdConnectT = this.CryptoJS.AES.encrypt(user.userIdConnectT, this.contras).toString();
        this.$store.dispatch('LOGIN',user)
        .then( res => {
          if(res == true){ 
            this.actualizarMorosos()
            this.$router.push("/creditos"); 
          }
          if(res == 'primeraVez'){
            this.$router.push("/actualizarContrasena");
          }
        },
        err => {
          alert(err.response.data.error);
        }
      );
      } 
    },
    actualizarMorosos(){
      let dia = new Date().getDate()-1;
      let mes = new Date().getMonth()+1;
      let ano = new Date().getFullYear();
      let f = ano+'-'+mes+'-'+dia
      let fecha = {
        fech:new Date(f)
      }
      this.axios.post(this.uri+'/api/creditos/actualizarMorosos',fecha)
      .then(res=>{
      })
      .catch(err=>{console.log(err)})
    },
  }
};
</script>
