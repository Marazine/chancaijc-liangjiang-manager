<template>
  <div class="back-img bh-50">
    <div class="title">
      <img src="../../../assets/img/arrow.png" alt="">
      {{config.title}}
    </div>
    <div class="s-content" ref="pillar" id="pillar" :style="{paddingTop:config.paddingTop?config.paddingTop:''}"></div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
	    	myChart:null,
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
                data_chart.value.forEach((item, index) => {
                    data_chart.value[index] = "-" + item;
                })

                this.myChart = this.$echarts.init(this.$refs.pillar);
                /**
                 * 外接数据
                 *
                 */
                let data = { //标准参数
                    id: 'multipleThree',
                    title: '双柱子',
                    legend: ['正面', '负面'],
                    barWidth: 30,
                    yAxis: ['最值得冒险', '知道不知道', '儿子娃娃', '正确人类', '纠结', '只要平凡'],
                    xAxis: [
                        [-180, -150, -60, -95, -160, -80],
                        [150, 220, 165, 300, 180, 200, ]
                    ],
                    color: ['#5e94dd', '#49b5bd'],
                }

                let option = {
                    backgroundColor: 'transparent',
                    // title: {
                    //     text: data.title,
                    //     left: 20,
                    //     textStyle: {
                    //         fontSize: 16,
                    //         fontWeight: 500,
                    //         color: '#414957'
                    //     },
                    //     top: 12
                    // },
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
                    legend: {
                        top: 12,
                        itemGap: 10,
                        itemWidth: 10,
                        itemHeight: 10,
                        data: data.legend
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
                    grid: {
                        // x: "2%",
                        // y: 0,
                        // x2: 30,
                        // y2: 15,
                        left: '4%',
                        right: '10%',
                        bottom: '-8%',
                        top: '0',
                        containLabel: true
                    },
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
                            margin: this.config.margin,
                            // align: "left",
                            textStyle: {
                                fontSize: 11,
                                color: '#ddd',
                            },
                            formatter: function(value) {
                                if (value.length > 8) {
                                    return value.substring(0, 8) + "..";
                                } else {
                                    return value;
                                }
                                // return value
                            },
                        },

                        data: this.$filterReserve(data_chart.name)
                    }],
                    series: [{
                        name: config_chart.legend[0],
                        type: 'bar',
                        barWidth: 12,
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'left',
                                color: '#ddd',
                                fontSize: '10',
                                formatter: function(params) {
                                    return params.data * -1;
                                }
                            },

                        },
                        data: this.$filterReserve(data_chart.value)
                    }, {
                        name: config_chart.legend[1],
                        type: 'bar',
                        barWidth: 12,
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'right',
                                color: '#ddd',
                                fontSize: '10',
                            }
                        },
                        data: this.$filterReserve(data_chart.value2)
                    }, ]
                }
                this.myChart.setOption(option);
                window.addEventListener("resize", ()=> {
                    if(this.myChart) {
                        this.myChart.resize();
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>