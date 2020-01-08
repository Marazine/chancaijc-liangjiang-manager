<template>
  <div class="my-board main">
    <div class="title-c"></div>
    <div class="content" v-if="isShow">
      <div class="title-text">
        <img src="../../../assets/img/rcld.png" alt="">
      </div>
      <img class="fuseChildrenBack" @click="$router.push({name:'board'})" src="../../../assets/img/0001.png" alt="">
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
    export default {
        data() {
            return {
                isShow: false,
                pie_aData: {},
                pie_a_year_config: {
                    type: 'bussinessFlow',
                    title: "不同行业人才净入流出分布",
                    type: 'bussinessFlow',
                    isScroll: false,
                    paddingTop: '8%',
                    c_left: "5%",
                    margin: '5%',
                    legend: ['流入', '流出']
                },
                pie_a_nextData: {},
                pie_a_next_year_config: {
                    type: 'industuryFlow',
                    title: "重点产业人才流动分布",
                    paddingTop: '6%',
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
                    type: 'lsl',
                    title: '近一年人才流动比例',
                    radius: ['50%', '70%'],
                    radius2: [0, '48%'],
                    left: '20%',
                    right: '20%',
                    top: '0%',
                    bottom: '0',
                    paddingTop: '6%',
                },
            }
        },
        created() {
            this.init()
        },
        mounted() {},
        methods: {
            init() {
              let obj  = {
			"国际组织": {
				"name": [
					"高中/中专/中技及以下",
					"大专",
					"本科",
					"硕士",
					"博士"
				],
				"value": [
					0,
					0,
					0,
					0,
					0
				]
			},
			"住宿和餐饮业": {
				"name": [
					"高中/中专/中技及以下",
					"大专",
					"本科",
					"硕士",
					"博士"
				],
				"value": [
					2854,
					886,
					535,
					38,
					0
				]
			},
			"金融业": {
				"name": [
					"高中/中专/中技及以下",
					"大专",
					"本科",
					"硕士",
					"博士"
				],
				"value": [
					748,
					2797,
					8527,
					1728,
					40
				]
			},
			"电力、热力、燃气及水产和供应业": {
				"name": [
					"高中/中专/中技及以下",
					"大专",
					"本科",
					"硕士",
					"博士"
				],
				"value": [
					368,
					631,
					1336,
					254,
					2
				]
			},
			"公共管理、社会保障和社会组织": {
				"name": [
					"高中/中专/中技及以下",
					"大专",
					"本科",
					"硕士",
					"博士"
				],
				"value": [
					288,
					51,
					83,
					24,
					0
				]
			},
			"居民服务、修理和其他服务业": {
				"name": [
					"高中/中专/中技及以下",
					"大专",
					"本科",
					"硕士",
					"博士"
				],
				"value": [
					10793,
					5904,
					2927,
					163,
					66
				]
			},
			"采矿业": {
				"name": [
					"高中/中专/中技及以下",
					"大专",
					"本科",
					"硕士",
					"博士"
				],
				"value": [
					1692,
					693,
					973,
					130,
					7
				]
			},
			"建筑业": {
				"name": [
					"高中/中专/中技及以下",
					"大专",
					"本科",
					"硕士",
					"博士"
				],
				"value": [
					13967,
					15575,
					17764,
					1499,
					46
				]
			},
			"水利、环境和公共设施管理业": {
				"name": [
					"高中/中专/中技及以下",
					"大专",
					"本科",
					"硕士",
					"博士"
				],
				"value": [
					2050,
					1551,
					1987,
					271,
					17
				]
			},
			"租赁和商务服务业": {
				"name": [
					"高中/中专/中技及以下",
					"大专",
					"本科",
					"硕士",
					"博士"
				],
				"value": [
					7062,
					4189,
					3818,
					640,
					16
				]
			},
			"教育": {
				"name": [
					"高中/中专/中技及以下",
					"大专",
					"本科",
					"硕士",
					"博士"
				],
				"value": [
					192,
					478,
					1538,
					195,
					7
				]
			},
			"农、林、牧、渔业": {
				"name": [
					"高中/中专/中技及以下",
					"大专",
					"本科",
					"硕士",
					"博士"
				],
				"value": [
					267,
					211,
					342,
					71,
					5
				]
			},
			"制造业": {
				"name": [
					"高中/中专/中技及以下",
					"大专",
					"本科",
					"硕士",
					"博士"
				],
				"value": [
					52522,
					24314,
					26106,
					3805,
					117
				]
			},
			"交通运输、仓储和邮政业": {
				"name": [
					"高中/中专/中技及以下",
					"大专",
					"本科",
					"硕士",
					"博士"
				],
				"value": [
					13596,
					8991,
					8479,
					473,
					5
				]
			},
			"批发和零售业": {
				"name": [
					"高中/中专/中技及以下",
					"大专",
					"本科",
					"硕士",
					"博士"
				],
				"value": [
					4569,
					5617,
					3393,
					215,
					5
				]
			},
			"信息传输、软件和信息技术服务业": {
				"name": [
					"高中/中专/中技及以下",
					"大专",
					"本科",
					"硕士",
					"博士"
				],
				"value": [
					2152,
					6915,
					12570,
					2392,
					188
				]
			},
			"文化、体育和娱乐业": {
				"name": [
					"高中/中专/中技及以下",
					"大专",
					"本科",
					"硕士",
					"博士"
				],
				"value": [
					1185,
					2636,
					3497,
					268,
					6
				]
			},
			"房地产业": {
				"name": [
					"高中/中专/中技及以下",
					"大专",
					"本科",
					"硕士",
					"博士"
				],
				"value": [
					2604,
					4525,
					6892,
					976,
					21
				]
			},
			"科学研究和技术服务业": {
				"name": [
					"高中/中专/中技及以下",
					"大专",
					"本科",
					"硕士",
					"博士"
				],
				"value": [
					1711,
					2521,
					5988,
					2308,
					392
				]
			},
			"卫生和社会工作": {
				"name": [
					"高中/中专/中技及以下",
					"大专",
					"本科",
					"硕士",
					"博士"
				],
				"value": [
					237,
					360,
					502,
					124,
					20
				]
			}
		
    }
    
    ;
    console.log(JSON.stringify(Object.keys(obj)))



                // let data = require('./data.json');
                this.$http({
                    url: this.$http.adornUrl("op=dash&func=getDashData", "XZX"),
                    method: "post",
                    data: {
                        condition: JSON.stringify({
                            index: 3,
                            queryKeys: ['B_B11_3']
                        })
                    }
                }).then(({
                    data
                }) => {
                    if (data && data.code == 200) {
                        this.pie_aData = data.data.bussinessFlow;
                        this.pie_aData = {
                          name: ["翠云街道",
				"礼嘉街道",
				"康美街道",
				"人和街道",
				"鸳鸯街道",
				"金山街道",
				"天宫殿街道",
				"大竹林街道"],
                          value: [
				1885,
				2041,
				2281,
				3578,
				5060,
				6913,
				8165,
				9046

			],
                          value1:[3330,
2074,
1527,
3578,
4014,
4884,
6559,
8027]

                        };
                        this.pie_a_nextData = data.data.industuryFlow;
                        this.estate_salary_Data = data.data.natureFlow;
                        this.estateData = data.data.B_B11_3;
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
        // background: #666;
    }
</style>