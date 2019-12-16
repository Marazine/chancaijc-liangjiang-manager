<template>
  <div class="back-img bh-50">
    <div class="title">
        <img src="../../../assets/img/arrow.png" alt="">
        {{config&&config.title?config.title:'标题'}}
    </div>
    <div class="s-content" ref="estate" :style="{paddingTop:config.paddingTop?config.paddingTop:''}"></div>
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
                    // debugger
                    this.estateChart("estate", this.initData);
                } else {
                    this.estateChart("estate", this.b_age_aboard);
                }
            },
            estateChart(id, data) {
                this.myChart = this.$echarts.init(this.$refs.estate);
                let xData = data.name;
                let y1Data = data.value;
                let option = {
                    grid: {
                        left: 30,
                        right: 10,
                        top: this.config.ws ? 30 : 0,
                        bottom: 5,
                        containLabel: true
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
                    xAxis: [{
                        type: 'category',
                        boundaryGap: true,
                        show: true,
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: this.config.x_axisLine_show ? true : false
                        },
                        axisLabel: {
                            show: true,
                            fontSize: 11,
                            color: '#eee',
                            // margin: '12',
                            width: 1,
                            formatter: function(value) {
                                // if (value.length > 4) {
                                //     let val = value.substring(0, 4) + "."
                                //     return val.split("").join("\n");
                                // } else {
                                //     return value.split("").join("\n");
                                // }
                                return value.split("").join("\n");
                            }
                        },
                        data: xData
                    }],
                    yAxis: this.config.ws ? {
                        show: true,
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
                            show: false
                            // lineStyle: {
                            //     // 使用深浅的间隔色
                            //     width: 1,
                            //     color: 'rgba(86,94,125,0.5)'
                            // }
                        },
                        axisLabel: {
                            fontSize: 11,
                            color: '#fafafa',
                        },
                        min: 0,
                    } : {
                        show: false
                    },
                    series: [{
                        name: '数量',
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                color: this.config.ws ? new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#fbab66'
                                }, {
                                    offset: 1,
                                    color: '#f7418c'
                                }], false) : new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
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
                                position: this.config.x_axisLine_show ? 'top' : 'inside',
                                rotate: this.config.x_axisLine_show ? 0 : -90,
                                textStyle: {
                                    color: '#ffffff'
                                }
                            }
                        },
                        barWidth: '35%',
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

</style>