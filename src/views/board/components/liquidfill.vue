<template>
  <div class="bh-100">
    <div class="chart-wrap" ref="external"></div>
  </div>
</template>

<script>
    import 'echarts-liquidfill/src/liquidFill.js'
    export default {
        data() {
            return {
                myChart: null,

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
                // console.log(this.initData);
                this.getChart("external", this.initData);

            },
            getChart(id, data) {
                this.myChart = this.$echarts.init(this.$refs.external);
                // console.log(data);
                var num1 = data.inValue; //愿意
                var num2 = data.outValue; //不愿意
                // var value = (num1 / (num1 + num2)).toFixed(2) || 20;
                var value = 0.2;
                let dataObj = []
                dataObj.push(value)
                dataObj.push(value)
                let option = {
                    backgroundColor: 'transparent',
                    title: {
                        // text: 'CPU使用率',
                        textStyle: {
                            fontWeight: 'normal',
                            fontSize: 16,
                            color: 'rgb(97, 142, 205)'
                        }
                    },
                    tooltip: {
                        show: true,
                        formatter: function(params) {
                            return (
                                "比例" + "<br />" + (value * 100).toFixed(2) + "%"
                            )
                        }
                    },
                    series: [{
                        type: 'liquidFill',
                        radius: '80%',
                        center: ['50%', '50%'],
                        data: dataObj,
                        backgroundStyle: {
                            borderWidth: 3,
                            borderColor: '#00F2F1',
                            color: 'rgb(255,0,255,0.01)'
                        },
                        label: {
                            normal: {
                                formatter: function(params) {
                                    return (
                                        "流出" + num2 + "\n\n\n\n\n" + "流入" + num1
                                    )
                                },
                                textStyle: {
                                    fontSize: 15,
                                    color: '#00F2F1'
                                }
                            }
                        }
                    }]
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