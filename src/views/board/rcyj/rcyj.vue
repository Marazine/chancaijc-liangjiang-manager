<template>
  <div class="my-board main">
    <div class="title-c"></div>
    <div class="content" v-if="isShow">
      <div class="title-text">
        <img src="../../../assets/img/rcyj.png" alt="">
      </div>
      <img class="fuseChildrenBack" @click="$router.push({name:'board'})"
        src="../../../assets/img/0001.png" alt="">
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
                <Chart :initData="zfzc_Data" :config='zfzc_config'></Chart>
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
                title: "未来一年最需要的人才类型",
                radius: ['35%', '50%'],
                radius2: [0, '32%'],
                left: '20%',
                right: '20%',
                top: '0',
                bottom: '0',
            },
            estateData: {},
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
            estate_salary_Data: {},
            estate_salary_config: {
                type: 'bndxzrc',
                title: '本年度新招人才数量',
                paddingTop: '6%',
                echartTitleShow: false,
                title: "企业情况",
                left: '4%',
                right: '10%',
                top: '10%',
                bottom: '-8%',
                bh: 'bh-50',
                isClick: false,
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
                bottom: '-8%',
                bh: 'bh-50',
                isClick: false,
            },
            zfzc_Data: {},
            zfzc_config: {
                type: 'qyrczyqd',
                radius: ['40%', '80%'],
                title: '企业人才引进的主要渠道',
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
          this.$http({
              url: this.$http.adornUrl("op=personfusioncontroller&func=getIndexData", "CQ"),
              method: "post",
              data:{
                  condition:JSON.stringify({
                      index: 0,
                      queryKeys: ['C1_1','B12_1','B12_3','C3','C7','C4']
                  })
              }
          }).then(({
              data
          }) => {
              if (data && data.code == 200) {
                this.estate_salary_Data = data.data.C1_1;
                this.pie_a_nextData = data.data.B12_1;
                this.estateData = data.data.B12_3;
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