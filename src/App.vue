<template>
  <Nav />
  <router-view/>
</template>

<script>
import Nav from '@/components/_partials/Nav.vue'
export default {
  components : {
    Nav
  }
}
</script>

<style>
#app {
  font-family: Helvetica;
  text-align: center;
}
</style>
