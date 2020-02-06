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
                    backgroundColor: "transparent",
                    tooltip: {
                        trigger: 'item',
                        formatter: (param) => {
                            return param.name ? param.name + ": " + param.value : ''
                        }
                    },

                    legend: {
                        orient: "vertical",
                        right: "25%",
                        y: "center",
                        icon: "circle",
                        textStyle: {
                            color: "#fff"
                        },

                        // data: ['物料1', '物料2', '物料3', '物料4', '物料5', '物料6', '物料7'],
                        data: chartName,
                        formatter: function(name) {
                            var oa = option.series[0].data;
                            // var num = oa[0].value + oa[1].value + oa[2].value + oa[3].value;
                            var num = oa
                                .map(item => {
                                    return item.value;
                                })
                                .reduce((total, item) => {
                                    return total + item;
                                });
                            for (var i = 0; i < option.series[0].data.length; i++) {
                                if (name == oa[i].name) {
                                    return (
                                        name + "     " + ((oa[i].value / num) * 100).toFixed(2) + "%"
                                    );
                                }
                            }
                        }
                    },
                    series: [{
                        type: "pie",
                        center: ["30%", "50%"],
                        radius: ["50%", "70%"],
                        // roseType: "radius",
                        startAngle: 0,
                        color: [
                            "#3AA0FF",
                            "#36CBCB",
                            "#4DCB73",
                            "#FAD337",
                            "#F2637B",
                            "#975FE4",
                            "#8356E4",
                            "#343ECB",
                            "#FAA644"
                        ],
                        label: {
                            normal: {
                                show: true,
                                formatter: function(params) {

                                    return params.name + "\n" + params.value
                                },
                            }
                        },
                        labelLine: {
                            normal: {
                                show: true,
                                length: 15,
                                length2: 15,
                            }
                        },
                        data: data
                    }, {
                        name: "",
                        type: "pie",
                        clockWise: true,
                        hoverAnimation: false,
                        center: ["30%", "50%"],
                        radius: [0, "43%"],
                        label: {
                            normal: {
                                position: "center"
                            }
                        },
                        data: [{
                            value: 0,
                            itemStyle: {
                                normal: {
                                    color: "#5F68E4"
                                }
                            },
                            label: {
                                normal: {
                                    formatter: "企业性质",
                                    textStyle: {
                                        color: "#000",
                                        fontSize: 25,
                                        fontWeight: "bold"
                                    }
                                }
                            }
                        }]
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