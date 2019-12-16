<template>
  <div class="back-img-l bh-50">
    <div class="title my-title-click" v-if="config.isClick" @click="$router.push({name:'rcqk'})">
        <img src="../../../assets/img/arrow.png" alt="">
        {{config.title}}
    </div>
    <div class="title" v-else>
        <img src="../../../assets/img/arrow.png" alt="">
        {{config.title}}
    </div>
    <div class="s-content" id="estate" ref="estate" :style="{paddingTop:config.paddingTop?config.paddingTop:'10%'}"></div>
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
                dataValue: [],
            }
        },
        props: ["estateData", "config"],
        mounted() {
            this.init();
        },
        beforeDestroy() {
            this.myChart.dispose();
        },
        components: {},
        methods: {
            init() {
                if (this.estateData) {
                    this.dataValue = this.analyzeData(this.estateData);
                    this.estateChart("estate", this.dataValue, this.config);
                    
                } else {
                    // this.estateChart("estate", this.b_age_aboard, this.config);
                }
            },
            analyzeData(obj) {
                let arr = [];
                for (const key in obj) {
                    if (obj.hasOwnProperty(key)) {
                            const element = obj[key];
                            arr.push({
                                value: obj[key],
                                name: key
                            });
                        }
                    }
                return arr;
            },
            estateChart(id, data, config_chart) {
                this.myChart = this.$echarts.init(this.$refs.estate);
                let echartData = data;
                let rightData = data.map(item => {
                    return item.name;
                });
                // let rightData = data.name;
                console.log(echartData, rightData);
                
                let option = {
                    // backgroundColor: "#fff",
                    tooltip: {
                        trigger: 'item',
                        formatter: (param)=>{
                            return param.name?param.name + ": " + param.value:''
                        }
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
                        padding: 20,
                        text: this.config.echartTitle,
                        textStyle: {//主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
                            color: '#00f2f1',
                            fontSize: 14,
                        },
                    },
                    legend: {
                        orient: "vertical",
                        top: '60',
                        right: "20",
                        y: "center",
                        icon: "circle",
                        textStyle: {
                            color: "#fff"
                        },
                        data: rightData,
                        formatter: function (name) {
                            var oa = option.series[0].data;
                            var num = oa[0].value + oa[1].value + oa[2].value + oa[3].value;
                            var num = oa.map(item => {
                                return item.value;
                            }).reduce((total, item) => {
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
                        center: ["25%", "60%"],
                        // radius: ["50%", "70%"],
                        radius: this.config.radius,
                        roseType: "radius",
                        startAngle: 100,
                        color: ["#3AA0FF","#36CBCB","#4DCB73","#FAD337","#F2637B","#975FE4","#8356E4","#343ECB","#FAA644"],
                        label: {
                            normal: {
                                show: false
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: echartData
                    },
                    {
                        name: "",
                        type: "pie",
                        clockWise: true,
                        hoverAnimation: false,
                        center: ["25%", "60%"],
                        // radius: [0, "43%"],
                        radius: this.config.radius2,
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
                                formatter: this.config.isleft ? "所在区域" : "企业性质",
                                textStyle: {
                                    color: "#000",
                                    // fontSize: 25,
                                    fontSize: this.config.fontSize,
                                    fontWeight: "bold"
                                }
                                }
                            }
                        }]
                    }
                    ]
                };
                this.myChart.setOption(option);
                window.addEventListener("resize", () => {
                    if(this.myChart) {
                        this.myChart.resize();
                    }
                });
            },
        }
    }
</script>

<style lang="scss" scoped>
.my-title-click {
    cursor: pointer;
}
</style>