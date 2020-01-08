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
                mTime: null,
                b_age_aboard: {
                    name: ['工商管理', '金融学', '英语'],
                    value: [1419, 1326, 1412]
                },
                totalValue: 0,
                dataList: null,
            }
        },
        props: ["config", "initData"],
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
                    if (this.config.ispercent) {
                        this.sum(this.initData.value);
                        this.dataList = this.initData.value;
                        this.percent(this.initData.value);
                    }
                    this.estateChart("estate", this.initData);
                } else {
                    this.estateChart("estate", this.b_age_aboard);
                }

            },
            sum(arr) {
                arr.forEach((val, idx, arr) => {
                    this.totalValue += parseInt(val);
                }, 0);
                if (this.totalValue == 0) {
                    this.totalValue = 1
                }
                return this.totalValue;
            },
            percent() {
                this.initData.value = this.initData.value.map((val, idx) => {
                    return ((parseInt(val) / this.totalValue) * 100).toFixed(2);
                })
            },
            estateChart(id, data) {
                // console.log(data);
                this.myChart = this.$echarts.init(this.$refs.estate);
                var _this = this;
                let option = {
                    backgroundColor: "transparent",
                    tooltip: {
                        trigger: 'axis',
                        formatter: (params) => {
                            let val = null;
                            _this.initData.name.forEach((item, index) => {
                                if (item == params[0].name) {
                                    val = _this.dataList[index];
                                }
                            })
                            if (_this.config.ispercent) {
                                return params[0].name + '：' + val + '<br />占比：' + params[0].value + "%"
                            } else {
                                return parseInt(params[0].value)
                            }
                        }
                    },
                    grid: {
                        top: '8%',
                        left: '11%',
                        right: '5%',
                        bottom: '2%',
                        containLabel: true,
                    },
                    legend: {
                        show: false,
                        itemGap: 50,
                        data: ['注册总量', '最新注册量'],
                        textStyle: {
                            color: '#f9f9f9',
                            borderColor: '#fff'
                        },
                    },
                    xAxis: [{
                        type: 'category',
                        boundaryGap: true,
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
                            lineStyle: {
                                color: "#a0c0ff",
                            }
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "rgba(0, 222, 215, 0.2)",
                                width: 1,
                                type: "solid"
                            },
                        },
                        axisLabel: {
                            show: true,
                            rotate: 35,
                            textStyle: {
                                color: "#eee",
                                fontSize: 12
                            },
                            formatter: (value) => {
                                if (value.length > 10) {
                                    let val = value.substring(0, 10) + ".";
                                    return val;
                                } else {
                                    return value;
                                }
                                // return value.split("").join("\n");
                            }
                        },
                        data: data.name,
                    }],
                    yAxis: [{
                        type: 'value',
                        axisLabel: {
                            formatter: '{value}',
                            color: "#fff",
                            fontSize: 12
                        },
                        axisTick: {
                            show: true,
                            lineStyle: {
                                color: "#a0c0ff",
                            }
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "rgba(0, 222, 215, 0.2)",
                                width: 1,
                                type: "solid"
                            },
                        },
                        splitLine: {
                            show: false
                        }
                    }],
                    series: [{
                        name: '注册总量',
                        type: 'line',
                        // smooth: true, //是否平滑曲线显示
                        // 			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
                        showAllSymbol: true,
                        symbol: 'emptyCircle',
                        symbolSize: 6,
                        lineStyle: {
                            normal: {
                                color: "#28ffb3", // 线条颜色
                            },
                            borderColor: '#f0f'
                        },
                        label: {
                            show: true,
                            position: 'top',
                            textStyle: {
                                color: '#fff',
                            },
                            formatter: (p) => {
                                if (this.config.ispercent) {
                                    return p.value > 0 ? (p.value) + '%' : '';
                                }
                                return p.value > 0 ? (p.value) : '';
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: "#28ffb3",

                            }
                        },
                        // tooltip: {
                        //     show: false
                        // },
                        areaStyle: { //区域填充样式
                            normal: {
                                //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(0,154,120,1)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(0,0,0, 0)'
                                }], false),
                                shadowColor: 'rgba(53,142,215, 0.9)', //阴影颜色
                                shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                            }
                        },
                        data: data.value
                    }]
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