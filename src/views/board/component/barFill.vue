<template>
  <div class="bh-100">
    <div class="chartnew-wrap" ref="estate"></div>
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
                    value: ['1419', 1326, 1412, 1110, 1013, 907, 661, 657, 710, 789]
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
                    // debugger
                    this.estateChart("estate", this.initData);
                } else {
                    this.estateChart("estate", this.b_age_aboard);
                }

            },
            estateChart(id, data) {
                // debugger
                this.myChart = this.$echarts.init(this.$refs.estate);
                let xData = data.name;
                let y1Data = data.value;


                let total = data.value.reduce((prev, next) => {
                    return prev + next
                })
                var color = ['#0e6a9b', '#3b9ccf', '#129e6d', '#26a06f', '#05897c',
                    '#139e97', '#c45c53', '#908e39', '#997f32', '#b4a317'
                ];
                let ii = 0;
                for (let i = 0; i < data.value.length; i++) {
                    ii++;
                    if (ii >= color.length) {
                        ii = 0;
                    }
                    data.value[i] = {
                        value: data.value[i],
                        itemStyle: {
                            //color: color[i],
                            color: new this.$echarts.graphic.LinearGradient(
                                0, 0, 1, 0, [{
                                    offset: 0,
                                    color: '#0ec1ff'
                                }, {
                                    offset: 1,
                                    color: '#00feff'
                                }]
                            )
                        }
                    };
                }
                if (this.config.isScroll) {
                    var tempMaxData = y1Data.pop();
                    var tempXData = xData.pop();
                }

                // let y2Data = [28,4.4,5.9,0.9,0.7,1.1,2.1,0.4,1.9,3.8,1.6,0.7,5.7,6.1];
                let option = {
                    grid: {
                        left: '5%',
                        right: '10%',
                        top: '10%',
                        bottom: '5%',
                        containLabel: true
                    },
                    // title: {
                    //     show: false
                    // },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        },
                        formatter: function(params) {
                            return params[0].name + "</br>" + params[0].marker + params[0].value
                        }
                    },
                    toolbox: {
                        show: false,
                    },
                    yAxis: [{
                        type: 'category',
                        boundaryGap: true,
                        show: true,
                        triggerEvent: true,
                        inverse: true,
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
                        },
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
                        "end": 100,
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
                        // triggerEvent: false,
                        itemStyle: {
                            normal: {
                                color: "#00b0ff"
                            }
                        },
                        label: {
                            normal: {
                                show: false,
                                position: 'right',
                                textStyle: {
                                    color: '#ffffff'
                                },
                                formatter: function(params) {
                                    return ((Number(params.value) / total) * 100).toFixed(1) + "%"
                                }
                            }
                        },
                        barWidth: 13,
                        // // yAxisIndex: 0,
                        data: y1Data
                    }]
                };
                this.myChart.setOption(option);
                this.myChart.dispatchAction({
                    type: 'showTip',
                    seriesIndex: 0,
                    dataIndex: 0
                });
                let timer = null
                let idx = 0;
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
                    let myChart = this.myChart;
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

                        if (idx >= y1Data.length) {
                            idx = 0;
                        }
                    }, 3000)
                });
                window.addEventListener("resize", () => {
                    this.myChart.resize();
                });
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>