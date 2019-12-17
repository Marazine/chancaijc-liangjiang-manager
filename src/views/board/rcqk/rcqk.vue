<template>
  <div class="my-board main">
      <div class="title-c"></div>
      <div class="content" v-if="isShow">
        <div class="title-text">
            <!-- <img src="../../../assets/img/rcqk.png" alt=""> -->
        </div>
        <img class="fuseChildrenBack" @click="$router.push({name:'board'})"
            src="../../../assets/img/0001.png" alt="">
        <div class="row bh-100">
            <div class="row col-md-4">
                <div class=" col-md-12 f-column column">
                    <Chart :initData="pie_aData1" :config='pie_aconfig1'></Chart>
                    <Chart :initData="titleData" :config='product_person_config2'></Chart>
                </div>
            </div>
            
            <div class="row col-md-8 columnBox ">
                <div class="columnBottom row">
                    <div class=" col-md-6 column column100">
                        <Chart :initData="pie_aData" :config='pie_aconfig'></Chart>
                    </div>
                    <div class=" col-md-6 column column100">
                        <Chart :initData="product_personData2" :config='product_person_config'></Chart>
                    </div>
                </div>
                <div class="columnBottom row">
                    <div class=" col-md-6 column column100">
                        <Chart :initData="product_personData" :config='titleconfig'></Chart>
                    </div>
                    <div class=" col-md-6 column column100">
                        <Chart :initData="product_personData3" :config='titleconfig2'></Chart>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                isShow: false,
                product_personData: [],
                product_personData2: [],
                pie_aData: null, //年龄分布
                pie_aData1: null, //技能分布
                // pie_aData1: {
                // }, //技能分布
                pie_aData2: {
                }, //技能分布
                titleData: null, //职称分布
                titleconfig: {
                    type: 'xqlx',
                    title: "需求类型",
                    bar_color_l: "#00fff3",
                    bar_color_r: "transparent",
                    ispercent: false,
                    paddingTop: '6%',
                    top: '15%',
                    right: '8%',
                    left: '15%',
                    bottom: '26%',
                    barWidth: '10px',
                    isClick: false,
                },
                titleconfig2: {
                    type: 'rcdwjs',
                    title: "人才队伍建设",
                    paddingTop: '10%',
                    radius: ['35%', '65%'],
                },
                pie_aconfig: {
                    type: 'rcly',
                    title: "人才来源",
                    paddingTop: '10%',
                    radius: ['40%', '65%'],
                    radius2: [0, '38%'],
                    left: '20%',
                    right: '20%',
                    top: '0',
                    bottom: '0',
                },
                pie_aconfig1: {
                    type: 'zcqk',
                    title: "职称情况",
                    paddingTop: '10%',
                    radius: ['40%', '65%'],
                    radius2: [0, '38%'],
                    left: '20%',
                    right: '20%',
                    top: '0',
                    bottom: '0',
                },
                product_person_config: {
                    type: 'lsqk',
                    title: '流失情况',
                    paddingTop: '10%',
                    echartTitleShow: false,
                    left: '4%',
                    right: '10%',
                    top: '0',
                    bottom: '-8%',
                    bh: 'bh-50',
                    isClick: false,
                },
                product_person_config2: {
                    type: 'jndj',
                    title: '技能等级',
                    paddingTop: '10%',
                    echartTitleShow: false,
                    isClick: false,
                    left: '4%',
                    right: '10%',
                    top: '0',
                    bottom: '-8%',
                },
            }
        },
        created() {
            this.init();
        },
        mounted() {},
        methods: {
            init() {
                this.$http({
                    url: this.$http.adornUrl("op=personfusioncontroller&func=getIndexData", "CQ"),
                    method: "post",
                    data:{
                        condition:JSON.stringify({
                            index: 0,
                            queryKeys: ['B7_1','B8_1','B9_1','B11_1_2','B12_1','B13_2']
                        })
                    }
                }).then(({
                    data
                }) => {
                    if (data && data.code == 200) {
                        this.pie_aData1 = data.data.B7_1;
                        this.titleData = data.data.B8_1;
                        this.pie_aData = data.data.B9_1;
                        this.product_personData2 = data.data.B11_1_2;
                        this.product_personData = data.data.B12_1;
                        this.product_personData3 = data.data.B13_2;
                        this.isShow = true;
                    }
                });
            }
        }
    }
</script>

<style lang='scss' scoped>
.my-board {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 5000;
    background-color: #ccc;
}

.main {
    height: 100vh;
    background: url('../../../assets/img/background.jpg') no-repeat;
    background-size: 100% 100%;
    padding: 0% 2.5% 2.5% 3.5%!important;
}
</style>