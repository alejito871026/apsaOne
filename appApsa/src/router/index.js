import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import VueCryptojs from 'vue-cryptojs'
import VueAxios from 'vue-axios';
import axios from 'axios';
import { BootstrapVue, BootstrapVueIcons, IconsPlugin } from 'bootstrap-vue'
import Creditos from '../views/Creditos.vue';
import Clientes from '../views/Clientes.vue';
import InicioSesion from '../views/InicioSesion.vue';
import RegistroSuperU from '../views/RegistroSuperU.vue';
import productos from '../views/productos.vue';
import Empleados from '../views/Empleados.vue';
import Contabilidad from '../views/Contabilidad.vue';
import actualizarContrasena from '../views/actualizarContrasena.vue'
import Cupo from '../views/cupoApsa.vue';
import perfil from '../views/perfil.vue'
import money from 'v-money'
import vueCryptojsMin from 'vue-cryptojs';
Vue.use(VueRouter)
Vue.use(VueAxios, axios);
Vue.use(VueCryptojs)
Vue.use(money, {precision: 4})
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(BootstrapVueIcons)
Vue.use(IconsPlugin)

const routes =[
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/creditos',
    name: 'creditos',
    component: Creditos
  },
  {
    path: '/clientes',
    name: 'clientes',
    component: Clientes
  },{
    path: '/inicioSesion',
    name: 'inicioSesion',
    component: InicioSesion
  },
  {
    path: '/rsu',
    name: 'registroSuperU',
    component: RegistroSuperU
  },
  {
    path: '/empleados',
    name: 'empleados',
    component: Empleados
  },
  {
    path: '/contabilidad',
    name: 'contabiidad',
    component: Contabilidad
  },
  {
    path: '/cupoApsa',
    name: 'Cupo',
    component: Cupo
  },
  {
    path: '/actualizarContrasena',
    name: 'actualizarContrasena',
    component: actualizarContrasena
  },
  {
    path: '/perfil',
    name: 'perfil',
    component: perfil
  },,
  {
    path: '/productos',
    name: 'productos',
    component: productos
  },
];

const token = localStorage.getItem("token")
if(token){
  axios.defaults.headers.common['Authorization'] = token;
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
