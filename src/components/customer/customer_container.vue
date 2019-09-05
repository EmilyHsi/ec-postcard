<template>
  <div>
    <Menu></Menu>
    <Alert/>
    <div>
      <router-view></router-view>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Menu from './customer_menu';
import Alert from '../AlertMessage';
import Footer from './customer_footer';

export default {
  components: {
    Menu,
    Alert,
    Footer,
  }
}
</script>