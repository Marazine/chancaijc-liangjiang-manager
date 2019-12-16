<template>
  <div class="my-board main">
    <div class="title-c">
      珠海产才检测看板
    </div>
    <div class="fuse content" v-if="isShow">
      <img class="fuseChildrenBack" @click="$router.push({name:'board'})" src="../../../assets/img/0001.png" alt="">
      <div class="row bh-100">
        <div class="col-md-3 f-column">
          <ChartFill :initData="PayData" :config='configure_ind'></ChartFill>
        </div>
        <div class="col-md-6" style="padding:0 10px">
          <ns_map :initData='zhDataMap' :initmapData='initmapData' :title="'珠海地图'" :config="zhuhaimapConfig"></ns_map>
        </div>
        <div class="col-md-3 f-column">
          <ChartFill :initData="cyData" :config='configure_indcy'></ChartFill>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import nsMap from '../ns'
    import nsData from '../nsData'
    export default {
        data() {
            let queryType = this.$route.query.type;
            return {
                isShow: false,
                zhDataMap: {
                    ns_mapData: null,
                    ns_mapData2: null,
                },
                zhuhaimapConfig: {
                    isTitle: true,
                },
                initmapData: nsMap.data,
                PayData: null,
                cyData: null,
                configure_ind: {
                    type: 'qyqk_hy',
                    echartTitleShow: true,
                    echartTitle: "行业类型分布",
                    title: "行业类型分布",
                    isScroll: false,
                },
                configure_indcy: {
                    type: 'qyqk_cy',
                    echartTitleShow: true,
                    echartTitle: "产业类型分布",
                    title: "产业类型分布",
                    isScroll: false,
                },
            }
        },
        created() {
            this.init();
            // this.isShow = true;
        },
        mounted() {},
        components: {

        },
        methods: {
            init() {
                this.$http({
                    url: this.$http.adornUrl("op=personfusioncontroller&func=getIndexData", "CQ"),
                    method: "post",
                    data: {
                        condition: JSON.stringify({
                            index: 2,
                            queryKeys: ['A4', 'A5', 'B1_1', 'C1_1', 'C8']
                        })
                    }
                }).then(({
                    data
                }) => {
                    if (data && data.code == 200) {
                        this.cyData = data.data.A5;
                        this.PayData = data.data.A4;
                        this.zhDataMap.ns_mapData = data.data.businessDetail;
                        this.zhDataMap.ns_mapData2 = data.data.industryDetail;
                        this.isShow = true;
                    }
                });
            }
        }
    }
</script>

<style lang='scss' scoped>
    .main {
        height: 100vh;
        background: url('~@/assets/img/background.jpg') no-repeat;
        background-size: 100% 100%;
        padding: 0% 2.5% 2.5% 3.5% !important;
    }
</style>
</style>