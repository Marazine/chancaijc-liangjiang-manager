<template>
  <div class="my-board main">
    <!-- <div class="title-c"></div> -->
    <div class="content" v-if="isShow">
      <!-- <div class="title-text">
        <img src="~@/assets/img/qyqk.png" alt="">
      </div> -->
      <!-- <img class="fuseChildrenBack" @click="$router.push({name:'board'})" src="~@/assets/img/0001.png" alt=""> -->
      <div class="row bh-100">
        <div class="row col-md-4">
          <div class=" col-md-12 f-column column">
            <Chart :initData="estate_salary_Data" :config='estate_salary_config'></Chart>
            <Chart :initData="product_personData" :config='product_person_config'></Chart>
          </div>
        </div>

        <div class="row col-md-8 columnBox ">
          <div class="columnBottom row">
            <div class=" col-md-6 column column100">
              <Chart :initData="pie_aData" :config='pie_aconfig'></Chart>
            </div>
            <div class=" col-md-6 column column100">
              <Chart :initData="gwlbData" :config='titleconfig'></Chart>
            </div>
          </div>
          <div class="columnBottom row">
            <div class=" col-md-12 column column100">
              <Chart :initData="qyxzData" :config='qyxz_config'></Chart>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import nsMap from '@/views/board/ns'

    export default {
        data() {
            return {
                initmapData: nsMap.data,
                isShow: false,
                product_personData: {},
                product_person_config: {
                    type: "clnxfb",
                    title: '成立年限分布',
                    isCut: true,
                    bh: 'bh-50',
                    echartTitleShow: false,
                    left: '2%',
                    right: '10%',
                    top: '0',
                    bottom: '0',
                    isClick: false,
                },
                estate_salary_Data: {},
                pie_aconfig: {
                    type: 'jndj',
                    paddingTop: '10%',
                    echartTitleShow: false,
                    isClick: false,
                    left: '4%',
                    right: '10%',
                    top: '0',
                    bottom: '-8%',
                    paddingTop: '10%',
                    echartTitleShow: false,
                    title: "人才学历分布",
                    baseNum: 100,
                    danwei: "人"
                },
                estate_salary_config: {
                    type: 'rcxlfb',
                    title: "企业情况",
                    paddingTop: '10%',
                    echartTitleShow: false,
                    left: '4%',
                    right: '2%',
                    top: '0',
                    bottom: '0',
                    isClick: false,
                },
                gwlbData: [],
                titleconfig: {
                    type: 'gwlb',
                    title: "岗位类别情况",
                    paddingTop: '10%',
                    left: '15%',
                    right: '2%',
                    top: '10%',
                    bottom: '18%',
                    barWidth: 15,
                    ispercent: false,
                },
                zhuhaimapConfig: {
                    paddingTop: '0',
                },
                qyxzData: null, //企业性质
                qyxz_config: {
                    type: 'qyxz',
                    title: '企业性质',
                    paddingTop: '5%',
                    left: '8%',
                    right: '5%',
                    top: '10%',
                    bottom: '22%',
                    bar_color_l: "#00ffff",
                    bar_color_r: "#ff8352",
                    barWidth: 15,
                }
            }
        },
        created() {
            this.init();
        },
        mounted() {

        },
        components: {},
        methods: {
            init() {
                this.$http({
                    url: this.$http.adornUrl("op=personfusioncontroller&func=getIndexData", "CQ"),
                    method: "post",
                    data: {
                        condition: JSON.stringify({
                            index: 2,
                            queryKeys: ['A3', "B1_1", "A6", "A8", "A11", 'B6_1', 'B10_1']
                        })
                    }
                }).then(({
                    data
                }) => {
                    if (data && data.code == 200) {

                        this.estate_salary_Data = data.data.B1_1;
                        this.product_personData = data.data.A6;
                        this.pie_aData = data.data.B6_1;
                        this.gwlbData = data.data.B10_1; //岗位类别
                        this.qyxzData = data.data.A3;
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