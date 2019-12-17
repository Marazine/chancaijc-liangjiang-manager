<template>
  <div class="back-img bh-50">
    <div class="title my-title-click" v-if="config.isClick">
      <img src="~@/assets/img/arrow.png" alt="">
      {{config&&config.title?config.title:'标题'}}
    </div>
    <div class="title" v-else>
      <img src="~@/assets/img/arrow.png" alt="">
      {{config&&config.title?config.title:'标题'}}
    </div>
    <div class="s-content" :style="{paddingTop:config.paddingTop?config.paddingTop:''}">
      <BarScroll v-if="barScroll" :initData="initData" :config="config"></BarScroll>
      <ProductPerson v-if="productPerson" :initData="initData" :config="config"></ProductPerson>
      <PieA v-if="pieA" :initData="initData" :config="config"></PieA>
      <BarVer v-if="barVer" :initData="initData" :config="config"></BarVer>
      <Sex v-if="sex" :initData="initData" :config="config"></Sex>
      <ExternalF v-if="externalF" :initData="initData" :config="config"></ExternalF>
      <Gragh v-if="gragh" :initData="initData" :config="config"></Gragh>
      <Radio v-if="radio" :initData="initData" :config="config"></Radio>
      <DoublePillar v-if="doublePillar" :initData="initData" :config="config"></DoublePillar>
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
        computed: {
            productPerson() {
                return this.config.type == 'nlfb' || this.config.type == 'qyjybws' || this.config.type == 'qyrwcrfzzc' || this
                    .config.type == 'dwyjcryy' || this.config.type == 'xndrcfy' || this.config.type == 'dwrcpyzfzc' || this.config
                    .type == 'bndxzrc' || this.config.type == 'qyzairencai' || this.config.type == 'lsqk' || this.config.type ==
                    'sbnsr' || this.config.type == 'clnxfb';
            },
            externalF() {
                return this.config.type == 'qyrwzhycjhhlx' || this.config.type == 'dwcrzypy' || this.config.type ==
                    'qyrczyqd' || this.config.type == 'rcdwjs';
            },
            sex() {
                return this.config.type == 'xbfb';
            },
            barScroll() {
                return this.config.type == 'qyqk';
            },
            pieA() {
                return this.config.type == 'rchjfb' || this.config.type == 'rcxlfb' || this.config.type == 'qyljrctj' || this
                    .config.type == 'bndcrpyfy' || this.config.type == 'qycrny' || this.config.type == 'wloneyxycr' || this.config
                    .type == 'zcqk' || this.config.type == 'rcly' || this.config.type == 'rcqk2' || this.config.type ==
                    'ddwsczdwbys';
            },
            barVer() {
                return this.config.type == 'rczy' || this.config.type == 'qyrcfzpj' || this.config.type == 'wlynxyrcsl' || this
                    .config.type == 'xqlx';
            },
            gragh() {
                return this.config.type == 'jndj';
            },
            radio() {
                return this.config.type == 'rcpy';
            },
            doublePillar() {
                return this.config.type == 'bussinessFlow';
            }
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