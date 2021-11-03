<template>
    <div>
        <barra/>
        <div class="p-4 border border-primary">
            <nav class="navbar navbar-expand-lg navbar-light bg-primary text-white">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul class="nav mr-auto mt-2 mt-lg-0  justify-content-end">
                        <li class="nav-item">
                            <button class="btn btn-primary" @click="verProductos(),cerrarCreditosProductos(),cerrarVendidos()">Productos</button>
                        </li>
                        <li class="nav-item">
                            <button class="btn btn-primary" @click="creditosProductos(),cerrarVerProductos(),cerrarVendidos()">Creditos</button>
                        </li>
                        <li class="nav-item">
                            <button class="btn btn-primary" @click="vendidos(),cerrarCreditosProductos(),cerrarVerProductos()">Vendidos</button>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        <div v-if="products">
            <stock-productos :estado="products" />
        </div>
        <div v-if="creditsProducts">
            <creditos-productos :estado="creditsProducts"/>
        </div>
        <div v-if="productsSale">
            hola
        </div>
    </div>
</template>

<script>
import Barra from '../components/Barra.vue'
import barra from '../components/Barra.vue'
import StockProductos from '../components/stockProductos.vue'
import creditosProductos from '../components/creditosProductos.vue'
import CreditosProductos from '../components/creditosProductos.vue'
export default {
  components: { Barra, StockProductos, CreditosProductos },
    name:'productos',
    data(){
        return{
            products:false,
            creditsProducts:false,
            productsSale:false,
        }
    },
    methods:{
        verProductos(){
            this.products=true
        },
        creditosProductos(){
            this.creditsProducts=true
        },
        vendidos(){
            this.productsSale=true
        },
        cerrarVerProductos(){
            this.products=false
        },
        cerrarCreditosProductos(){
            this.creditsProducts=false
        },
        cerrarVendidos(){
            this.productsSale=false
        }
    }
}
</script>

<style>

</style>