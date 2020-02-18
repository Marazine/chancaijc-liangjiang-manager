<template>
  <div class="bh-100">
    <div class="chart-wrap" id="overseas"></div>
  </div>
</template>

<script>
    import 'echarts-liquidfill/src/liquidFill.js'
    export default {
        data() {
            return {
                myChart: null
            }
        },
        props: ["initData", "config"],
        mounted() {

            // let value1 = this.initData.value[2];
            // let sum = this.reduce(this.initData.value);
            // console.log(value1, sum);
            this.overseasChat(this.initData);
        },
        beforeDestroy() {
            // this.myChart.dispose();
        },
        components: {},

        methods: {
            reduce(arr) {
                let arrs = arr.reduce((prev, next, idx, arr) => {
                    return prev + next;
                })
                return arrs;
            },
            overseasChat(data) {
                this.myChart = this.$echarts.init(document.getElementById("overseas"));
                // let value = (this.dashboardData.split('%')[0] - 0) / 100;
                let value = 0.2;
                var value1 = 41976;
                // var value = 0.1253;
                var data = [value, value, value, value, value];
                var option = {
                    backgroundColor: 'transparent',


                    series: [{
                        type: 'liquidFill',
                        radius: '70%',
                        center: ['50%', '50%'],
                        data: data,
                        backgroundStyle: {
                            borderWidth: 5,
                            borderColor: '#1daaeb',
                            color: 'rgba(6,9,16,0.8)'
                        },
                        label: {
                            normal: {
                                formatter: value1 + "\n\n" + (value * 100).toFixed(2) + '%',
                                textStyle: {
                                    fontSize: 20
                                }
                            }
                        }
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