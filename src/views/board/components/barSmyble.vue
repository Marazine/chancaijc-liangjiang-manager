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
                mTime: null,
                b_age_aboard: {
                    name: ['工商管理', '金融学', '英语'],
                    value: [1419, 1326, 1412]
                },
                totalValue: 0,
            }
        },
        props: ["config", "initData"],
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
                    if (this.config.ispercent) {
                        this.sum(this.initData.value);
                        this.percent(this.initData.value);
                    }
                    this.estateChart("estate", this.initData);
                } else {
                    this.estateChart("estate", this.b_age_aboard);
                }

            },
            sum(arr) {
                arr.forEach((val, idx, arr) => {
                    this.totalValue += parseInt(val);
                }, 0);
                if (this.totalValue == 0) {
                    this.totalValue = 1
                }
                return this.totalValue;
            },
            percent() {
                this.initData.value = this.initData.value.map((val, idx) => {
                    return ((parseInt(val) / this.totalValue) * 100).toFixed(2);
                })
            },
            estateChart(id, data) {
                console.log(data);
                this.myChart = this.$echarts.init(this.$refs.estate);
                var myColor = ['#eb2100', '#eb3600', '#d0570e', '#d0a00e', '#34da62', '#00e9db', '#00c0e9', '#0096f3',
                    '#33CCFF', '#33FFCC'
                ];
                let option = {
                    backgroundColor: 'transparent',
                    grid: {
                        left: '15%',
                        top: '10%',
                        right: '15%',
                        bottom: '0%',
                        containLabel: true
                    },
                    tooltip: {},
                    xAxis: [{
                        show: false,
                    }],
                    yAxis: [{
                        axisTick: 'none',
                        axisLine: 'none',
                        offset: '17',
                        axisLabel: {
                            textStyle: {
                                color: '#ffffff',
                                fontSize: '14',
                            }
                        },
                        data: data.name
                    }, {
                        axisTick: 'none',
                        axisLine: 'none',
                        axisLabel: {
                            textStyle: {
                                color: '#ffffff',
                                fontSize: '0',
                            }
                        },
                        data: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
                    }, {
                        name: '',
                        nameGap: '30',
                        nameTextStyle: {
                            color: '#ffffff',
                            fontSize: '30',
                        },
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(0,0,0,0)'
                            }
                        },
                        data: [],
                    }],
                    series: [{
                        name: '条',
                        type: 'bar',
                        yAxisIndex: 0,
                        data: data.value,
                        label: {
                            normal: {
                                show: true,
                                position: 'right',
                                textStyle: {
                                    color: '#ffffff',
                                    fontSize: '14',
                                }
                            }
                        },
                        barWidth: 11,
                        itemStyle: {
                            normal: {
                                color: function(params) {
                                    var num = myColor.length;
                                    return myColor[params.dataIndex % num]
                                },
                            }
                        },
                        z: 2
                    }, {
                        name: '外圆',
                        type: 'scatter',
                        hoverAnimation: false,
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        yAxisIndex: 2,
                        symbolSize: 21,
                        tooltip: {
                            show: false
                        },
                        itemStyle: {
                            normal: {
                                color: function(params) {
                                    var num = myColor.length;
                                    return myColor[params.dataIndex % num]
                                },
                                opacity: 1,
                            }
                        },
                        z: 2
                    }]
                };
                this.myChart.setOption(option);
                window.addEventListener("resize", () => {
                    this.myChart.resize();
                });
            },
        }
    }
</script>

<style scoped>

</style>