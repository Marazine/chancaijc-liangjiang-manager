<template>
  <div class="my-board main">
    <div class="title-c"></div>
    <div class="content" v-if="isShow">
      <div class="title-text">
        <img src="../../../assets/img/rlzy.png" alt="">
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
            <!-- <div class=" col-md-4 column column100">
                <Chart :initData="zfzc_Data" :config='zfzc_config'></Chart>
              </div> -->
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
                    title: "企业本年度招聘成本",
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
                    title: "企业本年度培训成本",
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
                    title: '企业下年度招聘成本',
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
                    type: 'lxggrenc',
                    title: '企业下年度培训成本',
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
                    title: '企业采购过的人力资源服务',
                    paddingTop: '8%',
                    ispercent: true,
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
                            index: 5,
                            queryKeys: ['C_C2_1', 'C_C2_3', 'C_C2_2', 'C_C2_4', 'D_D1_1']
                        })
                    }
                }).then(({
                    data
                }) => {
                    if (data && data.code == 200) {
                        this.pie_aData = data.data.C_C2_1;
                        this.pie_a_nextData = data.data.C_C2_3;
                        this.estate_salary_Data = data.data.C_C2_2;
                        this.estateData = data.data.C_C2_4;
                        this.ggxq_Data = data.data.D_D1_1;
                        // this.zfzc_Data = data.data.C_C2_2;
                        // this.zfzc_Data2 = data.data.C_C2_4;
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