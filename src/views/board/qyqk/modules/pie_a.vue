<template>
  <div class="back-img bh-50">
    <div class="title my-title-click" v-if="config.isClick">
      <img src="../../../../assets/img/arrow.png" alt="">
      {{config.title}}
    </div>
    <div class="title" v-else>
      <img src="../../../../assets/img/arrow.png" alt="">
      {{config.title}}
    </div>
    <div class="s-content" id="pie_a" ref="pie_a" :style="{paddingTop:config.paddingTop?config.paddingTop:''}"></div>
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
                        formatter: "{b} : {d}% <br/> {c}"
                    },
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
                        type: 'pie',
                        // radius: ['47%', '65%'],
                        radius: this.config.radius,
                        center: ['50%', '50%'],
                        color: ['#0E7CE2', '#FF8352', '#E271DE', '#F8456B', '#00FFFF', '#4AEAB0', "#EAEA26", "#906BF9",
                            "#FE5656", "#01E17E", "#3DD1F9", "#FFAD05", 'rgb(254,67,101)', 'rgb(252,157,154)',
                            'rgb(249,205,173)', 'rgb(200,200,169)', 'rgb(131,175,155)'
                        ],
                        data: data,
                        labelLine: {
                            // normal: {
                            //     show: true,
                            //     length: 20,
                            //     length2: 20,
                            //     lineStyle: {
                            //         color: '#12EABE',
                            //         width: 2
                            //     }
                            // }
                            normal: {
                                show: true,
                                formatter: "{b}",
                                textStyle: {
                                    fontSize: 12,
                                },
                                position: 'outside'
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                formatter: '{b}',
                                fontFamily: 'Microsoft YaHei',
                                rich: {
                                    b: {
                                        fontSize: 20,
                                        color: '#12EABE',
                                        align: 'left',
                                        padding: 4
                                    },
                                    d: {
                                        fontSize: 20,
                                        color: '#12EABE',
                                        align: 'left',
                                        padding: 4
                                    },
                                    c: {
                                        fontSize: 20,
                                        color: '#12EABE',
                                        align: 'left',
                                        padding: 4
                                    }
                                }
                            }
                        }
                    }]
                };
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