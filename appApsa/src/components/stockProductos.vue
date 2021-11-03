<template>
    <div class="p-4">
        <div class="p-3 col-md-3 mx-auto" v-if="!agregar">
            <div class="btn-group" role="group">
                <button type="button" class="btn btn-outline-primary" @click="agregarProveedor()"><strong>Agregar proveedor</strong></button>
                <button type="button" class="btn btn-outline-primary" @click="verProv()"><strong> Ver proveedores</strong></button>
                <button type="button" class="btn btn-outline-primary" @click="agregarProducto()"><strong>Agregar producto</strong></button>
                <button type="button" class="btn btn-outline-primary" @click="relacionarCompra()"><strong>Relacionar compra</strong></button>
            </div>
        </div>
        <div class="row text-center"  v-if="verProvee">
            <h2 class="mx-auto p-4"><strong>proveedores</strong></h2>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>Razon social</th>
                        <th>Direccion</th>
                        <th>Nit</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(proveedor,index) in proveedores" :key="index">
                        <td>{{proveedor.rsSocialProveedor}}</td>
                        <td>{{proveedor.direccionProveedor}}</td>
                        <td>{{proveedor.nitProveedor}}</td>
                        <td><button class="btn btn-outline-warning" >editar</button></td>
                    </tr>
                </tbody>
            </table>
            <div class="btn btn-danger btn-block" @click="cerrarVerProveedores()"> Cerrar Proveedores</div>
        </div>
        <div v-if="agregar">
            <div class="card col-md-8 mx-auto">
                <div class="card-header bg-primary text-white text-center"><h2><strong>Agregar producto al Stock</strong></h2></div>
                <div class="card-boby p-4">
                    <form @submit.prevent="guardarProducto()">
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="inputEmail4">Tipo producto</label>
                                <select v-model="producto.tipoProducto" class="form-control" @change="validarNuevoTipo(producto.tipoProducto)" required>
                                    <option v-for="(tipo,index) in tipos" :key="index">{{tipo.tipoProducto}}</option>
                                </select>    
                            </div>
                                <div class="form-group col-md-6">
                                <label for="inputPassword4">Modelo</label>
                                <input type="text" class="form-control" v-model="producto.modelo" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Codigo-referencia</label>
                            <input type="text" class="form-control" v-model="producto.referencia" required>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label>Fecha de compra</label>
                                <input type="date" class="form-control" v-model="producto.fechaCompra" required>
                            </div>
                            <div class="form-group col-md-6">
                                <label >Estado producto</label>
                                <select v-model="producto.estado" class="form-control" required>
                                    <option v-for="(estado,index) in estados" :key="index">{{estado}}</option>
                                </select>    
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="inputCity">Valor de compra</label>
                                <input type="number" class="form-control" v-model="producto.valorCompra" required>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="inputState">Valor de venta</label>
                                <input type="number" class="form-control" v-model="producto.valorVenta" required>
                            </div>
                        </div>
                        <div class="form-group">
                                <label for="inputEmail4">Proveedor</label>
                                <select v-model="producto.proveedor" class="form-control"  required>
                                    <option v-for="(proveedor,index) in proveedores" :key="index">{{proveedor.rzSocialProveedor}}</option>
                                </select>    
                            </div>
                        <button class="btn btn-info btn-block">Guardar</button>
                    </form>
                </div>
                <div class="card-footer bg-danger">
                    <button class="btn btn-danger btn-block" @click="cerrarAgregarProducto()">cerrar</button>
                </div>
            </div>            
        </div> 
        <br><br>
        <div class="row text-center"  v-if="!agregar">
            <h2 class="mx-auto p-4"><strong>stockProductos</strong></h2>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>Tipo Producto</th>
                        <th>Modelo</th>
                        <th>Cod- referencia</th>
                        <th>Fecha Compra</th>
                        <th>Estado</th>
                        <th>Valor compra</th>
                        <th>Valor venta</th>
                        <th>Vender en efectivo</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(producto,index) in productos" :key="index">
                        <td>{{producto.tipoProducto}}</td>
                        <td>{{producto.modelo}}</td>
                        <td>{{producto.referencia}}</td>
                        <td>{{fecha(producto.fechaCompra)}}</td>
                        <td>{{producto.estado}}</td>
                        <td>{{producto.valorCompra}}</td>
                        <td>{{producto.valorVenta}}</td>
                        <td><button class="btn btn-outline-warning" @click="venderEfectivo(producto)">Vender</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <b-modal v-model="rlCompra" hide-footer hide-header no-close-on-backdrop no-close-on-esc centered size="xl">
            <div class="card-header bg-primary text-white text-center"><h2><strong>Relacionar compra de productos</strong></h2></div>
            <div class="card-boby p-4">
                <form @submit.prevent="guardarRelacionCompra()" class="text-center">    
                    <div class="form-group">
                        <label>Fecha de la compra</label>
                        <input class="form-control" type="date" v-model="fc.descripcion" required>
                    </div>                     
                    <div class="form-group">
                        <label>Numero de Factura compra</label>
                        <input type="text" class="form-control" v-model="fc.codigo" required>   
                    </div>
                        <div class="form-group">
                        <label>Descripcion de la compra</label>
                        <textarea class="form-control" v-model="fc.descripcion" required></textarea>
                    </div>   
                    <div class="form-group">
                        <label>Valor de la compra</label>
                        <input type="number" class="form-control" v-model="fc.valorCompra" required>
                    </div>
                    <button class="btn btn-info btn-block" >Guardar</button>
                </form>
            </div>
            <div class="btn btn-danger btn-block" @click="cerrarRelacionarCompra()"> Cerrar</div>           
        </b-modal>
        <b-modal v-model="venderEnEfectivo" hide-footer hide-header no-close-on-backdrop no-close-on-esc centered size="xl">
            <div class="card-header bg-primary text-white text-center"><h2><strong>venta en efectivo</strong></h2></div>
            <div class="card-boby p-4">
                <form @submit.prevent="guardarVentaEfectivo()" class="text-center">    
                    <div class="form-group">
                        <label>Fecha de venta</label>
                        <div class="form-control">{{productoVenta.tipoProducto}}</div>
                    </div>                     
                    <div class="form-group">
                        <label>Numero de Factura compra</label>
                        <div  class="form-control">{{productoVenta.modelo}}</div>   
                    </div>
                        <div class="form-group">
                        <label>Descripcion de la compra</label>
                        <div class="form-control">{{productoVenta.referencia}}</div>
                    </div>                        
                    <div class="form-group">
                        <label>Proveedor</label>
                        <div class="form-control"> {{productoVenta.proveedor}}</div>
                    </div>
                    <div class="form-group">
                        <label>Valor compra</label>
                        <div  class="form-control">{{productoVenta.valorCompra}}</div>
                    </div>
                    <div class="form-group">
                        <label>Valor venta establecido</label>
                        <div  class="form-control">{{productoVenta.valorVenta}}</div>
                    </div>
                    <div class="form-group">
                        <label>Estado</label>
                        <div  class="form-control"> {{productoVenta.estado}} </div>
                    </div>
                    <div class="form-group">
                        <label>Valor en esta venta</label>
                        <input type="number" class="form-control" v-model="productoVenta.valorEnEstaVenta">
                    </div>
                    <div class="form-group">
                        <label>buscarCliente</label>
                        <input type="number" class="form-control" v-model="cedulaBuscar" @keyup="buscar(cedulaBuscar)">
                    </div>
                    <div v-if="verCliente">
                        <div class="form-group">
                            <label>Nombre cliente</label>
                            <div class="form-control" >{{clientee.nombreCliente}} {{clientee.primerApellidoCliente}} {{clientee.segundoApellidoCliente}}</div>
                        </div>
                    </div>
                    <div v-else>
                        <div class="btn btn-success btn-block" @click="agregarNuevoCliente()">Agregar Cliente</div>
                    </div>
                    <br>
                    <div>
                        <button class="btn btn-info btn-block" >Guardar</button>
                    </div>
                </form>
            </div>
            <div class="btn btn-danger btn-block" @click="cerrarVenderEfectivo()"> Cerrar</div>
        </b-modal>
        <b-modal v-model="agProveedor" hide-footer hide-header no-close-on-backdrop no-close-on-esc centered size="xl">
             <div class="card-header bg-primary text-white text-center"><h2><strong>Agregar proveedor</strong></h2></div>
            <div class="card-boby p-4">
                <form @submit.prevent="guardarProveedor()" class="text-center">    
                    <div class="form-group">
                        <label>Razon social proveedor</label>
                        <input class="form-control" type="text" v-model="proveedor.rzSocialProveedor" required>
                    </div>                     
                    <div class="form-group">
                        <label>Direccion </label>
                        <input type="text" class="form-control" v-model="proveedor.direccionProveedor" required>   
                    </div>
                        <div class="form-group">
                        <label>Nit</label>
                        <input type="text" class="form-control" v-model="proveedor.nitProveedor" required>
                    </div>  
                    <button class="btn btn-info btn-block" >Guardar</button>
                </form>
            </div>
            <div class="btn btn-danger btn-block" @click="cerrarAgProveedor()"> Cerrar</div>
        </b-modal>  
        <b-modal v-model="agTipo" hide-footer hide-header no-close-on-backdrop no-close-on-esc centered size="xl">
            <form @submit.prevent="guardarNuevoTipo()" class="text-center">    
                <div class="form-group">
                    <label>nuevo tipo</label>
                    <input class="form-control" type="text" v-model="tipo" required>
                </div>
                <button class="btn btn-info btn-block" >Guardar</button>
            </form> 
            <div class="btn btn-danger btn-block" @click="cerrarAgTipo()"> Cerrar</div>
        </b-modal> 
        <b-modal v-model="agCliente" hide-footer hide-header no-close-on-backdrop no-close-on-esc centered size="xl">
            <div class="mx-auto">
                <div class="card bg-primary text-white">
                    <div class="card-head p-2">
                    <div class="p-2 bg-primary text-center">
                        <h2  class="p-3"><strong>Agregar nuevo Cliente</strong></h2>
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
                        <div >
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
                        <div class="form-group" >
                        <button class="btn btn-success btn-block"><h2><strong>Registrar Cliente</strong></h2></button>
                        </div>
                    
                    </form>
                    <div class="btn btn-warning btn-block" @click="agCliente=false,cliente={}">Cerrar</div>
                    
                    </div>
                </div>
            </div>
        </b-modal>
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
import f from "../funciones/funciones.js";
export default {
    name:'stockProductos',
    props:['estado'],
    data(){
        return{
            tipos:[],
            estados:['Nuevo','Usado'],
            agregar:false,
            producto:{},
            productos:[],
            rlCompra:false,
            venderEnEfectivo : false,
            fc:{},
            uri:'',
            productoVenta:{},
            agProveedor:false,
            proveedor:{},
            agTipo:false,
            tipo:'',
            cedulaBuscar:'',
            clientee:{},
            cliente: new Cliente(),
            verCliente:false,
            agCliente:false,
            productoVenta :{},
            verProvee:false,
            proveedores:[],
        }
    },
    created(){
        this.uri = f.uri
    },
    mounted(){
        if (localStorage.getItem("token") === null) {
            this.$router.push("/inicioSesion");
        }else{
            this.axios
            .get(this.uri+"/api/login/usuario", {
            headers: { token: localStorage.getItem("token") }
        })
        .then(res => {
            this.user = res.data.user;
            this.codigo = this.user.codigo
        })
        .catch(err => {
            localStorage.clear();
                    
        });
        }
        this.verProductos() 
        this.verProveedores() 
        this.verTipos()      
    },
    methods:{
        verProv(){
            this.verProvee = true
        },
        agregarNuevoCliente(){
            this.agCliente = true
        },    
        agregarCliente() {
            const muestra = confirm(
                "seguro de agrgar cliente" + JSON.stringify(this.cliente)
            );
            if (muestra) {
                this.axios.post(this.uri+"/api/agregarCliente",this.cliente)
                .then(res => {
                    this.cliente = new Cliente();
                    this.agCliente = false
                })
                .catch(err => {
                    alert("error al agregar cliente");
                    return;
                });
            }
        },
        verTipos(){
            this.axios.get(this.uri+'/api/productos/verTipos')
            .then(res=>{
            this.tipos=res.data
            this.tipos.push({tipoProducto:'NUEVO TIPO'})
            })
            .catch(err=>{console.log(err)})
        },
        validarNuevoTipo(producto){
            if(producto=='NUEVO TIPO'){
                this.agTipo = true
            }else{
                this.agTipo = false
            }
        },
        buscar(cedula){
            let cc = {cedulaId :cedula}
            this.axios.post(this.uri+'/api/busqueda',cc)
            .then(res=>{console.log(res.data)
                if(res.data.length>0){
                    this.verCliente = true
                   this.clientee = res.data[0] 
                }else{this.clientee = {};this.verCliente=false}
                
            })
            .catch(err=>{console.log(err)})
        },
        guardarNuevoTipo(){
            console.log(this.tipo)
            let tip = {
                tipoProducto:this.tipo
            }
            this.axios.post(this.uri+'/api/productos/guardarNuevoTipo',tip)
            .then(res=>{console.log(res)
                this.agTipo = false
                this.verTipos()
            })
            .catch(err=>{console.log(err)})
        },
        cerrarAgTipo(){
             this.agTipo = false
        },
        fecha(x){
            let n = ''
            for(let y = 0; y<=x.length; y++){
            if(y<=9){
                n = n + x[y]
            }
            }
            return n
        },
        verProductos(){
            this.axios.get(this.uri+'/api/productos/productos')
            .then(res=>{console.log(res.data)
                this.productos = res.data
            })
            .catch(err=>{console.log(err)})
        },
        agregarProducto(){
            this.agregar=true
        },
        cerrarAgregarProducto(){
            this.agregar=false
        },
        guardarProducto(){
            let prod = this.producto
            if(prod.tipoProducto  == "NUEVO TIPO"){alert('elige un tipo de producto'); return}
            this.axios.post(this.uri+'/api/productos/guardarProducto',prod)
            .then(res=>{console.log(res)
                this.cerrarAgregarProducto()
                this.verProductos()
                this.producto = {}
            })
            .catch(err=>{console.log(err)})
        },
        venderEfectivo(producto){
            this.venderEnEfectivo = true
            this.productoVenta=producto
        },
        guardarVentaEfectivo(){
            let dia = new Date().getDate();
            let mes = new Date().getMonth();
            let ano = new Date().getFullYear();
            let id = this.productoVenta._id
            let valores = {
                concepto : 'ventaEfectivo',
                valor:  parseInt(this.productoVenta.valorEnEstaVenta),
                interes:0,
                nombre:this.clientee.nombreCliente+' '+this.clientee.primerApellidoCliente+' '+this.clientee.segundoApellidoCliente,
                descripcion: 'ingreso venta en efectivo del producto '+this.productoVenta.modelo + ' con referencia ' +this.productoVenta.referencia,
                codigoEmpleado : this.codigo,
                fechaIngresoEfectivo : ano + "-" + (mes+1) + "-" + dia,
            }             
            this.axios.post(this.uri+'/api/contabilidad/guardarIngreso',valores)
            .then(res=>{console.log(res);this.venderEnEfectivo= false;this.productoVenta={};this.entregarProducto(id);this.clientee={}})
            .catch(err=>{console.log(err)})
        },
        entregarProducto(id){
            let idd={
                id:id
            }
            this.axios.post(this.uri+ '/api/productos/entregarProducto',idd)
            .then(res => {
                console.log('se a actualizado elproducto')
               this.verProductos()
                
            })
            .catch(err => console.log(err));
        },
        cerrarVenderEfectivo(){
            this.venderEnEfectivo = false
        },
        cerrarRelacionarCompra(){
            this.rlCompra = false
        },
        relacionarCompra(){
            this.rlCompra = true
        },
        guardarRelacionarCompra(){
            let factCompra = this.fc
            this.axios.post(this.uri+'/api/productos/facturaCompraProductos',factCompra)
            .then(res=>{console.log(res)})
            .catch(err=>{console.log(err)})
        },
        agregarProveedor(){
            this.agProveedor = true
        },
        guardarProveedor(){
            let proveedor = {
                provee:this.proveedor
            }
            this.axios.post(this.uri+'/api/productos/guardarProveedor',proveedor)
            .then(res=>{console.log(res)
                this.verProveedores()
                this.agProveedor = false
            })
            .catch(err=>{console.log(err)})
            console.log(this.proveedor)
        },
        cerrarAgProveedor(){
            this.agProveedor = false
        },
        verProveedores(){
            this.axios.get(this.uri+'/api/productos/verProveedores')
            .then(res=>{
                console.log(res)
                this.proveedores = res.data
            })
            .catch(err=>{console.log(err)})
        },
        cerrarVerProveedores(){
            this.verProvee = false
        },
    }
}
</script>

<style>

</style>