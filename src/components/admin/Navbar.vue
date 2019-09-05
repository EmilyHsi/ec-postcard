<template>
  <div>
    <nav class="navbar navbar-dark fixed-top bg-main flex-md-nowrap p-0 shadow">
      <router-link class="navbar-brand col-sm-3 col-md-2 mr-0" to="/admin/products">阿布愛攝影 - 管理後台</router-link>
      <ul class="navbar-nav px-3">
        <li class="nav-item">
          <a class="nav-link" href="#" @click.prevent="signout">登出</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
  export default {
    name: 'Navbar',
    methods: {
      signout() {
        const vm = this;
        const api = `${process.env.APIPATH}/logout`;
        this.$http.post(api).then((response) => {
          if(response.data.success) {
            vm.$router.push('/login');
          }
        });
      },
    }
  }
</script>



