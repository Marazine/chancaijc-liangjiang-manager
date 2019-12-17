<template>
  <div class="">
    <div class="roll1 roll" @click="$router.push({name:'rcfb'})">
      <p>
        <span>人才分布</span>
      </p>
    </div>
    <div class="roll2 roll" @click="$router.push({name:'qyqk'})">
      <p>
        <span>企业情况</span>
      </p>
    </div>
    <div class="roll3 roll" @click="$router.push({name:'company2'})">
      <p>
        <span>企业分布</span>
      </p>
    </div>
    <div class="roll4 roll" @click="$router.push({name:'rcld'})">
      <p>
        <span>人才流动及<br />来源分析</span>
      </p>
    </div>
    <div class="roll5 roll" @click="$router.push({name:'xq'})">
      <p>
        <span>人才需求<br />分析</span>
      </p>
    </div>
    <div class="roll6 roll" @click="$router.push({name:'qyrlfw'})">
      <p>
        <span>企业人力<br />资源服务<br />投入及需<br />求分析</span>
      </p>
    </div>
    <div class="roll7 roll" @click="$router.push({name:'rcfzhj'})">
      <p>
        <span>人才发展<br />环境分析</span>
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