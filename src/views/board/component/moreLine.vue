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
                    "#EE579D", "#FF7E00", "#00EBFF", '#FF0000', "#7FE7C9", "#7FE7C9", "#fca4bb", '#FF7E00'
                ];
                let names = ['高中/中专/中技及以下', '大专', '本科', '硕士', '博士']
                let seriesData = data.value.map((v, i) => {
                    let total = v.reduce((prev, next) => {
                        return prev + next
                    })
                    return {
                        name: names[i],
                        type: 'line',
                        smooth: true,

                        lineStyle: {
                            normal: {
                                width: 1
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: colorList[i]
                                }, {
                                    offset: 0.8,
                                    color: 'rgba(137, 189, 27, 0)'
                                }], false),
                                shadowColor: 'rgba(0, 0, 0, 0.1)',
                                shadowBlur: 5
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: colorList[i],
                                label: {
                                    show: false,
                                    position: 'right',
                                    formatter: function(params) {
                                        return ((Number(params.value) / total) * 100).toFixed(1) + "%"
                                    }
                                },
                            }
                        },
                        data: v
                    }
                })

                let option = {
                    backgroundColor: 'transparent',
                    title: {
                        show: false,
                        text: '航线上座率分析',
                        textStyle: {
                            fontWeight: 'normal',
                            fontSize: 16,
                            color: '#F1F1F3'
                        },
                        left: '6%'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            lineStyle: {
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0,
                                        color: 'rgba(255,255,255,0)' // 0% 处的颜色
                                    }, {
                                        offset: 0.5,
                                        color: '#97ca95' // 100% 处的颜色
                                    }, {
                                        offset: 1,
                                        color: 'rgba(255,255,255,0)' // 100% 处的颜色
                                    }],
                                    global: false // 缺省为 false
                                }
                            },
                        },
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
                    legend: {
                        // icon: 'rect',
                        // itemWidth: 14,
                        itemHeight: 5,
                        itemGap: 20,
                        data: ['高中/中专/中技及以下', '大专', '本科', '硕士', '博士'],
                        left: 'center',
                        top: "5%",
                        textStyle: {
                            fontSize: 12,
                            color: '#F1F1F3'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '5%',
                        containLabel: true
                    },
                    xAxis: [{
                        type: 'category',
                        boundaryGap: true,
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
                                color: '#fff',
                                fontSize: 12
                            }
                        },
                        data: xData
                    }],
                    yAxis: [{
                        type: 'value',
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
                        }
                    }],
                    series: seriesData
                };
                this.myChart.setOption(option);

                this.myChart.dispatchAction({
                    type: 'showTip',
                    seriesIndex: 0,
                    dataIndex: 0
                });
                let timer = null
                let idx = 1;
                if (xData.length > 2) {

                    timer = setInterval(() => {
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

                        if (idx >= xData.length) {
                            idx = 0;
                        }
                    }, 3000)
                });

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