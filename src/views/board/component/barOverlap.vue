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
                let y2Data = data.value1;
                let total = data.value.reduce((prev, next) => {
                    return prev + next
                })
                let total1 = data.value1.reduce((prev, next) => {
                    return prev + next
                })
                let option = {
                    backgroundColor: "transparent",
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        top: '20%',
                        left: '5%',
                        right: '5%',
                        bottom: '8%',
                        containLabel: true,
                    },
                    legend: {
                        show: true,
                        itemGap: 50,
                        top: '5%',
                        left: '70%',
                        data: ['流入', '流出'],
                        textStyle: {
                            color: '#f9f9f9',
                            borderColor: '#fff'
                        },
                    },
                    xAxis: [{
                        type: 'category',
                        boundaryGap: true,
                        axisLine: {
                            lineStyle: {
                                color: '#0177d4'
                            }
                        },
                        axisLabel: {
                            color: '#fff',
                            fontSize: 12,
                            rotate: 35,
                        },
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: '#ccc'
                            }
                        },
                        data: xData,
                    }],
                    yAxis: [{
                        type: 'value',
                        min: 0,
                        // max: 140,
                        splitNumber: 7,
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: '#0a3256'
                            }
                        },
                        axisLine: {
                            show: false,
                        },
                        axisLabel: {
                            show: false,
                            margin: 20,
                            textStyle: {
                                color: '#d1e6eb',

                            },
                        },
                        axisTick: {
                            show: false,
                        },
                    }],
                    series: [{
                        name: '流出',
                        type: 'bar',
                        stack: '流动',
                        barWidth: 20,
                        tooltip: {
                            show: true
                        },
                        label: {
                            show: false,
                            position: 'right',
                            textStyle: {
                                color: '#fff',
                            },
                            formatter: function(params) {
                                let total = 0
                                xData.forEach((item, index) => {
                                    if (item == params.name) {
                                        total = Number(y1Data[index]) + Number(y2Data[index])
                                    }
                                })
                                return ((Number(params.value) / total) * 100).toFixed(1) + "%"
                            }
                        },
                        itemStyle: {
                            normal: {
                                // barBorderRadius: 5,
                                // color: new echarts.graphic.LinearGradient(
                                //     0, 0, 0, 1,
                                //     [{
                                //             offset: 0,
                                //             color: '#14c8d4'
                                //         },
                                //         {
                                //             offset: 1,
                                //             color: '#43eec6'
                                //         }
                                //     ]
                                // )
                                color: function(params) {
                                    // var colorList = ['#0ec1ff', '#10cdff', '#12daff', '#15ebff', '#17f8ff', '#1cfffb', '#1dfff1'];
                                    // return colorList[params.dataIndex];
                                    var colorList = '#01E9EB';
                                    return colorList;
                                }
                            }
                        },
                        data: y2Data
                    }, {
                        name: '流入',
                        type: 'bar',
                        stack: '流动',
                        barWidth: 20,
                        tooltip: {
                            show: true
                        },
                        label: {
                            show: false,
                            position: 'top',
                            textStyle: {
                                color: '#fff',
                            },
                            formatter: function(params) {
                                let total = 0
                                xData.forEach((item, index) => {
                                    if (item == params.name) {
                                        total = Number(y1Data[index]) + Number(y2Data[index])
                                    }
                                })
                                return ((Number(params.value) / total) * 100).toFixed(1) + "%"
                            }
                        },
                        itemStyle: {
                            normal: {
                                // barBorderRadius: 5,
                                // color: new echarts.graphic.LinearGradient(
                                //     0, 0, 0, 1,
                                //     [{
                                //             offset: 0,
                                //             color: '#14c8d4'
                                //         },
                                //         {
                                //             offset: 1,
                                //             color: '#43eec6'
                                //         }
                                //     ]
                                // )
                                color: function(params) {
                                    var colorList = '#FF7E00';
                                    return colorList;
                                }
                            }
                        },
                        data: y1Data
                    }]
                };

                this.myChart.setOption(option);
                this.myChart.dispatchAction({
                    type: 'showTip',
                    seriesIndex: 0,
                    dataIndex: 0
                });
                if (y1Data.length > 2) {
                    let idx = 1;
                    setInterval(() => {
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