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
                let ydata = [];
                this.initData.name.forEach((item, index) => {
                    let val = ''
                    if (this.initData.value[index]) {
                        val = {
                            name: this.initData.name[index],
                            value: this.initData.value[index],
                            label: {
                                show: true
                            }
                        }
                    } else {
                        val = {
                            name: this.initData.name[index],
                            value: this.initData.value[index],
                            label: {
                                show: false
                            }
                        }
                    }
                    ydata.push(val);
                })
                var color = ["#AEE68F", "#00A2FF", "#E5CE10", '#00EBFF', "#7FE7C9", "#7FE7C9", "#fca4bb", '#FF7E00']


                let option = {
                    backgroundColor: "transparent",
                    color: color,
                    tooltip: {
                        show: true,
                        trigger: 'item',
                        formatter: function(params) {
                            return params.name + "<br/>" + params.marker + params.value
                        }
                    },
                    legend: {
                        orient: "vartical",
                        x: "left",
                        top: "center",
                        left: "60%",
                        bottom: "5%",
                        data: xData,
                        itemWidth: 8,
                        itemHeight: 8,
                        itemGap: 16,
                        textStyle: {
                            color: "#fff"
                        },
                        formatter: function(name) {
                            var oa = option.series[0].data;
                            var num = oa[0].value + oa[1].value + oa[2].value + oa[3].value;
                            for (var i = 0; i < option.series[0].data.length; i++) {
                                if (name == oa[i].name) {
                                    return ' ' + name;
                                }
                            }
                        },

                        // formatter: function(name) {
                        //     return '' + name
                        // }
                    },

                    series: [{
                        type: 'pie',
                        clockwise: false, //饼图的扇区是否是顺时针排布
                        minAngle: 2, //最小的扇区角度（0 ~ 360）
                        radius: ["40%", "58%"],
                        center: ["30%", "50%"],
                        avoidLabelOverlap: false,
                        itemStyle: { //图形样式
                            normal: {
                                borderColor: '#ffffff',
                                borderWidth: 0,
                            },
                        },
                        label: {
                            normal: {
                                show: false,
                                // position: 'center',
                                formatter: '{text|{b}}\n{d}%',
                                rich: {
                                    text: {
                                        color: "#fff",
                                        fontSize: 12,
                                        align: 'center',
                                        verticalAlign: 'middle',
                                        padding: 4
                                    },
                                    value: {
                                        color: "#8693F3",
                                        fontSize: 14,
                                        align: 'center',
                                        verticalAlign: 'middle',
                                    },
                                }
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: 14,
                                }
                            }
                        },
                        data: appendBaseSelected(ydata)
                    }]
                };
                this.myChart.setOption(option);

                function appendBaseSelected(dataList) {
                    const temp = [];
                    for (let i in dataList) {
                        const tempObj = {
                            ...dataList[i],
                            selected: false
                        };
                        temp.push(tempObj)
                    }
                    return temp;
                }
                // 初始化
                option.series[0].data[0]['selected'] = true;
                this.myChart.dispatchAction({
                    type: 'showTip',
                    seriesIndex: 0,
                    dataIndex: 0
                });
                if (ydata.length > 2) {
                    let idx = 1;
                    setInterval(() => {
                        clearSelectedStatus();
                        option.series[0].data[idx]['selected'] = true;
                        this.myChart.setOption(option);

                        this.myChart.dispatchAction({
                            type: 'showTip',
                            seriesIndex: 0,
                            dataIndex: idx
                        });
                        idx++;

                        if (idx >= ydata.length) {
                            idx = 0;
                        }
                    }, 3000)
                    let myChart = this.myChart;

                    function clearSelectedStatus() {
                        option.series[0].data = appendBaseSelected(ydata);
                        myChart.setOption(option);
                    }
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