<template>
  <div class="back-img bh-50" style="position:relative">
    <div class="title my-title-click" v-if="config.isClick">
      <img src="../../../assets/img/arrow.png" alt="">
      {{config&&config.title?config.title:'标题'}}
    </div>
    <div class="title" v-else>
      <img src="../../../assets/img/arrow.png" alt="">
      {{config&&config.title?config.title:'标题'}}
    </div>
    <div class="switch">
      <div style="cursor: pointer;" :class="{active:isEtre}" @click="btnSwitch(1)" v-if="config.titleLeft">
        {{config.titleLeft}}</div>
      <div style="cursor: pointer;margin-top:5px;" :class="{active:isperson}" @click="btnSwitch(2)"
        v-if="config.titleRight">
        {{config.titleRight}}</div>
    </div>
    <div class="s-content" :style="{paddingTop:config.paddingTop?config.paddingTop:''}">
      <BarScroll v-if="config.type=='qyqk'" :initData="qyqkData" :config="config"></BarScroll>
      <PieA v-if="config.type=='rcyinjin'" :initData="dataPieA" :config="config"></PieA>
      <ProductPerson v-if="config.type=='qyysynse'" :initData="qyysynseData" :config='config'></ProductPerson>
    </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                isEtre: true,
                isperson: false,
                dataPieA: '',
                qyqkData: '',
                qyysynseData: '',
            }
        },
        props: ["initData", "config"],
        created() {
            this.dataPieA = this.initData.C1_1;
            this.qyqkData = this.initData.A4;
            this.qyysynseData = this.initData.A8;
        },
        computed: {
            productPerson() {
                return this.config.type == 'nlfb' || this.config.type == 'qyjybws' || this.config.type == 'qyrwcrfzzc' || this
                    .config.type == 'dwyjcryy' || this.config.type == 'xndrcfy' || this.config.type == 'dwrcpyzfzc'
            },
            externalF() {
                return this.config.type == 'qyrwzhycjhhlx' || this.config.type == 'dwcrzypy'
            }
            // 
        },
        components: {},
        methods: {
            btnSwitch(res) {

                if (res == 1) {
                    this.isEtre = true;
                    this.isperson = false;
                    this.$store.commit('board/updataIntroduction', this.config.type + "-a");
                    if (this.config.type == 'rcyinjin') {
                        this.config.type = ''
                        this.dataPieA = this.initData.C1_1;
                        this.$nextTick(() => {
                            this.config.type = 'rcyinjin'
                        })
                    }
                    if (this.config.type == 'qyqk') {
                        this.config.type = ''
                        this.qyqkData = this.initData.A4;
                        this.$nextTick(() => {
                            this.config.type = 'qyqk'
                        })
                    }
                    if (this.config.type == 'qyysynse') {
                        this.config.type = ''
                        this.qyysynseData = this.initData.A8;
                        this.$nextTick(() => {
                            this.config.type = 'qyysynse'
                        })
                    }
                }
                if (res == 2) {
                    this.$store.commit('board/updataIntroduction', this.config.type + "-b");

                    this.isEtre = false;
                    this.isperson = true;
                    if (this.config.type == 'rcyinjin') {
                        this.config.type = ''
                        this.dataPieA = this.initData.C1_2;
                        this.$nextTick(() => {
                            this.config.type = 'rcyinjin'
                        })
                    }
                    if (this.config.type == 'qyqk') {
                        this.config.type = ''
                        this.qyqkData = this.initData.personBussiness;
                        this.$nextTick(() => {
                            this.config.type = 'qyqk'
                        })
                    }
                    if (this.config.type == 'qyysynse') {
                        this.config.type = ''
                        this.qyysynseData = this.initData.A7;
                        this.$nextTick(() => {
                            this.config.type = 'qyysynse'
                        })
                    }
                }
            },
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
    
    .switch {
        position: absolute;
        top: 10px;
        right: 10px;
        color: #fff;
        border-radius: 10px;
        height: 28px;
        font-size: 14px;
        /* font-weight: 700; */
        align-items: middle;
        z-index: 1000;
        div {
            text-align: center;
            height: 25px;
            line-height: 24px;
            border-radius: 5px;
            padding: 0 5px;
            font-size: 12px;
            color: #00ffff;
            border: 1px solid #0ba2b0;
        }
        .active {
            color: #0e0c19;
            background: #00ffff;
        }
    }
</style>