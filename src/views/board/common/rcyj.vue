<template>
  <div class="my-board main">
    <!-- <div class="title-c"></div> -->
    <div class="content" v-if="isShow">
      <!-- <div class="title-text">
        <img src="~@/assets/img/rcyj.png" alt="">
      </div>
      <img class="fuseChildrenBack" @click="$router.push({name:'board'})" src="~@/assets/img/0001.png" alt=""> -->
      <div class="row bh-100">
        <div class="row col-md-12 columnBox ">
          <div class="columnBottom row">
            <div class=" col-md-3 column column100">
              <Chart :initData="pie_aData" :config='pie_a_year_config'></Chart>
            </div>
            <div class=" col-md-3 column column100">
              <Chart :initData="pie_a_nextData" :config='pie_a_next_year_config'></Chart>
            </div>
            <div class=" col-md-3 column column100">
              <Chart :initData="estate_salary_Data" :config='estate_salary_config'></Chart>
            </div>
            <div class=" col-md-3 column column100">
              <Chart :initData="estateData" :config='estate_config'></Chart>
            </div>
          </div>
          <div class="columnBottom row">
            <div class=" col-md-6 column column100">
              <Chart :initData="ggxq_Data" :config='ggxq_config'></Chart>
            </div>
            <div class=" col-md-6 column column100">
              <ChartFill :initData="zfzc_Data" :config='zfzc_config'></ChartFill>
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
                    title: "企业引进人才的难易程度",
                    radius: ['35%', '50%'],
                    radius2: [0, '32%'],
                    left: '20%',
                    right: '20%',
                    top: '0',
                    bottom: '0',
                },
                pie_a_nextData: {},
                pie_a_next_year_config: {
                    type: 'wloneyxycr',
                    title: "人才来源",
                    left: '20%',
                    right: '20%',
                    top: '0',
                    bottom: '0',
                },
                estateData: {},
                estate_config: {
                    type: 'wlynxyrcsl',
                    title: '单位近3年，急需的人力资源服务',
                    paddingTop: '15%',
                    isScroll: true,
                    top: '15%',
                    right: '8%',
                    left: '12%',
                    bottom: '20%',
                },
                estate_salary_Data: {},
                estate_salary_config: {
                    type: 'bndxzrc',
                    title: '单位采购过哪些人力资源服务',
                    paddingTop: '15%',
                    isScroll: true,
                    left: '4%',
                    right: '10%',
                    top: '10%',
                    bottom: '-8%',
                },
                ggxq_Data: {},
                ggxq_config: {
                    type: 'qyzairencai',
                    title: '企业在人才引进方面，需要的政府支持',
                    paddingTop: '8%',
                    echartTitleShow: false,
                    left: '4%',
                    right: '10%',
                    top: '0',
                    bottom: '0%',
                    bh: 'bh-50',
                    isClick: false,
                },
                zfzc_Data: {},
                zfzc_config: {
                    type: 'qyrczyqd',
                    radius: ['40%', '80%'],
                    title: '企业人才引进的主要渠道',
                    paddingTop: '7%',
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
                this.$http({
                    url: this.$http.adornUrl("op=personfusioncontroller&func=getIndexData", "CQ"),
                    method: "post",
                    data: {
                        condition: JSON.stringify({
                            index: 0,
                            queryKeys: ['D1', 'B9_1', 'D2', 'C3', 'C7', 'C4']
                        })
                    }
                }).then(({
                    data
                }) => {
                    if (data && data.code == 200) {
                        this.estate_salary_Data = data.data.D1;
                        this.pie_a_nextData = data.data.B9_1;
                        this.estateData = data.data.D2;
                        this.pie_aData = data.data.C3;
                        this.ggxq_Data = data.data.C7;
                        this.zfzc_Data = data.data.C4;
                        this.isShow = true;
                    }
                });
            },
        }
    }
</script>

<style lang="scss" scoped>
    .main {
        height: 100%;
        padding: 1% 2% 1%;
    }
</style>