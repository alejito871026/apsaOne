import axios from 'axios'
import f from "../funciones/funciones.js";
const uri = f.uri
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
export default {
    state: {
        
    },
    getters: {

    }, 
    mutations:{
       
    },
    actions: {
        LOGIN : (({commit},payload)=>{
            return new Promise ((resolve,  reject) => {
                axios.post(uri+'/api/login/iniSesion', payload)
                .then(res =>{
                    console.log(res)
                    if(res.status === 200){
                    localStorage.setItem('token', res.data.token)
                    resolve(true)
                    }
                    if(res.status === 201){
                        localStorage.setItem('primeravez', res.data.token)
                        resolve('primeraVez')
                    }
                }, err =>{
                   reject(err);
                })
            }); 
        }),
        
    
    }
}