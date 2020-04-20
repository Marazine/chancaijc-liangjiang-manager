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
                let colorList = [
                    "#f10d58", "#FF7E00", "#ffe500", '#24C768', "#7a14f3", "#7FE7C9", "#fca4bb", '#FF7E00'
                ];
                let names = ['正高级', '副高级', '中级', '初（助理）级', '初（员级）级']
                let seriesData = data.value.map((v, i) => {
                    let total = v.reduce((prev, next) => {
                        return prev + next
                    })
                    return {
                        type: 'bar',
                        stack: '单位',
                        name: names[i],
                        barWidth: 10,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false,
                                    position: 'top',
                                    formatter: function(params) {
                                        return ((Number(params.value) / total) * 100).toFixed(1) + "%"
                                    }
                                },
                                color: colorList[i]
                            }
                        },
                        data: v
                    }
                })

                let option = {
                    backgroundColor: 'transparent',
                    grid: {
                        left: this.config.left ? this.config.left : '5%',
                        right: this.config.right ? this.config.right : '8%',
                        top: this.config.top ? this.config.top : '15%',
                        bottom: this.config.bottom ? this.config.bottom : '5%',
                        containLabel: true
                    },
                    legend: {
                        itemGap: 20,
                        top: '2%',
                        left: 'center',
                        data: ['正高级', '副高级', '中级', '初（助理）级', '初（员级）级'],
                        textStyle: {
                            color: '#f9f9f9',
                            borderColor: '#fff'
                        },
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        },
                        // formatter: function(v) {
                        //     console.log(v);
                        //     return v.name + v.value;
                        // }
                        formatter: function(params) {
                            let ptotal = 0
                            params.map((item, index) => {
                                ptotal = ptotal + Number(item.value)
                            })
                            let str = ''
                            params.map((v, i) => {
                                str = str + v.marker + ' ' + v.seriesName + ': ' + v.value + '， 占比：' + (v.value ? ((Number(v.value) / ptotal) * 100).toFixed(1) : 0) + '%' + '<br/>'
                            })
                            return params[0].name + '<br/>' + str
                        }
                    },
                    xAxis: {

                        axisLine: {
                            lineStyle: {
                                color: '#0177d4'
                            }
                        },
                        axisLabel: {
                            color: '#fff',
                            fontSize: 12
                        },
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: '#ccc'
                            }
                        },
                    },
                    yAxis: {
                        // name: "（人）",
                        inverse: true,
                        nameTextStyle: {
                            color: '#fff',
                            fontSize: 16
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#0177d4'
                            }
                        },
                        axisLabel: {
                            color: '#fff',
                            fontSize: 12
                        },
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: '#0177d4'
                            }
                        },
                        data: xData,
                    },
                    graphic: {
                        show: true,
                        elements: [{
                            type: 'image',
                            style: {
                                image: this.imgUrl,
                                width: 192
                            },
                            top: '15%',
                            bottom: 'center',
                        }]
                    },
                    series: seriesData
                };

                this.myChart.setOption(option);
                this.myChart.dispatchAction({
                    type: 'showTip',
                    seriesIndex: 0,
                    dataIndex: 0
                });
                if (xData.length > 2) {
                    let idx = 1;
                    setInterval(() => {
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