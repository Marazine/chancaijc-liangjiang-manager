<template>
  <div class=" bh-100">
    <div class="title my-title">{{config.title}}</div>
    <div class="s-content" ref="spreadMap" :style="{paddingTop:config.paddingTop?config.paddingTop:''}"></div>
  </div>
</template>

<script>

import echarts from 'echarts';
import JSON from '../zhuhai2.json';

export default {
    name: 'echart-map',
    props: ["initData", "config"],
    data() {
        return {
            id: 'echarts_' + new Date().getTime() + Math.floor(Math.random() * 1000),
            echartObj: null,
            radioList: {
                A: '重点产业分布',
                B: '行业分布',
                C: '行业分布',
                D: '行业分布',
                E: '行业分布',
            },
            radioActive: 'A',
            option: {
                title: {
                    // text: '选择所要查询的数据维度',
                    top: '3%',
                    left: '5%',
                    textStyle: {
                        fontSize: 18,
                        fontWeight: 300,
                        color: '#b6d7ff'
                    }
                },
                tooltip: {
                    padding: 0,
                    backgroundColor: 'transparent',
                    formatter: params => {
                        // params.data
                        return `<table class="map__tooltip o_font20">
                                    <thead>
                                       <tr>
                                           <th>总购买人数</th>
                                           <th>本年度总购买人数</th>
                                           <th>本月度总购买人数</th>
                                           <th>总完成人数</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th>${params.data.obj.a}</th>
                                         </tr>
                                    </tbody>
                                </table>`;
                    }
                },
                legend: {
                    orient: 'vertical',
                    top: '40%',
                    right: '5%',
                    icon: 'circle',
                    data: [],
                    selectedMode: 'single',
                    selected: {},
                    itemWidth: 12,
                    itemHeight: 12,
                    itemGap: 30,
                    inactiveColor: '#b6d7ff',
                    textStyle: {
                        color: '#ec808d',
                        fontSize: 14,
                        fontWeight: 300,
                        padding: [0, 0, 0, 15]
                    }
                },
                visualMap: {
                    min: 0,
                    max: 500,
                    show: false,
                    splitNumber: 5,
                    inRange: {
                        // color: ['#FACD91', '#74DFB2', '#81D3F8', '#768FDE', '#e9969f'].reverse()
                        color: ['#151d6e', '#151d6e', '#151d6e', '#151d6e', '#151d6e', '#151d6e', '#151d6e'].reverse()
                    },
                    borderColor: "#ffffff",
                    textStyle: {
                        color: '#fff'
                    }
                },
                geo: {
                    map: '重庆',
                    label: {
                        normal: {
                            show: true,
                            color: '#fff'
                        },
                        emphasis: {
                            show: true,
                            color: '#fff'
                        }
                    },
                    roam: false,
                    itemStyle: {
                        normal: {
                            areaColor: '#8db200',
                            borderColor: '#01eefa',
                            borderWidth: 2
                        },
                        emphasis: {
                            areaColor: '#2B91B7' // hover效果
                        }
                    },
                    // left: '5%',
                    // right: '5%',
                    // top: '5%',
                    // bottom: '5%'
                    left: '10%',
                    right: '10%',
                    top: '0',
                    bottom: '0'
                },
                series: [{
                    name: '年度总项目数据查询',
                    type: 'map',
                    geoIndex: 0, // 不可缺少，否则无tooltip 指示效果
                    data: []
                }]
            }
        };
    },
    mounted() {
        console.log(JSON);
        
        this.echartObj = echarts.init(this.$refs.spreadMap);
        echarts.registerMap('重庆', JSON);
        this.echartObj.setOption(this.getOptions(), true);
        this.echartObj.on('legendselectchanged', params => {
            this.radioActive = Object.keys(this.radioList).filter(item => this.radioList[item] === params.name)[0];
            this.echartObj.clear();
            this.echartObj.setOption(this.getOptions());
        });
        window.addEventListener('resize', () => {
            if (this.echartObj && this.echartObj.resize) {
                this.echartObj.resize();
            }
        });
    },
    methods: {
        getOptions() {
            this.setOptions('legend', {
                data: Object.values(this.radioList),
                selected: (list => {
                    const obj = {};
                    Object.keys(list).map((item, index) => {
                        obj[list[item]] = item === this.radioActive;
                    });
                    return obj;
                })(this.radioList)
            });
            this.setOptions('series', (() => {
                const arr = [];
                Object.values(this.radioList)
                    .map((item, index) => {
                        arr[this.radioList[this.radioActive] === item ? 'unshift' : 'push']({
                            name: item,
                            type: 'map',
                            geoIndex: 0, // 不可缺少，否则无tooltip 指示效果
                            data: this.getSeriesData(item)
                        });
                    });
                return arr;
            })());
            return this.option;
        },
        getSeriesData(item) {
            return this.radioList[this.radioActive] === item ? JSON.features.map(item => {
                return {
                    name: item.properties.name,
                    value: Math.ceil(Math.random() * 500),
                    obj: {
                        a: Math.ceil(Math.random() * 500),
                        b: Math.ceil(Math.random() * 500),
                        c: Math.ceil(Math.random() * 500),
                        d: Math.ceil(Math.random() * 500)
                    }
                };
            }) : [];
        },
        setOptions(objKey, objVal) {
            if (this.option[objKey] && typeof this.option[objKey] === 'object' && !Array.isArray(this.option[objKey])) {
                this.option[objKey] = Object.assign(this.option[objKey], objVal);
            } else {
                this.option[objKey] = objVal;
            }
            this.$set(this.option, objKey, this.option[objKey]);
        }
    }
};
</script>

<style lang="scss" scoped>
    .title{
        text-align: center;
        width: 100%;
        left: 0;
        top: 2%;
    }
    .my-title {
        font-size: 20px;
    }
    .map{
        margin-top: 16%;
        height: 88%;
        /* background: url(../../../assets/img/nsBg.png) no-repeat 10% center; */
        background-size: auto 75%;
        /* width: 80% */
    }
    /deep/ .o-echarts {
        min-width: 30px;
        min-height: 30px;
        width: 100%;
        height: 100%;
    }
    /deep/ .map__tooltip.o_font20 {
        border: 1px solid #000;
        background-color: #010039;
    }
</style>