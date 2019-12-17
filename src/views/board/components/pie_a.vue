<template>
  <div class="bh-100">
    <div class="chart-wrap" ref="pie_a"></div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                myChart: null,
                data: {
                    name: ['五保', '低保', '残疾', '失独', '重点优抚', '突出贡献'],
                    value: ['10', '20', '30', '15', '15', '10']
                }
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
                    // debugger
                    this.pie_aChart("pie_a", this.initData, this.config);
                } else {
                    this.pie_aChart("pie_a", this.data, this.config);
                }
            },
            pie_aChart(id, data_chart, config_chart) {
                this.myChart = this.$echarts.init(this.$refs.pie_a);

                let chartName = data_chart.name;
                let chartData = data_chart.value;
                let data = []
                let legendName = []
                for (let i = 0; i < chartData.length; i++) {
                    let c = {
                        value: chartData[i],
                        name: chartName[i]
                    }
                    data[i] = c;
                    legendName[i] = chartName[i];
                }
                let option = {
                    backgroundColor: 'transparent',
                    tooltip: {
                        trigger: 'item',
                        formatter: "{b} : {d}%"
                    },
                    color: ['#FF8352', '#E271DE', '#F8456B', '#00FFFF', "#EAEA26", "#906BF9", "#FE5656", "#01E17E", "#3DD1F9",
                        "#FFAD05", 'rgb(254,67,101)', 'rgb(252,157,154)', 'rgb(249,205,173)', 'rgb(200,200,169)',
                        'rgb(131,175,155)'
                    ],
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
                        textStyle: { //主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
                            color: '#00f2f1',
                            fontSize: 14,
                        },
                    },
                    series: [{
                        // name: '违规次数',
                        type: 'pie',
                        clockwise: false, //饼图的扇区是否是顺时针排布
                        minAngle: 20, //最小的扇区角度（0 ~ 360）
                        center: ['50%', '50%'], //饼图的中心（圆心）坐标
                        radius: this.config.radius ? this.config.radius : ['40%', '60%'], //饼图的半径
                        avoidLabelOverlap: true, ////是否启用防止标签重叠
                        itemStyle: { //图形样式
                            normal: {
                                borderColor: '#1e2239',
                                borderWidth: 0,
                            },
                        },
                        label: { //标签的位置
                            normal: {
                                show: true,
                                position: 'outside', //标签的位置
                                // formatter: "{b}\n数量: {c}",
                                formatter: (param) => {

                                    if (param.name.length > 10) {
                                        return param.name ? param.name.slice(0, 10) + "\n" + param.name.slice(10) + "\n数量: " + param
                                            .value : ''
                                    } else {
                                        return param.name ? param.name + "\n数量: " + param.value : ''
                                    }

                                },
                                textStyle: {
                                    // color: '#fff',
                                }
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        data: data
                    }, {
                        name: '',
                        type: 'pie',
                        clockwise: false,
                        silent: true,
                        minAngle: 20, //最小的扇区角度（0 ~ 360）
                        center: ['50%', '50%'], //饼图的中心（圆心）坐标
                        radius: this.config.radius2 ? this.config.radius2 : [0, '38%'], //饼图的半径
                        itemStyle: { //图形样式
                            normal: {
                                borderColor: '#1e2239',
                                borderWidth: 0,
                                opacity: 0.21,
                            }
                        },
                        label: { //标签的位置
                            normal: {
                                show: false,
                            }
                        },
                        data: data
                    }]
                };

                if (chartData.length > 2) {
                    let idx = 0;
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

                        if (idx >= chartData.length) {
                            idx = 0;
                        }
                    }, 3000)
                    let myChart = this.myChart;

                    function clearSelectedStatus() {
                        option.series[0].data = appendBaseColor(chartData);
                        myChart.setOption(option);
                    }
                }

                function appendBaseColor(data) {
                    let c = [];
                    for (let i = 0; i < chartData.length; i++) {
                        c.push({
                            value: chartData[i],
                            name: chartName[i],
                            'selected': false
                        })
                    }
                    return c
                }

                this.myChart.setOption(option);
                window.addEventListener("resize", () => {
                    if (this.myChart) {
                        this.myChart.resize();
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .my-title-click {
        cursor: pointer;
    }
</style>