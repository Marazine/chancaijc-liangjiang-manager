<template>
  <div class="com">
    <el-form>
      <el-form-item label="条件项" v-for="(item,index) in condition" :key="index">
        <el-cascader placeholder="搜索" :options="item.options" filterable v-model="item.value" style="width:500px"
          @change="conditionChange(item, index)"></el-cascader>
          <!-- {{item}} -->
        <el-input v-if="item.inputEdit" v-model="item.input" @keyup.enter.native="serchData()" placeholder="请输入要检索的内容" style="width:200px"></el-input>
        <el-button v-if="index==0" type="primary" @click="serchData()" :disabled="condition[0].value.length<=0">查询
        </el-button>
        <el-button v-if="index==0" @click="resetFormList()">重置</el-button>

        <el-button v-if="index!=0" type="danger" @click="delRow(index)">删除</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addRow" :disabled="condition.length>=3">增加条件</el-button>
      </el-form-item>
      <!-- <el-form-item class="flex-right">
        <el-button :disabled="dataList.length<=0" size="mini" @click="validatePWd">联系方式导出</el-button>
      </el-form-item> -->
    </el-form>

    <el-table :data="dataList" border v-loading="dataListLoading" style="width: 100%;">
      <el-table-column type="index" :index="(pageIndex-1)*pageSize+1" header-align="center" align="center" width="50"
        label="序号"></el-table-column>
      <!--<el-table-column header-align="center" align="center" width="80" label="企业标签">-->
        <!--<template slot-scope="scope">-->
          <!--<el-tag v-if="scope.row.fourOrCountry === '1'||scope.row.fourOrCountry === '1,2'" color="#4794F9" size="mini"-->
            <!--style="color:#fff">四上</el-tag>-->
          <!--<el-tag v-if="scope.row.fourOrCountry === '2'||scope.row.fourOrCountry === '1,2'" color="#F63030" size="mini"-->
            <!--style="color:#fff">国高</el-tag>-->
        <!--</template>-->
<!--</el-table-column>-->
<el-table-column v-for="(item,key) in dataHead" :key="key" :prop="key" header-align="center" :align="key=='companyName'?'left':'center'" :label="item" :width="key=='companyName'?'400px':'auto'">
    <template slot-scope="scope">
          <div v-if="key == 'filepath'" >
            <!-- <div v-if="scope.row[key] != ''" class="fileList">
              <a class="fileItem" v-for="(item,index) in scope.row[key]" :key="index" href="javascript:;" @click="showFiles(scope.row,index)">
                <img :src="item.path" :title="item.name" height="40px" />
              </a>
            </div> -->
            <span v-if="scope.row[key] != ''">已上传</span>
            <span v-if="scope.row[key] == ''">未上传</span>
          </div>

          <span v-else>{{scope.row[key]}}</span>
        </template>
    <!-- <template slot-scope="scope">

          <a>{{key}}1112312321321</a>
        </template> -->
</el-table-column>

<el-table-column fixed="right" header-align="center" align="center" label="操作">
    <template slot-scope="scope">
          <el-button type="text" size="small" @click="checkPaper(scope.row)">查看答卷</el-button>
          <el-button v-if="scope.row['filepath'] && scope.row['filepath'] != ''" type="text" size="small" @click="downloadFilepath(scope.row)">扫描件下载</el-button>
        </template>
</el-table-column>
</el-table>
<el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
<el-dialog v-if="files.show" :title="files.title" :visible.sync="files.show">
    <el-carousel :initialIndex="files.index" :autoplay='false' type="card" height="400px">
        <el-carousel-item v-for="(item, index) in files.list" :key="index">
            <img :src="item.path" :title="item.name" height="400px" />
        </el-carousel-item>
    </el-carousel>
