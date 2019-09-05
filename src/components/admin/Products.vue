<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="mt-4 h3 d-flex justify-content-between align-items-center">
      <span>產品列表</span>
      <button class="btn btn-primary" @click="openModal(true)">新增產品</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120" class="text-center">分類</th>
          <th>產品名稱</th>
          <th width="120" class="text-center">原價</th>
          <th width="120" class="text-center">售價</th>
          <th width="100" class="text-center">是否啟用</th>
          <th width="130" class="text-center">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in products" :key="item.id">
          <td class="text-center">{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-center">
            {{ item.origin_price | currency }}
          </td>
          <td class="text-center">
            {{ item.price | currency }}
          </td>
          <td class="text-center">
            <span v-if="item.is_enabled">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">編輯</button>
            <button class="btn btn-outline-secondary btn-sm" @click="openDelProductModal(item)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    
    <Pagination :pagination="pagination" v-on:getpage="getProducts"></Pagination>
    
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-main text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span v-if="isNew === true">新增產品</span>
              <span v-else>編輯產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image" class="col-form-label">輸入圖片網址</label>
                  <input type="text" class="form-control" id="image"
                    v-model="tempProduct.imageUrl"
                    placeholder="請輸入圖片連結">
                </div>
                <div class="form-group">
                  <label for="customFile" class="col-form-label">或 上傳圖片
                    <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                  </label>
                  <input type="file" id="customFile" class="form-control"
                    ref="files" @change="uploadFile">
                </div>
                  <img class="img-fluid" :src="tempProduct.imageUrl" alt="">
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title" class="col-form-label">標題</label>
                  <input type="text" class="form-control" id="title"
                    v-model="tempProduct.title"
                    placeholder="請輸入標題">
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category" class="col-form-label">分類</label>
                    <input type="text" class="form-control" id="category"
                      v-model="tempProduct.category"
                      placeholder="請輸入分類">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price" class="col-form-label">單位</label>
                    <input type="unit" class="form-control" id="unit"
                      v-model="tempProduct.unit"
                      placeholder="請輸入單位">
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                  <label for="origin_price" class="col-form-label">原價</label>
                    <input type="number" class="form-control" id="origin_price"
                      v-model="tempProduct.origin_price"
                      placeholder="請輸入原價">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price" class="col-form-label">售價</label>
                    <input type="number" class="form-control" id="price"
                      v-model="tempProduct.price"
                      placeholder="請輸入售價">
                  </div>
                </div>
                <hr>

                <div class="form-group">
                  <label for="description" class="col-form-label">產品描述</label>
                  <textarea type="text" class="form-control" id="description"
                    v-model="tempProduct.description"
                    placeholder="請輸入產品描述"></textarea>
                </div>
                <div class="form-group">
                  <label for="content" class="col-form-label">說明內容</label>
                  <textarea type="text" class="form-control" id="content"
                    v-model="tempProduct.content"
                    placeholder="請輸入產品說明內容"></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox"
                      v-model="tempProduct.is_enabled"
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
    
    <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-main text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">            
            是否刪除 {{ tempProduct.title }} ？
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="delProduct">確認刪除</button>
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
  data() {
    return {
      products:[],
      pagination:{},
      tempProduct: {},
      isNew: false,
      isLoading: false,
      status: {
        fileUploading: false,
      },
    }
  },
  methods: {
    getProducts(page = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/products?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        vm.isLoading = false;
        vm.products = response.data.products;
        vm.pagination = response.data.pagination;
      });
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempProduct = {};
        this.isNew = true;
      } else {
        this.tempProduct = Object.assign({},item);
        this.isNew = false;
      }
      $('#productModal').modal('show');
    },
    openDelProductModal(item){
      $('#delProductModal').modal('show');
      this.tempProduct = Object.assign({},item);
    },
    updateProduct() {
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product`;
      let httpMethod = 'post';
      const vm = this;
      if (!vm.isNew) {
        api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`
        httpMethod = 'put';
      }
      this.$http[httpMethod](api, { data: vm.tempProduct }).then((response) => {
        if (response.data.success) {
          $('#productModal').modal('hide');
          vm.getProducts();
        } else {
          $('#productModal').modal('hide');
          vm.getProducts();
          console.log('新增失敗');
        }
      });
    },
    delProduct(){
      const vm = this;
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
      this.$http.delete(api, vm.tempProduct).then((response) => {
        $('#delProductModal').modal('hide');
        vm.getProducts();
      });
    },
    uploadFile(){
      // console.log(this); // 用this去查看files在哪
      const uploadedFile = this.$refs.files.files[0];
      const vm = this;
      const formData = new FormData();
      formData.append('file-to-upload', uploadedFile);
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/upload`;
      vm.status.fileUploading = true;
      this.$http.post(url, formData,{
        headers:{
          'Content-Type': 'multipart/form-data'
        }
      }).then((response) => {
        vm.status.fileUploading = false;
        if(response.data.success) {
          vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl)
        } else {
          this.$bus.$emit('message:push', response.data.message, 'danger');
        }
      });
    }
  },
  created() {
      this.getProducts();
  }
}
</script>



