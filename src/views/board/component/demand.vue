<template>
  <div class="bh-40 back-img-l" style="border:0">
      <div class="title-l">
          <!-- <img src="../../../../assets/img/arrow.png" alt=""> -->
          在外游子职业发展热词分布
        </div>
      <div class="s-content pd-0" ref="demand" id="demand"></div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                myChart:null
            }
        },
        computed: {

        },
        mounted() {
            this.demandChart("demand");
        },
        activated() {

        },
        beforeDestroy() {
            this.myChart.dispose();
        },
        components: {},
        props: ['demandData'],
        methods: {
            demandChart(id) {
                let strong = this.demandData.one;
                let middle = this.demandData.two;
                let low = this.demandData.three;
                let strong_arr = [];
                for (let i in strong) {
                    let randomX = Math.random() > 0.5 ? Math.random() * 30 : Math.random() * -30;
                    let randomY = null
                    if (Math.abs(randomX) < 15) {
                        randomY = Math.random() > 0.5 ? (15 + Math.random() * 20) : (-15 + Math.random() * -20);
                    } else {
                        randomY = Math.random() > 0.5 ? (Math.random() * 35) : (Math.random() * -35);
                    }
                    let child = ["#FCB03d", 10];
                    child.unshift(strong[i].name);
                    child.unshift(parseInt(randomY));
                    child.unshift(parseInt(randomX));
                    strong_arr.push(child);
                }
                let middle_arr = [];
                for (let i in middle) {
                    let randomY = null;
                    let randomX = Math.random() > 0.5 ? Math.random() * 45 : Math.random() * -45;
                    if (Math.abs(randomX) < 30) {
                        randomY = Math.random() > 0.5 ? (30 + Math.random() * 20) : (-30 + Math.random() * -20);
                    } else {
                        randomY = Math.random() > 0.5 ? (Math.random() * 50) : (Math.random() * -50);
                    }
                    let child = ["#FCB03d", 10];
                    child.unshift(middle[i].name);
                    child.unshift(parseInt(randomY));
                    child.unshift(parseInt(randomX));
                    middle_arr.push(child);
                }
                let low_arr = [];
                for (let i in low) {
                    let randomX = Math.random() > 0.5 ? Math.random() * 60 : Math.random() * -60;
                    let randomY = null;
                    if (Math.abs(randomX) < 45) {
                        randomY = Math.random() > 0.5 ? (50 + Math.random() * 15) : (-50 + Math.random() * -15);
                    } else {
                        randomY = Math.random() > 0.5 ? (Math.random() * 65) : (Math.random() * -65);
                    }
                    let child = ["#000000", 10];
                    child.unshift(low[i].name);
                    child.unshift(parseInt(randomY));
                    child.unshift(parseInt(randomX));
                    low_arr.push(child);
                }
                this.myChart = this.$echarts.init(this.$refs.demand);

                let laber = ["弱", '中', '强', " ", '强', '中', '弱'];
                let option = {
                    // backgroundColor: 'rgba(200,200,200,0.5)',
                    "xAxis": [{
                        zlevel: 20,
                        type: 'value',
                        min: -60,
                        max: 60,
                        interval: 20,
                        axisLabel: {
                            margin: 35,
                            formatter: function(value, index) {
                                return laber[index]
                            },
                            lineStyle: {
                                color: '#fff'
                            },
                            color: '#ddd',
                        },
                        splitLine: {
                            show: false,
                        },
                        axisLine: {
                            // show:false,
                            lineStyle: {
                                color: '#fdb301'
                            }
                        },
                        splitArea: {
                            show: false,
                        },
                    }],
                    "yAxis": [{
                        type: "value",
                        "min": -50,
                        "max": 50,
                        "show": false,
                        "splitLine": {
                            "show": false
                        },
                        interval: 20,
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: '#fdb301'
                            }
                        },
                        "splitArea": {
                            "show": false
                        }
                    }],
                    "legend": {
                        "show": false,
                        "data": low
                    },
                    "tooltip": {
                        "showContent": false,
                        formatter: function(params) {}
                    },
                    "sendDataSetting": {
                        "selectParams": false,
                        "selectCell": false
                    },
                    "visualMap": [{
                        "show": false,
                        "dimension": 2,
                        "min": 1,
                        "max": 3,
                        "precision": 0.01,
                        // "inRange": {
                        // "symbolSize": [10, 50]
                        // }
                    }],
                    "series": [{
                        zlevel: 5,
                        type: 'scatter',
                        symbol: 'circle',
                        symbolSize: 100,
                        "tooltip": {
                            "showContent": true,
                            formatter: function(params) {
                                return params.data[2];
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                formatter: function(param) {
                                    return param.data[2];
                                },
                            },
                        },
                        itemStyle: {
                            normal: {
                                color: '#4f8fcf',
                            },
                        },
                        data: [
                            [0, 0, '意向职位', '#278DFB', 10]
                        ],
                    }, {
                        zlevel: 30,
                        name: '弱',
                        type: 'scatter',
                        symbol: 'circle',
                        "tooltip": {
                            "showContent": true,
                            formatter: function(params) {
                                return params.data[2];
                            }
                        },
                        symbolSize: function(param, a) {
                            return param[4];
                        },
                        itemStyle: {
                            normal: {
                                color: "#e75fc3"
                            },
                        },
                        label: {
                            color: '#fff',
                            normal: {
                                textStyle: {
                                    fontSize: 10,
                                    color: "#e75fc3",
                                    fontFamily: "微软雅黑"
                                },
                                position: 'bottom',
                                show: true,
                                formatter: function(param) {
                                    return param.data[2];
                                },
                            },
                        },

                        "data": low_arr,
                        "markLine": {}
                    }, {
                        zlevel: 20,
                        name: '中',
                        type: 'scatter',
                        symbol: 'circle',
                        "tooltip": {
                            "showContent": true,
                            formatter: function(params) {
                                return params.data[2];
                            }
                        },
                        symbolSize: function(param, a) {
                            return param[4];
                        },
                        itemStyle: {
                            normal: {
                                color: "#fdb301"
                            },
                        },
                        label: {
                            color: '#fff',
                            normal: {
                                textStyle: {
                                    fontSize: 9,
                                    color: "#fdb301",
                                    fontFamily: "微软雅黑"
                                },
                                position: 'bottom',
                                show: true,
                                formatter: function(param) {
                                    return param.data[2];
                                },
                            },
                        },

                        "data": middle_arr
                    }, {
                        "name": "强",
                        "zlevel": 10,
                        "type": "scatter",
                        "symbol": "circle",

                        "tooltip": {
                            // trigger: "item",
                            "showContent": true,
                            axisPointer: {
                                show: true
                            },
                            alwaysShowContent: false,
                            formatter: function(params) {
                                return params.data[2];
                            }
                        },
                        "itemStyle": {
                            "normal": {
                                color: "#3fc"
                            }
                        },
                        label: {
                            color: "#000",
                            normal: {
                                textStyle: {
                                    fontSize: 10,
                                    color: "#3fc",
                                    fontFamily: "微软雅黑"
                                },
                                position: 'bottom',
                                show: true,
                                formatter: function(param) {
                                    return param.data[2];
                                },
                            }
                        },
                        data: strong_arr,

                    }, {
                        "type": "pie",
                        "radius": ["0", "73%"],
                        "center": ["50%", "50%"],
                        "zlevel": 3,
                        "avoidLabelOverlap": false,
                        "label": {
                            "normal": {
                                "show": false,
                                "position": "center"
                            },
                            "emphasis": {
                                "show": false,
                                "textStyle": {
                                    "fontWeight": "bold"
                                }
                            }
                        },
                        "itemStyle": {
                            "normal": {
                                "color": {
                                    "type": "linear",
                                    "x": 0,
                                    "y": 0,
                                    "x2": 0,
                                    "y2": 1,
                                    "colorStops": [{
                                        "offset": 0.05,
                                        "color": "rgba(130,198,255, 0.1)"
                                    }, {
                                        "offset": 0.5,
                                        "color": "rgba(130,198,255, 0.2)"
                                    }, {
                                        "offset": 0.95,
                                        "color": "rgba(130,198,255, 0.1)"
                                    }]
                                }
                            }
                        },
                        "labelLine": {
                            "normal": {
                                "show": false
                            }
                        },
                        "data": [{
                            "value": 3357
                        }]
                    }, {
                        "type": "pie",
                        "radius": ["0%", "145%"],
                        "center": ["50%", "50%"],
                        "zlevel": 2,
                        "avoidLabelOverlap": false,
                        "label": {
                            "normal": {
                                "show": false,
                                "position": "center"
                            },
                            "emphasis": {
                                "show": false,
                                "textStyle": {
                                    "fontWeight": "bold"
                                }
                            }
                        },
                        "itemStyle": {
                            "normal": {
                                "color": {
                                    "type": "linear",
                                    "x": 0,
                                    "y": 0,
                                    "x2": 0,
                                    "y2": 1,
                                    "colorStops": [{
                                        "offset": 0.1,
                                        "color": "rgba(130,198,255, 0)"
                                    }, {
                                        "offset": 0.5,
                                        "color": "rgba(130,198,255, 0.2)"
                                    }, {
                                        "offset": 0.9,
                                        "color": "rgba(87,231,236, 0.3)"
                                    }]
                                }
                            }
                        },
                        "labelLine": {
                            "normal": {
                                "show": false
                            }
                        },
                        "data": [{
                            "value": 3235
                        }]
                    }, {
                        "type": "pie",
                        "radius": ["0%", "217%"],
                        "center": ["50%", "50%"],
                        "zlevel": 1,
                        "avoidLabelOverlap": false,
                        "label": {
                            "normal": {
                                "show": false,
                                "position": "center"
                            },
                            "emphasis": {
                                "show": false,
                                "textStyle": {
                                    "fontWeight": "bold"
                                }
                            }
                        },
                        "itemStyle": {
                            "normal": {
                                "color": {
                                    "type": "linear",
                                    "x": 0,
                                    "y": 0,
                                    "x2": 0,
                                    "y2": 1,
                                    "colorStops": [{
                                        "offset": 0.2,
                                        "color": "rgba(130,198,255, 0.0)"
                                    }, {
                                        "offset": 0.5,
                                        "color": "rgba(130,198,255, 0.2)"
                                    }, {
                                        "offset": 0.88,
                                        "color": "rgba(130,198,255, 0.0)"
                                    }]
                                }
                            }
                        },
                        "labelLine": {
                            color: "#fff",
                            "normal": {
                                "show": false
                            }
                        },
                        "data": [{
                            "value": 3235
                        }]
                    }],


                };
                this.myChart.setOption(option);
                window.addEventListener("resize", ()=> {
                    if(this.myChart) {
                        this.myChart.resize();
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .back-img-l {
        // background: url(../../../../assets/img/kuang.png) no-repeat;
        background-size: 100% 100%;
        position: relative;
        .title-l {
            color: #00F2F1;
            font-size: 16px;
            height: 10%;
            line-height: 35px;
            display: inline-block;
            position: absolute;
            top: 4%;
            left: 3.5%;
            font-weight: bold;
            img {
                width: 18px;
                margin-right: 5px;
                vertical-align: baseline;
            }
        }
    }
</style>