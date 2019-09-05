<template>
  <div>
    <div class="container-fluid">
      <Product></Product>
      <router-view></router-view>
      <div class="row">
      </div>
    </div>
  </div>
</template>

<script>
import Product from './productModal';

export default {
  components: {
    Product,
  },
}
</script>