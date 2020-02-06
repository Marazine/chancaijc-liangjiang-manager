<template>
  <div class="my-board main">
    <!-- <div class="title-c"></div> -->
    <div class="content" v-if="isShow">
      <!-- <div class="title-text">
        <img src="~@/assets/img/rcqk.png" alt="">
      </div>
      <img class="fuseChildrenBack" @click="$router.push({name:'board'})" src="~@/assets/img/0001.png" alt=""> -->
      <div class="row bh-100">

        <div class="row col-md-12 columnBox ">
          <div class="columnBottom row">
            <div class=" col-md-4 column column100">
              <Chart :initData="product_personData" :config='titleconfig'></Chart>
            </div>
            <div class=" col-md-4 column column100">
              <Chart :initData="estateData" :config='estate_config'></Chart>
            </div>
            <div class=" col-md-4 column column100">
              <Chart :initData="product_personData2" :config='product_person_config'></Chart>
            </div>
          </div>
          <div class="columnBottom row">
            <div class=" col-md-6 column column100">
              <Chart :initData="product_personData3" :config='titleconfig2'></Chart>
            </div>
            <div class=" col-md-6 column column100">
              <Chart :initData="dwpy_Data" :config='dwpy_config'></Chart>
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

                titleconfig: {
                    type: 'xqlx',
                    title: "人才需求类型",
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
                estateData: null,
                estate_config: {
                    type: 'wlynxyrcsl',
                    title: '未来一年最需要的人才学历',
                    bar_color_l: "#00fff3",
                    bar_color_r: "transparent",
                    ispercent: false,
                    paddingTop: '6%',
                    top: '15%',
                    right: '8%',
                    left: '12%',
                    bottom: '20%',
                    barWidth: '10px',
                    isClick: false,
                },
                titleconfig2: {
                    type: 'rcdwjs',
                    title: "人才队伍建设",
                    paddingTop: '5%',
                    top: '10%',
                    radius: ['35%', '65%'],
                },
                product_person_config: {
                    type: 'lsqk',
                    title: '人才流失情况',
                    paddingTop: '10%',
                    echartTitleShow: false,
                    left: '4%',
                    right: '10%',
                    top: '0',
                    bottom: '0%',
                    bh: 'bh-50',
                    isClick: false,
                },
                dwpy_Data: null,
                dwpy_config: {
                    type: 'wloneyxycr',
                    title: "近一年的人才来源需求",
                    paddingTop: '5%',
                    radius: ['35%', '50%'],
                    radius2: [0, '32%'],
                    left: '20%',
                    right: '20%',
                    top: '0',
                    bottom: '0',
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
                    data: {
                        condition: JSON.stringify({
                            index: 0,
                            queryKeys: ['B7_1', 'B8_1', 'B9_2', 'B11_1_2', 'B12_1', 'B13_2', 'B12_3']
                        })
                    }
                }).then(({
                    data
                }) => {
                    if (data && data.code == 200) {
                        this.dwpy_Data = data.data.B9_2;
                        this.estateData = data.data.B12_3;
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
    .main {
        height: 100%;
        padding: 1% 2% 1%;
    }
</style>