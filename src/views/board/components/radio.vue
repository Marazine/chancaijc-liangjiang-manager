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
                let xData = data.name.map(item => {
                    return {
                        name: item,
                        max: 5000
                    }
                })
                let y1Data = data.value;

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
                    // legend: {
                    //     show: true,
                    //     icon: "circle",
                    //     bottom: 30,
                    //     center: 0,
                    //     itemWidth: 14,
                    //     itemHeight: 14,
                    //     itemGap: 21,
                    //     orient: "horizontal",
                    //     data: ['a', 'b'],
                    //     textStyle: {
                    //         fontSize: '70%',
                    //         color: '#8C8C8C'
                    //     },
                    // },
                    tooltip: {},
                    radar: {
                        // shape: 'circle',
                        radius:'65%',
                        triggerEvent: true,
                        name: {
                            textStyle: {
                                color: '#fff',
                                fontSize:'10',
                                borderRadius: 3,
                                padding: [3, 5]
                            }
                        },
                        nameGap:'2',
                        indicator: xData,
                        // [
                        //     {//[4300, 10000, 28000, 35000, 50000, 19000, 21000]
                        //         name: '资金周转', max: 6500},
                        //     {name: '其他', max: 16000},
                        //     {name: '金融理财', max: 30000 },
                        //     {name: '投资', max: 38000},
                        //     {name: '个人消费',max: 52000},
                        //     {name: '固定资产', max: 25000},
                        //     {name: '生产经营', max: 25000}
                        // ],
                        splitArea: {
                            areaStyle: {
                                color: [
                                        'rgba(222,134,85, 0.1)', 'rgba(222,134,85, 0.2)',
                                        'rgba(222,134,85, 0.4)', 'rgba(222,134,85, 0.6)',
                                        'rgba(222,134,85, 0.8)', 'rgba(222,134,85, 1)'
                                    ].reverse()
                            }
                        },
                        // axisLabel:{//展示刻度
                        //     show: true
                        // },
                        axisLine: { //指向外圈文本的分隔线样式
                            lineStyle: {
                                color: 'rgba(0,0,0,0)'
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                width:2,
                                color: [
                                    'rgba(224,134,82, 0.1)', 'rgba(224,134,82, 0.2)',
                                    'rgba(224,134,82, 0.4)', 'rgba(224,134,82, 0.6)',
                                    'rgba(224,134,82, 0.8)', 'rgba(224,134,82, 1)'
                                ].reverse()
                            }
                        },

                    },

                    series: [{
                        name: '',
                        type: 'radar',
                        //areaStyle: {normal: {}},
                        areaStyle: {
                            normal: {
                                color: 'rgba(252,211,3, 0.3)'
                            }
                        },
                        symbolSize: 0,
                        lineStyle: {
                            normal: {
                                color: 'rgba(252,211,3, 1)',
                                width: 1
                            }
                        },
                        data: [
                            {
                                value: y1Data,
                                name: '人才主要培养方式',
                            }
                        ]
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