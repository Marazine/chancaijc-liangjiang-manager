<template>
  <div class="bh-100 my-position">
    <div class="chart-wrap map" ref="spreadMap">
    </div>
    <map-dialog v-if="showDialog" :show='true' :configTip="configTip" :checkData='checkData' :children='children'
      :height='height' @close='closeDialog()'></map-dialog>
  </div>
</template>

<script>
    // import "echarts-gl" //3D地图插件
    import mapDialog from "./mapDialog"
    export default {
        data() {
            return {
                myChart: null,
                checkData: null,
                height: 0,
                children: null,
                showDialog: false,
                configTip: {
                    title: '企业规模数量',
                    percentage: true,
                    yData: true,
                },
                titleStr: '',
            }
        },
        computed: {
            valueStr: {
                get() {
                    return this.$store.state.board.valueStr;
                }
            },
            echartTitle: {
                get() {
                    return this.$store.state.board.echartTitle;
                }
            },
            opt: {
                get() {
                    return this.$store.state.board.opt;
                }
            }
        },
        watch: {
            valueStr: {
                handler(newV, oldV) {
                    this.titleStr = newV;
                    if (this.opt == 'qyqk_hy') {
                        this.switchData(newV, this.initData.ns_mapData)
                    } else {
                        this.switchData(newV, this.initData.ns_mapData2)
                    }

                }
            },
        },
        props: ['initmapData', 'initData', 'title', 'config'],
        mounted() {
            this.spreadMapChart(this.initmapData, this.initData.ns_mapData);
        },
        beforeDestroy() {
            this.myChart.dispose();
        },
        components: {
            mapDialog
        },
        methods: {
            // 切换数据
            switchData(value, dataMap) {
                // console.log(value);
                if (dataMap) {
                    dataMap.map((item, index) => {
                        if (item.children.name) {
                            item.children.name.forEach((val, i) => {
                                if (val == value) {
                                    item.value = item.children.value[i];
                                }
                            })
                        }

                    })
                }
                this.spreadMapChart(this.initmapData, dataMap);
            },
            closeDialog() {
                this.showDialog = false;
            },
            spreadMapChart(initData, data) {
                this.$echarts.registerMap("ns", initData)
                    //初始化echarts实例
                this.myChart = this.$echarts.init(this.$refs.spreadMap);
                /*获取地图数据*/
                let geoCoordMap = {};
                this.myChart.showLoading();
                this.myChart.hideLoading();
                //          初始化option
                var option = {
                    backgroundColor: 'transparent',
                    title: {
                        show: this.config.isTitle,
                        text: this.echartTitle + (this.titleStr ? ("—" + this.titleStr) : ''),
                        x: 'left',
                        textStyle: {
                            color: '#fff',
                            fontSize: 20,
                        },
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: function(params) {
                            return params.name + '<br/>' +
                                "在岗人才数量：" + params.data.value;
                        },
                    },
                    //左侧小导航图标
                    visualMap: {
                        show: false,
                        min: 0,
                        max: 150,
                        inRange: {
                            color: ['#0e6a9b', '#3b9ccf', '#129e6d', '#26a06f', '#05897c',
                                '#139e97', '#c45c53', '#908e39', '#997f32', '#28a745'
                            ]
                        }
                    },

                    //配置属性
                    series: [{
                        show: false,
                        type: 'map3D',
                        name: '珠海',
                        map: 'ns',
                        // roam: false,
                        selectedMode: "single", //地图高亮单选
                        boxDepth: 150, //地图倾斜度
                        // regionHeight: 6, //地图高度
                        viewControl: {
                            distance: 210, //地图视角 控制初始大小
                            center: [-5, -35, 0],
                            // alpha: 63, // 让canvas在x轴有一定的倾斜角度
                            // // rotateSensitivity:0,//禁止旋转
                            // // zoomSensitivity:0,//禁止缩放
                            // autoRotate: true,
                            // projection: 'perspective',
                            // autoRotateSpeed: 3,
                            // minBeta: Number.NEGATIVE_INFINITY,
                            // maxBeta: Number.POSITIVE_INFINITY,

                            animation: true,
                        },
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    fontFamily: 'Microsoft YaHei',
                                },
                                color: '#26a06f',
                                borderWidth: 1,
                                borderColor: '#01eefa',
                            },
                            // emphasis: { label: { show: true } ,areaColor: '#2B91B7',color:'#ffffff'}
                        },
                        emphasis: {
                            label: {
                                show: true, //是否显示高亮
                                textStyle: {
                                    color: '#fff', //高亮文字颜色
                                }
                            },
                            itemStyle: {
                                color: '#2b91b7', //地图高亮颜色
                            }
                        },
                        label: {
                            normal: {
                                textStyle: {
                                    fontSize: 14,
                                    color: '#ffffff',
                                    fontFamily: 'Microsoft YaHei',
                                    backgroundColor: "rgba(0,0,0,0)", //透明度0清空文字背景
                                },
                                fontSize: 12,
                                formatter: function(params) {
                                    return params.name + '\n' + params.value
                                }
                            },
                            // emphasis: { 
                            //     textStyle: {color: '#00f2f1'}
                            // }
                        },
                        // data:convertData(data)  //数据
                        data: data //数据
                    }]
                };

                //使用制定的配置项和数据显示图表

                this.myChart.setOption(option);
                let checkData;
                let _this = this;
                // this.myChart.on('click', (params) => {
                //     _this.checkData = params;
                //     this.children = params.data.children;
                //     this.height = this.children.name.length * 35 + "px";
                //     // let ele = $("<div>"+$("#model").html()+"</div>");
                //     _this.showDialog = true;

                // });
            }
        }
    }
</script>

<style scoped>
    .my-position {
        position: relative;
    }
    
    .title {
        text-align: center;
        width: 100%;
        left: 0;
        top: 2%;
    }
    
    .my-title {
        /* top: -6%; */
        position: absolute;
        z-index: 10;
        font-size: 20px;
    }
</style>