<template>
  <div class="bh-100">
    <div class="chart-wrap" ref="external"></div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                myChart: null,
                b_age_aboard: [{
                    value: 10,
                    name: 'IDS'
                }, {
                    value: 5,
                    name: 'VPN'
                }, {
                    value: 15,
                    name: '交换机'
                }, {
                    value: 25,
                    name: '防火墙'
                }, {
                    value: 20,
                    name: 'WAF'
                }, {
                    value: 35,
                    name: '堡垒机'
                }],
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
                if (this.initData.length > 0) {

                    this.getChart("external", this.initData);
                } else {
                    if (this.initData && this.initData.name) {
                        let newArr = []
                        for (let i in this.initData.name) {
                            newArr.push({
                                name: this.initData.name[i],
                                value: this.initData.value[i]
                            })
                        }
                        this.getChart("external", newArr);
                    } else {
                        this.getChart("external", this.b_age_aboard);
                    }
                }
            },
            getChart(id, data) {
                this.myChart = this.$echarts.init(this.$refs.external);

                let option = {
                    backgroundColor: "transparent",
                    color: ['#0E7CE2', '#FF8352', '#E271DE', '#F8456B', '#00FFFF', '#4AEAB0', "#EAEA26", "#906BF9", "#FE5656",
                        "#01E17E", "#3DD1F9", "#FFAD05"
                    ],
                    // title: {
                    // text: '网络/安全设备',
                    // left: '60',
                    // top: 0,
                    // textAlign: 'center',
                    // textStyle: {
                    // color: '#fff',
                    // fontSize: 14,
                    // fontWeight: 0
                    // }
                    // },
                    grid: {
                        left: -100,
                        top: '0%',
                        bottom: 10,
                        right: 10,
                        containLabel: true
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{b} : {c} ({d}%)"
                    },

                    // polar: {},
                    // angleAxis: {
                    //     interval: 1,
                    //     type: 'category',
                    //     data: [],
                    //     z: 10,
                    // axisLine: {
                    //     show: false,
                    //     lineStyle: {
                    //         color: "#0B4A6B",
                    //         width: 1,
                    //         type: "solid"
                    //     },
                    // },
                    // axisLabel: {
                    //     interval: 0,
                    //     show: true,
                    //     color: "#0B4A6B",
                    //     margin: 8,
                    //     fontSize: 16
                    // },
                    // },
                    // radiusAxis: {
                    //     min: 40,
                    //     max: 120,
                    //     interval: 20,
                    // axisLine: {
                    //     show: false,
                    //     lineStyle: {
                    //         color: "#0B3E5E",
                    //         width: 1,
                    //         type: "solid"
                    //     },
                    // },
                    // axisLabel: {
                    //     formatter: '{a} %',
                    //     show: false,
                    //     padding: [0, 0, 20, 0],
                    //     color: "#0B3E5E",
                    //     fontSize: 16
                    // },
                    // splitLine: {
                    //     lineStyle: {
                    //         color: "#0B3E5E",
                    //         width: 2,
                    //         type: "solid"
                    //     }
                    // }
                    // },
                    // calculable: true,
                    series: [
                        //     {
                        //     type: 'pie',
                        //     radius: ["5%", "10%"],
                        //     hoverAnimation: false,
                        //     labelLine: {
                        //         normal: {
                        //             show: false,
                        //             length: 30,
                        //             length2: 55
                        //         },
                        //         emphasis: {
                        //             show: false
                        //         }
                        //     },
                        //     data: [{
                        //         name: '',
                        //         value: 0,
                        //         itemStyle: {
                        //             normal: {
                        //                 color: "#0B4A6B"
                        //             }
                        //         }
                        //     }]
                        // }, 
                        // {
                        //     type: 'pie',
                        //     radius: ["90%", "95%"],
                        //     hoverAnimation: false,
                        //     labelLine: {
                        //         normal: {
                        //             show: false,
                        //             length: 30,
                        //             length2: 55
                        //         },
                        //         emphasis: {
                        //             show: false
                        //         }
                        //     },
                        //     name: "",
                        //     data: [{
                        //         name: '',
                        //         value: 0,
                        //         itemStyle: {
                        //             normal: {
                        //                 color: "#0B4A6B"
                        //             }
                        //         }
                        //     }]
                        // }, 
                        {
                            // stack: 'a',
                            // roseType: 'area',
                            // zlevel: 10,
                            type: 'pie',
                            radius: ['30%', '50%'],
                            // radius: this.config.radius,
                            center: ["50%", "55%"],
                            // roseType: 'radius',
                            label: {
                                normal: {
                                    show: true,
                                    // formatter: "{b}",
                                    formatter: (param) => {
                                        if (param.name.length > 8) {
                                            return param.name ? param.name.slice(0, 8) + "\n" + param.name.slice(8) + "\n数量: " + param
                                                .value : ''
                                        } else {
                                            return param.name ? param.name + "\n数量: " + param.value : ''
                                        }
                                    },
                                    textStyle: {
                                        fontSize: 12,
                                    },
                                    position: 'outside'
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: true,
                                    // length: 20,
                                    // length2: 55
                                    length: 10,
                                    length2: 10
                                },
                                emphasis: {
                                    show: false
                                }
                            },
                            data: data
                        },
                    ]
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

<style scoped>

</style>