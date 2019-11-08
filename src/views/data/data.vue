<template>
  <div class="data">
    <el-form>
      <el-form-item label="条件项" v-for="(item,index) in condition" :key="index">
        <el-cascader
          placeholder="搜索"
          :options="item.options"
          filterable
          v-model="item.value"
          style="width:500px"
          @change="conditionChange(index)"
        ></el-cascader>
        <el-input
          v-if="item.inputEdit"
          v-model="item.input"
          placeholder="请输入要检索的内容"
          style="width:200px"
        ></el-input>
        <el-button v-if="index==0" type="primary" @click="addRow" :disabled="condition.length>=3">增加条件</el-button>
        <el-button v-else type="danger" @click="delRow(index)">删除</el-button>
      </el-form-item>

      <el-form-item label="统计项">
        <el-cascader
          ref="cascaderCounts"
          placeholder="搜索"
          :options="counts.options"
          filterable
          :value="counts.inputEdit"
          v-model="counts.value"
          style="width:500px"
          @change="countsChange"
        ></el-cascader>
        <el-input
          v-if="counts.inputEdit"
          v-model="counts.input"
          placeholder="请输入要检索的内容"
          style="width:200px"
        ></el-input>
        <el-button type="primary" @click="getDataList()" :disabled="counts.value.length<=0">查询</el-button>
        <el-button @click="resetFormList()">重置</el-button>
      </el-form-item>
      <!-- <el-form-item>
        <el-button type="primary" @click="addRow" :disabled="condition.length>=3">增加条件</el-button>
      </el-form-item> -->
    </el-form>

    <!-- 表格 start -->
    <el-table :data="tableData" border v-loading="dataListLoading" style="width: 100%">
      <el-table-column prop="condition" label="搜索条件" header-align="center" align="center"></el-table-column>
      <!-- <el-table-column prop="count" label="总和" header-align="center" align="center" width="180"></el-table-column>
       -->
       <el-table-column
        v-for="(item,key) in dataHead"
        :key="key"
        :prop="key"
        header-align="center"
        :align="key=='companyName'?'left':'center'"
        :label="item"
        :width="key=='companyName'?'400px':'auto'"
      >
      </el-table-column>
      <el-table-column fixed="right" label="操作" header-align="center" align="center" width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="toDetail(scope)">查看详情</el-button>
        </template>
