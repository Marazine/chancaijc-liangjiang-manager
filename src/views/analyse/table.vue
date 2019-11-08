<template>
  <div class="table">
    <!-- 表格 start -->
    <el-table :data="tableData" stripe show-summary :summary-method="getCount" style="width: 100%">
      <el-table-column prop="groupNameDesc" label="选项">
        <template slot-scope="scope">
          {{scope.row.groupName}}、{{scope.row.groupNameDesc}}
        </template>
</el-table-column>
<el-table-column prop="count" label="小计" sortable width="200"></el-table-column>
<el-table-column sortable :sort-method="sortByPercent" label="比例">
    <template slot-scope="scope">
          <el-progress :percentage="scope.row.percent|formatNumber"></el-progress>
        </template>
</el-table-column>
<el-table-column fixed="right" label="操作" width="120">
    <template slot-scope="scope">
          <el-button @click.native.prevent="toDetail(scope.row)" type="text" size="small">明细</el-button>
        </template>
</el-table-column>
</el-table>
<!-- 表格 end -->
<!-- 图标 start -->
<el-button-group>
    <el-button :type="isColorPie?'primary':''" @click="initChartPie">
        <icon-svg name="bingzhuangtu" class="btn-icon"></icon-svg>
        <span>饼状图</span>
    </el-button>
    <el-button :type="isColorCol?'primary':''" @click="initCharCol">
        <icon-svg name="zhuzhuangtu" class="btn-icon"></icon-svg>
        <span>柱状图</span>
    </el-button>
    <el-button :type="isColorBar?'primary':''" @click="initChartBar">
        <icon-svg name="tiaoxingtu" class="btn-icon"></icon-svg>
        <span>条形图</span>
    </el-button>
</el-button-group>

<el-row :gutter="20">
    <el-col :span="24">
        <el-card>
            <div :id="id" class="chart-box"></div>
        </el-card>
    </el-col>
