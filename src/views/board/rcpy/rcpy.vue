<template>
  <div class="my-board main">
      <div class="title-c"></div>
      <div class="content" v-if="isShow">
        <div class="title-text">
            <img src="../../../assets/img/rcpy.png" alt="">
        </div>
        <img class="fuseChildrenBack" @click="$router.push({name:'board'})"
            src="../../../assets/img/0001.png" alt="">
        <div class="row bh-100">
            <div class="row col-md-12 columnBox ">
                <div class="columnBottom row">
                    <div class=" col-md-4 column column100">
                        <Chart :initData="pie_aData" :config='pie_aconfig'></Chart>
                    </div>
                    <div class=" col-md-4 column column100">
                        <Chart :initData="dyyj_Data" :config='dyyj_config'></Chart>
                    </div>
                    <div class=" col-md-4 column column100">
                        <Chart :initData="xbn_Data" :config='xbn_config'></Chart>
                    </div>
                </div>
                <div class="columnBottom row">
                    <div class=" col-md-6 column column100">
                        <Chart :initData="pyfsData" :config='pyfs_config'></Chart>
                    </div>
                    <div class=" col-md-6 column column100">
                        <Chart :initData="dwpy_Data" :config='dwpy_config'></Chart>
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
            dyyj_Data: null, //单位引进人才难度大的主要原因（原B13、人才队伍建设-人才队伍建设存在的主要困难）
            xbn_Data: null, //下年度人才培养费用预算（单位：元）
            dwpy_Data: null, //单位在人才培养方面，主要需要的政府支持
            pyfsData: null, //单位的人才主要培养方式
            pie_aData: null, //本年度人才培养费用预算（单位：元）
            pie_aconfig: {
                type: 'bndcrpyfy',
                title: "本年度人才培养费用预算（单位：元）",
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
                title: "单位的人才主要培养方式",
                paddingTop: '10%',
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
                bottom: '-8%',
                bh: 'bh-50',
                isClick: false,
            },
            dyyj_config: {
                type: 'dwyjcryy',
                title: '单位引进人才难度大的主要原因',
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
                type:'dwrcpyzfzc',
                title: '单位在人才培养方面，主要需要的政府支持',
                paddingTop: '8%',
                echartTitleShow: false,
                left: '2%',
                right: '10%',
                top: '0',
                bottom: '-8%',
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
                data:{
                    condition:JSON.stringify({
                        index: 0,
                        queryKeys: ["C2_3","C6","C2_4","C8","C11"]
                    })
                }
            }).then(({
                data
            }) => {
                if (data && data.code == 200) {
                    this.pie_aData = data.data.C2_3;
                    this.dyyj_Data = data.data.C6;
                    this.xbn_Data = data.data.C2_4;
                    this.dwpy_Data = data.data.C8;
                    this.pyfsData = data.data.C11;
                    this.isShow = true;
                }
            });
        }
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