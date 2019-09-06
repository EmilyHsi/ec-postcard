<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light rounded l-menu">
      <div class="logo">
        <router-link to="/"><i class="fas fa-camera"></i> 阿布愛攝影 - Animals Postcard</router-link>
      </div>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbars" aria-controls="navbars" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="ml-4 collapse navbar-collapse " id="navbars">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/ProductsList">產品列表</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/customer_cart">
              <i class="fas fa-shopping-cart navIcon"></i>
              <span class="badge badge-pill bg-sub text-white badge-position">{{ cart.length }}</span>
            </router-link>
          </li>
          <!-- <li class="nav-item">
            <router-link class="nav-link" to="/admin/products">管理後台</router-link>
          </li> -->
        </ul>
      </div>
    </nav>    
  </div>
</template>

<script>
  import $ from 'jquery';

  export default {
    name: 'Menu',
    data(){
      return{
          cart: [],
      }
    },
    methods: {
      getCart() { 
        const vm = this;
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
        vm.isLoading = true;
        this.$http.get(api).then((response) => {
          vm.cart = response.data.data.carts;
          vm.isLoading = false;
        });
      },
    },
    created(){
        const vm = this;
        vm.$bus.$on('updateCart', ()=>{
            vm.getCart();
        })
    },
  }

</script>



