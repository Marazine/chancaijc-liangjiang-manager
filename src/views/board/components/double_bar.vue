<template>
    <div class="bh-100">
        <div class="chart-wrap" ref="pillar"></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
	    	myChart:null,
                chartData: {
                    "name": ['海洋产业', '航天航空产业', '生物产业', '新材料产业', '节能环保产业', '生命健康产业', '新能源产业', '文化创意产业', '高端装备制造',
                        '现代服务产业', '互联网产业', '新一代信息技术产业'
                    ],
                    'value1': [1350, 1948, 2970, 5468, 10034, 10162, 10428, 11017, 14383, 17681, 48060, 94567],
                    'value2': [1261, 1815, 2117, 4544, 9900, 7861, 9043, 9271, 13235, 15450, 36115, 75320]
                }
            }
        },
        created() {

        },
        mounted() {
            this.init();
        },
        beforeDestroy() {
            this.myChart.dispose();
        },
        components: {},
        props: ['initData', 'config'],
        methods: {
            init() {
                if (this.initData) {
                    this.pillarChart(this.initData, this.config);
                } else {
                    this.pillarChart(this.chartData, this.config);
                }
            },
            pillarChart(data_chart, config_chart) {

                this.myChart = this.$echarts.init(this.$refs.pillar);

                let option = {
                    // backgroundColor: '#00265f',
                    // title:{
                    //      "text": "最近6日场站用气量统计",
                    //     textStyle:{
                    //         color: '#fff',
                    //     }
                    // },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    // legend: {
                    //     data: ['FT101', 'FT102', '总和'],
                    //     left:'center',
                    //     align: 'left',
                    //     top:'2%',
                    //     textStyle: {
                    //         color: "#fff"
                    //     },
                    //     itemWidth: 10,
                    //     itemHeight: 10,
                    //     itemGap: 35
                    // },
                    grid: {
                        top: '5%',
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    // grid: [{
                    //     width: '80%',
                    //     left: '10%'
                    // },{
                    //     left: '13.3%',
                    //     width: '80%'
                    // }],
                    xAxis: [{
                        // show: false,
                        type: 'category',
                        data: data_chart.name,
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: "#fff",
                                width: 1,
                                type: "solid"
                            },
                        },
                        axisTick: {
                            show: true,
                        },
                        splitLine:{
                            show:false
                        }
                        // axisLabel: {
                        //     show: true,
                        //     textStyle: {
                        //         color: "#fff",
                        //     }
                        // },
                    }],
                    yAxis: [{
                        // show: false,
                        type: 'value',
                        // name:'万m³',
                        axisLabel: {
                            formatter: '{value}'
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: "#fff",
                                width: 1,
                                type: "solid"
                            },
                        },
                        splitLine:{
                            show:false
                        }
                        // splitLine: {
                        //     lineStyle: {
                        //         color: "#fff",
                        //     }
                        // }
                    }],
                    series: [{
                        // name: 'FT101',
                        type: 'bar',
                        data: data_chart.value,
                        // barWidth: 16, //柱子宽度
                        barWidth: 8,
                        // barGap: 1, //柱子之间间距
                        itemStyle: {
                            normal: {
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0, color: '#37FFF9' // 0% 处的颜色
                                    }, {
                                        offset: 1, color: 'rgba(0, 222, 215, 0.2)' // 100% 处的颜色
                                    }],
                                },
                                opacity: 1,
                                barBorderRadius: 12,
                            }
                        }
                    }, {
                        // name: 'FT102',
                        type: 'bar',
                        data: data_chart.value1,
                        // barWidth: 16,
                        barWidth: 8,
                        // barGap: 1,
                        itemStyle: {
                            normal: {
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0, color: '#FF5624' // 0% 处的颜色
                                    }, {
                                        offset: 1, color: 'rgba(255, 86, 36, 0.2)' // 100% 处的颜色
                                    }],
                                },
                                opacity: 1,
                                barBorderRadius: 12,
                            }
                        }
                    }]
                };
                // {
                //     tooltip: {
                //         trigger: 'axis',
                //         axisPointer: {
                //             type: 'shadow'
                //         }
                //     },
                //     xAxis: [{
                //         data: data_chart.name,
                //         axisLabel: {
                //             interval: 0,
                //             show: false
                //         },
                //     },{
                //         data: data_chart.name,
                //         axisLabel: {
                //             interval: 0,
                //             show: true
                //         },
                //         axisLine: {
                //         show: false  
                //         },
                //         axisTick: {
                //             show: false
                //         },
                //         gridIndex: 1
                //     }],
                //     yAxis: [{
                //         type: 'value',
                //         show: true
                //     },{
                //         gridIndex: 1,
                //         show: false,
                //     }],
                //     grid: [{
                //         width: '80%',
                //         left: '10%'
                //     },{
                //         left: '13.3%',
                //         width: '80%'
                //     }],
                //     series: [
                //         {
                //             type: 'bar',
                //             barWidth: 10,
                //             data: data_chart.value,
                //             itemStyle: {
                //                 barBorderRadius: 10,
                //                 color: {
                //                     type: 'linear',
                //                     x: 0,
                //                     y: 0,
                //                     x2: 0,
                //                     y2: 1,
                //                     colorStops: [{
                //                         offset: 0, color: '#37FFF9' // 0% 处的颜色
                //                     }, {
                //                         offset: 1, color: 'rgba(0, 222, 215, 0.2)' // 100% 处的颜色
                //                     }],
                //                 }
                //             }
                            
                //         },
                //         {
                //             type: 'bar',
                //             barWidth: 10,
                //             data: data_chart.value1,
                //             itemStyle: {
                //                 barBorderRadius: 10,
                //                 color: {
                //                     type: 'linear',
                //                     x: 0,
                //                     y: 0,
                //                     x2: 0,
                //                     y2: 1,
                //                     colorStops: [{
                //                         offset: 0, color: '#FF5624' // 0% 处的颜色
                //                     }, {
                //                         offset: 1, color: 'rgba(255, 86, 36, 0.2)' // 100% 处的颜色
                //                     }],
                //                 }
                //             }
                //         },
                //     ]
                // };
                
                // {
                //     backgroundColor: 'transparent',
                    // tooltip: {
                    //     trigger: 'axis',
                    //     axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    //         type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
                    //     },
                    //     formatter: function(params) {
                    //         let time = '';
                    //         let str = '';
                    //         for (let i of params) {
                    //             time = i.name.replace(/\n/g, '') + '<br />';
                    //             if (i.data == 'null' || i.data == null) {
                    //                 str += i.seriesName + '：无数据' + '<br />'
                    //             } else {
                    //                 str += i.seriesName + '：' + Math.abs(i.data) + '<br />'
                    //             }
                    //         }
                    //         return time + str;
                    //     },
                    // },
                    // color: [new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    //         offset: 0,
                    //         color: "#0167e8"
                    //     }, {
                    //         offset: 1,
                    //         color: "#13ace8"
                    //     }], false),
                    //     new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    //         offset: 0,
                    //         color: "#963ff1"
                    //     }, {
                    //         offset: 1,
                    //         color: "#fd5c8c"
                    //     }], false)
                    // ],
                    // legend: {
                    //     top: 12,
                    //     itemGap: 10,
                    //     itemWidth: 10,
                    //     itemHeight: 10,
                    //     data: this.config.legend
                    // },
                    // grid: {
                    //     left: '4%',
                    //     right: '10%',
                    //     bottom: '-8%',
                    //     top: '0',
                    //     containLabel: true
                    // },
                    // // xAxis: [ {
                    // //     type : 'value'
                    // // }],
                    // xAxis: {
                    //     show: false
                    // },
                    // yAxis : [
                    //     {
                    //         type : 'category',
                    //         axisLine: {
                    //             show: false
                    //         },
                    //         axisTick: {
                    //             show: false
                    //         },
                    //         axisLabel: {
                    //             show: true,
                    //             interval: '0',
                    //             // margin: this.config.margin,
                    //             // align: "left",
                    //             textStyle: {
                    //                 fontSize: 11,
                    //                 color: '#ddd',
                    //             },
                    //             formatter: function(value) {
                    //                 if (value.length > 8) {
                    //                     return value.substring(0, 8) + "..";
                    //                 } else {
                    //                     return value;
                    //                 }
                    //             },
                    //         },
                    //         // data : ['分拣','清洗','抛光','研磨','脱膜','切割','压膜','压膜分配','光固化后处理','光固化']
                    //         data : data_chart.name
                    //     }
                    // ],
                    // series : [
                    //     {
                    //         name: this.config.legend[0],
                    //         type:'bar',
                    //         stack: '总量',
                    //         // barWidth: 12,
                    //         label: {
                    //             // normal: {
                    //             //     // show: true,
                    //             //     // position: 'left',
                    //             //     // color: '#ddd',
                    //             //     // fontSize: '10',
                    //             //     // formatter: function(params) {
                    //             //     //     return params.data * -1;
                    //             //     // }
                    //             // }
                    //         },
                    //         // data:[400, 241,360, 320, 302, 341, 374, 390, 450, 420]
                    //         data: data_chart.value
                    //     },
                    //     {
                    //         name: this.config.legend[1],
                    //         type:'bar',
                    //         stack: '总量',
                    //         // barWidth: 12,
                    //         label: {
                    //             // normal: {
                    //             //     // formatter: function(params){return -params.value}
                    //             //     // normal: {
                    //             //         // show: true,
                    //             //         // // position: 'right',

                    //             //         // color: '#ddd',
                    //             //         // fontSize: '10',
                    //             //     // }
                    //             // }
                    //         },
                    //         // data:[-120, -180,-120, -120, -132, -101, -134, -190, -230, -210]
                    //         data: data_chart.value1
                    //     }
                    // ],
                // };

                this.myChart.setOption(option);
                window.addEventListener("resize", ()=> {
                    if(this.myChart) {
                        this.myChart.resize();
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>