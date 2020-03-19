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
                style_config: {
                    paddingTop: this.config.c_mt
                },
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
                // this.myChart = this.$echarts.init(document.getElementById(id), "dark");

                let part1 = parseInt(data.value[0]);
                let part2 = parseInt(data.value[0]) + parseInt(data.value[1]);

                let option = {
                    backgroundColor: 'transparent',
                    "grid": {
                        "top": "10%",
                        "left": "-20%",
                        "bottom": "15%",
                        "right": "10%",
                        "containLabel": true
                    },
                    "xAxis": [{
                        show: false,
                        "type": "category",
                        "axisTick": {
                            "alignWithLabel": false
                        },
                        "nameTextStyle": {
                            "color": "#82b0ec"
                        },
                        "axisLine": {
                            "lineStyle": {
                                "color": "#82b0ec"
                            }
                        },
                        "axisLabel": {
                            "textStyle": {
                                "color": "#82b0ec"
                            }
                        }
                    }],
                    "yAxis": [{
                        show: false,
                        "type": "value",
                        "axisLabel": {
                            "textStyle": {
                                "color": "#82b0ec"
                            },
                            "formatter": "{value}%"
                        },
                        "splitLine": {
                            "lineStyle": {
                                "color": "#0c2c5a"
                            }
                        },
                        "axisLine": {
                            "show": false
                        }
                    }],
                    tooltip: {

                    },
                    "series": [{
                            "name": "",
                            type: 'pictorialBar',
                            symbolSize: [60, 16],
                            symbolOffset: [0, -10],
                            silent: true,
                            symbolPosition: 'end',
                            z: 12,
                            //"barWidth": "20",

                            "data": [{
                                "value": part1,
                                "itemStyle": {
                                    "color": "#4ae6ff"
                                }
                            }]
                        }, {
                            "name": "",
                            type: 'pictorialBar',
                            symbolSize: [60, 16],
                            symbolOffset: [0, -10],
                            silent: true,
                            symbolPosition: 'end',
                            z: 12,
                            //"barWidth": "20",

                            "data": [{
                                "value": part2,
                                "itemStyle": {
                                    "color": "#beff3f"
                                }
                            }]
                        },
                        //  {
                        //     "name": "",
                        //     type: 'pictorialBar',
                        //     symbolSize: [60, 16],
                        //     symbolOffset: [0, -10],
                        //     silent: true,
                        //     symbolPosition: 'end',
                        //     z: 12,
                        //     "data": [{
                        //         "value": part3,
                        //         "itemStyle": {
                        //             "color": "#ff954a"
                        //         }
                        //     }]
                        // },
                        {
                            name: '',
                            type: 'pictorialBar',
                            symbolSize: [60, 16],
                            silent: true,
                            symbolOffset: [0, 10],
                            // "barWidth": "20",
                            z: 12,
                            "data": [{
                                "value": part1,
                                "itemStyle": {
                                    "color": "#4ae6ff"
                                }
                            }]
                        }, {
                            name: '',
                            type: 'pictorialBar',
                            symbolSize: [90, 30],
                            symbolOffset: [0, 20],
                            silent: true,
                            z: 10,
                            itemStyle: {
                                normal: {
                                    color: 'transparent',
                                    borderColor: '#14b1eb',
                                    borderType: 'dashed',
                                    borderWidth: 5
                                }
                            },
                            data: [part1]
                        }, {
                            type: 'bar',
                            stack: 'sad',

                            itemStyle: {
                                normal: {
                                    //color: '#14b1eb',
                                    opacity: .5
                                }
                            },
                            "label": {
                                "normal": {
                                    fontSize: 14,
                                    "show": true,
                                    lineHeight: 18,
                                    "position": ['130%', '40%'],
                                    "formatter": function(params) {
                                        console.log(params);
                                        return params.name + ":" + params.value + '\n'+params.data.propor
                                    }
                                }
                            },
                            //silent: true,
                            "barWidth": "60",
                            //barGap: '-100%', // Make series be overlap
                            "data": [{
                                "value": parseInt(parseInt(data.value[0])),
                                name: data.name[0],
                                propor:data.propor[0],
                                "itemStyle": {
                                    "color": "#4ae6ff"
                                }
                            }],


                        }, {
                            type: 'bar',
                            itemStyle: {
                                normal: {
                                    //color: '#14b1eb',
                                    opacity: .5
                                }
                            },
                            "label": {
                                "normal": {
                                    "show": true,
                                    'color': '#ffffff',
                                    fontSize: 14,
                                    opacity: 1,
                                    lineHeight: 18,
                                    "position": ['130%', '40%'],
                                    "formatter": function(params) {
                                        return params.name + ":" + params.value + '\n'+params.data.propor
                                    }
                                }
                            },
                            stack: 'sad',
                            //silent: true,
                            "barWidth": "60",
                            //barGap: '-100%', // Make series be overlap
                            "data": [{
                                "value": parseInt(parseInt(data.value[1])),
                                name: data.name[1],
                                propor:data.propor[1],
                                "itemStyle": {
                                    "color": "#beff3f",
                                }
                            }],

                        },
                    ]
                };

                this.myChart.setOption(option);
                window.addEventListener("resize", () => {
                    this.myChart.resize();
                });
            },
        }
    }
</script>

<style scoped>

</style>