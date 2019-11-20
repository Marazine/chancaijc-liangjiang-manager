<template>
  <div class="home">
    <el-row :gutter="20" class="mgb20">
      <el-col :span="8">
        <el-card shadow="hover" :body-style="{padding: '20px'}">
          <div class="grid-content">
            <p class="grid-content-title">参与企业总数</p>
            <p class="grid-content-body">{{num1}}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover" :body-style="{padding: '20px'}">
          <div class="grid-content">
            <p class="grid-content-title">企业全部在岗人才总数</p>
            <p class="grid-content-body">{{comAllTalent}}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover" :body-style="{padding: '20px'}">
          <div class="grid-content">
            <p class="grid-content-title">本年度引进人才总数</p>
            <p class="grid-content-body">{{thisYearNewTalent}}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="mgb20">
      <el-col :span="12">
        <el-card shadow="hover">
          <p class="chart-title">本次调研企业所在区域</p>
          <div id="pie_nsq" class="chart-box"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <p class="chart-title">本次调研企业单位性质分布</p>
          <div id="pie_qyxz" class="chart-box"></div>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
    import echarts from "echarts";
    import G2 from "@antv/g2";
    import DataSet from "@antv/data-set";


    export default {
        data() {
            return {
                comAllTalent: "" || 0,
                num1: "" || 0,
                comNSTalent: "" || 0,
                thisYearNewTalent: "" || 0,
                percent1: [],
                percent2: [],
                chartPieL: {},
                chartPieR: {},
                trendData: [], //趋势图
                collapse: false,
                value13: '', //时间 日期
                active: "active",
                time: {}
            };
        },
        created() {
            this.init();
            this.time = {
                staTime: "2019-1-1 00:00:00",
                endTime: "2019-12-31 23:59:59"
            }
            this.getTrendData(this.time);
        },
        activated() {
            this.init();
            this.handleListener();
            this.time = {
                staTime: "2019-1-1 00:00:00",
                endTime: "2019-12-31 23:59:59"
            }
            this.getTrendData(this.time);
        },
        mounted() {
            this.renderChart();
            document.body.style.backgroundImage = 'none';
            this.$root.eventHub.$on('globalDataChange', (res) => {
                // 监听全局时间段
                if ((res.on == '1') && (this.$route.name == 'home')) {
                    console.log('home接收监听')
                    this.init();
                    this.time = {
                        staTime: "2019-1-1 00:00:00",
                        endTime: "2019-12-31 23:59:59"
                    }
                    this.getTrendData(this.time);
                }
            })
        },
        beforeDestory() { // 销毁前
            this.$root.eventHub.$off('globalDataChange');
        },
        methods: {
            handleListener() {
                if (this.collapse != this.$store.state.common.sidebarFold) {
                    this.handleBus();
                }
            },
            handleBus(msg) {
                setTimeout(() => {
                    this.renderChart()
                }, 300);
            },
            renderChart() {
                this.initChartPieL();
                this.initChartPieR();
            },
            init() {
                this.$http({
                    url: this.$http.adornUrl("op=bigtablecontroller&func=getIndexData", "CQ"),
                    method: "post",
                    data: {}
                }).then(({
                    data
                }) => {
                    // console.dir(data.data.percent1);
                    if (data.code == 200) {
                        this.comAllTalent = data.data.num2;
                        this.num1 = data.data.num1;
                        this.comNSTalent = data.data.comNSTalent;
                        this.thisYearNewTalent = data.data.num3;
                        this.four = data.data.four;
                        this.country = data.data.country;
                        this.fourAndCountry = data.data.fourAndCountry;
                        this.percent1 = data.data.percent1;
                        this.percent2 = data.data.percent2;
                        this.renderChart();
                    } else {
                        // this.$message.success(data.status_desc);
                    }
                });
            },
            handleBus(msg) {
                setTimeout(() => {
                    this.renderChart();
                }, 300);
            },
            renderChart() {
                this.initChartPieL();
                this.initChartPieR();
            },
            spinChartOption(echartData, isleft) {
                var rightData = echartData.map(item => {
                    return item.name;
                });
                var option = {
                    backgroundColor: "#fff",
                    tooltip: {
                        trigger: 'item',
                        formatter: (param) => {
                            return param.name ? param.name + ": " + param.value : ''
                        }
                    },
                    legend: {
                        orient: "vertical",
                        right: "20",
                        y: "center",
                        icon: "circle",
                        textStyle: {
                            color: "#343ecb"
                        },
                        // data: ['物料1', '物料2', '物料3', '物料4', '物料5', '物料6', '物料7'],
                        data: rightData,
                        formatter: function(name) {
                            var oa = option.series[0].data;
                            // var num = oa[0].value + oa[1].value + oa[2].value + oa[3].value;
                            var num = oa
                                .map(item => {
                                    return item.value;
                                })
                                .reduce((total, item) => {
                                    return total + item;
                                });
                                if(num === 0){
                                    num = 1;
                                }
                            for (var i = 0; i < option.series[0].data.length; i++) {
                                if (name == oa[i].name) {
                                    return (
                                        name + "     " + ((oa[i].value / num) * 100).toFixed(2) + "%"
                                    );
                                }
                            }
                        }
                    },
                    series: [{
                        type: "pie",
                        center: ["30%", "50%"],
                        radius: ["50%", "70%"],
                        roseType: "radius",
                        startAngle: 100,
                        color: [
                            "#3AA0FF",
                            "#36CBCB",
                            "#4DCB73",
                            "#FAD337",
                            "#F2637B",
                            "#975FE4",
                            "#8356E4",
                            "#343ECB",
                            "#FAA644"
                        ],
                        label: {
                            normal: {
                                show: false
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: echartData
                    }, {
                        name: "",
                        type: "pie",
                        clockWise: true,
                        hoverAnimation: false,
                        center: ["30%", "50%"],
                        radius: [0, "43%"],
                        label: {
                            normal: {
                                position: "center"
                            }
                        },
                        data: [{
                            value: 0,
                            itemStyle: {
                                normal: {
                                    color: "#5F68E4"
                                }
                            },
                            label: {
                                normal: {
                                    formatter: isleft ? "两江新区" : "企业性质",
                                    textStyle: {
                                        color: "#000",
                                        fontSize: 25,
                                        fontWeight: "bold"
                                    }
                                }
                            }
                        }]
                    }]
                };

                return option;
            },
            // 饼状图/企业所在区域
            initChartPieL() {
                var echartData = [];
                if (this.percent1.length != 0) {
                    echartData = this.analyzeData(this.percent1);
                }
                // console.log(echartData);
                var option = this.spinChartOption(echartData, true);
                this.chartPieL = echarts.init(document.getElementById("pie_nsq"));
                this.chartPieL.setOption(option);
                window.addEventListener("resize", () => {
                    this.chartPieL.resize();
                });
            },
            analyzeData(obj) {
                let arr = [];
                for (const key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        const element = obj[key];
                        arr.push({
                            value: obj[key],
                            name: key
                        });
                    }
                }
                return arr;
            },
            // 饼状图/企业单位性质分布
            initChartPieR() {
                var echartData = [];
                if (this.percent1.length != 0) {
                    echartData = this.analyzeData(this.percent2);
                }

                var option = this.spinChartOption(echartData, false);
                this.chartPieR = echarts.init(document.getElementById("pie_qyxz"));
                this.chartPieR.setOption(option);
                window.addEventListener("resize", () => {
                    this.chartPieR.resize();
                });
            },
            initG2Trend(data) {
                document.getElementById("mountNode").innerHTML = "";
                var data = data;
                var ds = new DataSet();
                var dv = ds.createView().source(data);
                // fold 方式完成了行列转换，如果不想使用 DataSet 直接手工转换数据即可
                dv.transform({
                    type: 'fold',
                    fields: ['招聘需求', '人才流动'], // 展开字段集
                    key: 'city', // key字段
                    value: 'temperature' // value字段
                });
                var chart = new G2.Chart({
                    container: 'mountNode',
                    forceFit: true,
                    height: "443"
                });
                chart.source(dv, {
                    month: {
                        range: [0, 1]
                    }
                });
                chart.tooltip({
                    crosshairs: {
                        type: 'line'
                    }
                });
                chart.axis('temperature', {
                    label: {
                        formatter: function formatter(val) {
                            return val + '';
                        }
                    }
                });
                chart.line().position('month*temperature').color('city').shape('smooth');
                chart.point().position('month*temperature').color('city').size(4).shape('circle').style({
                    stroke: '#fff',
                    lineWidth: 1
                });
                chart.render();
            },
            // 本季 全年
            quarterChange(e) {
                if (this.active != "active") {
                    this.active = "active";
                } else {
                    this.active = "";
                }
                this.time = "";
                var staTime = "2019-1-1 " + "00:00:00";
                var endTime = "2019-12-31 " + "23:59:59";
                if (e.target.innerHTML == "本季") {
                    let dataTime = new Date();
                    var year = dataTime.getFullYear();
                    var month = dataTime.getMonth() + 1;
                    if (month > 0 && month <= 3) {
                        staTime = year + "-1-1 " + "00:00:00";
                        endTime = year + "-3-31 " + "23:59:59";
                    } else if (month > 3 && month <= 6) {
                        staTime = year + "-4-1 " + "00:00:00";
                        endTime = year + "-6-31 " + "23:59:59";
                        this.time = [year + "-4-1 ", year + "-6-31"];
                    } else if (month > 6 && month <= 9) {
                        staTime = year + "-7-1 " + "00:00:00";
                        endTime = year + "-9-31 " + "23:59:59";
                    } else {
                        staTime = year + "-10-1 " + "00:00:00";
                        endTime = year + "-12-31 " + "23:59:59";
                    }
                }
                this.time = {
                    staTime,
                    endTime
                };
                this.getTrendData(this.time);
            },
            getTrendData(time) {
                return;
                var param = JSON.stringify({
                    staTime: time.staTime,
                    endTime: time.endTime
                })

                this.$http({
                    url: this.$http.adornUrl(
                        "op=bigtablecontroller&func=trendList",
                        "CQ"
                    ),
                    method: "post",
                    data: {
                        groupName: param
                    }
                }).then(({
                    data
                }) => {

                    if (data.code == 200) {
                        var list = data.data.list;

                        let arr = [];
                        if (list) {
                            list.forEach(item => {
                                arr.push({
                                    month: item.month.slice(-2),
                                    "招聘需求": item.gapCount,
                                    "人才流动": item.flowCount
                                })
                            })
                            this.trendData = arr;
                            this.initG2Trend(this.trendData);
                        }
                    } else {
                        this.$message.success(data.status_desc);
                    }

                });
            },
            // 时间日期
            change() {
                var staYear = this.value13[0].getFullYear();
                var staMonth = this.value13[0].getMonth();
                var staDate = this.value13[0].getDate();
                var staTime = staYear + "-" + staMonth + "-" + staDate + " 00:00:00";
                // 结束时间
                var endYear = this.value13[1].getFullYear();
                var endMonth = this.value13[1].getMonth();
                var endDate = this.value13[1].getDate();
                var endTime = endYear + "-" + endMonth + "-" + endDate + " 23:59:59";
                // console.log(staTime,endTime);
                this.time = {
                    staTime,
                    endTime
                }
                this.getTrendData(this.time);
            }
        }
    };
</script>

<style>
    .mgb20 {
        margin-bottom: 20px;
    }
    
    .grid-content-title {
        font-size: 14px;
        color: #555;
    }
    
    .grid-content-body {
        font-size: 48px;
        font-weight: bold;
        color: #333;
        text-align: center;
    }
    
    .chart-box {
        min-height: 380px;
    }
    
    .chart-title {
        font-size: 14px;
        color: #555;
    }
    /* 时间日期 */
    
    .home .trendLayout {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .home .trendTop {
        /* padding: 0 30px 0 20px; */
        border-bottom: 1px solid #ebeef5;
        height: 54px;
        width: 100%;
    }
    
    .home .trendTop span {
        margin-right: 20px;
        cursor: pointer;
    }
    
    .home .trendTop .block {
        margin-left: 20px;
    }
    
    .home .active {
        color: #1890FF;
    }
    
    .home .trendTop .el-range-editor--medium.el-input__inner {
        height: 32px;
    }
    
    .home .trendChart {
        padding: 0 60px;
    }
    
    #canvas_1 {
        max-height: 443px !important;
    }
    
    .avtive {
        color: #1890FF;
    }
</style>