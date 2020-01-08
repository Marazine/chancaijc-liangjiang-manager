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
                this.myChart = this.$echarts.init(this.$refs.estate);
                // var xData = function() {
                //     var datas = [];
                //     for (var i = 1; i < 13; i++) {
                //         datas.push(i + "月份");
                //     }
                //     return datas;
                // }();
                var _this = this;
                let option = {
                    backgroundColor: "transparent",
                    "title": {
                        show: false,
                        "text": "本年商场顾客男女人数统计",
                        "subtext": "BY Wang Dingding",
                        x: "4%",

                        textStyle: {
                            color: '#fff',
                            fontSize: '22'
                        },
                        subtextStyle: {
                            color: '#90979c',
                            fontSize: '16',

                        },
                    },
                    "tooltip": {
                        "trigger": "axis",
                        "axisPointer": {
                            "type": "shadow",
                            textStyle: {
                                color: "#fff"
                            }
                        },
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
                    "grid": {
                        "borderWidth": 0,
                        "top": 40,
                        left: '12%',
                        "bottom": 75,
                        textStyle: {
                            color: "#fff"
                        }
                    },

                    "calculable": true,
                    "xAxis": [{
                        "type": "category",
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
                            }
                        },
                        "data": data.name,
                    }],
                    "yAxis": [{
                        "type": "value",
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
                    "dataZoom": [{
                        "show": true,
                        "height": 10,
                        "xAxisIndex": [
                            0
                        ],
                        bottom: 10,
                        "start": 0,
                        "end": 40,
                        handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
                        handleSize: '110%',
                        handleStyle: {
                            color: "#d3dee5",

                        },
                        textStyle: {
                            color: "#fff"
                        },
                        borderColor: "#90979c"


                    }, {
                        "type": "inside",
                        "show": true,
                        "height": 15,
                        "start": 1,
                        "end": 35
                    }],
                    "series": [

                        {
                            "name": "男",
                            "type": "bar",
                            "stack": "总量",
                            // barWidth: 18,
                            barGap: 13,
                            barCategoryGap: '40%',
                            "itemStyle": {
                                "normal": {
                                    "color": "rgba(0,191,183,1)",
                                    "barBorderRadius": 0,
                                    "label": {
                                        "show": true,
                                        color: '#fff',
                                        fontSize: 12,
                                        "position": "top",
                                        formatter: (p) => {
                                            if (this.config.ispercent) {
                                                return p.value > 0 ? (p.value) + '%' : '';
                                            }
                                            return p.value > 0 ? (p.value) : '';
                                        }
                                    }
                                }
                            },
                            "data": data.value
                        }
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