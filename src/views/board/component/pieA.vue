<template>
    <div class="h-100">
        <div class="chartnew-wrap"
            ref="estate"></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                myChart: null,
                b_age_aboard: {
                    name: ['工商管理', '金融学', '英语', '会计学', '经济学'],
                    value: [1419, 1326, 1412, 1110, 1013]
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
                // console.log(data);
                let xData = data.name;
                let y1Data = data.value;
                let ydata = [];
                data.name.forEach((item, index) => {
                    let val = {
                        name: data.name[index],
                        value: data.value[index]
                    }
                    ydata.push(val);
                })
                var color = ["#AEE68F", "#00A2FF", "#00EBFF", '#E5CE10', "#7FE7C9", "#7FE7C9", "#fca4bb", "#24C768", "#fdb301", "#57e7ec", "#cf9ef1"]


                let option = {
                    backgroundColor: "transparent",
                    color: color,
                    tooltip: {
                        show: true,
                        trigger: 'item',
                        formatter: function(params) {
                            return params.name + "<br/>" + params.marker + params.value
                        }
                    },
                    legend: {
                        show: false,
                        orient: "horizontal",
                        left: "center",
                        bottom: "7%",
                        data: xData,
                        itemWidth: 8,
                        itemHeight: 5,
                        itemGap: 14,
                        textStyle: {
                            color: "#fff"
                        },
                        /*formatter:function(name){
                        var oa = option.series[0].data;
                        var num = oa[0].value + oa[1].value + oa[2].value + oa[3].value+oa[4].value + oa[5].value + oa[6].value + oa[7].value+oa[8].value + oa[9].value ;
                        for(var i = 0; i < option.series[0].data.length; i++){
                            if(name==oa[i].name){
                                return ' '+name + '    |    ' + oa[i].value + '    |    ' + (oa[i].value/num * 100).toFixed(2) + '%';
                            }
                        }
                        }*/

                        formatter: function(name) {
                            return '' + name
                        }
                    },

                    series: [{
                        type: 'pie',
                        clockwise: false, //饼图的扇区是否是顺时针排布
                        minAngle: 2, //最小的扇区角度（0 ~ 360）
                        radius: this.config.radius ? this.config.radius : ["35%", "65%"],
                        center: this.config.center ? this.config.center : ["50%", "50%"],
                        avoidLabelOverlap: false,
                        itemStyle: { //图形样式
                            normal: {
                                borderColor: '#ffffff',
                                borderWidth: 0,
                            },
                        },
                        label: {
                            normal: {
                                show: true,
                                // position: 'center',
                                formatter: '{text|{b}}\n{d}%',
                                rich: {
                                    text: {
                                        color: "#fff",
                                        fontSize: 12,
                                        align: 'center',
                                        verticalAlign: 'middle',
                                        padding: 8
                                    },
                                    value: {
                                        color: "#8693F3",
                                        fontSize: 14,
                                        align: 'center',
                                        verticalAlign: 'middle',
                                    },
                                }
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: 14,
                                }
                            }
                        },
                        data: appendBaseSelected(ydata)
                    }]
                };
                this.myChart.setOption(option);

                function appendBaseSelected(dataList) {
                    const temp = [];
                    for (let i in dataList) {
                        const tempObj = {
                            ...dataList[i],
                            selected: false
                        };
                        temp.push(tempObj)
                    }
                    return temp;
                }
                // 初始化
                option.series[0].data[0]['selected'] = true;
                this.myChart.dispatchAction({
                    type: 'showTip',
                    seriesIndex: 0,
                    dataIndex: 0
                });
                if (ydata.length > 2) {
                    let idx = 1;
                    setInterval(() => {
                        clearSelectedStatus();
                        option.series[0].data[idx]['selected'] = true;
                        this.myChart.setOption(option);

                        this.myChart.dispatchAction({
                            type: 'showTip',
                            seriesIndex: 0,
                            dataIndex: idx
                        });
                        idx++;

                        if (idx >= ydata.length) {
                            idx = 0;
                        }
                    }, 3000)
                    let myChart = this.myChart;

                    function clearSelectedStatus() {
                        option.series[0].data = appendBaseSelected(ydata);
                        myChart.setOption(option);
                    }
                }


                window.addEventListener("resize", () => {
                    if (this.myChart) {
                        this.myChart.resize();
                    }
                });
            },
        }
    }
</script>

<style scoped>

</style>