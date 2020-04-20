<template>
    <div class="h-100">
        <div class="chartnew-wrap"
            ref="estate"></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                myChart: null,
                b_age_aboard: {
                    name: ['工商管理', '金融学', '英语', '会计学', '经济学', '国际经济与贸易',
                        '机械设计制造及其自动化', '日语', '市场营销', '土木工程'
                    ],
                    value: [1419, 1326, 1412, 1110, 1013, 907, 661, 657, 710, 789]
                },
                // imgUrl: this.config.isShowImgUrl ? require('@/assets/img/board/7.png') : ''
            }
        },
        props: ["initData", "config"],
        mounted() {
            this.init();
        },
        beforeDestroy() {
            this.myChart.dispose();
        },
        components: {},
        methods: {
            init() {
                if (this.initData) {
                    this.estateChart("estate", this.initData, this.config);
                } else {
                    this.estateChart("estate", this.b_age_aboard, this.config);
                }
            },
            estateChart(id, data, config_chart) {
                this.myChart = this.$echarts.init(this.$refs.estate);
                let xData = data.name;
                let y1Data = data.value;
                let total = data.value.reduce((prev, next) => {
                    return prev + next
                })


                let option = {
                    backgroundColor: "transparent",
                    tooltip: {
                        trigger: 'axis',
                        formatter: function(params) {
                            return params[0].name + "</br>" + params[0].marker + params[0].value
                        }
                    },
                    grid: {
                        top: '8%',
                        left: '10%',
                        right: '10%',
                        bottom: '8%',
                        containLabel: true,
                    },
                    legend: {
                        show: false,
                        itemGap: 50,
                        data: ['注册总量', '最新注册量'],
                        textStyle: {
                            color: '#f9f9f9',
                            borderColor: '#fff'
                        },
                    },
                    xAxis: [{
                        type: 'category',
                        boundaryGap: true,
                        axisTick: {
                            show: true
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#999',
                                width: 1 //这里是为了突出显示加上的
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#fff',
                                fontSize: 12
                            }
                        },
                        data: xData ? xData : ['1月', '2月', '3月', '4月', '5月', '6月', '7月', ],
                    }],
                    yAxis: [{
                        type: 'value',
                        min: 0,
                        // max: 140,
                        // splitNumber: 7,
                        axisTick: {
                            show: true
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#999',
                                width: 1 //这里是为了突出显示加上的
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#fff'
                            }
                        },
                        splitArea: {
                            areaStyle: {
                                color: 'rgba(255,255,255,.5)'
                            }
                        },
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: 'rgba(255, 129, 109, 0.1)',
                                width: 0.5,
                                type: 'dashed'
                            }
                        }
                    }],
                    series: [{
                        name: '最新注册量',
                        type: 'bar',
                        barWidth: 20,
                        tooltip: {
                            show: true
                        },
                        label: {
                            show: true,
                            position: 'top',
                            textStyle: {
                                color: '#fff',
                            },
                            formatter: function(params) {
                                return ((Number(params.value) / total) * 100).toFixed(1) + "%"
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: function(params) {
                                    var colorList = ['#0ec1ff', '#10cdff', '#12daff', '#15ebff', '#17f8ff', '#1cfffb', '#1dfff1'];
                                    return colorList[params.dataIndex];
                                }
                            }
                        },
                        data: y1Data ? y1Data : [200, 382, 102, 267, 186, 315, 316]
                    }]
                };

                this.myChart.setOption(option);
                this.myChart.dispatchAction({
                    type: 'showTip',
                    seriesIndex: 0,
                    dataIndex: 0
                });
                let idx = 0;
                let timer = null
                if (y1Data.length > 2) {

                    timer = setInterval(() => {
                        this.myChart.dispatchAction({
                            type: 'showTip',
                            seriesIndex: 0,
                            dataIndex: idx
                        });
                        idx++;

                        if (idx >= y1Data.length) {
                            idx = 0;
                        }
                    }, 3000)
                }
                // // 鼠标悬停事件
                this.myChart.on('mousemove', (params) => {
                    // 控制台打印数据的名称
                    clearInterval(timer)
                });
                this.myChart.on('mouseout', (params) => {
                    // 控制台打印数据的名称
                    timer = setInterval(() => {
                        this.myChart.dispatchAction({
                            type: 'showTip',
                            seriesIndex: 0,
                            dataIndex: idx
                        });
                        idx++;

                        if (idx >= xData.length) {
                            idx = 0;
                        }
                    }, 3000)
                });

                window.addEventListener("resize", () => {
                    if (this.myChart) {
                        this.myChart.resize();
                    }
                });
            },
        }
    }
</script>

<style scoped>

</style>