</el-row>
<!-- 图标 end -->
</div>
</template>
<script>
    import echarts from "echarts";

    export default {
        props: ["tableBody", "tableOption", "charid", "title", "count"],
        data() {
            return {
                tableData: [],
                // tData: this.tableData | [],
                nameCode: this.charid,
                id: "char_" + this.charid,
                activeTab: "first",
                chartBar: null,
                chartPie: null,
                isColorPie: true,
                isColorCol: false,
                isColorBar: false
            };
        },
        filters: {
            formatNumber: function(value) {
                return Number(value.replace(/\%/, ""));
            }
        },
        created() {
            this.init();
        },
        activated() {
            this.repaintChar();
        },
        mounted() {
            this.initChartPie();
            this.repaintChar();
        },
        methods: {
            init() {
                this.tableData = [];
                if (this.tableBody) {
                    this.tableBody.forEach((item, index) => {
                        this.tableOption.forEach((item1, num) => {
                            if (index == num) {
                                item.groupNameDesc = item1.label;
                            }
                        });
                        this.tableData.push(item);
                    });
                }
            },
            getCount(param) {
                const {
                    columns,
                    data
                } = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = "本次有效填写企业数";
                        return;
                    }
                    if (index === 1) {
                        sums[index] = this.count;
                        return;
                    }
                    return "";
                });
                return sums;
            },
            //按比例排序
            sortByPercent(a, b) {
                return (
                    Number(a.percent.replace(/\%/, "")) -
                    Number(b.percent.replace(/\%/, ""))
                );
            },
            toDetail(row) {
                // console.log(row);
                // debugger
                if (this.nameCode.slice(0, 1) != "F") {
                    this.$emit("showAnalyseDetail", {
                        keyword: "",
                        groupName: this.nameCode,
                        nameCode: row.groupName,
                        groupNameDesc: row.groupNameDesc,
                        title: this.title,
                        pageParams: {
                            currIndex: 1,
                            pageSize: 5
                        }
                    });
                } else {
                    this.$emit('showAnalyseF', {
                        nameAdd: row.groupNameDesc,
                        select: this.nameCode.slice(1),
                        groupName: row.groupName
                    })
                }
                // this.$router.push({
                //   name: "analyse_detail",
                //   params: { dataInfo: JSON.stringify({
                //       keyword: "",
                //       groupName: this.nameCode,
                //       nameCode: row.groupName,
                //       groupNameDesc: row.groupNameDesc,
                //       pageParams: { currIndex: 1, pageSize: "20" }
                //     }) }
                // });

                // this.$http({
                //     url: this.$http.adornUrl("op=bigtablecontroller&func=getComRegInfo",
                //         "CQ"),
                //     //   url:"http://192.168.60.129:8080/webservice/index.php?user=bigtable&pwd=bigtable1001&op=bigtablebusi&func=getComRegInfo&gtype=http",
                //     method: "post",
                //     data: {
                //         dataInfo: JSON.stringify({
                //             keyword: "",
                //             groupName: this.nameCode,
                //             nameCode: row.groupName,
                //             pageParams: {
                //                 currIndex: 1,
                //                 pageSize: "20"
                //             }
                //         })
                //     }
                // }).then(({
                //     data
                // }) => {
                //     console.dir(data);
                //     if (data.data&&data.code == 200) {
                //             this.tableData = [{
                //                 condition: this.$refs["cascaderCounts"].currentLabels,
                //                 count: data.info.data.count
                //             }];
                //     } else {
                //         this.$message.error(data.status_desc);
                //     }
                // });
            },
            tabClick(tab, event) {
                var name = event.target.getAttribute("id");
                switch (name) {
                    case "tab-first":
                        console.log("first-------------");
                        this.initChartPie();
                        break;
                    case "tab-second":
                        this.initCharCol();
                        console.log("second-----------");
                        break;
                    case "tab-third":
                        this.initChartBar();
                        break;

                    default:
                        break;
                }
            },
            repaintChar() {
                // 由于给echart添加了resize事件, 在组件激活时需要重新resize绘画一次, 否则出现空白bug
                if (this.chartBar) {
                    this.chartBar.resize();
                }
                if (this.chartCol) {
                    this.chartCol.resize();
                }
                if (this.chartPie) {
                    this.chartPie.resize();
                }
            },
            paintChar(option) {
                this.chart = echarts.init(document.getElementById(this.id));
                this.chart.setOption(option, true);
                window.addEventListener("resize", () => {
                    this.chart.resize();
                });
            },
            // 饼状图
            initChartPie() {
                this.isColorPie = true;
                this.isColorCol = false;
                this.isColorBar = false;
                // console.dir(this.tableData);
                if (this.tableBody) {
                    var _data = this.tableData.map(element => {
                        return {
                            value: element.count,
                            name: element.groupNameDesc
                        };
                    });
                }

                var option = {
                    title: {
                        text: this.title,
                        top: "top",
                        left: "center",
                        textStyle: {
                            color: "#555",
                            fontSize: 14,
                            fontWeight: 600
                        }
                    },
                    tooltip: {
                        trigger: "item",
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    toolbox: {
                        x2: 20,
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    legend: {
                        orient: "vertical",
                        left: "left",
                        data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
                    },
                    graphic: [{
                        type: "text",
                        bottom: 0,
                        right: 0,
                        z: 100,
                        style: {
                            fill: "#999",
                            // text: "该数据来源于南山区2018年人力发展状况调研",
                            font: "12px Microsoft YaHei"
                        }
                    }],
                    series: [{
                        name: "小计",
                        type: "pie",
                        radius: "55%",
                        center: ["50%", "60%"],
                        color: [
                            "#3AA1FF",
                            "#9DD9ED",
                            "#59D4D4",
                            "#98E4CA",
                            "#6DD48C",
                            "#BAE498",
                            "#FBDB5A",
                            "#EDB58D",
                            "#F47F92",
                            "#E297DA",
                            "#A97BE9",
                            "#B0A0F2",
                            "#7172D8"
                        ],
                        data: _data,
                        // data: [
                        //   { value: 335, name: "直接访问" },
                        //   { value: 310, name: "邮件营销" },
                        //   { value: 234, name: "联盟广告" },
                        //   { value: 135, name: "视频广告" },
                        //   { value: 1548, name: "搜索引擎" }
                        // ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)"
                            }
                        }
                    }]
                };

                this.paintChar(option);
            },
            // 柱状图
            initCharCol() {
                this.isColorPie = false;
                this.isColorCol = true;
                this.isColorBar = false;
                if (this.tableBody) {
                    // 指定图表的配置项和数据
                    var _xAxis = this.tableData.map(element => {
                        return element.groupNameDesc;
                    });
                    var _data = this.tableData.map(element => {
                        return element.count;
                    });
                }

                var option = {
                    title: {
                        text: this.title,
                        top: "top",
                        left: "center",
                        textStyle: {
                            color: "#555",
                            fontSize: 14,
                            fontWeight: 600
                        }
                    },
                    tooltip: {},
                    toolbox: {
                        x2: 20,
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    grid: {
                        x: "0",
                        y: "10%",
                        x2: "0",
                        y2: "9%",
                        containLabel: true
                    },
                    legend: {
                        // data: ["销量"]
                    },
                    graphic: [{
                        type: "text",
                        bottom: 0,
                        right: 0,
                        z: 100,
                        style: {
                            fill: "#999",
                            // text: "该数据来源于南山区2018年人力发展状况调研",
                            font: "12px Microsoft YaHei"
                        }
                    }],
                    xAxis: {
                        // data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
                        data: _xAxis,
                        axisLabel: {
                            interval: 0,
                            rotate: 40,
                            textStyle: {
                                fontFamily: "Microsoft YaHei"
                            }
                        }
                    },
                    yAxis: {},
                    series: [{
                        name: "小计",
                        type: "bar",
                        // data: [5, 20, 36, 10, 10, 20]
                        data: _data
                    }]
                };
                this.paintChar(option);
            },
            //条形图
            initChartBar() {
                this.isColorPie = false;
                this.isColorCol = false;
                this.isColorBar = true;
                if (this.tableBody) {
                    // 指定图表的配置项和数据
                    var _xAxis = this.tableData.map(element => {
                        return element.groupNameDesc;
                    });
                    var _data = this.tableData.map(element => {
                        return element.count;
                    });
                }

                var option = {
                    title: {
                        text: this.title,
                        top: "top",
                        left: "center",
                        textStyle: {
                            color: "#555",
                            fontSize: 14,
                            fontWeight: 600
                        }
                    },
                    tooltip: {},
                    toolbox: {
                        x2: 20,
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    grid: {
                        x: "2%",
                        y: "10%",
                        x2: "5%",
                        y2: "5%",
                        containLabel: true
                    },
                    legend: {
                        // data: ["销量"]
                    },
                    graphic: [{
                        type: "text",
                        bottom: 0,
                        right: 0,
                        z: 100,
                        style: {
                            fill: "#999",
                            // text: "该数据来源于南山区2018年人力发展状况调研",
                            font: "12px Microsoft YaHei"
                        }
                    }],
                    xAxis: {},
                    yAxis: {
                        // data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
                        data: _xAxis
                    },
                    series: [{
                        name: "小计",
                        type: "bar",
                        // data: [5, 20, 36, 10, 10, 20]
                        data: _data
                    }]
                };
                this.paintChar(option);
            }
        }
    };
</script>
<style>
    .el-progress-bar {
        padding-right: 60px;
    }
    
    .el-progress__text {
        margin-left: 5px;
    }
    
    .btn-icon {
        vertical-align: middle;
    }
    
    .chart-box {
        min-height: 400px;
    }
</style>