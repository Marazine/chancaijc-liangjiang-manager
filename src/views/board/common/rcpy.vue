<template>
  <div class="my-board main">
    <!-- <div class="title-c"></div> -->
    <div class="content" v-if="isShow">
      <!-- <div class="title-text">
        <img src="~@/assets/img/rcpy.png" alt="">
      </div>
      <img class="fuseChildrenBack" @click="$router.push({name:'board'})" src="~@/assets/img/0001.png" alt=""> -->
      <div class="row bh-100">
        <div class="row col-md-12 columnBox ">
          <div class="columnBottom row">
            <div class=" col-md-6 column column100">
              <Chart :initData="pie_aData" :config='pie_aconfig'></Chart>
            </div>
            <div class=" col-md-6 column column100">
              <Chart :initData="pyfsData" :config='pyfs_config'></Chart>
            </div>
            <!-- <div class=" col-md-6 column column100">
              <Chart :initData="dwpy_Data" :config='dwpy_config'></Chart>
            </div> -->
          </div>
          <div class="columnBottom row">
            <div class=" col-md-6 column column100">
              <Chart :initData="dyyj_Data" :config='dyyj_config'></Chart>
            </div>
            <div class=" col-md-6 column column100">
              <Chart :initData="liuzhu_Data" :config='liuzhu_aconfig'></Chart>
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
                dyyj_Data: null, //下年度计划引进毕业生数量
                xbn_Data: null, //下年度人才培养费用预算（单位：元）
                dwpy_Data: null, //单位在人才培养方面，主要需要的政府支持
                pyfsData: null, //单位的人才主要培养方式
                pie_aData: null, //本年度引入毕业生数量
                liuzhu_Data: {
                  name: ["中山大学","暨南大学珠海校区","北京师范大学珠海分校","北京理工大学珠海学院","吉林大学珠海学院","遵义医科大学","联合国际学院","广东科学技术职业学院","珠海城市职业技术学院" ,"珠海艺术职业学院"],
                  value: [21,6,493,263,478,11,11,599,2335,84]
                },
                liuzhu_aconfig: {
                    type: 'bndyjbys',
                    title: "近三年珠海高校毕业生留珠海就业情况",
                    paddingTop: '10%',
                    radius: ['50%', '70%'],
                    radius2: [0, '48%'],
                    left: '2%',
                    right: '2%',
                    top: '0',
                    bottom: '0',
                    showPercent:true
                },
                pie_aconfig: {
                    type: 'bndyjbys',
                    title: "本年度引入毕业生数量",
                    paddingTop: '10%',
                    radius: ['50%', '70%'],
                    radius2: [0, '48%'],
                    left: '2%',
                    right: '2%',
                    top: '0',
                    bottom: '0',
                },
                pyfs_config: {
                    type: 'dwcrzypy',
                    title: "在岗校招人数",
                    paddingTop: '6%',
                    radius: ['35%', '75%'],
                },
                xbn_config: {
                    type: 'xndrcfy',
                    title: '下年度人才培养费用预算（单位：元）',
                    paddingTop: '10%',
                    echartTitleShow: false,
                    left: '2%',
                    right: '10%',
                    top: '0',
                    bottom: '0%',
                    bh: 'bh-50',
                    isClick: false,
                },
                dyyj_config: {
                    type: 'xndjhyjbyssl',
                    title: '下年度计划引进毕业生数量',
                    paddingTop: '10%',
                    echartTitleShow: false,
                    left: '4%',
                    right: '10%',
                    top: '0',
                    bottom: '-8%',
                    bh: 'bh-50',
                    isClick: false,
                },
                dwpy_config: {
                    type: 'dwrcpyzfzc',
                    title: '应届毕业生平均薪资',
                    paddingTop: '8%',
                    echartTitleShow: false,
                    left: '5%',
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
                            queryKeys: ["C1_3", "C6", "C1_5", "C1_4", "C11", "B9_1"]
                        })
                    }
                }).then(({
                    data
                }) => {
                    if (data && data.code == 200) {
                        this.pie_aData = data.data.C1_3;
                        this.dyyj_Data = data.data.C1_5;
                        this.xbn_Data = data.data.C2_4;
                        this.dwpy_Data = data.data.C1_4;
                        this.pyfsData = data.data.B9_1;
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