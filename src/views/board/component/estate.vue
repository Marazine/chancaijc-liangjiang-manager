<template>
  <div class="back-img-l bh-50">
    <div :class="config.class_title">
        <img src="../../../assets/img/arrow.png" alt="">
        {{config.title}}
    </div>
    <div class="s-content" id="estate" ref="estate" :style="style_config"></div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                myChart: null,
                style_config: {
                    paddingTop: this.config.c_mt
                },
                b_age_aboard: {
                    name: ['工商管理', '金融学', '英语', '会计学', '经济学', '国际经济与贸易',
                        '机械设计制造及其自动化', '日语', '市场营销', '土木工程'
                    ],
                    value: [1419, 1326, 1412, 1110, 1013, 907, 661, 657, 710, 789]
                },
            }
        },
        props: ["estateData", "config"],
        mounted() {
            this.init();
        },
        beforeDestroy() {
            this.myChart.dispose();
        },
        components: {},
        methods: {
            init() {
                if (this.estateData) {
                    this.estateChart("estate", this.estateData, this.config);
                } else {
                    this.estateChart("estate", this.b_age_aboard, this.config);
                }
            },
            estateChart(id, data, config_chart) {
                this.myChart = this.$echarts.init(this.$refs.estate);
                let xData = data.name;
                let y1Data = data.value;
                // let y2Data = [28,4.4,5.9,0.9,0.7,1.1,2.1,0.4,1.9,3.8,1.6,0.7,5.7,6.1];
                let option = {
                    grid: {
                        left: config_chart.left,
                        right: '5%',
                        top: '10',
                        bottom: '0%',
                        containLabel: true
                    },
                    title: {
                        show: false
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    // legend: {
                    // data:['监控数量', '监控密度'],
                    // right: '3%',
                    // top: '10%',
                    // itemWidth: 11,
                    // itemHeight: 11,
                    // textStyle: {
                    // color: '#ffffff',
                    // fontSize: 13
                    // }
                    // },
                    toolbox: {
                        show: false,
                    },
                    xAxis: [{
                        type: 'category',
                        boundaryGap: true,
                        show: true,
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            fontSize: 10,
                            color: '#eee',
                            // margin: 8,
                            interval: 0,
                            formatter: (value) => {
                                if (this.config.isBlock) {
                                    return value
                                }
                                if (value.length > 8) {
                                    let val = value.substring(0, 8) + "."
                                    return val.split("").join("\n");
                                } else {
                                    return value.split("").join("\n");
                                }
                                // return value.split("").join("\n");
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                type: 'solid',
                                color: '#4e608b', //左边线的颜色
                                width: '1' //坐标线的宽度
                            }
                        },
                        data: xData
                    }],
                    yAxis: [{
                            type: 'value',
                            scale: true,
                            name: '',
                            axisLine: {
                                show: false
                            },
                            splitNumber: 4,
                            axisTick: {
                                show: false
                            },
                            splitLine: {
                                lineStyle: {
                                    // 使用深浅的间隔色
                                    color: 'transparent'
                                }
                            },
                            axisLabel: {
                                fontSize: 10,
                                color: '#fafafa',
                                // margin: 12,
                            },
                            // max: 12000,
                            min: 0,
                            boundaryGap: [0.2, 0.2]
                        }, {
                            type: 'value',
                            scale: true,
                            axisLine: {
                                show: false
                            },
                            splitNumber: 3,
                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                fontSize: 11,
                                color: '#d0d0d0',
                                margin: 12,
                            },
                            splitLine: {
                                lineStyle: {
                                    // 使用深浅的间隔色
                                    color: 'transparent'
                                }
                            },
                            name: '',
                            // max: 30,
                            min: 0,
                            boundaryGap: [0.2, 0.2]
                        },

                    ],

                    // grid: {
                    // x: configure.left,
                    // y: configure.top,
                    // width: configure.board
                    // },
                    series: [{
                        name: '数量',
                        type: 'bar',
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                                textStyle: {
                                    color: '#9fceff'
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                    offset: 0,
                                    color: "#4889fb" // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: "#15b3ff" // 100% 处的颜色
                                }], false)
                            }
                        },
                        barWidth: config_chart.barWidth,
                        yAxisIndex: 0,
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

<style scoped>

</style>