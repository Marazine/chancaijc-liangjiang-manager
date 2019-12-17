<template>
    <div class="bh-100">
        <div class="chart-wrap" ref="pillar"></div>
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

                this.myChart = this.$echarts.init(this.$refs.pillar);

                let option = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        color: ["#F58080", "#47D8BE"],
                        data: ['流入', '流出'],
                        left: 'center',
                        // bottom: 'bottom',
                        textStyle: { //图例文字的样式
                            color: '#fff',
                            // fontSize: 16
                        },
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '0%',
                        height: '90%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        data: data_chart.name,
                        axisLabel: {
                            margin: 10,
                            color: '#e2e9ff',
                            textStyle: {
                                fontSize: 12,
                            },
                            rotate:35,
                            formatter: (value) => {
                                return value
                            }
                        },
                    },
                    yAxis: {
                        type: 'value',

                        splitLine: {
                            lineStyle: {
                                type: 'dashed',
                                color: '#DDD'
                            }
                        },
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: "#fff"
                            },
                        },
                        nameTextStyle: {
                            color: "#999"
                        },
                        splitArea: {
                            show: false
                        },
                    },
                    series: [{
                            name: '流入',
                            type: 'line',
                            data: data_chart.value,
                            color: "#F58080",
                            lineStyle: {
                                normal: {
                                    width: 5,
                                    color: {
                                        type: 'linear',

                                        colorStops: [{
                                            offset: 0,
                                            color: '#FFCAD4' // 0% 处的颜色
                                        }, {
                                            offset: 0.4,
                                            color: '#F58080' // 100% 处的颜色
                                        }, {
                                            offset: 1,
                                            color: '#F58080' // 100% 处的颜色
                                        }],
                                        globalCoord: false // 缺省为 false
                                    },
                                    shadowColor: 'rgba(245,128,128, 0.5)',
                                    shadowBlur: 10,
                                    shadowOffsetY: 7
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#F58080',
                                    borderWidth: 10,
                                    /*shadowColor: 'rgba(72,216,191, 0.3)',
                                    shadowBlur: 100,*/
                                    borderColor: "#F58080"
                                }
                            },
                            smooth: true
                        },
                        {
                            name: '流出',
                            type: 'line',
                            data: data_chart.value1,
                            lineStyle: {
                                normal: {
                                    width: 5,
                                    color: {
                                        type: 'linear',

                                        colorStops: [{
                                                offset: 0,
                                                color: '#AAF487' // 0% 处的颜色
                                            },
                                            {
                                                offset: 0.4,
                                                color: '#47D8BE' // 100% 处的颜色
                                            }, {
                                                offset: 1,
                                                color: '#47D8BE' // 100% 处的颜色
                                            }
                                        ],
                                        globalCoord: false // 缺省为 false
                                    },
                                    shadowColor: 'rgba(71,216,190, 0.5)',
                                    shadowBlur: 10,
                                    shadowOffsetY: 7
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#AAF487',
                                    borderWidth: 10,
                                    /*shadowColor: 'rgba(72,216,191, 0.3)',
                                    shadowBlur: 100,*/
                                    borderColor: "#AAF487"
                                }
                            },
                            smooth: true
                        }
                    ]
                };

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