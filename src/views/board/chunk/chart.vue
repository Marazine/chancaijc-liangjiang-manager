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
      <PieC v-if="PieC" :initData="initData" :config="config"></PieC>
      <BarVer v-if="barVer" :initData="initData" :config="config"></BarVer>
      <Sex v-if="sex" :initData="initData" :config="config"></Sex>
      <ExternalF v-if="externalF" :initData="initData" :config="config"></ExternalF>
      <Gragh v-if="gragh" :initData="initData" :config="config"></Gragh>
      <Radio v-if="radio" :initData="initData" :config="config"></Radio>
      <pieGrand v-if="pieB" :initData="initData" :config="config"></pieGrand>
      <Liquildfill v-if="liquildzx" :initData="initData" :config="config"></Liquildfill>
      <cylinder v-if="cylinderConfig" :initData="initData" :config="config"></cylinder>
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
        mounted() {},
        computed: {
            productPerson() {
                return this.config.type == 'nlfb' || this.config.type == 'qyjybws' || this.config.type == 'qyrwcrfzzc' || this
                    .config.type == 'xndrcfy' || this.config.type == 'dwrcpyzfzc' || this.config
                    .type == 'qyzairencai' || this.config.type == 'lsqk' || this.config.type ==
                    'sbnsr' || this.config.type == 'clnxfb';
            },
            externalF() {
                return this.config.type == 'qyrwzhycjhhlx' || this.config.type == 'rcdwjs';
            },
            sex() {
                return this.config.type == 'xbfb';
            },
            barScroll() {
                return this.config.type == 'qyqk' || this.config.type == 'bndxzrc' || this.config.type == 'wlynxyrcsl';
            },
            pieA() {
                return this.config.type == 'rchjfb' || this.config.type == 'rcxlfb' || this.config.type == 'qyljrctj' || this
                    .config.type == 'bndyjbys' || this.config.type == 'qycrny' || this.config.type == 'wloneyxycr' || this.config
                    .type == 'zcqk' || this.config.type == 'rcly' || this.config.type == 'rcqk2' || this.config.type ==
                    'ddwsczdwbys' || this.config.type == 'xndjhyjbyssl' || this.config.type == 'bussinessFlow';
            },
            PieC() {
                return this.config.type == 'personEdu'
            },
            barVer() {
                return this.config.type == 'rczy' || this.config.type == 'qyrcfzpj' || this
                    .config.type == 'xqlx' || this.config.type == 'gwlb' || this.config.type == 'qyxz' || this.config.type == 'rcpy';
            },
            gragh() {
                return this.config.type == 'jndj';
            },
            radio() {
                return this.config.type == 'rcxlxqfb';
            },
            pieB() {
                return
            },
            liquildzx() {
                return this.config.type == 'dwcrzypy' || this.config.type == 'rcldqk'
            },
            cylinderConfig() {
                return this.config.type == 'qsyqqcczlzb';
            },
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