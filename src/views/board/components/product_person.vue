<template>
  <div class="bh-100">
    <div class="chart-wrap" ref="estate"></div>
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
                if (this.initData.name) {
                    this.estateChart("estate", this.initData);
                } else {
                    this.estateChart("estate", this.b_age_aboard);
                }
            },
            estateChart(id, data) {
                let total = 0;
                for (let i in data.value) {
                    total += data.value[i]
                }
                this.myChart = this.$echarts.init(this.$refs.estate);
                let xData = this.$filterReserve(data.name);
                let y1Data = this.$filterReserve(data.value);
                let option = {
                    grid: {
                        left: this.config.left,
                        right: this.config.right,
                        top: this.config.top,
                        bottom: this.config.bottom,
                        containLabel: true
                    },
                    title: {
                        show: this.config.echartTitleShow,
                        left: 'center',
                        padding: 1,
                        text: this.config.echartTitle,
                        textStyle: { //主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
                            color: '#00f2f1',
                            fontSize: 14,
                        },
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    toolbox: {
                        show: false,
                    },
                    yAxis: [{
                        type: 'category',
                        boundaryGap: true,
                        show: true,
                        axisLabel: {
                            formatter: '{value}',
                            color: "#fff",
                            fontSize: 12
                        },
                        axisTick: {
                            show: true,
                            lineStyle: {
                                color: "#a0c0ff",
                            }
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "rgba(0, 222, 215, 0.2)",
                                width: 1,
                                type: "solid"
                            },
                        },
                        splitLine: {
                            show: false
                        },
                        data: xData
                    }],
                    xAxis: [{
                            show: false,
                            // type: 'value',
                            // scale: true,
                            // name: '',
                            // axisLine: {
                            //     show: false
                            // },
                            // splitNumber: 4,
                            // axisTick: {
                            //     show: false
                            // },
                            // splitLine: {
                            //     lineStyle: {
                            //         // 使用深浅的间隔色
                            //         color: 'transparent'
                            //     }
                            // },
                            // axisLabel: {
                            //     fontSize: 11,
                            //     color: '#fafafa',
                            // },
                            // min: 0,
                            // boundaryGap: [0.2, 0.2]
                        }

                    ],
                    series: [{
                        name: '数量',
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                color: this.config.rcqk ? '#f86081' : new this.$echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                                    offset: 0,
                                    color: '#00b0ff'
                                }, {
                                    offset: 1,
                                    color: '#1759ff'
                                }], false)
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'right',
                                textStyle: {
                                    color: '#ffffff'
                                },
                                formatter: (item) => {
                                    return ((item.value / total) / 100).toFixed(2) + "%"
                                }
                            }
                        },
                        barWidth: '40%',
                        // // yAxisIndex: 0,
                        data: y1Data
                    }]
                };
                this.myChart.setOption(option);
                window.addEventListener("resize", () => {
                    if (this.myChart) {
                        this.myChart.resize();
                    }
                });
            },
        }
    }
</script>

<style lang="scss" scoped>
    .my-title-click {
        cursor: pointer;
    }
    
    .my-title,
    .my-title-click {
        left: 7% !important;
    }
</style>