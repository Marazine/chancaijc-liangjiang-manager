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
                    this.estateChart("estate", JSON.parse(JSON.stringify(this.initData)));
                } else {
                    this.estateChart("estate", this.b_age_aboard);
                }

            },
            estateChart(id, data) {
                let total = 0;
                // if(this.config.showPercent){
                for (let i in data.value) {
                    total += parseInt(data.value[i]);
                }
                // }
                // debugger
                this.myChart = this.$echarts.init(this.$refs.estate);
                // let xData = this.$filterReserve(data.name);
                // let y1Data = this.$filterReserve(data.value);
                let xData = data.name;
                let y1Data = data.value;
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
                                    color: color[ii]
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
                let _this = this;
                let option = {
                    grid: {
                        left: '2%',
                        right: '10%',
                        top: '2%',
                        bottom: '0%',
                        containLabel: true
                    },
                    // title: {
                    //     show: false
                    // },
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
                            show: true,
                            lineStyle: {
                                color: "#a0c0ff",
                                with: 3
                            }
                        },
                        axisLine: {
                            show: true
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
                                if (value.length > 10) {
                                    return value.substring(0, 10) + "..";
                                } else {
                                    return value;
                                }
                                // return value

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
                        "end": this.config.isScroll ? 45 : this.initData.name.length * 24,
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
                        itemStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(1, 0, 0, 0, [{
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
                                    return ((item.value / total) * 100).toFixed(2) + "%"
                                    if (_this.config.showPercent) {
                                        // debugger
                                        return ((item.value / total) * 100).toFixed(2) + "%"
                                    } else {
                                        return parseInt(item.value)
                                    }
                                }
                            }
                        },
                        barWidth: '40%',
                        // // yAxisIndex: 0,
                        data: y1Data
                    }]
                };
                this.myChart.setOption(option);
                if (this.config.isScroll) {
                    setInterval(() => {

                        xData.unshift(tempXData);
                        tempXData = xData.pop();

                        data.value.unshift(tempMaxData);
                        tempMaxData = data.value.pop();

                        this.myChart.setOption(option);
                    }, 2000);
                }

                window.addEventListener("resize", () => {
                    this.myChart.resize();
                });
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>