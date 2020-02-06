<template>
  <!-- <div class="fuse content" v-if="isShow"> -->
  <div class="my-board main">
    <!-- <div class="title-c"></div> -->
    <div class="content" v-if="isShow">
      <!-- <div class="title-text">
        <img src="../../../assets/img/rcfb.png" alt="">
      </div>
      <img class="fuseChildrenBack" @click="$router.push({name:'board'})" src="../../../assets/img/0001.png" alt=""> -->
      <div class="row bh-100">
        <div class="row col-md-4">
          <div class=" col-md-12 f-column column">
            <Chart :initData="product_personData2" :config='product_person_config'></Chart>
            <Chart :initData="titleData" :config='configure_ind'></Chart>
          </div>
        </div>

        <div class="row col-md-8 columnBox ">
          <div class="columnBottom row">
            <div class=" col-md-4 column column100">
              <!-- <Chart :initData="pie_aData1" :config='pie_aconfig1'></Chart> -->
              <Chart :initData="pie_aData1" :config='pie_aconfig1'></Chart>
            </div>
            <div class=" col-md-4 column column100">
              <!-- <Chart :initData="pie_aData" :config='pie_aconfig'></Chart> -->

              <Chart :initData="pie_aData" :config='product_person_config2'></Chart>
            </div>
            <div class=" col-md-4 column column100">
              <chartSwitch :initData="PayData3" :config='configure_ind3'></chartSwitch>
            </div>
            
          </div>
          <div class="columnBottom row">
            <div class=" col-md-12 column column100">
              <Chart :initData="product_personData" :config='titleconfig'></Chart>
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
                pie_aData2: {}, //技能分布
                titleData: null, //职称分布
                PayData3: null,
                titleconfig: {
                    type: 'rczy',
                    title: "单位核心部门或核心业务的人才专业",
                    bar_color_l: "#00fff3",
                    bar_color_r: "transparent",
                    ispercent: false,
                    paddingTop: '6%',
                    top: '10%',
                    right: '5%',
                    left: '7%',
                    bottom: '30%',
                    barWidth: '10px',
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
                    type: 'nlfb',
                    title: '年龄分布',
                    paddingTop: '10%',
                    echartTitleShow: false,
                    left: '4%',
                    right: '10%',
                    top: '0',
                    bottom: '0%',
                    bh: 'bh-50',
                    isClick: false,
                },
                configure_ind: {
                    type: 'xbfb',
                    title: "性别分布",
                    c_left: "5%",
                    paddingTop: '10%',
                    margin: 30,
                    legend: ['男', '女'],
                    isClick: false,
                },
                configure_ind3: {
                  type: 'qyqk',
                  echartTitleShow: true,
                  echartTitle: "",
                  title: "人员户籍情况",
                  isScroll: false,
                  // paddingTop: '30%',
                  start: 0,
                  end: 45,
                }
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
                            queryKeys: ['B2_1', 'B2_2', 'B7_1', 'B8_1', 'B4', "B3"]
                        })
                    }
                }).then(({
                    data
                }) => {
                    if (data && data.code == 200) {
                        this.product_personData2 = data.data.B2_1;
                        this.PayData3 = {
                            A4: data.data.B3,
                        };
                        // this.titleData = data.data.B2_2;

                        let man = (parseInt(data.data.B2_2.value[0]) / (parseInt(data.data.B2_2.value[0]) + parseInt(data.data
                            .B2_2.value[1])) * 100).toFixed(2) + '%';
                        let woman = (parseInt(data.data.B2_2.value[1]) / (parseInt(data.data.B2_2.value[0]) + parseInt(data.data
                            .B2_2.value[1])) * 100).toFixed(2) + '%';
                        this.titleData = {
                            man: {
                                number: data.data.B2_2.value[0],
                                percentage: man
                            },
                            woman: {
                                number: data.data.B2_2.value[1],
                                percentage: woman
                            }
                        }
                        this.pie_aData1 = data.data.B7_1;
                        this.pie_aData = data.data.B8_1;
                        this.product_personData = data.data.B4;
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