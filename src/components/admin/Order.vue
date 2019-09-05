<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="mt-4 h3 d-flex justify-content-between align-items-center">
      <span>訂單列表</span>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th class="text-center" width="150">購買時間</th>
          <th class="text-center" width="120">購買人</th>
          <th class="text-center" width="120">商品總金額</th>
          <th class="text-center" width="120">付款狀態</th>          
          <th class="text-center" width="120">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in orders" :key="item.id">
          <td class="text-center">{{ item.create_at | moment("YYYY-MM-DD HH:mm") }}</td> 
          <td class="text-center">{{ item.user.name }}</td>
          <td class="text-center">{{ item.total }}</td>
          <td class="text-center">
            <span v-if="item.is_paid" class="text-success">已付款</span>
            <span v-else>未付款</span>
          </td>
          <td class="text-center">
            <button class="btn btn-outline-primary btn-sm" 
            @click="openModal(item)">訂單明細
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    
    <Pagination :pagination="pagination" v-on:getpage="getOrders"></Pagination>
    
    <div class="modal fade" id="orderModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>訂單明細</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <hr>
            <div>
              <i class="fas fa-clipboard-list"></i> 訂單資訊
              <hr>
              <dl class="row">
                <dt class="col-sm-3 mb-4">購買時間</dt>
                <dd class="col-sm-9">{{tempOrder.create_at | moment("YYYY-MM-DD HH:mm")}}</dd>
                <dt class="col-sm-3 mb-4">付款狀態</dt>
                <dd class="col-sm-9">
                  <span v-if="tempOrder.is_paid">已付款</span>
                  <span v-else class="text-danger">未付款</span>
                </dd>
              </dl>
              <dl class="row">
                <dt class="col-sm-3 mb-4">商品內容</dt>
                <dd class="col-sm-9">
                  <dl class="row mb-4" v-for="(item, index) in tempOrder.products" :key="index">
                    <dt class="col-sm-8">{{item.product.title}} / {{item.qty}} {{item.product.unit}}</dt>
                    <dd class="col-sm-5 mt-2"><img width="120px" class="img-fluid" :src="item.product.imageUrl" alt=""></dd>
                  </dl>
                </dd>
                <dt class="col-sm-3 mb-4">付款金額</dt>
                <dd class="col-sm-9"> ${{tempOrder.total}}</dd>
              </dl>  
              <dl class="row" v-if="tempOrder.message">
                <dt class="col-sm-3 mb-4">留言</dt>
                <dd class="col-sm-9">{{tempOrder.message}}</dd>
              </dl>
            </div>
            <hr>
            <div>
              <i class="fas fa-user"></i> 收件人
              <hr>
              <dl class="row">
                  <dt class="col-sm-3 mb-4">姓名</dt>
                  <dd class="col-sm-9">{{tempOrder.user.name}}</dd>
                  <dt class="col-sm-3 mb-4">電話</dt>
                  <dd class="col-sm-9">{{tempOrder.user.tel}}</dd>
                  <dt class="col-sm-3 mb-4">Email</dt>
                  <dd class="col-sm-9">{{tempOrder.user.email}}</dd>
                  <dt class="col-sm-3 mb-4">地址</dt>
                  <dd class="col-sm-9">{{tempOrder.user.address}}</dd>
              </dl>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">關閉</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import Pagination from '../Pagination';
import moment from 'moment';

  export default {
    components: {
      Pagination
    },
    name: 'Order',
    data() {
      return {
        orders: [],
        isLoading: false,
        tempOrder: {
          user: {},
          products: {},
        },
        pagination: {},
      }
    },
    methods: {
      getOrders(page = 1) {
        const vm = this;
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/orders?page=${page}`;
        vm.isLoading = true;
        this.$http.get(api).then((response) => {
          vm.isLoading = false;
          vm.orders = response.data.orders;
          vm.pagination = response.data.pagination;
        });
      },
      openModal(item) {
        this.tempOrder = Object.assign({},item);
        $('#orderModal').modal('show');
      },
    },
    created() {
      this.getOrders();
    },
  }
</script>



