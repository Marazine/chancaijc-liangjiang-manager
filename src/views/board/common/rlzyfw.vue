<template>
  <div class="my-board main">
    <!-- <div class="title-c"></div> -->
    <div class="content" v-if="isShow">
      <!-- <div class="title-text">
        <img src="../../../assets/img/rcfwyzc.png" alt="">
      </div>
      <img class="fuseChildrenBack" @click="$router.push({name:'board'})" src="../../../assets/img/0001.png" alt=""> -->
      <div class="row bh-100">
        <div class="row col-md-12 columnBox ">
          <div class="columnBottom row">
            <div class=" col-md-4 column column100">
              <Chart :initData="cgfw_Data" :config='cgfw_config'></Chart>
            </div>
            <div class=" col-md-4 column column100">
              <Chart :initData="pie_aData" :config='pie_aconfig'></Chart>
            </div>
            <div class=" col-md-4 column column100">
              <Chart :initData="ws_Data" :config='ws_config'></Chart>
            </div>
          </div>
          <div class="columnBottom row">
            <div class=" col-md-6 column column100">
              <Chart :initData="ljtjData" :config='ljtj_config'></Chart>
            </div>
            <div class=" col-md-6 column column100">
              <Chart :initData="yxys_Data" :config='yxys_config'></Chart>
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
                cgfw_Data: null, //单位采购过的人力资源服务
                ws_Data: null, //单位认为南山区人才政策需要进一步完善的地方是
                yxys_Data: null, //对单位生产经营影响最大的外部因素
                ljtjData: null, //单位了解南山区人才政策的途径
                pie_aData: null, //单位近3年，急需的人力资源服务
                pie_aconfig: {
                    type: 'qyljrctj',
                    title: "企业了解珠海市人才政策的途径",
                    paddingTop: '10%',
                    left: '2%',
                    right: '2%',
                    top: '0',
                    bottom: '0',
                    radius: ['40%', '60%'],
                    radius2: [0, '38%'],
                    echartTitleShow: false,
                },
                ljtj_config: {
                    type: 'qyrwzhycjhhlx',
                    title: "企业认为“珠海英才计划”和各区党政部门出台的人才政策内容的合理性",
                    paddingTop: '5%',
                    radius: ['40%', '80%'],
                },
                ws_config: {
                    type: 'qyrcfzpj',
                    title: '企业对珠海市产业发展与人才发展匹配度的评价',
                    bar_color_l: "#00fff3",
                    bar_color_r: "transparent",
                    ispercent: false,
                    paddingTop: '6%',
                    top: '15%',
                    right: '8%',
                    left: '10%',
                    bottom: '15%',
                    barWidth: '10px',
                    isClick: false,
                },
                cgfw_config: {
                    type: 'qyjybws',
                    title: '企业认为珠海市人才政策需要进一步完善的地方',
                    paddingTop: '10%',
                    echartTitleShow: false,
                    left: '4%',
                    right: '10%',
                    top: '0',
                    bottom: '0%',
                    bh: 'bh-50',
                    isClick: false,
                },
                yxys_config: {
                    type: 'qyrwcrfzzc',
                    title: '企业认为珠海市政府部门在人才发展方面最应提供哪些支持',
                    paddingTop: '8%',
                    echartTitleShow: false,
                    left: '4%',
                    right: '10%',
                    top: '0',
                    bottom: '0%',
                    bh: 'bh-50',
                    isClick: false,
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
                            queryKeys: ["E2", "E6", "E7", "E4", "E8"]
                        })
                    }
                }).then(({
                    data
                }) => {
                    if (data && data.code == 200) {
                        this.ws_Data = data.data.E2;
                        this.pie_aData = data.data.E6;
                        this.cgfw_Data = data.data.E7;
                        this.ljtjData = data.data.E4;
                        this.yxys_Data = data.data.E8;
                        this.isShow = true;
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .main {
        height: 100%;
        padding: 1% 2% 1%;
    }
</style>