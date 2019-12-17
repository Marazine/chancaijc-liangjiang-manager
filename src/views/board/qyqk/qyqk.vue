<template>
  <div class="my-board main">
    <div class="title-c"></div>
    <div class="content" v-if="isShow">
      <div class="title-text">
        <!-- <img src="../../../assets/img/qyqk.png" alt=""> -->
      </div>
      <img class="fuseChildrenBack" @click="$router.push({name:'board'})" src="../../../assets/img/0001.png" alt="">
      <div class="row bh-100">
        <div class="col-md-3 f-column">
          <chartSwitch :initData="product_incomeData" :config='product_income_config'></chartSwitch>
          <product_person :initData="product_personData" :config='product_person_config'></product_person>
        </div>
        <div class="col-md-6 f-column" style="padding: 0px 10px;">
          <ns_map2 :mapData='ns_mapData' :mapData2='ns_mapData2' :initmapData='initmapData' :title="'珠海地图'"
            :config="zhuhaimapConfig"></ns_map2>
        </div>
        <div class="col-md-3 f-column">
          <product_person :initData="product_paydutyData" :config='product_payduty_config'></product_person>
          <!-- <pie_a :initData="pie_aData" :config="pie_aData_config"></pie_a> -->
          <Chart :initData="pie_aData" :config='pie_aData_config'></Chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import product_person from "../module/product_person"
    import external from "./modules/external_f"
    import estate from "../component/estate"
    import graph from "../component/graph"
    import pie_a from "./modules/pie_a"
    import zhmap from "../module/zhmap"
    import ns_map2 from "../module/ns_map2"
    import nsMap from '../ns'

    export default {
        data() {
            let queryType = this.$route.query.type;
            return {
                initmapData: nsMap.data,
                ns_mapData: null,
                ns_mapData2: null,
                isShow: false,
                product_personData: {},
                product_person_config: {
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
                product_incomeData: {
                    A7: '',
                    A8: ''
                },
                product_income_config: {
                    title: '企业营收与纳税额',
                    isCut: true,
                    echartTitleShow: false,
                    isClick: false,
                    left: '2%',
                    right: '10%',
                    top: '0',
                    bottom: '-10%',
                    type: 'qyysynse',
                    titleLeft: "企业营收",
                    titleRight: "纳税额",
                },
                product_paydutyData: '',
                product_payduty_config: {
                    title: "企业盈利情况",
                    bh: 'bh-50',
                    isCut: true,
                    echartTitleShow: false,
                    left: '2%',
                    right: '10%',
                    top: '0',
                    bottom: '0',
                    bh: 'bh-50',
                    isClick: false,
                },
                externalData: [],
                external_config: {
                    title: "对单位生产经营影响最大的外部因素"
                },
                esdateDate: [],
                estate_config: {
                    title: "单位所属行业类型",
                    barWidth: "20%",
                    left: "10%",
                    class_title: "title-l",
                    c_mt: "10%"
                },
                pie_aData: [],
                pie_aData_config: {
                    type: 'ddwsczdwbys',
                    title: "对单位生产经营影响最大的外部因素",
                    echartTitleShow: false,
                    left: '2%',
                    right: '2%',
                    top: '0',
                    bottom: '0',
                    isClick: false,
                    radius: ['35%', '55%'],
                    radius2: [0, '32%'],
                },
                zhmapConfig: {
                    paddingTop: '5%',
                    title: '珠海地图',
                },
                zhuhaimapConfig: {
                    paddingTop: '0',
                },
                queryType: queryType //路由传参
            }
        },
        created() {
            this.init();
        },
        mounted() {

        },
        components: {
            product_person,
            external,
            estate,
            pie_a,
            graph,
            zhmap,
            ns_map2
        },
        methods: {
            init() {
                this.$http({
                    url: this.$http.adornUrl("op=personfusioncontroller&func=getIndexData", "CQ"),
                    method: "post",
                    data: {
                        condition: JSON.stringify({
                            index: 2,
                            queryKeys: ["A7", "A6", "A8", "A11", 'A10_1']
                        })
                    }
                }).then(({
                    data
                }) => {
                    if (data && data.code == 200) {
                        this.product_incomeData = {
                            A7: data.data.A7,
                            A8: data.data.A8
                        };
                        this.product_personData = data.data.A6;
                        this.product_paydutyData = data.data.A10_1;
                        this.pie_aData = data.data.A11;
                        this.ns_mapData = data.data.businessDetail;
                        this.ns_mapData2 = data.data.industryDetail;
                        // this.esdateDate = data.data.A_A4_1;
                        // this.externalData = data.data.A_A11_1;
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