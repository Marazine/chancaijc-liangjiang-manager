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
                // console.log(data);
                let xData = data.name;
                let y1Data = data.value;
                let total = data.value.reduce((prev, next) => {
                    return prev + next
                })

                let option = {
                    backgroundColor: 'transparent',
                    title: {
                        show: true,
                        text: '企业数：292' + '\n' + '岗位数：918' + '\n' + '需求总数：5335',
                        textStyle: {
                            fontWeight: 'normal',
                            fontSize: 14,
                            lineHeight: 20,
                            color: '#fff'
                        },
                        top: '3%',
                        left: '4%'
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
                                        color: 'rgba(255,255,255,1)' // 100% 处的颜色
                                    }, {
                                        offset: 1,
                                        color: 'rgba(255,255,255,0)' // 100% 处的颜色
                                    }],
                                    global: false // 缺省为 false
                                }
                            },
                        },
                        formatter: function(params) {
                            return params[0].name + "</br>" + params[0].marker + params[0].value
                        }
                    },
                    grid: {
                        top: '10%',
                        left: '10%',
                        right: '10%',
                        bottom: '15%',
                        // containLabel: true
                    },
                    xAxis: [{
                        type: 'category',
                        boundaryGap: false,
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
                                fontSize: 12,

                            },
                            // rotate: 35,
                        },
                        data: xData ? xData : ['第一季度', '第二季度', '第三季度', '第四季度'],
                    }],
                    yAxis: [{
                        type: 'value',
                        min: 0,
                        // max: 140,
                        splitNumber: 4,
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: 'rgba(255,255,255,0.1)'
                            }
                        },
                        axisLine: {
                            show: false,
                        },
                        axisLabel: {
                            show: false,
                            margin: 20,
                            textStyle: {
                                color: '#d1e6eb',

                            },
                        },
                        axisTick: {
                            show: false,
                        },
                    }],
                    series: [{
                        name: '注册总量',
                        type: 'line',
                        smooth: true, //是否平滑曲线显示
                        // 			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
                        showAllSymbol: true,
                        // symbol: 'image://./static/images/guang-circle.png',
                        symbolSize: 8,
                        lineStyle: {
                            normal: {
                                color: "#53fdfe", // 线条颜色
                            },
                            borderColor: '#f0f'
                        },
                        label: {
                            show: false,
                            position: 'top',
                            textStyle: {
                                color: '#fff',
                            },

                            formatter: function(params) {
                                return ((Number(params.value) / total) * 100).toFixed(1) + "%"
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: "rgba(255,255,255,1)",
                            }
                        },
                        tooltip: {
                            show: true
                        },
                        areaStyle: { //区域填充样式
                            normal: {
                                //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(0,150,239,0.3)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(0,253,252,0)'
                                }], false),
                                shadowColor: 'rgba(53,142,215, 0.9)', //阴影颜色
                                shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                            }
                        },
                        data: y1Data ? y1Data : [150, 200, 259, 360]
                    }]
                };

                this.myChart.setOption(option);
                this.myChart.dispatchAction({
                    type: 'showTip',
                    seriesIndex: 0,
                    dataIndex: 0
                });
                // if (y1Data.length > 2) {
                //     let idx = 1;
                //     setInterval(() => {
                //         this.myChart.dispatchAction({
                //             type: 'showTip',
                //             seriesIndex: 0,
                //             dataIndex: idx
                //         });
                //         idx++;

                //         if (idx >= y1Data.length) {
                //             idx = 0;
                //         }
                //     }, 3000)
                // }
                let timer = null
                let idx = 1;
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