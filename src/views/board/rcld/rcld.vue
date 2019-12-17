<template>
  <div class="my-board main">
    <div class="title-c"></div>
    <div class="content" v-if="isShow">
      <div class="title-text">
        <img src="../../../assets/img/rcld.png" alt="">
      </div>
      <img class="fuseChildrenBack" @click="$router.push({name:'board'})"
        src="../../../assets/img/0001.png" alt="">
      <div class="row bh-100">
          <div class="row col-md-12 columnBox ">
            <div class="columnBottom row">
              <div class=" col-md-6 column column100">
                <Chart :initData="pie_aData" :config='pie_a_year_config'></Chart>
              </div>
              <div class=" col-md-6 column column100">
                <Chart :initData="pie_a_nextData" :config='pie_a_next_year_config'></Chart>
              </div>
            </div>
            <div class="columnBottom row">
              <div class=" col-md-6 column column100">
                <Chart :initData="estate_salary_Data" :config='estate_salary_config'></Chart>
              </div>
              <div class=" col-md-6 column column100">
                <Chart :initData="estateData" :config='estate_config'></Chart>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import double_pillar from "../component/double_pillar" 

export default {
    components: {
      double_pillar
    },
    data() {
        return {
            isShow: false,
            pie_aData: {},
            pie_a_year_config: {
              type: 'bussinessFlow',
              title: "不同行业人才净流入流出分布",
              type: 'bussinessFlow',
              isScroll: true,
              paddingTop: '8%',
              c_left: "5%",
              margin: '5%',
              legend: ['流入', '流出']
            },
            pie_a_nextData: {},
            pie_a_next_year_config: {
                type: 'industuryFlow',
                title: "重点产业人才流动分布",
                paddingTop: '8%',
                radius: ['35%', '50%'],
                radius2: [0, '32%'],
                left: '20%',
                right: '20%',
                top: '0',
                bottom: '0',
            },
            estate_salary_Data: {},
            estate_salary_config: {
                type: 'natureFlow',
                title: '不同企业性质人才流动分布',
                paddingTop: '8%',
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
                type: 'lsl',
                title: '近一年人才流动比例',
                radius: ['40%', '80%'],
                paddingTop: '6%',
                top: '15%',
                right: '8%',
                left: '12%',
                bottom: '20%',
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
                      index: 3,
                      queryKeys: ['B_B11_3']
                  })
              }
          }).then(({
              data
          }) => {
              if (data && data.code == 200) {
                this.pie_aData = data.data.bussinessFlow;
                this.pie_a_nextData = data.data.industuryFlow;
                this.estate_salary_Data = data.data.natureFlow;
                this.estateData = data.data.B_B11_3;
                // this.ggxq_Data = data.data.D_D1_1;
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
    padding: 0% 2.5% 2.5% 3.5%!important;
}
</style>