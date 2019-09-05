<template>
<div class="container-fluid">
  <div class="l-container-width">
    <loading :active.sync="isLoading"></loading>
    <div class="l-container-width">
      <div class="row mt-4">
        <div class="col-lg-2 col-md-3 mb-3">
          <div class="list-group">
            <a href="#" class="list-group-item list-group-item-action"
              @click.prevent="categoriesText = 'all'"
              :class="{ 'active' : categoriesText === 'all'}">
              全部
            </a>
            <a class="list-group-item list-group-item-action"
              href="#" @click.prevent="categoriesText = item"
              :class="{ 'active' : item === categoriesText}"
              v-for="item in categories" :key="item">
              {{ item }}
            </a>
          </div>
        </div>
        <div class="col-lg-10 col-md-9">
          <div class="card-columns">
            <div class="card border-0 shadow-sm" v-for="item in filterData" :key="item.id">
              <div style="height: 150px; background-size: cover; background-position: center"
                :style="{backgroundImage: `url(${item.imageUrl})`}">
              </div>
              <div class="card-body">
                <h5 class="card-title">
                  <a href="#" class="text-dark" @click.prevent="getProduct(item.id)">{{item.title}}</a>
                </h5>
                <div class="d-flex justify-content-between align-items-baseline">
                  <del class="h6" v-if="item.price">{{item.origin_price}} 元</del>
                  <div class="" v-if="item.price"> {{item.price}} 元 /張</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
          aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">{{ product.title }}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <img :src="product.imageUrl" class="img-fluid" alt="">
                <blockquote class="blockquote mt-3">
                  <p class="mb-0">{{ product.content }}</p>
                  <!-- <footer class="blockquote-footer text-right">{{ product.description }}</footer> -->
                </blockquote>
                <div class="d-flex justify-content-between align-items-baseline">
                  <div class="h4" v-if="!product.price">{{ product.origin_price }} 元</div>
                  <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
                  <div class="h4" v-if="product.price">現在只要 {{ product.price }} 元</div>
                </div>
                <select name="" class="form-control mt-3" v-model="product.num">
                  <option :value="num" v-for="num in 10" :key="num">
                    選購 {{num}} {{product.unit}}
                  </option>
                </select>
              </div>
              <div class="modal-footer">
                <div class="text-muted text-nowrap mr-3">
                  小計 <strong>{{ product.num * product.price }}</strong> 元
                </div>
                <button type="button" class="btn btn-primary"
                @click="addtoCart(product.id, product.num)">
                  <i class="fas fa-spinner fa-spin" v-if="product.id === status.loadingItem"></i>
                  加到購物車
                </button>
              </div>
            </div>
          </div>
      </div>   
    </div>
  </div>
</div>
</template>

<script>
import $ from 'jquery';

export default {
  data () {
    return {
      products: [],
      product: {},
      status: {
        loadingItem: '',
      },
      isLoading: false,
      categories: [],
      categoriesText: 'all',
    }
  },
  computed:{
    filterData() {
      const vm = this;
      if (vm.categoriesText !== 'all') {
        return vm.products.filter((item) => {
          return item.category == vm.categoriesText
        });
      }
      return this.products;
    }, 
  },
  methods: {
    change(item){
			this.categoriesText = item;
		},
    getCategories() {
      const vm = this;
      const categories = new Set();
      vm.products.forEach((item) => {
        categories.add(item.category);
      });
      vm.categories = Array.from(categories);
    },
    getProducts() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        vm.products = response.data.products;
        vm.getCategories();
        vm.isLoading = false;
      });
    },
    getProduct(id){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
      const vm = this;
      vm.status.loadingItem = id;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        vm.status.loadingItem = '';
        response.data.product.num = 1;
        vm.product = response.data.product;
        
        $('#productModal').modal('show');
        vm.isLoading = false;
      })
    },
    addtoCart(id, qty = 1){
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.status.loadingItem = id;
      const cart = {
        product_id: id,
        qty
      }
      this.$http.post(api, { data: cart }).then((response) => {
        this.$bus.$emit("updateCart");
        vm.status.loadingItem = '';
        $('#productModal').modal('hide');
      })
    },
  },
  created() {
      this.getProducts();
  }
}
</script>

