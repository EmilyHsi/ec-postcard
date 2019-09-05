<template>
  <div id="app">
    <router-view></router-view>
</div>
</template>

<script>

export default {
  name: 'App',
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
  // created() {
  //   const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`;
  //   this.$http.get(api).then((response) => {
  //     console.log(response.data)
  //   });
  // },  
}
</script>

<style lang="scss">
  @import "./assets/all"
  
</style>
