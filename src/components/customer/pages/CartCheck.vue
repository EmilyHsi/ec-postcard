<template>
  <div>
    <loading :active.sync="isLoading"></loading>
      <div class="container">
        <div class="row">
          <div class="col-md-12 order-md-1 mt-4">
            <ul class="d-flex justify-content-center">
              <li class="p-3 m-1 step">
                <div class="h5">Step 1</div>
                <p>確認購物車明細</p>
              </li>
              <li class="p-3 m-1 step active">
                <div class="h5">Step 2</div>
                <p>填寫訂購人資料</p>
              </li>
              <li class="p-3 m-1 step">
                <div class="h5">Step 3</div>
                <p>付款 / 購買完成</p>
              </li>
            </ul>
            <form class="" @submit.prevent="createOrder">
              <div class="form-group">
                <label class="col-form-label" for="useremail">*Email</label>
                <input type="email" class="form-control" name="email" id="useremail"
                  :class="{'is-invalid': errors.has('email')}"
                  v-model="form.user.email" v-validate="'required|email'" placeholder="請輸入 Email">
                <span class="text-danger" v-if="errors.has('email')">
                  {{ errors.first('email') }}
                </span>
              </div>
              <div class="form-group">
                <label class="col-form-label" for="username">*收件人姓名</label>
                <input type="text" class="form-control" name="name" id="username"
                  :class="{'is-invalid': errors.has('name')}"
                  v-model="form.user.name" v-validate="'required'" placeholder="請輸入收件人姓名">
                <span class="text-danger" v-if="errors.has('name')">收件人姓名為必填</span>
              </div>
            
              <div class="form-group">
                <label class="col-form-label" for="usertel">*收件人電話</label>
                <input type="tel" class="form-control" name="tel" id="usertel" 
                :class="{'is-invalid': errors.has('tel')}"
                v-model="form.user.tel" v-validate="'required'" placeholder="請輸入收件人電話">
                <span class="text-danger" v-if="errors.has('tel')">收件人電話為必填</span>
              </div>
            
              <div class="form-group">
                <label class="col-form-label" for="useraddress">*收件人地址</label>
                <input type="text" class="form-control" name="address" id="useraddress" 
                  :class="{'is-invalid': errors.has('address')}"
                  v-model="form.user.address" v-validate="'required'" placeholder="請輸入收件人地址">
                <span class="text-danger" v-if="errors.has('address')">收件人地址為必填</span>
              </div>
            
              <div class="form-group">
                <label class="col-form-label" for="comment">留言</label>
                <textarea placeholder="有任何問題歡迎留言給我們" name="" id="comment" class="form-control" cols="5" rows="5" v-model="form.message"></textarea>
              </div>
              <div class="text-center">
                <router-link to="/customer_cart">
                  <button type="button" class="btn bg-sub text-white mt-4 mb-4 mr-4">上一步</button>
                </router-link>
                <button class="btn bg-sub text-white">下一步</button>
              </div>
            </form>
          </div>
        </div>
      </div>
  </div>
</template>

<script>

export default {
  name: 'CartCheck',
  components: {},
  data () {
    return {
      isLoading: false,
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
  methods: {
    createOrder() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
      const order = vm.form;
      this.$validator.validate().then((result) => {
        if(result){
          this.$http.post(api, { data: order }).then((response) => {
            if (response.data.success){
              vm.$router.push(`/customer_checkout/${response.data.orderId}`);
              vm.getCart();
            }
            vm.isLoading = false;
          });
        } else {
          console.log('欄位不完整');
        }
      });
    },
    getCart() { 
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        vm.cart = response.data.data;
        vm.isLoading = false;
      });
    },
  },
}
</script>