</el-dialog>
</div>
</template>
<script>
    // import { condition } from "../data/menu.js";
    import bus from "../common/bus.js";
    import {
        previewAddress
    } from '@/utils';
    let condition;
    let Base64 = require('js-base64').Base64;
    export default {
        data() {
            return {
                files: {
                    list: [],
                    show: false
                },
                condition: [], //条件
                dataHead: {},
                dataList: [],
                pageIndex: 1,
                pageSize: 10,
                totalPage: 0,
                dataListLoading: false,
                needInput: [],
                conditionData: null,
                initVal: [], // 初始化獲取value值
                inputSearch: null
            };
        },
        created() {
            this.inputSearch = this.$store.state.common.inputSearch
            bus.$on("gloablSearch", data => {
                this.initValue(this.conditionData);
                this.condition = [
                    {
                        options: this.conditionData,
                        value: ["A", "A_A1_1"],
                        inputEdit: true,
                        input: data.inputSearch
                    }
                ];
                this.serchData();
            });
            this.$http({
                url: this.$http.adornUrl(
                    "op=bigtablecontroller&func=getTreeData",
                    "XZX"
                ),
                // url:
                //   "https://www.easy-mock.com/mock/5bee5f836142a550e9bddafc/nsbg_easymock/getCompanyDatalist#!method=post",
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
                    var counts = this.optionsFinter(this.filterEle2, true, data.data); //统计项
                    this.initValue(this.conditionData);
                    this.condition = [{
                        options: this.conditionData,
                        value: ["A", "A_A1_1"],
                        inputEdit: true,
                        input: data.inputSearch ? data.inputSearch : this.inputSearch
                    }];
                    this.serchData();

                } else {
                    this.$message.error(data.status_desc);
                }
            });
        },
        activated() {
            var inputSearch = this.$store.state.common.inputSearch;

        },
        mounted() {
            this.$root.eventHub.$on('globalDataChange', (res) => {
                // 监听全局时间段
                if ((res.on == '1') && (this.$route.name == 'company')) {
                    console.log('company接收监听')
                    this.serchData();
                }
            })
        },
        beforeDestory() { // 销毁前
            this.$root.eventHub.$off('globalDataChange');
        },
        watch: {

        },
        methods: {
            // 初始化獲取value值
            initValue(res) {
                res.forEach((item, index) => {
                    if (index == 0 && item.value) {
                        this.initVal.push(item.value);
                        if (item.children && typeof item.children == "object") {
                            this.initValue(item.children);
                        }
                    }
                })
            },
            initData(obj) {
                for (let i in obj) {
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
                    if (item.children) {
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
                    } else {
                        var _children = [];
                    }

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
            // 查看附件
            showFiles(row, index) {
                this.files.list = row['filepath'];
                this.files.title = row.companyName;
                this.files.index = index;
                this.files.show = true;
            },
            //条件
            spinFilter() {
                // console.log(this.condition);
                var filter = this.condition
                    .filter(item => {
                        return item.value && item.value.length > 0;
                    })
                    .map(item => {
                        if (item.inputEdit) {
                            let select = item.input == undefined ? "" : item.input;
                            return {
                                contains: true,
                                select: select,
                                key: item.value[item.value.length - 1]
                            };
                        } else {
                            let select = [];
                            select.push(item.value[item.value.length - 1]);
                            return {
                                contains: true,
                                select: select,
                                key: item.value.slice(0, -1)[item.value.slice(0, -1).length - 1]
                            };
                        }
                    });
                return filter;
            },
            getDataList() {
                var filter = this.spinFilter();
                let condition = {
                    filter: filter,
                    pagination: {
                        currPage: this.pageIndex,
                        pageSize: this.pageSize
                    }
                };

                this.$http({
                    url: this.$http.adornUrl(
                        "op=bigtablecontroller&func=getComListForComQuery",
                        "XZX"
                    ),
                    // url:
                    //   "https://www.easy-mock.com/mock/5bee5f836142a550e9bddafc/nsbg_easymock/getCompanyDatalist#!method=post",
                    method: "post",
                    data: {
                        condition: JSON.stringify(condition)
                    }
                }).then(({
                    data
                }) => {
                    if (data.code == 200 && data.data) {
                        this.dataList = data.data.tbody;
                        this.dataHead = data.data.thead;
                        if (data.data.pageParams) {
                            this.totalPage = data.data.pageParams.total;
                        }

                    } else {
                        this.dataList = [];
                        this.totalPage = 0;
                        this.$message.info(data.status_desc);
                    }
                    this.dataListLoading = false;
                });
            },
            //查询
            serchData() {
                this.pageIndex = 1;
                this.getDataList();
            },
            //重置表单
            resetFormList() {
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
            addRow() {
                this.condition.push({
                    options: this.conditionData,
                    value: [],
                    inputEdit: false,
                    input: ""
                });
            },
            delRow(index) {
                // console.log(index);
                if (index != 0) {
                    this.condition.splice(index, 1);
                }
            },
            isNeedEdit(type, index) {
                // var needInput = [["A_A1_1"], ["B_B11_3"], ["B_B12_1"]];
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
            //条件改变
            conditionChange(item, index) {
                // console.log(item)
                // console.dir(index);
                this.isNeedEdit("condition", index);
            },
            // 每页数
            sizeChangeHandle(val) {
                this.pageSize = val;
                this.pageIndex = 1;
                this.getDataList();
            },
            // 当前页
            currentChangeHandle(val) {
                this.pageIndex = val;
                this.getDataList();
            },
            //查看答卷
            checkPaper(row) {
                var temp = previewAddress(row.id);
                window.open(
                    temp
                );
            },
            downloadFilepath(row) {
                // debugger;
                let url = this.$http.adornUrl("op=bigtablecontroller&func=downloadFilepath", "XZX");
                let path = Base64.encode(row.filepath);
                window.open(url + "&files=" + path);
                return;
                this.$http({
                    url: url,
                    // url: 'https://www.easy-mock.com/mock/5bee5f836142a550e9bddafc/nsbg_easymock/signIn#!method=post',
                    method: "post",
                    data: {


                    }
                }).then(({
                    data
                }) => {
                    if (data.code == 200) {
                        this.$message({
                            type: "success",
                            message: data.status_desc
                        });
                    } else {
                        this.$message.error(data.status_desc);
                    }
                });
            },
            validatePWd() {
                const h = this.$createElement;
                this.$prompt(
                        "为确保数据安全性，请输入登录密码。",
                        "即将导出当前搜索条件下全部联系方式", {
                            message: h("p", null, [
                                h("span", null, "为确保数据安全性，"),
                                h("span", {
                                    style: "color: #F04134"
                                }, "请输入登陆密码。")
                            ]),
                            inputType: "password",
                            confirmButtonText: "确定",
                            cancelButtonText: "取消"
                        }
                    )
                    .then(({
                        value
                    }) => {
                        this.checkPwd(value);
                    })
                    .catch(e => {});
            },
            checkPwd(value) {
                // console.log(value);
                // console.log(this.$store.state.user);
                this.$http({
                    url: this.$http.adornUrl("op=bigtablecontroller&func=signIn", "XZX"),
                    // url: 'https://www.easy-mock.com/mock/5bee5f836142a550e9bddafc/nsbg_easymock/signIn#!method=post',
                    method: "post",
                    data: {
                        userInfo: JSON.stringify({
                            // username: this.$store.state.user.name,
                            username: sessionStorage.getItem("username"),
                            passwd: value
                        })
                    }
                }).then(({
                    data
                }) => {
                    if (data.code == 200) {
                        this.$message({
                            type: "success",
                            message: "密码正确，正在下载···"
                        });
                        this.downExcel();
                    } else {
                        this.$message.error(data.status_desc);
                    }
                });
            },
            //下载excel
            downExcel() {
                var filter = this.spinFilter();
                let condition = {
                    filter: filter
                };

                this.$http({
                    url: this.$http.adornUrl(
                        "op=bigtablecontroller&func=exportContactToExcel",
                        "XZX"
                    ),
                    // url:
                    //   "https://www.easy-mock.com/mock/5bee5f836142a550e9bddafc/nsbg_easymock/exportContactToExcel#!method=post",
                    method: "post",
                    data: {
                        condition: JSON.stringify(condition)
                    }
                }).then(({
                    data
                }) => {
                    if (data.code == 200) {
                        var fileName = data.data.fileName;
                        window.open(
                            this.$http.adornUrl(
                                "op=bigtablecontroller&func=downloadFile&filter=no-filter&fileName=" +
                                fileName,
                                "XZX"
                            )
                        );
                        // this.$http({
                        //   url: this.$http.adornUrl(
                        //     "/webservice/index.php?user=bigtable&pwd=bigtable1001&gtype=http&op=bigtablecontroller&func=downloadFile&filter=no-filter&fileName=" +
                        //       fileName,
                        //     "XZX"
                        //   ),
                        //   method: "get"
                        // }).then(({ data }) => {
                        //   console.dir(data)
                        //   if (data.code == 200) {
                        //   } else {
                        //     this.$message.success(data.status_desc);
                        //   }
                        // });
                    } else {
                        this.$message.success(data.status_desc);
                    }
                });
            },
            test(data) {
                console.dir(data);
            }
        }
    };
</script>
<style>
    .flex-right {
        display: flex;
        justify-content: flex-end;
    }
    
    .fileList {
        max-height: 88px;
        overflow: hidden;
    }
    
    .fileItem {
        display: inline-block;
        margin-right: 4px;
        margin-top: 2px;
        margin-bottom: 2px;
    }
</style>