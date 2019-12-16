<template>
    <div class="back-img bh-50">
        <div class="title" :style="{left:config.left?config.left:''}">
            <img src="../../../assets/img/arrow.png" alt="">
            {{config&&config.title?config.title:'标题'}}
        </div>
        <div class="s-content" ref="estate" :style="{paddingTop:config.paddingTop?config.paddingTop:''}"></div>
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
                if (this.initData.name) {
                    // debugger
                    this.estateChart("estate", this.initData);
                } else {
                    this.estateChart("estate", this.b_age_aboard);
                }

            },
            estateChart(id, data) {
                // debugger
                this.myChart = this.$echarts.init(this.$refs.estate);

                let dataList = [];
                let shadowColor = [
                    "rgb(27, 94, 93)",
                    "rgb(206, 188, 11)",
                    "rgb(165, 190, 198)",
                    "rgb(98, 41, 72)",
                    "rgb(175, 20, 143)",
                    "rgb(77, 231, 55)",
                    "rgb(26, 83, 246)",
                    "#00BFFF",
                    "#FF4500",
                    "#FFD700",
                    "rgb(26, 83, 246)",
                    "rgb(98, 224, 224)",
                    "rgb(165, 190, 198)",

                    "rgb(26, 83, 246)",
                    "rgb(26, 83, 246)",
                    "rgb(26, 83, 246)",
                    "rgb(26, 83, 246)",
                ];
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

                    "rgba(252, 162, 50 , 0.8)",
                    "rgba(252, 162, 50 , 0.8)",
                    "rgba(252, 162, 50 , 0.8)",
                    "rgba(252, 162, 50 , 0.8)",
                ];

                for(let i = 0; i < data.name.length; i++) {
                   dataList.push({
                        name: data.name[i],
                        // value: data.value[i],
                        value: 10,
                        symbolSize: 60,
                        draggable: true,
                        itemStyle: {
                            normal: {
                                borderWidth: 1,
                                shadowBlur: 50,
                                shadowColor: shadowColor[i],
                                color: color[i],
                            }
                        },
                   }) 
                }
                console.log(dataList);
                
                
                let option = {
                    backgroundColor: 'transparent',
                    // tooltip: {},
                    animationDurationUpdate: function(idx) {
                        // 越往后的数据延迟越大
                        return idx * 1500;
                    },
                    animationEasingUpdate: 'bounceIn',
                    color: ['#fff', '#fff', '#fff'],
                    series: [{
                        type: 'graph',
                        layout: 'force',
                        force: {
                            repulsion: 60,
                            edgeLength: 10
                        },
                        // roam: true,
                        label: {
                            normal: {
                                show: true
                            }
                        },
                        data: dataList
                    }]
                }
                console.log(option);
                
                this.myChart.setOption(option);

                window.addEventListener("resize", () => {
                    this.myChart.resize();
                });
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>