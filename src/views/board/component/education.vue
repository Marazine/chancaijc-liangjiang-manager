<template>
  <div class="back-img bh-50">
    <div class="title">
        <!-- <img src="../../../../assets/img/arrow.png" alt=""> -->
        在外游子学历分布
    </div>
    <div class="s-content" id="education"></div>
  </div>
</template>

<script>
    // import 'echarts/theme/dark.js'
    export default {
        data() {
            return {
                myChart: null,
                a_edu_distribution: [{
                    value: 63041,
                    name: '中国政府奖学金生'
                }, {
                    value: 429144,
                    name: '自费生'
                }],
            }
        },
        props: ["educationData"],
        mounted() {
            if (this.educationData && this.educationData.length) {
                this.eduChart("education", this.educationData);
            } else {
                this.eduChart("education", this.a_edu_distribution);
            }
        },
        beforeDestroy() {
            this.myChart.dispose();
        },
        components: {},
        methods: {
            eduChart(id, data) {
                this.myChart = this.$echarts.init(document.getElementById(id), "dark");
                let option = {

                    color: ['#f59a8f', '#57e7ec', '#1E9BD1', '#ffba00', '#00ff7f', '#fff94a', '#009D85',
                        "#ffb6c1", "#f87be2", "#6efb17"
                    ],
                    backgroundColor: 'transparent',

                    grid: {
                        bottom: 150,
                        left: 100,
                        right: '10%'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: function(parms) {
                            let str =
                                parms.marker + "" + parms.data.name + "</br>" +
                                "数量：" + parms.data.value + "</br>" +
                                "占比：" + parms.percent + "%";
                            return str;
                        }
                    },
                    series: [
                        // 主要展示层的
                        {
                            radius: ['40%', '65%'],
                            center: ['50%', '50%'],
                            type: 'pie',
                            label: {
                                normal: {
                                    show: true,
                                    formatter: "{b}",
                                    textStyle: {
                                        fontSize: 12,

                                    },
                                    position: 'outside'
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: true,
                                    length: 20,
                                    length2: 10
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            // name: "民警训练总量",
                            data: data,

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

<style scoped>

</style>