<template>
  <div class="myHome layout">
    <span class="goBack" @click="goBack"></span>
    <h2 class="layout_title">{{title}}</h2>
  </div>
</template>

<script>
export default {
  name: 'headerTitle',
  props: ['title'],
  data () {
    return {
    }
  },
  methods:{
      goBack(){
          this.$router.go(-1);
      }
  },
  created(){
  }
}
</script>
<style scoped>

</style>
