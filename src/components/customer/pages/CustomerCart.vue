<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="mt-4 d-flex justify-content-center">
      <div class="container">        
        <div class="mt-4">
          <ul v-if="cart.total !== 0" class="d-flex justify-content-center">
            <li class="p-3 m-1 step active">
              <div class="h5">Step 1</div>
              <p>確認購物車明細</p>
            </li>
            <li class="p-3 m-1 step">
              <div class="h5">Step 2</div>
              <p>填寫訂購人資料</p>
            </li>
            <li class="p-3 m-1 step">
              <div class="h5">Step 3</div>
              <p>付款 / 購買完成</p>
            </li>
          </ul>
          <div class="my-4 row justify-content-center" v-if="cart.total !== 0">
            <table class="table">
              <thead>
                <th class="text-center" width="220"></th>                    
                <th class="text-center" width="220">名稱</th>
                <th class="text-right" width="200">數量</th>
                <th class="text-right" width="200">單價</th>
                <th width="100"></th>
              </thead>
              <tbody>
                <tr v-for="item in cart.carts" :key="item.id">
                  <td class="text-center">
                    <img class="img-fluid" :src="item.product.imageUrl" alt="">
                  </td>
                  <td class="text-center align-middle">
                    {{ item.product.title }}
                    <br>
                    <span class="text-sub mt-2 font-14" v-if="item.coupon">(已套用優惠券)</span>
                  </td>
                  <td class="text-right align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                  <td class="text-right align-middle">NT${{ item.total }}</td>
                  <td class="text-right align-middle">
                    <button type="button" class="btn btn-sm text-main"
                    @click="removeCartItem(item.id)">
                      <i class="far fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="4" class="text-right">小計</td>
                  <td class="text-right">NT${{ cart.total }}</td>
                </tr>
                <tr>
                  <td colspan="4" class="text-right text-sub">折扣</td>
                  <td class="text-right text-sub"><u>-NT${{totalInt}}</u></td>
                </tr>
                <tr class="bg-sub">
                  <td colspan="4" class="text-right text-white">結帳金額</td>
                  <td class="text-right text-white">NT${{ cart.final_total }}</td>
                </tr>
              </tfoot>
            </table>
            <div class="input-group mt-3 input-group-sm col-md-6">
              <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼">
              <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">
                  套用優惠碼
                </button>
              </div>
            </div>
          </div>
          <div class="col-md-12 text-center" v-else>
            <div class="h4">您的購物車中目前沒有商品</div>
            <div class="mt-4 mb-4 text-center">
              <img src="../../../assets/empty-cart.png" width="300px" alt="">
            </div>                
            <div class="my-2 row justify-content-center">
              <a href="/#/">
                <button class="mt-4 btn btn-outline-primary" type="button">
                      快來逛逛吧
                </button>
              </a>
            </div>
          </div>
        </div>
        <div class="text-center" v-if="cart.total !== 0">
          <router-link to="/cartcheck">
            <button type="button" class="btn bg-sub text-white mt-4 mb-4" data-dismiss="modal">前往結帳</button>
          </router-link>
        </div>  
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  data() {
    return {
      cart:{},
      isLoading: false,
      coupon_code: '',
      form: {
        user:{
          name:'',
          email:'',
          tel:'',
          address:'',
        },
        message:'',
      },
    }
  },
  computed: {
    totalInt() {
      return (this.cart.total-this.cart.final_total);
    },
  },
  methods: {
    getCart() { 
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        vm.cart = response.data.data;
        vm.$bus.$emit('updateCart');
        vm.isLoading = false;
      });
    },
    removeCartItem(id) {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
      vm.isLoading = true;
      this.$http.delete(api).then((response) => {
        vm.$bus.$emit('updateCart');
        vm.getCart();
      });
      vm.isLoading = false;
    },
    addCouponCode(){
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
      const coupon = {
        code: vm.coupon_code
      }
      vm.isLoading = true;
      this.$http.post(api, { data:coupon }).then((response) => {
        if(response.data.success) {
          vm.getCart();
        } else {
          console.log('新增失敗');
        }
        vm.isLoading = false;
      });
    },
    createOrder() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
      const order = vm.form;
      this.$validator.validate().then((result) => {
        if(result){
          this.$http.post(api, { data: order }).then((response) => {
            if (response.data.success){
              vm.$router.push(`/customer_checkout/${response.data.orderId}`);
            }
            vm.isLoading = false;
          });
        } else {
          console.log('欄位不完整');
        }
      });
  },

  }, 
  created() {
    this.getCart();
  }
}
</script>

