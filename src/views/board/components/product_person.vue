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
                        textStyle: {//主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
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
                        axisTick: {
                            show: this.config.rcqk ? true : false,
                            lineStyle: this.config.rcqk ? {
                                color: "#a0c0ff",
                                with: 3
                            } : ''
                        },
                        axisLine: {
                            show: this.config.rcqk || this.config.showLine ? true : false
                        },
                        axisLabel: {
                            show: true,
                            fontSize: 11,
                            color: '#eee',
                            textStyle: {
                                // align: 'left',
                                // baseline:'middle'
                            },
                            // interval: 0,
                            formatter: (value) => {
                                if (this.config.isCut) {
                                    return value
                                }
                                if (value.length > 10) {
                                    return value.substring(0, 10) + "..";
                                } else {
                                    return value;
                                }
                            }
                        },
                        data: xData
                            // .map((item) => {
                            //     // item['textStyle'] = {
                            //     //     align:"left"
                            //     // }
                            //     return {
                            //         value: item,
                            //         textStyle: {
                            //             align: 'left',
                            //         }
                            //     }
                            // })
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
                    if(this.myChart) {
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