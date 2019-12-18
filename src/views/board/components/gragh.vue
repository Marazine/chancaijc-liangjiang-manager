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
                if (this.initData) {
                    // debugger
                    this.estateChart("estate", this.initData);
                } else {
                    this.estateChart("estate", this.b_age_aboard);
                }

            },
            estateChart(id, data) {
                // debugger
                this.myChart = this.$echarts.init(this.$refs.estate);
                // var sportsIcon = {
                //     'a': 'https://gallerybox.echartsjs.com/asset/get/s/data-1559121268278-ozjd-lXoz.png',
                //     'b': 'https://gallerybox.echartsjs.com/asset/get/s/data-1559121263841-UC5w7mTJ9.png',
                //     'c': 'https://gallerybox.echartsjs.com/asset/get/s/data-1559121259198-sxyPSimU9.png',
                //     'd': 'https://gallerybox.echartsjs.com/asset/get/s/data-1559121254241-xj5JAIBzC.png',
                //     'e': 'https://gallerybox.echartsjs.com/asset/get/s/data-1559121249274-QxHDAdQGy.png',
                // };
                // series数据处理
                let dataList = []
                let color = [
                    "rgba(255, 153, 153 , 0.8)",
                    "rgba(255, 176, 63 , 0.8)",
                    "rgba(61, 186, 45 , 0.8)",
                    "rgba(43, 166, 254 , 0.8)",
                    "rgba(246, 112, 149 , 0.8)",
                    "rgba(77, 231, 55 , 0.8)",
                    "rgba(252, 162, 50 , 0.8)",
                    "#00BFFF",
                    "#FF4500",
                    "#FFD700",
                    "rgb(26, 83, 246)",
                    "rgb(98, 224, 224)",
                    "rgb(165, 190, 198)",
                ]
                data.name.forEach((item, index) => {

                    dataList.push({
                        "name": item + ":" + data.value[index],
                        "value": data.value[index],
                        // "symbolSize": 30,
                        "symbolSize": Number(data.value[index]) > 30 ? 130 : Number(data.value[index]) + 100,
                        "draggable": true,
                        "itemStyle": {
                            "normal": {
                                "borderColor": color[index],
                                "borderWidth": 4,
                                "shadowBlur": 10,
                                "shadowColor": color[index],
                                "color": color[index]
                            }
                        }
                    })
                })

                // coverData(product_personData2);
                let option = {
                    backgroundColor: 'transparent',

                    tooltip: {},
                    animationDurationUpdate: function(idx) {
                        // 越往后的数据延迟越大
                        return idx * 1000;
                    },
                    animationEasingUpdate: 'bounceIn',
                    // color: ['#fff', '#fff', '#fff'],
                    series: [{
                        type: 'graph',
                        layout: 'force',
                        force: {
                            repulsion: 300,
                            edgeLength: 10
                        },
                        roam: true,
                        label: {
                            normal: {
                                show: true
                            }
                        },
                        tooltip:{
                            formatter: '{b0}'
                        },
                        data: dataList,
                        // [{
                        //         "name": "考研",
                        //         "value": 10000,
                        //         "symbolSize": 50,
                        //         "draggable": true,
                        //         "itemStyle": {
                        //             "normal": {
                        //                 "borderColor": "rgb(27, 94, 93)",
                        //                 "borderWidth": 4,
                        //                 "shadowBlur": 100,
                        //                 "shadowColor": "rgb(27, 94, 93)",
                        //                 "color": "rgb(27, 94, 93)"
                        //             }
                        //         }
                        //     }, {
                        //         "name": "兼职",
                        //         "value": 6181,
                        //         "symbolSize": 60,
                        //         "draggable": true,
                        //         "itemStyle": {
                        //             "normal": {
                        //                 "borderColor": "rgb(206, 188, 11)",
                        //                 "borderWidth": 4,
                        //                 "shadowBlur": 100,
                        //                 "shadowColor": "rgb(206, 188, 11)",
                        //                 "color": "rgb(206, 188, 11)"
                        //             }
                        //         }
                        //     }, {
                        //         "name": "食堂",
                        //         "value": 4386,
                        //         "symbolSize": 55,
                        //         "draggable": true,
                        //         "itemStyle": {
                        //             "normal": {
                        //                 "borderColor": "rgb(165, 190, 198)",
                        //                 "borderWidth": 4,
                        //                 "shadowBlur": 100,
                        //                 "shadowColor": "rgb(165, 190, 198)",
                        //                 "color": "rgb(165, 190, 198)"
                        //             }
                        //         }
                        //     }, {
                        //         "name": "家教",
                        //         "value": 4055,
                        //         "symbolSize": 45,
                        //         "draggable": true,
                        //         "itemStyle": {
                        //             "normal": {
                        //                 "borderColor": "rgb(98, 41, 72)",
                        //                 "borderWidth": 4,
                        //                 "shadowBlur": 100,
                        //                 "shadowColor": "rgb(98, 41, 72)",
                        //                 "color": "rgb(98, 41, 72)"
                        //             }
                        //         }
                        //     }, {
                        //         "name": "大四",
                        //         "value": 2467,
                        //         "symbolSize": 55,
                        //         "draggable": true,
                        //         "itemStyle": {
                        //             "normal": {
                        //                 "borderColor": "rgb(175, 20, 143)",
                        //                 "borderWidth": 4,
                        //                 "shadowBlur": 100,
                        //                 "shadowColor": "rgb(175, 20, 143)",
                        //                 "color": "rgb(175, 20, 143)"
                        //             }
                        //         }
                        //     }, {
                        //         "name": "研友",
                        //         "value": 2244,
                        //         "symbolSize": 70,
                        //         "draggable": true,
                        //         "itemStyle": {
                        //             "normal": {
                        //                 "borderColor": "rgb(77, 231, 55)",
                        //                 "borderWidth": 4,
                        //                 "shadowBlur": 100,
                        //                 "shadowColor": "rgb(77, 231, 55)",
                        //                 "color": "rgb(77, 231, 55)"
                        //             }
                        //         }
                        //     }, {
                        //         "name": "论文",
                        //         "value": 1898,
                        //         "symbolSize": 50,
                        //         "draggable": true,
                        //         "itemStyle": {
                        //             "normal": {
                        //                 "borderColor": "rgb(26, 83, 246)",
                        //                 "borderWidth": 4,
                        //                 "shadowBlur": 100,
                        //                 "shadowColor": "rgb(26, 83, 246)",
                        //                 "color": "rgb(26, 83, 246)"
                        //             }
                        //         }
                        //     }]
                    }]
                }
                this.myChart.setOption(option);

                // if (data.length > 2) {
                //     let idx = 0;
                //     setInterval(() => {
                //         clearSelectedStatus();
                //         // console.log(option.series[0])
                //         option.series[0].data[idx]['selected'] = true;
                //         this.myChart.setOption(option);

                //         this.myChart.dispatchAction({
                //             type: 'showTip',
                //             seriesIndex: 0,
                //             dataIndex: idx
                //         });
                //         idx++;

                //         if (idx >= data.length) {
                //             idx = 0;
                //         }
                //     }, 3000)
                //     let myChart = this.myChart;

                //     function clearSelectedStatus() {
                //         option.series[0].data = data;
                //         myChart.setOption(option);
                //     }
                // }
                window.addEventListener("resize", () => {
                    this.myChart.resize();
                });
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>