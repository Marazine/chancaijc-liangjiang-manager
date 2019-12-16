<template>
  <div class="back-img bh-100">
    <!-- <div class="title my-title-click" @click="$router.push({name:'qyqk'})"> -->
    <div class="title">
      <img src="~@/assets/img/arrow.png" alt="">
      {{config&&config.title?config.title:'标题'}}
    </div>
    <div class="s-content">
      <barFill v-if="config.type=='qyqk_hy'" :initData="initData" :config="config"></barFill>
      <barFill v-if="config.type=='qyqk_cy'" :initData="initData" :config="config"></barFill>
    </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        props: ["initData", "config"],
        mounted() {

        },
        beforeDestroy() {

        },
        components: {},
        methods: {

        }
    }
</script>

<style lang="scss" scoped>
    .my-title-click {
        cursor: pointer;
    }
    
    .my-title,
    .my-title-click {
        left: 7% !important;
    }
</style>