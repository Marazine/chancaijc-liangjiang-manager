<template>
  <div class="analyse">
    <el-tabs v-model="activetab" @tab-click="tabClick">
        
      <el-tab-pane v-for="(tabs, tabindex) in collist" :key="tabindex" :label="tabs.label" :name="tabindex.toString()">
        <el-collapse v-model="activecollapse1" @change="collapseChange1">
          <el-collapse-item v-for="item in tabs.children" :key="item.value" :title="item.value+'、'+item.label"
            :name="item.value">
            <el-row v-if="item.children&&item.children.length<=0">
              <el-button @click="thisToDetail(item)" type="primary">查看明细</el-button>
            </el-row>
            <analyseTable v-if="item.showTable" :ref="'atb_'+item.value" :tableBody="item.tableBody"
              :tableOption="item.children" :charid="item.value" :title="item.label" :count="item.count"
              @showAnalyseDetail="tableToDetail"></analyseTable>
              <!-- <div v-if='showData' class="showData">暂无数据</div> -->
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      
      <!-- <el-tab-pane label="A.单位基本情况" name="first">
        <el-collapse v-model="activecollapse1" @change="collapseChange1">
          <el-collapse-item :title="item.title" :name="item.name" v-for="item in dataA" :key="item.name">
            <el-row v-if="item.tableOption==null">
              <el-button @click="thisToDetail(item)" type="primary">查看明细</el-button>
            </el-row>
            <analyseTable v-else-if="item.showTable" :ref="'atb_'+item.name" :tableBody="item.tableBody"
              :tableOption="item.tableOption" :charid="item.name" :title="item.title" :count="item.count"
              @showAnalyseDetail="tableToDetail"></analyseTable>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane label="B.单位人才现状" name="second">
        <el-collapse v-model="activecollapse2" @change="collapseChange2">
          <el-collapse-item :title="item.title" :name="item.name" v-for="item in dataB" :key="item.name">
            <el-row v-if="item.tableOption==null">
              <el-button @click="thisToDetail(item)" type="primary">查看明细</el-button>
            </el-row>
            <analyseTable v-else-if="item.showTable" :ref="'atb_'+item.name" :tableBody="item.tableBody"
              :tableOption="item.tableOption" :charid="item.name" :title="item.title" :count="item.count"
              @showAnalyseDetail="tableToDetail"></analyseTable>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane label="C.人才引进与培养" name="third">
        <el-collapse v-model="activecollapse2" @change="collapseChange3">
          <el-collapse-item :title="item.title" :name="item.name" v-for="item in dataC" :key="item.name">
            <analyseTable v-if="item.showTable" :ref="'atb_'+item.name" :tableBody="item.tableBody"
              :tableOption="item.tableOption" :charid="item.name" :title="item.title" :count="item.count"
              @showAnalyseDetail="tableToDetail"></analyseTable>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane label="D.人力资源服务" name="fourth">
        <el-collapse v-model="activecollapse2" @change="collapseChange4">
          <el-collapse-item :title="item.title" :name="item.name" v-for="item in dataD" :key="item.name">
            <analyseTable v-if="item.showTable" :ref="'atb_'+item.name" :tableBody="item.tableBody"
              :tableOption="item.tableOption" :charid="item.name" :title="item.title" :count="item.count"
              @showAnalyseDetail="tableToDetail"></analyseTable>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane label="E.人才公共服务评价" name="fifth">
        <el-collapse v-model="activecollapse2" @change="collapseChange5">
          <el-collapse-item :title="item.title" :name="item.name" v-for="item in dataE" :key="item.name">
            <analyseTable v-if="item.showTable" :ref="'atb_'+item.name" :tableBody="item.tableBody"
              :tableOption="item.tableOption" :charid="item.name" :title="item.title" :count="item.count"
              @showAnalyseDetail="tableToDetail"></analyseTable>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane> -->
      <!-- <el-tab-pane label="F.招聘需求与人才流出" name="sixth">
        <el-collapse v-model="activecollapse2" @change="collapseChange6">
          <el-collapse-item :title="item.title" :name="item.name" v-for="item in dataF" :key="item.name">
            <div class="trendLayout">
              <span :class="active ? '':'active'" @click="quarterChange">本季</span>
              <span :class="active ? 'active':''" @click="quarterChange">全年</span>
              <div class="block">
                <el-date-picker v-model="value13" type="daterange" editable start-placeholder="开始日期"
                  end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']" @change="change">
                </el-date-picker>
              </div>
            </div>
            <analyseTable v-if="item.showTable" :ref="'atb_'+item.name" :tableBody="item.tableBody"
              :tableOption="item.tableOption" :charid="item.name" :title="item.title" :count="item.count"
              @showAnalyseF="tableToDetailF"></analyseTable>
            <div v-if='showData' class="showData">暂无数据</div>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane> -->
    </el-tabs>
    <analyse-detail v-if="analyseDetailVisible" ref="analyseDetail"></analyse-detail>
    <analyseF v-if="analyseFVisible" ref="analyseF"></analyseF>
  </div>
