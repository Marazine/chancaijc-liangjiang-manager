<template>
  <el-dialog class="my-dialog-class" :visible.sync="dialogVisible" width="30%" :modal-append-to-body="false"
    :before-close="handleClose" custom-class="model-class">
    <template slot="title">
      <div class="dialogTitle">
        <img src="~@/assets/img/arrow.png" alt="">
        <span class="titleBox">{{checkData.data.name}}-{{configTip.title}}</span>
      </div>
    </template>
<div class="modelBox">
    <div id="mapcontents" ref="contents" :style="{height:height}"></div>
</div>
</el-dialog>
</template>

<script>
    export default {
        data() {
            return {
                dialogVisible: false,
                myChart: null
            };
        },
        props: ['show', 'children', 'height', 'checkData', 'configTip'],
        created() {
            this.dialogVisible = this.show;
        },
        mounted() {
            this.$nextTick(() => {
                this.initEcharts('mapcontents', this.children);
            })
        },
        beforeDestroy() {
            this.myChart.dispose()
        },
        methods: {
            initEcharts(id, data) {
                this.myChart = this.$echarts.init(document.getElementById('mapcontents'));
                let echarts = this.$echarts;
                let yData;
                if (this.configTip.yData) {
                    yData = data.name.map((item) => {
                        if (item == '10000~999999999') {
                            return '10000以上';
                        } else {
                            return item + '人';
                        }
                    })
                } else {
                    yData = data.name;
                }

                let option = {
                    backgroundColor: 'transparent',
                    color: [new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                            offset: 0,
                            color: "#09daf4"
                        }, {
                            offset: 1,
                            color: "#09daf4"
                        }], false),
                        new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                            offset: 0,
                            color: "#09daf4"
                        }, {
                            offset: 1,
                            color: "#09daf4"
                        }], false)
                    ],
                    grid: {
                        left: '0',
                        right: '20%',
                        top: '0%',
                        bottom: '0%',
                        containLabel: true
                    },
                    tooltip: {
                        show: "true",
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    yAxis: [{
                        data: yData,
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: true,
                            color: "#fff",
                            fontSize: 12,
                            formatter: function(value) {
                                //                              if (value.length > 4) {
                                //                                  return value.substring(0, 4) + "..";
                                //                              } else {
                                //                                  return value;
                                //                              }
                                return value;
                            }
                        },

                    }],
                    xAxis: {
                        show: false

                    },
                    tooltip: {
                        show: false
                    },
                    series: [{
                        //                      name: '国内高层次人才',
                        type: 'bar',
                        stack: '数量',
                        barWidth: 16,
                        label: {
                            normal: {
                                show: true,
                                position: "right",
                                textStyle: {
                                    color: "#ffffff",
                                    fontSize: 12
                                },
                                formatter: (params) => {
                                    if (Number(params.value) == 0) {
                                        if (this.configTip.percentage) {
                                            return `${params.value} (0%)`
                                        } else {
                                            return `${params.value}`
                                        }
                                    } else {
                                        if (this.configTip.percentage) {
                                            return `${params.value} (${parseInt(100 / this.checkData.data.total) * params.value}%)`;
                                        } else {
                                            return `${params.value}`;
                                        }
                                    }
                                    // return parseInt(this.checkData.data.total * params.value/100) + " (" + params.value +'%)'
                                }
                            },
                        },
                        data: data["value"]
                    }]
                };
                this.myChart.setOption(option);
            },
            handleClose(done) {
                this.dialogVisible = false
                this.$nextTick(() => {
                    this.$emit('close');
                })
            }
        }
    }
</script>

<style lang='scss' scoped>
    /deep/ .my-dialog-class {
        /deep/ .model-class {
            z-index: 5000;
            background: rgba(21, 53, 104, 0.7);
            border: 1px solid rgba(16, 200, 227, 0.7);
            width: 540px !important;
            ;
        }
        /deep/ .model-class .el-dialog__body {
            padding: 10px 27px;
            /*padding-top: 10px;*/
        }
        /deep/ .model-class .el-icon-close {
            color: #909399;
            &:hover {
                color: #ffffff;
            }
        }
        /deep/ .modelBox {
            position: relative;
            padding-top: 20px;
        }
        /deep/ .modelBox p {
            color: #fff;
        }
        /deep/ #content {
            height: 300px;
        }
        /deep/ .dialogTitle {
            color: #00f2f1;
            font-size: 16px;
            width: 90%;
            line-height: 35px;
            display: inline-block;
            position: absolute;
            top: 4%;
            left: 0;
            font-weight: 700;
            padding: 0 5%;
        }
        /deep/ .dialogTitle img {
            width: 18px;
            margin-right: 5px;
            vertical-align: baseline;
        }
    }
</style>