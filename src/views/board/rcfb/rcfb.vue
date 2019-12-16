<template>
  <!-- <div class="fuse content" v-if="isShow"> -->
  <div class="my-board main">
      <div class="title-c"></div>
      <div class="content" v-if="isShow">
        <div class="title-text">
            <img src="../../../assets/img/rcfb.png" alt="">
        </div>
        <img class="fuseChildrenBack" @click="$router.push({name:'board'})"
            src="../../../assets/img/0001.png" alt="">
        <div class="row bh-100">
            <div class="row col-md-4">
                <div class=" col-md-12 f-column column">
                    <Chart :initData="product_personData2" :config='product_person_config'></Chart>
                    <Chart :initData="titleData" :config='configure_ind'></Chart>
                </div>
            </div>
            
            <div class="row col-md-8 columnBox ">
                <div class="columnBottom row">
                    <div class=" col-md-6 column column100">
                        <Chart :initData="pie_aData1" :config='pie_aconfig1'></Chart>
                    </div>
                    <div class=" col-md-6 column column100">
                        <Chart :initData="pie_aData" :config='pie_aconfig'></Chart>
                    </div>
                </div>
                <div class="columnBottom row">
                    <div class=" col-md-12 column column100">
                        <Chart :initData="product_personData" :config='titleconfig'></Chart>
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
            product_personData: [],
            product_personData2: [],
            pie_aData: null, //年龄分布
            pie_aData1: null, //技能分布
            // pie_aData1: {
            // }, //技能分布
            pie_aData2: {}, //技能分布
            titleData: null, //职称分布
            titleconfig: {
                type: 'rczy',
                title: "单位核心部门或核心业务的人才专业",
                bar_color_l: "#00fff3",
                bar_color_r: "transparent",
                ispercent: false,
                paddingTop: '6%',
                top: '10%',
                right: '5%',
                left: '5%',
                bottom: '30%',
                barWidth: '10px',
                isClick: false,
            },
            pie_aconfig: {
                type: 'rcxlfb',
                title: "人才学历分布",
                paddingTop: '10%',
                echartTitleShow: false,
                left: '2%',
                right: '2%',
                top: '0',
                bottom: '0',
                push: 'rcyj',
                isClick: false,
                radius: ['45%', '60%'],
                radius2: [0, '43%'],
            },
            pie_aconfig1: {
                type: 'rchjfb',
                title: "人才户籍分布",
                paddingTop: '10%',
                echartTitleShow: false,
                left: '2%',
                right: '2%',
                top: '0',
                bottom: '0',
                push: 'rcyj',
                isClick: false,
                radius: ['45%', '60%'],
                radius2: [0, '43%'],
            },
            product_person_config: {
                type: 'nlfb',
                title: '年龄分布',
                paddingTop: '10%',
                echartTitleShow: false,
                left: '4%',
                right: '10%',
                top: '0',
                bottom: '-8%',
                bh: 'bh-50',
                isClick: false,
            },
            configure_ind: {
                type: 'xbfb',
                title: "性别分布",
                c_left: "5%",
                paddingTop: '10%',
                margin: 30,
                legend: ['男', '女'],
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
                        queryKeys: ['B2_1','B2_2','B3','B6_1','B4']
                    })
                }
            }).then(({
                data
            }) => {
                if (data && data.code == 200) {
                    this.product_personData2 = data.data.B2_1;
                    // this.titleData = data.data.B2_2;

                    let man = (parseInt(data.data.B2_2.value[0])/(parseInt(data.data.B2_2.value[0])+parseInt(data.data.B2_2.value[1]))*100).toFixed(2)+'%';
                    let woman = (parseInt(data.data.B2_2.value[1])/(parseInt(data.data.B2_2.value[0])+parseInt(data.data.B2_2.value[1]))*100).toFixed(2)+'%';
                    this.titleData = {
                        man: {
                            number: data.data.B2_2.value[0],
                            percentage: man
                        },
                        woman: {
                            number: data.data.B2_2.value[1],
                            percentage: woman
                        }
                    }
                    this.pie_aData1 = data.data.B3;
                    this.pie_aData = data.data.B6_1;
                    this.product_personData = data.data.B4;
                    this.isShow = true;
                }
            });
        }
    }
}
</script>

<style lang='scss' scoped>
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
