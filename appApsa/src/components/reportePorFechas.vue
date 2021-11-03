<template>
  <div>
    <div class="p-4 border border-warning">
      <br>
      <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
        <div class="input-group-prepend">
          <label class="input-group-text">Fecha inicio</label>
        </div>
        <input class="form-control mr-sm-2" id="uno" type="date" v-model="fechas.fUno">
        <div class="input-group-prepend">
          <label class="input-group-text">Fecha fin</label>
        </div>
        <input class="form-control mr-sm-2" id="dos" type="date" v-model="fechas.fDos">
        <button class="btn btn-success" @click="busqueda()">Buscar</button>
      </nav>  
      <br>
        <div class="row">
          <div class="col-md-6 text-center">
            <h2 class="bg-primary text-center text-white"><strong>INGRESOS</strong></h2>
            <div class="p-2">
              <h4><strong>ingresos por capital</strong></h4>
              <div class="row">
                <table class="table table hover table-sm col-sm-8">
                  <thead>
                    <tr>
                      <th>fecha</th>
                      <th>valor</th>                    
                      <th>interes</th>                    
                      <th>Total</th>                    
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(ingreCapital,index) in ingCapital" :key="index">
                      <td>{{ingreCapital.fechaIngresoEfectivo}}</td>
                      <td>{{ingreCapital.valor}}</td>
                      <td>{{ingreCapital.interes}}</td>
                      <td>{{ingreCapital.valor + ingreCapital.interes}}</td>
                    </tr>
                  </tbody>                
                </table>
                <div class="col-sm-4">
                  <div class="container bg-primary text-white">
                    <h2 ><strong>TOTAL</strong></h2>
                  </div>
                  <h2><strong>{{totalIngCapital}}</strong></h2>
                </div>
              </div>
            </div>
            <div class="p-2">
              <h4><strong>ingresos por intereses</strong></h4>
              <div class="row">
                <table class="table table hover table-sm col-sm-8">
                  <thead>
                    <tr>
                      <th>fecha</th>
                      <th>valor</th>                    
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(ingreIntereses,index) in ingInteres" :key="index">
                      <td>{{ingreIntereses.fechaIngresoEfectivo}}</td>
                      <td>{{ingreIntereses.valor}}</td>
                    </tr>
                  </tbody>                
                </table>
                <div class="col-sm-4">
                  <div class="container bg-primary text-white">
                    <h2 ><strong>TOTAL</strong></h2>
                  </div>
                  <h2><strong>{{totalIngInteres}}</strong></h2>
                </div>
              </div>
            </div>
            <div class="p-2">
              <h4><strong>ingresos por ventas en efectivo</strong></h4>
              <div class="row">
                <table class="table table hover table-sm col-sm-8">
                  <thead>
                    <tr>
                      <th>Descripcion</th>
                      <th>Fecha</th>
                      <th>Valor</th>                    
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(ingreVentE,index) in ingVentEfectivo" :key="index">
                      <td>{{ingreVentE.descripcion}}</td>
                      <td>{{ingreVentE.fechaIngresoEfectivo}}</td>
                      <td>{{ingreVentE.valor}}</td>
                    </tr>
                  </tbody>                
                </table>
                <div class="col-sm-4">
                  <div class="container bg-primary text-white">
                    <h2 ><strong>TOTAL</strong></h2>
                  </div>
                  <h2><strong>{{totalVentasEfectivo}}</strong></h2>
                </div>
              </div>
            </div>
            <div class="p-2">
              <h4><strong>ingresos por inversion</strong></h4>
              <div class="row">
                <table class="table table hover table-sm col-sm-8">
                  <thead>
                    <tr>
                      <th>Descripcion</th>
                      <th>Fecha</th>
                      <th>Valor</th>                    
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(ingreInverion,index) in ingInversion" :key="index">
                      <td>{{ingreInverion.descripcion}}</td>
                      <td>{{ingreInverion.fechaIngresoEfectivo}}</td>
                      <td>{{ingreInverion.valor}}</td>
                    </tr>
                  </tbody>                
                </table>
                <div class="col-sm-4">
                  <div class="container bg-primary text-white">
                    <h2 ><strong>TOTAL</strong></h2>
                  </div>
                  <h2><strong>{{totalInversion}}</strong></h2>
                </div>
              </div>
            </div>
            <div class="p-2">
              <h4><strong>ingresos por inicial</strong></h4>
              <div class="row">
                <table class="table table hover table-sm col-sm-8">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Valor</th>                    
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(ingreInicial,index) in ingInicial" :key="index">
                      <td>{{ingreInicial.fechaIngresoEfectivo}}</td>
                      <td>{{ingreInicial.valor}}</td>
                    </tr>
                  </tbody>                
                </table>
                <div class="col-sm-4">
                  <div class="container bg-primary text-white">
                    <h2 ><strong>TOTAL</strong></h2>
                  </div>
                  <h2><strong>{{totalInicial}}</strong></h2>
                </div>
              </div>
            </div>
            <div class="p-2">
              <h4><strong>ingresos por comision</strong></h4>
              <div class="row">
                <table class="table table hover table-sm col-sm-8">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Valor</th>                    
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(ingreComision,index) in ingComision" :key="index">
                      <td>{{ingreComision.fechaIngresoEfectivo}}</td>
                      <td>{{ingreComision.valor}}</td>
                    </tr>
                  </tbody>                
                </table>
                <div class="col-sm-4">
                  <div class="container bg-primary text-white">
                    <h2 ><strong>TOTAL</strong></h2>
                  </div>
                  <h2><strong>{{totalComision}}</strong></h2>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 text-center">
            <h2 class="bg-info text-center text-white"><strong>EGRESOS</strong></h2>
            <div class="p-2">
              <h4 class="bg-primary text-white"><strong>Egresos pagos soats, tecnomecanicas y licencias</strong></h4>
                <h4><strong>egresos por Soat</strong></h4>
                <div class="row">
                <table class="table table hover table-sm col-sm-8">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Valor</th>                    
                      <th>interes</th>                    
                      <th>total</th>                    
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(eSoat,index) in EgresoSoat" :key="index">
                      <td>{{eSoat.fechaReflejadoEgreso}}</td>
                      <td>{{eSoat.valor}}</td>
                      <td>{{eSoat.cuotaInicial}}</td>
                      <td>{{eSoat.valor + eSoat.cuotaInicial}}</td>
                    </tr>
                  </tbody>                
                </table>
                <div class="col-sm-4">
                  <div class="container bg-primary text-white">
                    <h2 ><strong>TOTAL</strong></h2>
                  </div>
                  <h2><strong>{{totalSoat}}</strong></h2>
                </div>
              </div>
              <h4><strong>egresos por Tecnomecanica</strong></h4>
                <div class="row">
                <table class="table table hover table-sm col-sm-8">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Valor</th>  
                      <th>interes</th>                    
                      <th>total</th>                    
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(eTecno,index) in EgresoTecnomecanica" :key="index">
                      <td>{{eTecno.fechaReflejadoEgreso}}</td>
                      <td>{{eTecno.valor}}</td>
                      <td>{{eTecno.cuotaInicial}}</td>
                      <td>{{eTecno.valor+eTecno.cuotaInicial}}</td>
                    </tr>
                  </tbody>                
                </table>
                <div class="col-sm-4">
                  <div class="container bg-primary text-white">
                    <h2 ><strong>TOTAL</strong></h2>
                  </div>
                  <h2><strong>{{totalTecnicomecanica}}</strong></h2>
                </div>
              </div>
              <h4><strong>egresos por Soat-Tecnomecanica</strong></h4>
                <div class="row">
                <table class="table table hover table-sm col-sm-8">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Valor</th>  
                      <th>interes</th>                    
                      <th>total</th>                    
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(eStecno,index) in EgresoSoatTecnomecanica" :key="index">
                      <td>{{eStecno.fechaReflejadoEgreso}}</td>
                      <td>{{eStecno.valor}}</td>
                      <td>{{eStecno.cuotaInicial}}</td>
                      <td>{{eStecno.valor+eStecno.cuotaInicial}}</td>
                    </tr>
                  </tbody>                
                </table>
                <div class="col-sm-4">
                  <div class="container bg-primary text-white">
                    <h2 ><strong>TOTAL</strong></h2>
                  </div>
                  <h2><strong>{{totalStecno}}</strong></h2>
                </div>
              </div>
              <h4><strong>egresos por licencia</strong></h4>
                <div class="row">
                <table class="table table hover table-sm col-sm-8">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Valor</th> 
                      <th>interes</th>                    
                      <th>total</th>                     
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(eLicencia,index) in EgresoLicencia" :key="index">
                      <td>{{eLicencia.fechaReflejadoEgreso}}</td>
                      <td>{{eLicencia.valor}}</td>
                      <td>{{eLicencia.cuotaInicial}}</td>
                      <td>{{eLicencia.valor+eLicencia.cuotaInicial}}</td>
                    </tr>
                  </tbody>                
                </table>
                <div class="col-sm-4">
                  <div class="container bg-primary text-white">
                    <h2 ><strong>TOTAL</strong></h2>
                  </div>
                  <h2><strong>{{totalLicencia}}</strong></h2>
                </div>
              </div>
            </div>
            <div class="p-2">
              <h4 class="bg-primary text-white"><strong>Egresos por Libre Inversion</strong></h4>
              <div class="row">
                <table class="table table hover table-sm col-sm-8">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Valor</th>                    
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(eLibreI,index) in EgresoLibreInversion" :key="index">
                      <td>{{eLibreI.fechaReflejadoEgreso}}</td>
                      <td>{{eLibreI.valor}}</td>
                    </tr>
                  </tbody>                
                </table>
                <div class="col-sm-4">
                  <div class="container bg-primary text-white">
                    <h2 ><strong>TOTAL</strong></h2>
                  </div>
                  <h2><strong>{{totalLibreI}}</strong></h2>
                </div>
              </div>
            </div>
            <div class="p-2">
              <h4 class="bg-primary text-white"><strong>Egresos por funcionamiento</strong></h4>
              <div class="row">
                <table class="table table hover table-sm col-sm-8">
                  <thead>
                    <tr>
                      <th>Descripcion</th>
                      <th>Fecha</th>
                      <th>Fecha2</th>
                      <th>Valor</th>                    
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(eFuncionamiento,index) in EgresoFuncionamiento" :key="index">
                      <td>{{eFuncionamiento.descripcion}}</td>
                      <td>{{eFuncionamiento.fechaEgreso}}</td>
                      <td>{{eFuncionamiento.fechaReflejadoEgreso}}</td>
                      <td>{{eFuncionamiento.valor}}</td>
                    </tr>
                  </tbody>                
                </table>
                <div class="col-sm-4">
                  <div class="container bg-primary text-white">
                    <h2 ><strong>TOTAL</strong></h2>
                  </div>
                  <h2><strong>{{totalFuncionamiento}}</strong></h2>
                </div>
              </div>
            </div>
            <div class="p-2">
              <h4 class="bg-primary text-white"><strong>Egresos admnistrativos</strong></h4>
              <h4><strong>egresos por nomina</strong></h4>
              <div class="row">
                <table class="table table hover table-sm col-sm-8">
                  <thead>
                    <tr>
                      <th>Descripcion</th>
                      <th>Fecha</th>
                      <th>Valor</th>                    
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(eNomina,index) in EgresoNomina" :key="index">
                      <td>{{eNomina.descripcion}}</td>
                      <td>{{eNomina.fechaReflejadoEgreso}}</td>
                      <td>{{eNomina.valor}}</td>
                    </tr>
                  </tbody>                
                </table>
                <div class="col-sm-4">
                  <div class="container bg-primary text-white">
                    <h2 ><strong>TOTAL</strong></h2>
                  </div>
                  <h2><strong>{{totalNomina}}</strong></h2>
                </div>
              </div>
              <h4><strong>egresos por avance</strong></h4>
              <div class="row">
                <table class="table table hover table-sm col-sm-8">
                  <thead>
                    <tr>
                      <th>Descripcion</th>
                      <th>Fecha</th>
                      <th>Valor</th>                    
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(eAvance,index) in EgresoAvance" :key="index">
                      <td>{{eAvance.descripcion}}</td>
                      <td>{{eAvance.fechaReflejadoEgreso}}</td>
                      <td>{{eAvance.valor}}</td>
                    </tr>
                  </tbody>                
                </table>
                <div class="col-sm-4">
                  <div class="container bg-primary text-white">
                    <h2 ><strong>TOTAL</strong></h2>
                  </div>
                  <h2><strong>{{totalAvance}}</strong></h2>
                </div>
              </div>
              <h4><strong>egresos por Compras</strong></h4>
              <div class="row">
                <table class="table table hover table-sm col-sm-8">
                  <thead>
                    <tr>
                      <th>Descripcion</th>
                      <th>Fecha</th>
                      <th>Valor</th>                    
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(eCompras,index) in EgresoCompras" :key="index">
                      <td>{{eCompras.descripcion}}</td>
                      <td>{{eCompras.fechaReflejadoEgreso}}</td>
                      <td>{{eCompras.valor}}</td>
                    </tr>
                  </tbody>                
                </table>
                <div class="col-sm-4">
                  <div class="container bg-primary text-white">
                    <h2 ><strong>TOTAL</strong></h2>
                  </div>
                  <h2><strong>{{totalCompras}}</strong></h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--<button @click="actualizarIngresos()">actualizarIngresos</button>
          <button @click="actualizarEgresos()">actualizarEgresos</button>-->
    </div>    
  </div>
