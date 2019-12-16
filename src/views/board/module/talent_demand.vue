<template>
  <div class="back-img bh-50">
    <div class="title">
        <img src="../../../assets/img/arrow.png" alt="">
        {{config&&config.title?config.title:'标题'}}
    </div>
    <div class="s-content" ref="talent_demand"></div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                myChart:null,
                b_age_aboard: {
                    name: ['工商管理', '金融学', '英语', '会计学', '经济学', '国际经济与贸易',
                        '机械设计制造及其自动化', '日语', '市场营销', '土木工程'
                    ],
                    value1: [1419, 1326, 1412, 1110, 1013, 907, 661, 657, 710, 789]
                },
            }
        },
        props: ["talent_demandData", "config"],
        mounted() {
            this.init();
        },
        beforeDestroy() {
            this.myChart.dispose()
        },
        components: {},
        methods: {
            init() {
                if (this.talent_demandData.name) {
                    // debugger
                    this.talent_demandChart("talent_demand", this.talent_demandData);
                } else {
                    this.talent_demandChart("talent_demand", this.b_age_aboard);
                }
            },
            talent_demandChart(id, data) {
                // debugger
                this.myChart = this.$echarts.init(this.$refs.talent_demand);
                let xData = this.$filterReserve(data.name);
                let y1Data = this.$filterReserve(data.value);
                // let y2Data = [28,4.4,5.9,0.9,0.7,1.1,2.1,0.4,1.9,3.8,1.6,0.7,5.7,6.1];
                let option = {
                    grid: {
                        left: '2%',
                        right: '10%',
                        top: '0%',
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
                    yAxis: [{
                        type: 'category',
                        boundaryGap: true,
                        show: true,
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        axisLabel: {
                            fontSize: 10,
                            color: '#eee',
                            // margin: 60,
                            // align: "left",
                            // interval: 0,
                            formatter: function(value) {
                                // if (value.length > 4) {
                                //     let val = value.substring(0, 4) + ".."
                                //     return val;
                                // } else {
                                //     return value;
                                // }
                                return value
                            }
                        },
                        data: xData
                    }],
                    xAxis: [{
                            show: false
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
                                }
                            }
                        },
                        barWidth: '50%',
                        // // yAxisIndex: 0,
                        data: y1Data
                    }]
                };
                this.myChart.setOption(option);
                window.addEventListener("resize", ()=> {
                    if(this.myChart) {
                        this.myChart.resize();
                    }
                });
            },
        }
    }
</script>

<style scoped>
    .s-content {
        padding-top: 15%;
    }
</style>