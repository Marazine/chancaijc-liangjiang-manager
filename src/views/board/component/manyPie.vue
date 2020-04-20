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
            estateChart(id, datas, config_chart) {
                this.myChart = this.$echarts.init(this.$refs.estate);
                // console.log(datas);
                // let xData = datas.name;
                let y1Data = datas.value;

                var data = datas

                var titleArr = [],
                    seriesArr = [];
                let colors = [
                    ['#e5ce10', '#080e3c'],
                    ['#24c768', '#080e3c'],
                    ['#63d8e2', '#080e3c'],
                    ['#1c99fb', '#080e3c'],
                    ['#a181fc', '#080e3c']
                ]
                data.forEach(function(item, index) {
                    titleArr.push({
                        text: item.name,
                        left: index * 20 + 20 + '%',
                        top: '70%',
                        textAlign: 'center',
                        textStyle: {
                            fontWeight: 'normal',
                            fontSize: 14,
                            color: colors[index][0],
                            textAlign: 'center',
                        },
                    });
                    seriesArr.push({
                        name: item.title,
                        type: 'pie',
                        clockWise: false,
                        radius: ["35%", "40%"],
                        itemStyle: {
                            normal: {
                                color: colors[index][0],
                                shadowColor: colors[index][0],
                                shadowBlur: 0,
                                label: {
                                    show: false
                                },
                                labelLine: {
                                    show: false
                                },
                            }
                        },
                        hoverAnimation: false,
                        center: [index * 20 + 20 + '%', '40%'],
                        data: [{
                            name: '流入',
                            value: item.value,
                            label: {
                                normal: {
                                    formatter: function(params) {
                                        return params.percent + '%';
                                    },
                                    position: 'center',
                                    show: true,
                                    textStyle: {
                                        fontSize: 16,
                                        fontWeight: 400,
                                        lineHeight: 18,
                                        color: colors[index][0]
                                    }
                                }
                            },
                        }, {
                            value: item.value1,
                            name: '流出',
                            itemStyle: {
                                normal: {
                                    color: colors[index][1]
                                },
                                emphasis: {
                                    color: colors[index][1]
                                }
                            }
                        }]
                    })
                });


                let option = {
                    backgroundColor: "transparent",
                    tooltip: {
                        trigger: 'item',
                        // 
                    },
                    title: titleArr,
                    series: seriesArr
                }

                this.myChart.setOption(option);
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