</template>

<script>
import f from "../funciones/funciones.js";
export default {
    name:'reporteFechas',
    components:{
        
    },
    data(){
      return{
        uri:'',
        fechas:{
          fUno:'',
          fDos:'',
        },
        ingCapital:[],
        totalIngCapital:0,
        ingInteres:[],
        totalIngInteres:0,
        ingVentEfectivo:[],
        totalVentasEfectivo:0,
        ingInversion:[],
        totalInversion:0,
        ingComision:[],
        totalComision:0,
        ingInicial:[],
        totalInicial:0,
        ingresos:[],
        egresos:[],
        EgresoSoat:[],
        totalSoat:0,                
        EgresoTecnomecanica:[],  
        totalTecnicomecanica:0,              
        EgresoLicencia:[],  
        totalLicencia:0,              
        EgresoSoatTecnomecanica:[],  
        totalStecno:0,              
        EgresoLibreInversion:[], 
        totalLibreI:0,
        EgresoCompras:[],
        totalCompras:0,
        EgresoFuncionamiento:[],
        totalFuncionamiento:0,
        EgresoAvance:[],
        totalAvance:0,
        EgresoNomina:[],
        totalNomina:0,
      }
    },
    created() {
      this.uri = f.uri
      //this.verIngresos();
      //this.verEgresos();
    },
    methods:{
      verIngresos(){
        this.axios.get(this.uri+'/api/contabilidad/verIngresos')
        .then(res=>{
          this.ingresos = res.data
        })
        .catch(err=>{
          console.log(err)
        })
      },
      verEgresos(){
        this.axios.get(this.uri+'/api/contabilidad/verEgresos')
        .then(res=>{
          this.Egresos = res.data
        })
        .catch(err=>{
          console.log(err)
        })
      },
      actualizarIngresos(){
        for(let a=6001; a<= 6978;a++){
          let fecha = new Date(this.ingresos[a].fechaIngresoEfectivo)
          let id = this.ingresos[a]._id
          this.cambiar(fecha,id)
        }
      },
      cambiar(fecha,id){
        this.a = this.a ++
        let datos = {
          fecha,
          id
        }
        this.axios.post(this.uri+'/api/contabilidad/cambiarFechaIngreso',datos)
        .then(res=>{console.log(res.data.mensaje,'  ', res.status)})
        .catch(err=>{console.log(err.response)})
        
      },
      actualizarEgresos(){
        for(let a=0; a<= this.Egresos.length-1;a++){
          if(this.Egresos[a].concepto == 'nomina'||this.Egresos[a].concepto == 'avance'||this.Egresos[a].concepto == 'compras'||this.Egresos[a].concepto == 'funcionamiento' ||this.Egresos[a].descripcion == 'desembolso Libre Inversion'||this.Egresos[a].descripcion == 'desembolso pignoracion'){
          let fecha = new Date(this.Egresos[a].fechaEgreso)
          let id = this.Egresos[a]._id
          this.cambiar2(fecha,id)
          }else{
          let fecha = new Date(this.Egresos[a].fechaReflejadoEgreso)
          let id = this.Egresos[a]._id
          this.cambiar2(fecha,id)
          }
        }
      },
      cambiar2(fecha,id){
        this.a = this.a ++
        let datos = {
          fecha,
          id
        }
        this.axios.post(this.uri+'/api/contabilidad/cambiarFechaEgreso',datos)
        .then(res=>{console.log(res.data.mensaje,'  ', res.status)})
        .catch(err=>{console.log(err.response)})
        
      },
      busqueda(){
        let valores = this.fechas;
        this.ingresoCapital(valores);
        this.ingresoInteres(valores);
        this.ingresoVentasEfectivo(valores);
        this.ingresoInversion(valores);                   
        this.ingresoComision(valores);                   
        this.ingresoInicial(valores);   
        //-------------------
        this.egresoSoat(valores)                
        this.egresoTecnomecanica(valores)                
        this.egresoLicencia(valores)                
        this.egresoSoatTecnomecanica(valores)                
        this.egresoLibreInversion(valores) 
        this.egresoCompras(valores)
        this.egresoFuncionamiento(valores)
        this.egresoAvance(valores)
        this.egresoNomina(valores)

      },
      ingresoCapital(valores){
        this.totalIngCapital= 0
        this.axios.post(this.uri+'/api/creditos/ingCapFechas',valores)
        .then(res=>{       
          this.ingCapital = res.data
          for(let a = 0; a<=res.data.length-1;a++){
            this.totalIngCapital = this.totalIngCapital + res.data[a].valor
          }
        })
        .catch(err=>{console.log(err)})  
      },
      ingresoInteres(valores){
        this.totalIngInteres = 0
        this.axios.post(this.uri+'/api/creditos/ingIntFechas',valores)        
        .then(res=>{      
          this.ingInteres = res.data
          for(let a = 0; a<=res.data.length-1;a++){
            this.totalIngInteres = this.totalIngInteres + res.data[a].valor
          }
        })
        .catch(err=>{console.log(err)})  
      },
      ingresoVentasEfectivo(valores){
        this.totalVentasEfectivo = 0
        this.axios.post(this.uri+'/api/creditos/ingVenEfecFechas',valores)       
        .then(res=>{     
          this.ingVentEfectivo = res.data
          for(let a = 0; a<=res.data.length-1;a++){
            this.totalVentasEfectivo = this.totalVentasEfectivo + res.data[a].valor
          }
        })
        .catch(err=>{console.log(err)})  
      },
      ingresoInversion(valores){
        this.axios.post(this.uri+'/api/creditos/ingInverFechas',valores)
        .then(res=>{       
          this.ingInversion = res.data
          for(let a = 0; a<=res.data.length-1;a++){
            this.totalInversion = this.totalInversion + res.data[a].valor
          }
        })
        .catch(err=>{console.log(err)})  
      },
      ingresoComision(valores){
        this.axios.post(this.uri+'/api/creditos/ingComision',valores)
        .then(res=>{      
          this.ingComision = res.data
          for(let a = 0; a<=res.data.length-1;a++){
            this.totalComision = this.totalComision + res.data[a].valor
          }
        })
        .catch(err=>{console.log(err)})  
      },
      ingresoInicial(valores){
        this.axios.post(this.uri+'/api/creditos/ingInicial',valores)
        .then(res=>{      
          this.ingInicial = res.data
          for(let a = 0; a<=res.data.length-1;a++){
            this.totalInicial= this.totalInicial+ res.data[a].valor
          }
        })
        .catch(err=>{console.log(err)})  
      },
      egresoSoat(valores){
        this.axios.post(this.uri+'/api/creditos/egresoSoat',valores)
        .then(res=>{       
          this.EgresoSoat = res.data
          for(let a = 0; a<=res.data.length-1;a++){
            
            this.totalSoat= this.totalSoat+ res.data[a].valor+res.data[a].cuotaInicial
          }
        })
        .catch(err=>{console.log(err)})
      },                
      egresoTecnomecanica(valores){
        this.axios.post(this.uri+'/api/creditos/egresoTecnomecanica',valores)
        .then(res=>{         
          this.EgresoTecnomecanica = res.data
          for(let a = 0; a<=res.data.length-1;a++){
            this.totalTecnicomecanica= this.totalTecnicomecanica+ res.data[a].valor+res.data[a].cuotaInicial
          }
        })
        .catch(err=>{console.log(err)})
      },             
      egresoLicencia(valores){
        this.axios.post(this.uri+'/api/creditos/egresoLicencia',valores)
        .then(res=>{        
          this.EgresoLicencia = res.data
          for(let a = 0; a<=res.data.length-1;a++){
            this.totalLicencia= this.totalLicencia+ res.data[a].valor+res.data[a].cuotaInicial
          }
        })
        .catch(err=>{console.log(err)})
      },              
      egresoSoatTecnomecanica(valores){
        this.axios.post(this.uri+'/api/creditos/egresoSoatTecnomecanica',valores)
        .then(res=>{         
          this.EgresoSoatTecnomecanica = res.data
          for(let a = 0; a<=res.data.length-1;a++){
            this.totalStecno= this.totalStecno+ res.data[a].valor+res.data[a].cuotaInicial
          }
        })
        .catch(err=>{console.log(err)})
      },                
      egresoLibreInversion(valores){
        this.axios.post(this.uri+'/api/creditos/egresoLibreInversion',valores)
        .then(res=>{       
          this.EgresoLibreInversion = res.data
          for(let a = 0; a<=res.data.length-1;a++){
            this.totalLibreI= this.totalLibreI+ res.data[a].valor
          }
        })
        .catch(err=>{console.log(err)})
      },
      egresoCompras(valores){
        this.axios.post(this.uri+'/api/creditos/egresoCompras',valores)
        .then(res=>{         
          this.EgresoCompras = res.data
          for(let a = 0; a<=res.data.length-1;a++){
            this.totalCompras= this.totalCompras+ res.data[a].valor
          }
        })
        .catch(err=>{console.log(err)})
      },
      egresoFuncionamiento(valores){
        this.axios.post(this.uri+'/api/creditos/egresoFuncionamiento',valores)
        .then(res=>{        
          this.EgresoFuncionamiento = res.data
          for(let a = 0; a<=res.data.length-1;a++){
            this.totalFuncionamiento= this.totalFuncionamiento+ res.data[a].valor
          }
        })
        .catch(err=>{console.log(err)})
      },
      egresoAvance(valores){
        this.axios.post(this.uri+'/api/creditos/egresoAvance',valores)
        .then(res=>{       
          this.EgresoAvance = res.data
          for(let a = 0; a<=res.data.length-1;a++){
            this.totalAvance= this.totalAvance+ res.data[a].valor
          }
        })
        .catch(err=>{console.log(err)})
      },
      egresoNomina(valores){
        this.axios.post(this.uri+'/api/creditos/egresoNomina',valores)
        .then(res=>{        
          this.EgresoNomina = res.data
          for(let a = 0; a<=res.data.length-1;a++){
            this.totalNomina= this.totalNomina+ res.data[a].valor
          }
        })
        .catch(err=>{console.log(err)})
      },
    }
}
</script>

<style>

</style>