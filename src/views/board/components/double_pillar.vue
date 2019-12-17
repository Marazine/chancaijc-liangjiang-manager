<template>
  <div class="bh-100">
    <div class="chart-wrap" ref="pillar"></div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                myChart: null,
                chartData: {
                    "name": ['海洋产业', '航天航空产业', '生物产业', '新材料产业', '节能环保产业', '生命健康产业', '新能源产业', '文化创意产业', '高端装备制造',
                        '现代服务产业', '互联网产业', '新一代信息技术产业'
                    ],
                    'value1': [1350, 1948, 2970, 5468, 10034, 10162, 10428, 11017, 14383, 17681, 48060, 94567],
                    'value2': [1261, 1815, 2117, 4544, 9900, 7861, 9043, 9271, 13235, 15450, 36115, 75320]
                }
            }
        },
        created() {

        },
        mounted() {
            this.init();
        },
        beforeDestroy() {
            this.myChart.dispose();
        },
        components: {},
        props: ['initData', 'config'],
        methods: {
            init() {
                if (this.initData) {
                    this.pillarChart(this.initData, this.config);
                } else {
                    this.pillarChart(this.chartData, this.config);
                }
            },
            pillarChart(data_chart, config_chart) {
                // data_chart.value.forEach((item, index) => {
                //     data_chart.value[index] = "-" + item;
                // })

                this.myChart = this.$echarts.init(this.$refs.pillar);
                /**
                 * 外接数据
                 *
                 */
                // let data = { //标准参数
                //     id: 'multipleThree',
                //     title: '双柱子',
                //     legend: ['正面', '负面'],
                //     barWidth: 30,
                //     yAxis: ['最值得冒险', '知道不知道', '儿子娃娃', '正确人类', '纠结', '只要平凡'],
                //     xAxis: [
                //         [-180, -150, -60, -95, -160, -80],
                //         [150, 220, 165, 300, 180, 200, ]
                //     ],
                //     color: ['#5e94dd', '#49b5bd'],
                // }
                let xData = data_chart.name;
                let y1Data = data_chart.value;
                let y1Data1 = [];
                data_chart.value1.forEach((item, index) => {
                    y1Data1.push(item * -1);
                })
                if (this.config.isScroll) {
                    var tempMaxData = y1Data.pop();
                    var tempMaxData1 = y1Data1.pop();
                    var tempXData = xData.pop();
                }
                let option = {
                    backgroundColor: 'transparent',
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
                        },
                        formatter: function(params) {
                            let time = '';
                            let str = '';
                            for (let i of params) {
                                time = i.name.replace(/\n/g, '') + '<br />';
                                if (i.data == 'null' || i.data == null) {
                                    str += i.seriesName + '：无数据' + '<br />'
                                } else {
                                    str += i.seriesName + '：' + Math.abs(i.data) + '<br />'
                                }
                            }
                            return time + str;
                        },
                    },
                    color: [new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                            offset: 0,
                            color: "#0167e8"
                        }, {
                            offset: 1,
                            color: "#13ace8"
                        }], false),
                        new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                            offset: 0,
                            color: "#963ff1"
                        }, {
                            offset: 1,
                            color: "#fd5c8c"
                        }], false)
                    ],
                    // legend: {
                    //     top: 12,
                    //     itemGap: 10,
                    //     itemWidth: 10,
                    //     itemHeight: 10,
                    //     data: this.config.legend
                    // },
                    grid: {
                        left: '4%',
                        right: '10%',
                        bottom: '-8%',
                        top: '0',
                        containLabel: true
                    },
                    // xAxis: [ {
                    //     type : 'value'
                    // }],
                    xAxis: {
                        show: false
                    },
                    yAxis: [{
                        type: 'category',
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: true,
                            interval: '0',
                            // margin: this.config.margin,
                            // align: "left",
                            textStyle: {
                                fontSize: 11,
                                color: '#ddd',
                            },
                            formatter: function(value) {
                                // if (value.length > 8) {
                                //     return value.substring(0, 8) + "..";
                                // } else {
                                return value;
                                // }
                            },
                        },
                        // data : ['分拣','清洗','抛光','研磨','脱膜','切割','压膜','压膜分配','光固化后处理','光固化']
                        data: xData
                    }],
                    "dataZoom": [{
                        "show": false,
                        "height": 12,
                        filterMode: 'empty',
                        "yAxisIndex": [
                            0
                        ],
                        bottom: '8%',
                        "start": 0,
                        "end": 45,
                        handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
                        handleSize: '110%',
                        handleStyle: {
                            color: "#d3dee5",

                        },
                        textStyle: {
                            color: "#fff"
                        },
                        borderColor: "#90979c"
                    }, {
                        "type": "inside",
                        "show": true,
                        "yAxisIndex": [
                            0
                        ],
                        "height": 15,
                        "start": 1,
                        "end": 35
                    }],
                    series: [{
                        name: this.config.legend[0],
                        type: 'bar',
                        stack: '总量',
                        barWidth: 16,
                        label: {
                            normal: {
                                show: true,
                                position: 'insideLeft',
                                color: '#ddd',
                                fontSize: '10',
                                formatter: function(params) {
                                    return params.data;
                                }
                            }
                        },
                        // data:[400, 241,360, 320, 302, 341, 374, 390, 450, 420]
                        data: y1Data
                    }, {
                        name: this.config.legend[1],
                        type: 'bar',
                        stack: '总量',
                        // barWidth: 12,
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight',
                                color: '#ddd',
                                fontSize: '10',
                                formatter: function(params) {
                                    return params.data * -1;
                                }
                            }
                        },
                        // data:[-120, -180,-120, -120, -132, -101, -134, -190, -230, -210]
                        data: y1Data1
                    }],
                };
                this.myChart.setOption(option);
                if (this.config.isScroll) {
                    setInterval(() => {

                        xData.unshift(tempXData);
                        tempXData = xData.pop();

                        y1Data.unshift(tempMaxData);
                        tempMaxData = y1Data.pop();

                        y1Data1.unshift(tempMaxData1);
                        tempMaxData1 = y1Data1.pop();

                        this.myChart.setOption(option);
                    }, 2000);
                }
                window.addEventListener("resize", () => {
                    if (this.myChart) {
                        this.myChart.resize();
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>