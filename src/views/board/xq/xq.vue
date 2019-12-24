<template>
  <div class="my-board main">
    <div class="title-c"></div>
    <div class="content" v-if="isShow">
      <div class="title-text">
        <img src="../../../assets/img/rcxq.png" alt="">
      </div>
      <img class="fuseChildrenBack" @click="$router.push({name:'board'})" src="../../../assets/img/0001.png" alt="">
      <div class="row bh-100">
        <div class="row col-md-12 columnBox ">
          <div class="columnBottom row">
            <div class=" col-md-4 column column100">
              <Chart :initData="pie_aData" :config='pie_a_year_config'></Chart>
            </div>
            <div class=" col-md-4 column column100">
              <Chart :initData="pie_a_nextData" :config='pie_a_next_year_config'></Chart>
            </div>
            <div class=" col-md-4 column column100">
              <Chart :initData="estate_salary_Data" :config='estate_salary_config'></Chart>
            </div>
          </div>
          <div class="columnBottom row">
            <div class=" col-md-6 column column100">
              <Chart :initData="estateData" :config='estate_config'></Chart>
            </div>
            <div class=" col-md-6 column column100">
              <Chart :initData="ggxq_Data" :config='ggxq_config'></Chart>
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
                pie_aData: {},
                pie_a_year_config: {
                    type: 'qycrny',
                    title: "十三五重点行业2020年度国内社会人才需求",
                    paddingTop: '8%',
                    radius: ['45%', '65%'],
                    radius2: [0, '43%'],
                    left: '20%',
                    right: '20%',
                    top: '0',
                    bottom: '0',
                },
                pie_a_nextData: {},
                pie_a_next_year_config: {
                    type: 'wloneyxycr',
                    title: "各产业2020年度国内应届生需求",
                    paddingTop: '8%',
                    radius: ['45%', '65%'],
                    radius2: [0, '43%'],
                    left: '20%',
                    right: '20%',
                    top: '0',
                    bottom: '0',
                },
                estate_salary_Data: {},
                estate_salary_config: {
                    type: 'bndxzrc',
                    title: '各产业2020年度外籍人才需求',
                    paddingTop: '6%',
                    echartTitleShow: false,
                    left: '4%',
                    right: '10%',
                    top: '10%',
                    bottom: '-8%',
                    bh: 'bh-50',
                    isClick: false,
                },
                estateData: {},
                estate_config: {
                    type: 'wlynxyrcsl',
                    title: '各产业2020年度留学归国人才需求',
                    bar_color_l: "#00fff3",
                    bar_color_r: "transparent",
                    ispercent: true,
                    paddingTop: '6%',
                    top: '15%',
                    right: '8%',
                    left: '12%',
                    bottom: '20%',
                    barWidth: '10px',
                    isClick: false,
                },
                ggxq_Data: {},
                ggxq_config: {
                    type: 'qyzairencai',
                    title: '各产业2020年度总体需求分析',
                    paddingTop: '8%',
                    echartTitleShow: false,
                    left: '4%',
                    right: '10%',
                    top: '0',
                    bottom: '-8%',
                    bh: 'bh-50',
                    isClick: false,
                },
                zfzc_Data: {},
                zfzc_Data2: {},
                zfzc_config: {
                    type: 'qyrczyqd',
                    radius: ['40%', '80%'],
                    title: '重点行业下年度招聘成本',
                    paddingTop: '5%',
                    // left: '4%',
                    // unomit: true,
                    // bh: 'bh-50'
                },
                zfzc_config2: {
                    type: 'qyrczyqd',
                    radius: ['40%', '80%'],
                    title: '重点行业下年度培训成本',
                    paddingTop: '5%',
                    // left: '4%',
                    // unomit: true,
                    // bh: 'bh-50'
                },
            }
        },
        created() {
            this.init()
        },
        mounted() {},
        methods: {
            init() {
                // let data = require('./data.json');
                this.$http({
                    url: this.$http.adornUrl("op=dash&func=getDashData", "XZX"),
                    method: "post",
                    data: {
                        condition: JSON.stringify({
                            index: 4,
                            queryKeys: ['B_B8_8', 'B_B8_7', 'B_B8_6', 'B_B8_5', ]
                        })
                    }
                }).then(({
                    data
                }) => {
                    if (data && data.code == 200) {
                        this.pie_aData = data.data.B_B8_8;
                        this.pie_a_nextData = data.data.B_B8_7;
                        this.estate_salary_Data = data.data.B_B8_6;
                        this.estateData = data.data.B_B8_5;
                        this.ggxq_Data = data.data.position;
                        this.isShow = true;
                    }
                });
            },
        }
    }
</script>

<style lang="scss" scoped>
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
        padding: 0% 2.5% 2.5% 3.5% !important;
    }
</style>