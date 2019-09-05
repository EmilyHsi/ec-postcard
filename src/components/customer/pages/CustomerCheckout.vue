<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="row d-flex justify-content-center mt-4">
      <ul class="d-flex">
        <li class="p-3 m-1 step">
          <div class="h5">Step 1</div>
          <p>確認購物車明細</p>
        </li>
        <li class="p-3 m-1 step">
          <div class="h5">Step 2</div>
          <p>填寫訂購人資料</p>
        </li>
        <li class="p-3 m-1 step active">
          <div class="h5">Step 3</div>
          <p>付款 / 購買完成</p>
        </li>
      </ul>
    </div>
    <div class="my-5 row justify-content-center">
      <form class="col-md-6" @submit.prevent="payOrder">
        <div class="h5 mb-4">購買明細</div>
        <table class="table">
          <thead>
            <th>產品名稱</th>
            <th>數量</th>
            <th class="text-right">單價(折扣後)</th>
          </thead>
          <tbody>
            <tr v-for="item in order.products" :key="item.id">
              <td class="align-middle">{{ item.product.title }}</td>
              <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
              <td class="align-middle text-right">{{ item.final_total }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" class="text-right">付款金額</td>
              <td class="text-right">{{ order.total }}</td>
            </tr>
          </tfoot>
        </table>
        <div class="h5 mb-4">購買人資料</div>
        <table class="table">
          <tbody>
            <tr>
              <th width="200">Email</th>
              <td>{{ order.user.email }}</td>
            </tr>
            <tr>
              <th>姓名</th>
              <td>{{ order.user.name }}</td>
            </tr>
            <tr>
              <th>收件人電話</th>
              <td>{{ order.user.tel }}</td>
            </tr>
            <tr>
              <th>收件人地址</th>
              <td>{{ order.user.address }}</td>
            </tr>
            <tr>
              <th>付款狀態</th>
              <td>
                <span class="text-danger" v-if="!order.is_paid">尚未付款</span>
                <span v-else class="text-sub">付款完成</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="text-center" v-if="order.is_paid === false">
          <button class="btn bg-sub text-white">確認付款去</button>
        </div>
      </form>
    </div>
    <div class="row my-5 justify-content-center" v-if="order.is_paid === true">
      <router-link to="/">
        <button class="btn bg-main text-white">返回首頁</button>
      </router-link>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      isLoading: false,
      order:{
        user: {}
      },
      orderId:'',

    }
  },
  methods: {
    getOrder() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${vm.orderId}`;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        vm.order = response.data.order;
        vm.isLoading = false;
      });
    },
    payOrder() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/pay/${vm.orderId}`;
      vm.isLoading = true;
      this.$http.post(api).then((response) => {
        if(response.data.success) {
          vm.getOrder();
        }
        vm.isLoading = false;
      });
    },
  },   
  created() {
    this.orderId = this.$route.params.orderId;
    this.getOrder();
  }
}
</script>

