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
            <div class="row col-md-3">
                <div class=" col-md-12 f-column column">
                    <chartSwitch :initData="product_personData2" :config='product_person_config'></chartSwitch>
                    <!-- <Chart :initData="product_personData2" :config='product_person_config'></Chart> -->
                    <Chart :initData="titleData" :config='configure_ind'></Chart>
                </div>
            </div>
            
            <div class="row col-md-9 columnBox ">
                <div class="columnBottom row">
                    <div class=" col-md-4 column column100">
                        <Chart :initData="pie_aData1" :config='pie_aconfig1'></Chart>
                    </div>
                    <div class=" col-md-4 column column100">
                        <Chart :initData="pie_aData" :config='pie_aconfig'></Chart>
                    </div>
                    <div class=" col-md-4 column column100">
                        <chartSwitch :initData="pie_aData3" :config='pie_aconfig3'></chartSwitch>
                        <!-- <Chart :initData="pie_aData3" :config='pie_aconfig3'></Chart> -->
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
            pie_aData3: null,
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
                title: "职称分布",
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
            pie_aconfig3: {
                type: 'rchjfb',
                title: "分布",
                paddingTop: '10%',
                echartTitleShow: false,
                left: '2%',
                right: '2%',
                top: '0',
                bottom: '0',
                push: 'rcyj',
                isClick: false,
                radius: ['45%', '60%'],
                radius2: [0, '43%']
            },
            product_person_config: {
                type: 'qyqk',
                echartTitleShow: true,
                echartTitle: "行业类型分布",
                title: "年龄分布",
                isScroll: false,
                titleLeft: "行业类型分布",
                titleRight: "行业人才分布"
            },
            pie_aconfig3:{
                type: 'qyqk',
                echartTitleShow: true,
                echartTitle: "",
                title: "人才产业分布",
                isScroll: true,
                titleLeft: "行业类型分布",
                titleRight: "行业人才分布",
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
                url: this.$http.adornUrl("op=dash&func=getDashData", "XZX"),
                method: "post",
                data:{
                    condition:JSON.stringify({
                        index: 2,
                        queryKeys: ['B_B3_1']
                    })
                }
            }).then(({
                data
            }) => {
                if (data && data.code == 200) {
                    // debugger
                    this.product_personData2 = data.data.age;
                    this.product_personData2 = {
                            A4: data.data.age
                        };
                    this.pie_aData3 = {
                            A4: data.data.industry
                        }
                    // this.titleData = data.data.B2_2;

                    let man = (parseInt(data.data.sex.value[1])/(parseInt(data.data.sex.value[1])+parseInt(data.data.sex.value[0]))*100).toFixed(2);
                    man = man!=="NaN"?man+"%":"0%";
                    // debugger
                    let woman = (parseInt(data.data.sex.value[0])/(parseInt(data.data.sex.value[1])+parseInt(data.data.sex.value[0]))*100).toFixed(2);
                    woman = woman!=="NaN"?woman+"%":"0%";
                    this.titleData = {
                        man: {
                            number: data.data.sex.value[1],
                            percentage: man
                        },
                        woman: {
                            number: data.data.sex.value[0],
                            percentage: woman
                        }
                    }
                    this.pie_aData1 = data.data.work;
                    this.pie_aData = data.data.edu;
                    this.product_personData = data.data.B_B3_1;
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
