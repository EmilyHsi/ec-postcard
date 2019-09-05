<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="mt-4 h3 d-flex justify-content-between align-items-center">
      <span>優惠券列表</span>
      <button class="btn btn-primary" @click="openModal(true)">新增優惠券</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120" class="text-center">優惠券名稱</th>
          <th width="120" class="text-center">折扣(%)</th>
          <th width="120" class="text-center">優惠期限</th>
          <th width="100" class="text-center">是否啟用</th>
          <th width="120" class="text-center">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in coupons" :key="item.id">
          <td class="text-center">
            {{ item.title }}
          </td>
          <td class="text-center">
            {{ item.percent }}
          </td>
          <td class="text-center">
            {{ item.due_date }}
        </td>
          <td class="text-center">
            <span v-if="item.is_enabled">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td class="text-center">
            <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">編輯</button>
            <button class="btn btn-outline-secondary btn-sm" @click="openDelCouponModal(item)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :pagination="pagination" v-on:getpage="getCoupon"></Pagination>
    <div class="modal fade" id="couponModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span v-if="isNew === true">新增優惠券</span>
              <span v-else>編輯優惠券</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="title" class="col-form-label">優惠券名稱</label>
                  <input type="text" class="form-control" id="title"
                    v-model="tempCoupon.title"
                    placeholder="請輸入標題">
                </div>
                <div class="form-group">
                  <label for="title" class="col-form-label">折扣(%)</label>
                  <input type="text" class="form-control" id="percent"
                    v-model="tempCoupon.percent"
                    placeholder="請輸入percent">
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                  <label for="origin_price" class="col-form-label">優惠期限</label>
                    <input type="text" class="form-control" id="due_date"
                      v-model="tempCoupon.due_date"
                      placeholder="請輸入due_date">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price" class="col-form-label">優惠代碼</label>
                    <input type="text" class="form-control" id="code"
                      v-model="tempCoupon.code"
                      placeholder="請輸入code">
                  </div>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox"
                      v-model="tempCoupon.is_enabled"
                      :true-value="1"
                      :false-value="0"
                      id="is_enabled">
                    <label class="form-check-label col-form-label" for="is_enabled">
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateProduct">儲存</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="delCouponModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除優惠券</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">            
            是否刪除 {{ tempCoupon.title }} ？
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="delCoupon">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import Pagination from '../Pagination';

  export default {
    components: {
      Pagination
    },
    name: 'Coupon',
    data() {
      return {
        coupons:[],
        tempCoupon: {},
        isNew: false,
        isLoading: false,
        pagination: {},
      }
    },
    methods: {
      getCoupon(page = 1) {
        const vm = this;
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons?page=${page}`;
        vm.isLoading = true;
        this.$http.get(api).then((response) => {
          vm.isLoading = false;
          vm.coupons = response.data.coupons;
          vm.pagination = response.data.pagination;
        });
      },
      openModal(isNew, item) {
        if (isNew) {
          this.tempCoupon = {};
          this.isNew = true;
        } else {
          this.tempCoupon = Object.assign({},item);
          this.isNew = false;
        }
        $('#couponModal').modal('show');
      },
      updateProduct() {
        const vm = this;
        let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon`;
        let httpMethod = 'post';
        if (!vm.isNew) {
          api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`
          httpMethod = 'put';
        }
        this.$http[httpMethod](api, { data: vm.tempCoupon }).then((response) => {
          if (response.data.success) {
            $('#couponModal').modal('hide');
            vm.getCoupon();
          } else {
            $('#couponModal').modal('hide');
            vm.getCoupon();
            console.log('新增失敗');
          }
        });
      },
      openDelCouponModal(item){
        $('#delCouponModal').modal('show');
        this.tempCoupon = Object.assign({},item);
      },
      delCoupon(){
        const vm = this;
        let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
        vm.isLoading = true;
        this.$http.delete(api, vm.tempCoupon).then((response) => {
          $('#delCouponModal').modal('hide');
          vm.getCoupon();
          vm.isLoading = false;
        });
      },
    },
    created() {
      this.getCoupon();
    },
  }
</script>



