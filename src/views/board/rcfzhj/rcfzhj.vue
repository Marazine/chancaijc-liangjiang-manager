<template>
  <div class="my-board main">
    <div class="title-c"></div>
    <div class="content" v-if="isShow">
      <div class="title-text">
        <img src="../../../assets/img/rcfzhj.png" alt="">
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
              <div class=" col-md-4 column column100">
                <Chart :initData="ggxq_Data" :config='ggxq_config'></Chart>
              </div>
              <div class=" col-md-4 column column100">
                <Chart :initData="zfzc_Data" :config='zfzc_config'></Chart>
              </div>
              <div class=" col-md-4 column column100">
                <Chart :initData="zfzc_Data2" :config='zfzc_config2'></Chart>
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
              title: "认为两江新区人才政策内容的合理性",
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
                title: "企业了解两江新区人才政策的途径",
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
                title: '对两江新区人才政策的总体满意度',
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
                title: '对两江新区人才政策的熟悉程度',
                paddingTop: '6%',
                echartTitleShow: false,
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
                title: '对公共行政服务便利性和效率性的总体评价',
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
                title: '企业认为两江新区人才政策需要进一步完善的地方',
                paddingTop: '5%',
                // left: '4%',
                // unomit: true,
                // bh: 'bh-50'
            },
            zfzc_config2: {
                type: 'qyrczyqd',
                radius: ['40%', '80%'],
                title: '企业最希望获得的政府在人才发展方面的支持',
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
              url: this.$http.adornUrl("op=dash&func=getDashData", "XZX"),
              method: "post",
              data:{
                  condition:JSON.stringify({
                      index: 6,
                      queryKeys: ['E_E1_1', 'E_E2_1', 'E_E3_1', 'E_E4_1', 'E_E5_1', 'E_E6_1', 'E_E7_1']
                  })
              }
          }).then(({
              data
          }) => {
              if (data && data.code == 200) {
                this.pie_aData = data.data.E_E3_1;
                this.pie_a_nextData = data.data.E_E5_1;
                this.estate_salary_Data = data.data.E_E2_1;
                this.estateData = data.data.E_E4_1;
                this.ggxq_Data = data.data.E_E1_1;
                this.zfzc_Data = data.data.E_E6_1;
                this.zfzc_Data2 = data.data.E_E7_1;
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