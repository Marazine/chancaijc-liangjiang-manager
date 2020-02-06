<template>
  <div class="bh-100 my-position">
    <!-- <div class="title my-title">{{title}}</div> -->
    <div class="chart-wrap map" ref="spreadMap">
    </div>

  </div>
</template>

<script>
    import '../../../../node_modules/echarts/map/js/province/shandong.js' // 引入地图数据

    export default {
        data() {
            return {
                myChart: null,
            }
        },
        computed: {

        },
        props: [],
        mounted() {
            this.spreadMapChart();
        },
        activated() {

        },
        beforeDestroy() {
            this.myChart.dispose();
            // this.chart.clear(); //清除数据
        },
        components: {},
        methods: {
            spreadMapChart() {

                //初始化echarts实例
                this.myChart = this.$echarts.init(this.$refs.spreadMap);
                /*获取地图数据*/
                // this.$echarts.registerMap("山东", shandonData)
                // var scatterData = [{
                //     "name": "济南市",
                //     "value": [
                //         117.200923,
                //         36.475807,
                //         100
                //     ]
                // }, {
                //     "name": "青岛市",
                //     "value": [
                //         120.355173,
                //         36.082982,
                //         100
                //     ]
                // }, {
                //     "name": "淄博市",
                //     "value": [
                //         118.047648,
                //         36.814939,
                //         100,
                //     ]
                // }, {
                //     "name": "枣庄市",
                //     "value": [
                //         117.557964,
                //         34.856424,
                //         100
                //     ]
                // }, {
                //     "name": "东营市",
                //     "value": [
                //         118.66471,
                //         37.434564,
                //         100
                //     ]
                // }, {
                //     "name": "烟台市",
                //     "value": [
                //         121.391382,
                //         37.539297,
                //         100
                //     ]
                // }, {
                //     "name": "潍坊市",
                //     "value": [
                //         119.107078,
                //         36.70925,
                //         100
                //     ]
                // }, {
                //     "name": "济宁市",
                //     "value": [
                //         116.587245,
                //         35.415393,
                //         100
                //     ]
                // }, {
                //     "name": "泰安市",
                //     "value": [
                //         117.129063,
                //         36.194968,
                //         100
                //     ]
                // }, {
                //     "name": "威海市",
                //     "value": [
                //         122.116394,
                //         37.509691,
                //         100
                //     ]
                // }, {
                //     "name": "日照市",
                //     "value": [
                //         119.461208,
                //         35.428588,
                //         100
                //     ]
                // }, {
                //     "name": "临沂市",
                //     "value": [
                //         118.326443,
                //         35.065282,
                //         100
                //     ]
                // }, {
                //     "name": "德州市",
                //     "value": [
                //         116.307428,
                //         37.453968,
                //         100
                //     ]
                // }, {
                //     "name": "聊城市",
                //     "value": [
                //         115.980367,
                //         36.456013,
                //         100
                //     ]
                // }, {
                //     "name": "滨州市",
                //     "value": [
                //         118.016974,
                //         37.383542,
                //         100
                //     ]
                // }, {
                //     "name": "菏泽市",
                //     "value": [
                //         115.469381,
                //         35.246531,
                //         100
                //     ]
                // }];
                // var fireData = [{
                //     "name": "济南市",
                //     "value": [
                //         117.300923,
                //         36.675807,
                //         100
                //     ]
                // }, {
                //     "name": "青岛市",
                //     "value": [
                //         120.355173,
                //         36.082982,
                //         100
                //     ]
                // }, {
                //     "name": "淄博市",
                //     "value": [
                //         118.047648,
                //         36.814939,
                //         100,
                //     ]
                // }, {
                //     "name": "枣庄市",
                //     "value": [
                //         117.557964,
                //         34.856424,
                //         100
                //     ]
                // }, {
                //     "name": "东营市",
                //     "value": [
                //         118.66471,
                //         37.434564,
                //         100
                //     ]
                // }, {
                //     "name": "烟台市",
                //     "value": [
                //         121.391382,
                //         37.539297,
                //         100
                //     ]
                // }, {
                //     "name": "潍坊市",
                //     "value": [
                //         119.107078,
                //         36.70925,
                //         100
                //     ]
                // }, {
                //     "name": "济宁市",
                //     "value": [
                //         116.587245,
                //         35.415393,
                //         100
                //     ]
                // }, {
                //     "name": "泰安市",
                //     "value": [
                //         117.129063,
                //         36.194968,
                //         100
                //     ]
                // }, {
                //     "name": "威海市",
                //     "value": [
                //         122.116394,
                //         37.509691,
                //         100
                //     ]
                // }, {
                //     "name": "日照市",
                //     "value": [
                //         119.461208,
                //         35.428588,
                //         100
                //     ]
                // }, {
                //     "name": "临沂市",
                //     "value": [
                //         118.326443,
                //         35.065282,
                //         100
                //     ]
                // }, {
                //     "name": "德州市",
                //     "value": [
                //         116.307428,
                //         37.453968,
                //         100
                //     ]
                // }, {
                //     "name": "聊城市",
                //     "value": [
                //         115.980367,
                //         36.456013,
                //         100
                //     ]
                // }, {
                //     "name": "滨州市",
                //     "value": [
                //         118.016974,
                //         37.383542,
                //         100
                //     ]
                // }, {
                //     "name": "菏泽市",
                //     "value": [
                //         115.469381,
                //         35.246531,
                //         100
                //     ]
                // }];
                // var barData = [{
                //     name: '淄博市',
                //     value: [118.047648, 36.814939, 100]
                // }, {
                //     name: '枣庄市',
                //     value: [117.557964, 34.856424, 100]
                // }, {
                //     name: '济南市',
                //     value: [117.000923, 36.675807, 100]
                // }, ];
                // var option = {
                //     title: {
                //         text: '牛鼻闪闪的3D地图',
                //         left: 'center',
                //         top: 20
                //     },
                //     geo3D: {
                //         map: '山东',
                //         viewControl: {
                //             center: [-10, 0, 10]
                //         },
                //         light: {
                //             main: {
                //                 intensity: 1,
                //                 shadow: true,
                //                 alpha: 150,
                //                 beta: 70
                //             },
                //             ambient: {
                //                 intensity: 0
                //             },
                //         },
                //         groundPlane: {
                //             show: true
                //         },
                //         postEffect: {
                //             enable: false
                //         },
                //         itemStyle: {
                //             borderColor: 'rgb(62,215,213)',
                //             borderWidth: 1
                //         }

                //     },
                //     series: [{
                //         type: 'scatter3D',
                //         coordinateSystem: 'geo3D',
                //         data: scatterData,
                //         symbol: 'circle',
                //         symbolSize: 10,
                //         itemStyle: {
                //             color: 'purple',
                //             borderColor: '#fff',
                //             borderWidth: 1
                //         },
                //         label: {
                //             show: true,
                //             formatter: '{b}',
                //             position: 'bottom',
                //             textStyle: {
                //                 color: '#000',
                //                 backgroundColor: '#fff',
                //             }
                //         }
                //     }, {
                //         type: 'scatter3D',
                //         coordinateSystem: 'geo3D',
                //         data: fireData,
                //         symbol: 'pin',
                //         symbolSize: 30,
                //         itemStyle: {
                //             color: 'red',
                //             borderColor: '#fff',
                //             borderWidth: 1
                //         },
                //         label: {
                //             show: false,
                //             formatter: '{b}',
                //             position: 'right',
                //             textStyle: {
                //                 color: '#000',
                //                 backgroundColor: '#fff',
                //             }
                //         }
                //     }, {
                //         type: 'bar3D',
                //         coordinateSystem: 'geo3D',
                //         bevelSize: 0,
                //         itemStyle: {
                //             color: '#17e3ff',
                //             opacity: 1
                //         },
                //         shading: 'lambert',
                //         data: barData,
                //     }]
                // };
                var regionData = [{
                    "name": "济南市",
                    "value": "0.01"
                }, {
                    "name": "青岛市",
                    "value": "2.01"
                }, {
                    "name": "淄博市",
                    "value": "0.15"
                }, {
                    "name": "Andorra",
                    "value": ""
                }, {
                    "name": "枣庄市",
                    "value": "3.86"
                }, {
                    "name": "东营市",
                    "value": "5.73"
                }, {
                    "name": "烟台市",
                    "value": "8.40"
                }, {
                    "name": "潍坊市",
                    "value": "1.48"
                }, {
                    "name": "济宁市",
                    "value": "9.02"
                }, {
                    "name": "泰安市",
                    "value": "11.08"
                }, {
                    "name": "威海市",
                    "value": "4.54"
                }, {
                    "name": "日照市",
                    "value": "2.10"
                }, {
                    "name": "临沂市",
                    "value": "6.98"
                }, {
                    "name": "德州市",
                    "value": "0.00"
                }, {
                    "name": "聊城市",
                    "value": ""
                }, {
                    "name": "滨州市",
                    "value": "5.53"
                }, {
                    "name": "菏泽市",
                    "value": "10.63"
                }];
                var option = {
                    title: {
                        text: '牛鼻闪闪的3D地图',
                        left: 'center',
                        top: 20
                    },
                    visualMap: {
                        show: true,
                        min: 0,
                        max: 15,
                        inRange: {
                            color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61',
                                '#f46d43', '#d73027', '#a50026'
                            ]
                        }
                    },
                    series: [{
                        type: 'map3D',
                        map: '山东',
                        viewControl: {
                            center: [-10, 0, 10]
                        },
                        light: {
                            main: {
                                intensity: 1,
                                shadow: true,
                                alpha: 150,
                                beta: 70
                            },
                            ambient: {
                                intensity: 0
                            },
                        },
                        groundPlane: {
                            show: true
                        },
                        // data: regionData,
                        postEffect: {
                            enable: false
                        },
                        itemStyle: {
                            borderColor: 'rgb(62,215,213)',
                            borderWidth: 1
                        }
                    }, ]
                };

                //使用制定的配置项和数据显示图表
                this.myChart.setOption(option);
                window.addEventListener("resize", () => {
                    this.myChart.resize();
                });
            }
        }
    }
</script>

<style scoped>
    .my-position {
        position: relative;
    }
    
    .title {
        text-align: center;
        width: 100%;
        left: 0;
        top: 2%;
    }
    
    .my-title {
        top: -6%;
        position: absolute;
        z-index: 10;
        font-size: 20px;
    }
</style>