</template>
<script>
    import analyseTable from "./table.vue";
    import AnalyseDetail from "./analyse_detail.vue";
    import analyseF from "../analyseF/analyseF.vue";
    // import { options } from "../data/menu.js";
    import {
        collist
    } from "./collist.js";

    import {
        log
    } from "util";

    export default {
        data() {
            return {
                // activetab: collist[0].value, //tab
                activetab: '0', //tab
                activecollapse1: ["1"], //collapseA
                activecollapse1_last: ["1"], //collapseA初始
                activecollapse2: ["1"], //collapseB
                activecollapse2_last: ["1"], //collapseB初始
                activecollapse3: ["1"], //collapseB
                activecollapse3_last: ["1"], //collapseB初始
                activecollapse4: ["1"], //collapseB
                activecollapse4_last: ["1"], //collapseB初始
                activecollapse5: ["1"], //collapseB
                activecollapse5_last: ["1"], //collapseB初始
                activecollapse6: ["1"], //collpaseB
                activecollapse6_last: ["1"], //collpaseB初始
                dataA: [], //{name: "A1",title: "A1:单位注册信息",type: 1,tableData: null}
                dataB: [],
                dataC: [],
                dataD: [],
                dataE: [],
                dataF: [],
                value13: '', //时间 日期
                analyseDetailVisible: false,
                analyseFVisible: false,
                active: "active",
                time: {},
                showData: false, //数据显示与隐藏
                collist: null
            };
        },
        components: {
            analyseTable,
            AnalyseDetail,
            analyseF
        },
        created() {
            this.$http({
                url: this.$http.adornUrl(
                    "op=bigtablecontroller&func=getTreeData",
                    "CQ"
                ),
                method: "post"
            }).then(({
                data
            }) => {

                if (data.code == 200) {
                    this.collist = JSON.parse(JSON.stringify(data.data))
                        // console.log(data.data);
                } else {
                    this.$message.error(data.status_desc);
                }
            });
            // this.init();
            this.$root.eventHub.$on('globalDataChange', (res) => {

                // 监听全局时间段
                if ((res.on == '1') && (this.$route.name == 'analyse')) {
                    console.log('analyse接收监听')
                    this.init();
                }
            })
        },
        beforeDestory() { // 销毁前
            this.$root.eventHub.$off('globalDataChange');
        },
        methods: {
            init() {

                this.dataA = [];
                this.dataB = [];
                this.dataC = [];
                this.dataD = [];
                this.dataE = [];
                this.dataF = [];
                collist.forEach(item => {
                    var dataObj = {};
                    switch (item.value) {
                        case "A":
                            dataObj = this.dataA;
                            break;
                        case "B":
                            dataObj = this.dataB;
                            break;
                        case "C":
                            dataObj = this.dataC;
                            break;
                        case "D":
                            dataObj = this.dataD;
                            break;
                        case "E":
                            dataObj = this.dataE;
                            break;
                        case "F":
                            dataObj = this.dataF;
                            break;
                        default:
                            break;
                    }

                    item.children.forEach(item1 => {
                        dataObj.push({
                            name: item1.value,
                            title: item1.label,
                            showTable: false,
                            tableBody: [],
                            tableOption: item1.children
                        });
                    });
                });
            },
            // tab切换
            tabClick(tab, event) {
                this.activecollapse1 = ["1"];
                this.activecollapse1_last = ["1"];
                this.activecollapse2 = ["1"];
                this.activecollapse2_last = ["1"];
                this.activecollapse3 = ["1"];
                this.activecollapse3_last = ["1"];
                this.activecollapse4 = ["1"];
                this.activecollapse4_last = ["1"];
                this.activecollapse5 = ["1"];
                this.activecollapse5_last = ["1"];
                this.activecollapse6 = ["1"];
                this.activecollapse6_last = ["1"];

            },
            csCommon(val, tab, last) {
                // debugger
                const nameLength = val.length; //折叠状态数组长度，name
                const nameLength_last = this[last].length; //初始折叠状态数组长度
                if (nameLength > nameLength_last) {
                    var name = val[nameLength - 1]; //展开时才有，name
                }
                if (name) {
                    tab.forEach(item => {
                        if (item.value == name) {
                            if ([2, 3, 4].indexOf(item.data.filedType) !== -1) {
                                this.getTableData(tab, item.value);
                            }
                        }
                    });
                }
            },
            // 折叠菜单A
            collapseChange1(val) {
                this.csCommon(val, this.collist[this.activetab].children, "activecollapse1_last");
            },
            // 折叠菜单B
            collapseChange2(val) {
                this.csCommon(val, "dataB", "activecollapse2_last");
            },
            // 折叠菜单C
            collapseChange3(val) {
                this.csCommon(val, "dataC", "activecollapse3_last");
            },
            // 折叠菜单D
            collapseChange4(val) {
                this.csCommon(val, "dataD", "activecollapse4_last");
            },
            // 折叠菜单E
            collapseChange5(val) {
                this.csCommon(val, "dataE", "activecollapse5_last");
            },
            // 折叠菜单F
            collapseChange6(val) {
                this.value1 = val;
                var staTime = "2019-1-1 00:00:00";
                var endTime = "2019-12-31 23:59:59";
                this.time = {
                    staTime,
                    endTime
                };
                this.active = "active";
                this.csCommon(val, "dataF", "activecollapse6_last", this.time);
            },
            //获取表格数据
            getTableData(dataItem, dataName) {
                var params = JSON.stringify({
                    areaName: dataName
                })
                this.$http({
                    url: this.$http.adornUrl(
                        "op=bigtablecontroller&func=getStatisInfo",
                        "CQ"
                    ),
                    method: "post",
                    data: {
                        dataInfo: params
                    }
                }).then(({
                    data
                }) => {
                    // 显示影藏判断
                    if (data.data) {
                        this.showData = false;
                    } else {
                        this.showData = true;
                    }
                    if (data.code == 200) {
                        dataItem.forEach(item => {
                            if (item.value == dataName && data.data.data) {
                                this.$set(item, 'tableBody', data.data.data);
                                this.$set(item, 'count', data.data.count);
                                this.$set(item, 'showTable', true);

                            } else {
                                this.$set(item, 'showTable', false);
                            }
                        });
                    } else {
                        this.$message.error(data.status_desc);
                    }
                });
            },
            tableToDetail(data) {
                this.toDetail(data, data.title);
            },
            thisToDetail(data) {
                // console
                var _data = {
                    keyword: "",
                    groupName: data.value,
                    nameCode: 0,
                    groupNameDesc: data.label,
                    pageParams: {
                        currIndex: 1,
                        pageSize: 5
                    }
                };
                this.toDetail(_data, data.label);
            },
            toDetail(data, title) {
                // console.dir(data)
                this.analyseDetailVisible = true;
                this.$nextTick(() => {
                    this.$refs.analyseDetail.init(data, title);
                });
            },
            tableToDetailF(data) {
                this.analyseFVisible = true;
                this.$nextTick(() => {
                    this.$refs.analyseF.init(data);
                })
            },
            // 本季 全年
            quarterChange(e) {
                this.time = {
                    staTime: "2019-1-1 00:00:00",
                    endTime: "2019-12-31 23:59:59"
                }
                if (e.target.innerHTML == "本季") {
                    this.active = "";
                    let dataTime = new Date();
                    var year = dataTime.getFullYear();
                    var month = dataTime.getMonth() + 1;
                    // this.time=month;
                    var staTime = "";
                    var endTime = "";
                    if (month > 0 && month <= 3) {
                        staTime = year + "-1-1 00:00:00";
                        endTime = year + "-3-31 23:59:59"
                    } else if (month > 3 && month <= 6) {
                        staTime = year + "-4-1 00:00:00";
                        endTime = year + "-6-31 23:59:59";
                        this.time = [year + "-4-1", year + "-6-31"];
                    } else if (month > 6 && month <= 9) {
                        staTime = year + "-7-1 00:00:00";
                        endTime = year + "-9-31 23:59:59";
                    } else {
                        staTime = year + "-10-1 00:00:00";
                        endTime = year + "-12-31 23:59:59";
                    }
                    this.time = {
                        staTime,
                        endTime
                    };
                } else {
                    this.active = "active";
                }

                this.csCommon(this.value1, "dataF", "activecollapse6_last", this.time);
            },
            // 选择时间日期
            change() {
                var staYear = this.value13[0].getFullYear();
                var staMonth = this.value13[0].getMonth();
                var staDate = this.value13[0].getDate();
                var staTime = staYear + "-" + staMonth + "-" + staDate + " 00:00:00";
                // 结束时间
                var endYear = this.value13[1].getFullYear();
                var endMonth = this.value13[1].getMonth();
                var endDate = this.value13[1].getDate();
                var endTime = endYear + "-" + endMonth + "-" + endDate + " 23:59:59";

                this.time = {
                    staTime,
                    endTime
                }
                this.csCommon(this.value1, "dataF", "activecollapse6_last", this.time);
            }
        }
    };
</script>
<style>
    .el-collapse-item__header {
        font-weight: bold;
        font-size: 16px;
    }
    
    .el-collapse-item {
        position: relative;
    }
    
    .analyse .trendLayout {
        width: 500px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        top: 10px;
        right: 50px;
    }
    
    .analyse .trendLayout span {
        margin-right: 20px;
        cursor: pointer;
    }
    
    .analyse .trendLayout .block {
        margin-left: 20px;
    }
    
    .analyse .trendLayout .el-date-editor .el-range__icon {
        position: absolute;
        /* right:5px; */
    }
    
    .active {
        color: #1890FF;
    }
    
    .analyse .trendLayout .el-range-editor--medium.el-input__inner {
        height: 32px;
    }
    
    .analyse .showData {
        text-align: center;
        color: #999;
    }
</style>