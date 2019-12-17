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

                this.myChart = this.$echarts.init(this.$refs.pillar);

                let option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    xAxis: [{
                        data: data_chart.name,
                        axisLabel: {
                            interval: 0,
                            show: false
                        },
                    }, {
                        data: data_chart.name,
                        axisLabel: {
                            interval: 0,
                            show: true
                        },
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        gridIndex: 1
                    }],
                    yAxis: [{
                        type: 'value',
                        show: true,
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: true,
                            lineStyle: {
                                color: "#a0c0ff",
                                with: 3
                            }
                        },
                        axisLabel: {
                            show: true,
                            normal: {
                                color: "#fff"
                            }
                        },
                    }, {
                        gridIndex: 1,
                        show: false,
                    }],
                    grid: [{
                        width: '80%',
                        left: '10%'
                    }, {
                        left: '13.3%',
                        width: '80%'
                    }],
                    series: [{
                        type: 'bar',
                        barWidth: 10,
                        data: data_chart.value,
                        itemStyle: {
                            barBorderRadius: 10,
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0,
                                    color: '#37FFF9' // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: 'rgba(0, 222, 215, 0.2)' // 100% 处的颜色
                                }],
                            }
                        }

                    }, {
                        type: 'bar',
                        barWidth: 10,
                        data: data_chart.value1,
                        itemStyle: {
                            barBorderRadius: 10,
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0,
                                    color: '#FF5624' // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: 'rgba(255, 86, 36, 0.2)' // 100% 处的颜色
                                }],
                            }
                        }
                    }, ]
                };


                this.myChart.setOption(option);
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