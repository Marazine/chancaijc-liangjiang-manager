<template>
  <div class="">
    <div class="roll2 roll" @click="$router.push({name:'rcfb'})">
      <p>
        <span>人才现状分析</span>
      </p>
    </div>
    <div class="roll3 roll" @click="$router.push({name:'rcld'})">
      <p>
        <span>人才流动及来源分析</span>
      </p>
    </div>
    <div class="roll4 roll" @click="$router.push({name:'xq'})">
      <p>
        <span>人才需求分析</span>
      </p>
    </div>
    <div class="roll5 roll" @click="$router.push({name:'qyrlfw'})">
      <p>
        <span>人力资源服务分析</span>
      </p>
    </div>
    <div class="roll6 roll" @click="$router.push({name:'rcfzhj'})">
      <p>
        <span>人才发展环境分析</span>
      </p>
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
    .roll {
        // width: 11vh;
        // height: 11vh;
        width: 10vh;
        height: 10vh;
        border-radius: 50%;
        position: absolute;
        cursor: pointer;
        z-index: 99;
        background: url('~@/assets/img/fuse_btn.png') no-repeat;
        background-size: 100% auto;
        /* position: relative; */
        span {
            color: #ffffff;
            display: inline-block;
            width: 100%;
            text-align: center;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        p {
            margin: 0;
            height: 100%;
            width: 100%;
            position: relative;
        }
    }
    
    .roll1 {
        bottom: 12%;
        left: 8%;
    }
    
    .roll2 {
        bottom: 3%;
        left: 18%;
    }
    
    .roll3 {
        bottom: -3%;
        left: 31%;
    }
    
    .roll4 {
        bottom: -4%;
        left: 45%;
    }
    
    .roll5 {
        bottom: -3%;
        left: 59%;
    }
    
    .roll6 {
        bottom: 3%;
        left: 72%;
    }
    
    .roll7 {
        bottom: 12%;
        left: 82%;
    }
</style>