<script >
import Header from './components/Header.vue'
import Form from './pages/Form.vue'
export default {
components: {
  Header,
  Form
}
}
</script>

<template>
  <Header />
  <router-view/>

</template>

<style lang="scss">

</style>