</el-table-column>
</el-table>
<!-- 表格 end -->
<!-- 列表 -->
<check-data-list v-if="checkDataListVisible" ref="checkDataList"></check-data-list>
</div>
</template>
<script>
    import {
        counts
    } from "./menu_count";
    import {
        options,
        condition
    } from "./menu.js";
    import CheckDataList from "./data_list";
    export default {
        data() {
            return {
                countsData: [],
                counts: {
                    options: counts,
                    value: [],
                    inputEdit: false,
                    input: ""
                },
                conditionData: [], //统计
                condition: [{
                    options: condition,
                    value: [],
                    inputEdit: false,
                    input: ""
                }], //条件
                tableData: [], //表格数据
                dataHead: {}, //表格表头
                dataListLoading: false, //加载中
                dataParam: "", //ajax参数
                checkDataListVisible: false,
                needInput: [],
                conditionData: null
            };
        },
        components: {
            CheckDataList
        },
        created() {
            this.$http({
                url: this.$http.adornUrl(
                    "op=bigtablecontroller&func=getTreeData",
                    "XZX"
                ),
                method: "post"
            }).then(({
                data
            }) => {
                if (data.code == 200) {
                    this.filterEle1 = []; //显示的元素
                    this.filterEle2 = []; //不显示的元素
                    this.filterEle3 = []; //删除项
                    this.initData(data.data);
                    this.conditionData = this.optionsFinter(this.filterEle1, true, data.data); //条件项
                    this.countsData = this.optionsFinter(this.filterEle2, true, data.data); //统计项

                    // 当没有子搜索项时禁止选择
                    this.conditionData = this.conditionData.map((item, index) => {
                        if (!item.children) {
                            item.disabled = true;
                        }
                        return item
                    })
                    this.condition = [{
                        options: this.conditionData,
                        value: [],
                        inputEdit: true,
                        input: ''
                    }];


                    this.$set(this.counts, 'options', this.countsData);
                    // 当没有子搜索项时禁止选择
                    this.counts.options = this.counts.options.map((item, index) => {
                        if (!item.children) {
                            item.disabled = true;
                        }
                        return item
                    })
                } else {
                    this.$message.error(data.status_desc);
                }
            });
        },
        mounted() {
            this.$root.eventHub.$on('globalDataChange', (res) => {
                // 监听全局时间段
                if ((res.on == '1') && (this.$route.name == 'data')) {
                    console.log('data接收监听')
                    this.getDataList();
                }
            })
        },
        beforeDestory() { // 销毁前
            this.$root.eventHub.$off('globalDataChange');
        },
        methods: {
            initData(obj) {
                for (let i in obj) {
                    // console.log(obj[i])
                    // console.log(obj[i].children && obj[i].children.length > 0)
                    if (obj[i].children && obj[i].children.length > 0 && !obj[i].data.typeContent && !obj[i].data.typeConfig) {
                        this.initData(obj[i].children);
                        continue;
                    } else {
                        if (obj[i].data && obj[i].data.filedType == 7) {
                            continue;
                        } else if (obj[i].data && (obj[i].data.filedType == 1 || obj[i].data.filedType == 2 || obj[i].data.filedType == 3)) {
                            if (obj[i].data.filedType == 1) {
                                this.needInput.push(obj[i].data.key);
                                delete obj[i].children;
                            }
                            this.filterEle1.push(obj[i].data.key);
                        } else if (obj[i].data && obj[i].data.filedType == 4) {
                            delete obj[i].children;
                            this.filterEle2.push(obj[i].data.key);
                        } else if (obj[i].data && (obj[i].data.filedType == 5 || obj[i].data.filedType == 6)) {
                            this.filterEle3.push(obj[i].data.key);
                        }
                    }


                }
            },
            optionsFinter(filters, only, options) {
                /**
                 * @param filters： 元素
                 * @param only：方向（true只需要false过滤掉）
                 */
                var tempObj = this.objDeepCopy(options);
                var result = tempObj.map(item => {
                    // console.log(item.children)
                    var _item = {
                        label: item.label,
                        value: item.value
                    };
                    _item.label = item.label;
                    _item.value = item.value;
                    var _children = item.children.filter(item1 => {
                        if (only) {
                            var flag = false;
                            filters.forEach(item2 => {
                                if (item2 == item1.value) {
                                    flag = true;
                                }
                            })
                        } else {
                            var flag = true;
                            filters.forEach(item2 => {
                                if (item2 == item1.value) {
                                    flag = false;
                                }
                            })
                        }
                        return flag;
                    })
                    if (_children.length > 0) {
                        _item.children = _children;
                    }
                    return _item;
                })
                return result;
            },
            objDeepCopy(source) {
                //深拷贝
                var sourceCopy = source instanceof Array ? [] : {};
                for (var item in source) {
                    sourceCopy[item] = typeof source[item] === 'object' ? this.objDeepCopy(source[item]) : source[item];
                }
                return sourceCopy;
            },
            delChild(obj, arr) {
                //单独删除元素
                /**
                 * @param {*} arr 二维数组，二维中只允许三个元素
                 */
                arr.forEach(params => {
                    if (params.length != 3) {
                        if (params.length == 1) {
                            obj.forEach(item1 => {
                                if (params[0] == item1.value) {
                                    item1.disabled = true;
                                }
                            })
                        }
                        return;
                    }
                    obj.forEach(item1 => {
                        if (params[0] == item1.value) {
                            item1.children.forEach(item2 => {
                                if (params[1] == item2.value) {
                                    item2.children.forEach((item3, index) => {
                                        if (params[2] == item3.value) {
                                            item3.disabled = true;
                                            // delete(item2.children[index])
                                        }
                                    })
                                }
                            })
                        }
                    })
                })
            },
            getDataList() {
                //条件
                var filter = this.condition
                    .filter(item => {
                        return item.value && item.value.length > 0;
                    })
                    .map(item => {
                        if (item.inputEdit) {
                            return {
                                select: item.input,
                                key: item.value[item.value.length - 1]
                            };
                        } else {
                            return {
                                select: [item.value[item.value.length - 1]],
                                key: item.value.slice(0, -1)[item.value.slice(0, -1).length - 1]
                            };
                        }
                    });
                //统计
                var query = {};
                if (this.counts.inputEdit) {
                    query = {
                        select: this.counts.input,
                        key: this.counts.value[this.counts.value.length - 1]
                    };
                } else {
                    let query1 = this.counts.value.slice(0, -1)
                    query = {
                        select: [this.counts.value.slice(0, -1)[this.counts.value.slice(0, -1).length - 1]],
                        key: this.counts.value[this.counts.value.length - 1]
                    };
                    if (query.select.length <= 1) {
                        query.select = '';
                    }
                }
                // console.dir(query);

                let condition = {
                    filter: filter,
                    pagination: {
                        currPage: 1,
                        pageSize: 5
                    },
                    query: query,
                    sorting: "desc"
                };
                this.dataParam = condition;
                // console.dir(condition);

                this.$http({
                    url: this.$http.adornUrl(
                        "op=bigtablecontroller&func=getComDataCountForDataStati",
                        "XZX"
                    ),
                    // url:
                    //   "http://192.168.60.161:8080/webservice/index.php?user=bigtable&pwd=bigtable1001&op=bigtablecontroller&func=getComDataCountForDataStati&gtype=http",
                    method: "post",
                    data: {
                        condition: JSON.stringify(condition)
                    }
                }).then(({
                    data
                }) => {
                    console.dir(data);
                    if (data.code == 200) {
                        this.dataHead = data.data.thead;
                        this.tableData = data.data.tbody;
                        this.tableData[0].condition = this.$refs["cascaderCounts"].currentLabels;
                        // this.tableData = [
                        //   {
                        //     condition: this.$refs["cascaderCounts"].currentLabels,
                        //     colunm1: data.data.colunm1
                        //   }
                        // ];
                    } else {
                        this.$message.error(data.status_desc);
                    }
                });
            },
            //重置表单
            resetFormList() {
                this.counts.value = [];
                this.counts.inputEdit = false;

                this.condition = [{
                    options: this.conditionData,
                    value: [],
                    inputEdit: false,
                    input: ""
                }];

                // this.condition.forEach(element => {
                //   element.value = [];
                //   element.inputEdit = false;
                // });
            },
            //跳转详情页
            toDetail() {
                this.checkDataListVisible = true;
                this.$nextTick(() => {
                    this.$refs.checkDataList.init(
                        this.dataParam,
                        this.tableData[0].condition.join("/")
                    );
                });
                // this.$router.push({
                //   name: "data_list",
                //   params: { condition: JSON.stringify(this.dataParam) }
                // });
            },
            addRow() {
                this.condition.push({
                    options: this.conditionData,
                    value: [],
                    inputEdit: false,
                    input: ""
                });
            },
            delRow(index) {
                console.log(index);
                if (index != 0) {
                    this.condition.splice(index, 1);
                }
            },
            isNeedEdit(type, index) {
                // var needInput = [["A_A1_1"], ["A_A1_2"], ["B_B11_3"], ["B_B12_1"]];
                switch (type) {
                    case "counts":
                        var countsFlag = false;
                        this.needInput.forEach(item => {
                            var valueStr = this.counts.value[this.counts.value.length - 1];
                            if (item == valueStr) {
                                countsFlag = true;
                            }
                        });
                        this.counts.inputEdit = countsFlag;
                        break;
                    case "condition":
                        var conditionFlag = false;
                        this.needInput.forEach(item => {
                            var valueStr = this.condition[index].value[this.condition[index].value.length - 1];
                            if (item == valueStr) {
                                conditionFlag = true;
                            }
                        });
                        this.condition[index].inputEdit = conditionFlag;
                        break;

                    default:
                        break;
                }
            },
            //统计改变
            countsChange() {
                this.isNeedEdit("counts");
            },
            //条件改变
            conditionChange(index) {
                // console.dir(index);
                this.isNeedEdit("condition", index);
            }
        }
    };
</script>