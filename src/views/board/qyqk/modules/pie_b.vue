<template>
  <div class="back-img bh-50">
    <div class="title">
      <img src="../../../../assets/img/arrow.png" alt="">
      {{config.title}}
    </div>
    <div class="my-click-button" @click="isShowEchart(false)">在岗人才数量</div>
    <div class="my-click-button2" @click="isShowEchart(true)">近一年需求量</div>
    <div class="s-content" id="pie_a" ref="pie_a" :style="{paddingTop:config.paddingTop?config.paddingTop:''}"></div>
    <!-- <div v-show="isShow" class="s-content" id="pie_b" ref="pie_b" style="width: 100%; height: 100%;" :style="{paddingTop:config.paddingTop?config.paddingTop:''}"></div> -->
  </div>
</template>

<script>
    export default {
        data() {
            return {
                myChart:null,
                data: {
                    name: ['五保', '低保', '残疾', '失独', '重点优抚', '突出贡献'],
                    value: ['10', '20', '30', '15', '15', '10']
                },
                isShow: false,
                option: {},
            }
        },
        props: ["initData", "initData2", "config"],
        mounted() {
            this.init();
        },
        beforeDestroy() {
            this.myChart.dispose();
        },
        components: {},
        methods: {
            init() {
                if (this.initData && this.initData2) {
                    this.$nextTick(() => {

                        this.pie_aChart("pie_a", this.initData, this.config);
                    })
                    // this.pie_bChart("pie_b", this.initData2, this.config);
                } else {
                    this.$nextTick(() => {
                        this.pie_aChart("pie_a", this.data, this.config);
                    })
                    // this.pie_bChart("pie_b", this.data, this.config);
                }
            },
            isShowEchart(type) {
                this.isShow = type;
                console.log(123);
                if(type) {
                    this.pie_bChart("pie_a", this.initData2, this.config);
                } else {
                    this.pie_aChart("pie_a", this.initData, this.config);
                }
                
            },
            pie_aChart(id, data_chart, config_chart) {
                this.myChart = this.$echarts.init(this.$refs.pie_a);

                let chartName = data_chart.name;
                let chartData = data_chart.value;
                let data = []
                let legendName = []
                for (let i = 0; i < chartData.length; i++) {
                    let c = {
                        value: chartData[i],
                        name: chartName[i]
                    }
                    data[i] = c;
                    legendName[i] = chartName[i];
                }
                let option = {
                    backgroundColor: 'transparent',
                    tooltip: {
                        trigger: 'item',
                        formatter: "{b} : {d}% <br/> {c}"
                    },
                    grid: {
                        top: "-20px",
                        // containLabel: true
                    },
                    series: [{
                        type: 'pie',
                        radius: ['47%', '65%'],
                        center: ['50%', '50%'],
                        color: ['#0E7CE2', '#FF8352', '#E271DE', '#F8456B', '#00FFFF', '#4AEAB0', "#EAEA26", "#906BF9", "#FE5656", "#01E17E", "#3DD1F9", "#FFAD05", 'rgb(254,67,101)','rgb(252,157,154)','rgb(249,205,173)','rgb(200,200,169)','rgb(131,175,155)'],
                        data: data,
                        labelLine: {
                            normal: {
                                show: false,
                                length: 20,
                                length2: 20,
                                lineStyle: {
                                    color: '#12EABE',
                                    width: 2
                                }
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                formatter: '{b}',
                                fontFamily: 'Microsoft YaHei',
                                rich: {
                                    b: {
                                        fontSize: 20,
                                        color: '#12EABE',
                                        align: 'left',
                                        padding: 4
                                    },
                                    d: {
                                        fontSize: 20,
                                        color: '#12EABE',
                                        align: 'left',
                                        padding: 4
                                    },
                                    c: {
                                        fontSize: 20,
                                        color: '#12EABE',
                                        align: 'left',
                                        padding: 4
                                    }
                                }
                            }
                        }
                    }]
                };
                this.option = option
                this.myChart.setOption(option);
                window.addEventListener("resize", ()=> {
                    if(this.myChart) {
                        this.myChart.resize();
                    }
                });
            },
            pie_bChart(id, data_chart, config_chart) {
                this.myChart2 = this.$echarts.init(this.$refs.pie_b);

                let chartName = data_chart.name;
                let chartData = data_chart.value;
                let data = []
                let legendName = []
                for (let i = 0; i < chartData.length; i++) {
                    let c = {
                        value: chartData[i],
                        name: chartName[i]
                    }
                    data[i] = c;
                    legendName[i] = chartName[i];
                }
                let option = {
                    backgroundColor: 'transparent',
                    tooltip: {
                        trigger: 'item',
                        formatter: "{b} : {d}% <br/> {c}"
                    },
                    grid: {
                        top: "-20px",
                        // containLabel: true
                    },
                    series: [{
                        type: 'pie',
                        radius: ['47%', '65%'],
                        center: ['50%', '50%'],
                        color: ['#0E7CE2', '#FF8352', '#E271DE', '#F8456B', '#00FFFF', '#4AEAB0', "#EAEA26", "#906BF9", "#FE5656", "#01E17E", "#3DD1F9", "#FFAD05", 'rgb(254,67,101)','rgb(252,157,154)','rgb(249,205,173)','rgb(200,200,169)','rgb(131,175,155)'],
                        data: data,
                        labelLine: {
                            normal: {
                                show: false,
                                length: 20,
                                length2: 20,
                                lineStyle: {
                                    color: '#12EABE',
                                    width: 2
                                }
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                formatter: '{b}',
                                fontFamily: 'Microsoft YaHei',
                                rich: {
                                    b: {
                                        fontSize: 20,
                                        color: '#12EABE',
                                        align: 'left',
                                        padding: 4
                                    },
                                    d: {
                                        fontSize: 20,
                                        color: '#12EABE',
                                        align: 'left',
                                        padding: 4
                                    },
                                    c: {
                                        fontSize: 20,
                                        color: '#12EABE',
                                        align: 'left',
                                        padding: 4
                                    }
                                }
                            }
                        }
                    }]
                };
                this.option2 = option
                this.myChart2.setOption(option);
                window.addEventListener("resize", ()=> {
                    if(this.myChart) {
                        this.myChart2.resize();
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
.my-click-button {
    position: absolute;
    right: 0;
    top: 50%;
    color: #fff;
    z-index: 9999;
}
.my-click-button2 {
    position: absolute;
    right: 0;
    top: 60%;
    color: #fff;
    z-index: 9999;
}
</style>