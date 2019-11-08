<template>
    <el-dialog :title="'F'+title+'当前计划引进人才数'" :visible.sync="visible">
        <!-- 搜索 -->
        <el-form :model="dataForm" @keyup.enter.native="getDataList1()" @submit.native.prevent>
            <el-form-item>
                <el-input v-model="dataForm.companyName" placeholder="请输入" clearable style="width:50%"></el-input>
                <el-button type="primary" @click="getDataList1()">搜索企业名称</el-button>
            </el-form-item>
        </el-form>
        <!-- 列表 -->
        <el-table :data="dataList" style="width: 100%">
            <el-table-column type="index" label="序号" width="50">
            </el-table-column>
            <el-table-column v-for="(item,key) of tableThead" :key="key" :prop="key" :label="item"
                :align="key=='company_name'?'left':'center'" :width="key=='company_name'?'500px':'auto'">
            </el-table-column>
            <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="checkpaper(scope.row)">查看详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="currIndex"
            :page-sizes="[5, 10, 20, 50,100]" :page-size="pageSize" :total="totalPage"
            layout="total, sizes, prev, pager, next, jumper"></el-pagination>
    </el-dialog>
</template>

<script>
    export default {
        name: 'analyseF',
        data() {
            return {
                tableData: [],
                nameAdd: this.$route.params.nameAdd,
                code: this.$route.params.code,
                title: "",
                visible: false,
                dataForm: {
                    companyName: ""
                },
                currIndex: 1,
                sort: "desc", //asc
                pageSize: 10,
                groupName: "",
                tradeType: "",
                tableThead: "",
                totalPage: 0,
                dataList: [],
                companyId: "",//公司ID
                companyName: "",//公司名称
                dataListLoading: false
            }
        },
        created() {

        },
        methods: {
            init(data) {
                this.groupName = data.groupName;
                this.title = data.nameAdd;
                this.tradeType = data.nameAdd.slice(0, 1);
                this.dataForm.companyName = "";
                if (data.select % 2 == 0) {
                    this.groupName = "";
                } else {
                    this.tradeType = "";
                }
                this.getDataList();
            },
            // 企业搜索
            getDataList1() {
                this.currIndex = 1;
                this.getDataList();
            },
            getDataList() {
                // this.currIndex = 1
                var dataInfo = {
                    areaName: this.groupName,
                    tradeType: this.tradeType,
                    companyName: this.dataForm.companyName,
                    pageParams: {
                        currIndex: this.currIndex,
                        pageSize: this.pageSize
                    }
                }
                this.$http({
                    url: this.$http.adornUrl(
                        "op=bigtablecontroller&func=personGapCompanyList",
                        "CQ"
                    ),
                    method: "post",
                    data: {
                        groupName: JSON.stringify(dataInfo)
                    }
                }).then((data) => {
                    this.visible = true;
                    this.tableData = data.data.data;
                    this.tableThead = data.data.thead;
                    this.dataList = [];
                    for (var item of data.data.data) {
                        this.dataList.push({
                            company_name: item.companyName,
                            area_name: item.groupName,
                            position_count: item.positionNameCount,
                            person_sum: item.gapCount
                        })
                    }
                    this.totalPage = data.data.pageParams.total;
                })
            },
            // 每页数
            sizeChangeHandle(val) {
                this.pageSize = val;
                this.pageIndex = 1;
                this.getDataList();
            },
            // 当前页
            currentChangeHandle(val) {
                this.currIndex = val;
                this.getDataList();
            },
            //远程排序
            sortChange(sort) {
                // console.dir(sort);
                switch (sort.prop) {
                    case "value":
                        if (sort.order == "descending") {
                            this.sort = "desc";
                        } else {
                            this.sort = "asc";
                        }
                        break;

                    default:
                        break;
                }
                this.getDataList();
            },
            checkpaper(row) {
                this.tableData.forEach((item) => {
                    if (item.companyName == row.company_name) {
                        this.companyId = item.companyId;
                        this.companyName = row.company_name
                    }
                })
                // this.$router.push({
                //     name: "analyseF_detail",
                //     params: {
                //         companyId: this.companyId,
                //         companyName: this.companyName
                //     }
                // })
                let routeUrl = this.$router.resolve({
                    name: "analyseF_detail",
                    params: {
                        companyId: this.companyId,
                        companyName: this.companyName
                    }
                });
                window.open(routeUrl.href, '_blank');
            }
        }
    }
</script>
<style>
    .el-collapse-item__header {
        font-size: 16px;
        font-weight: bold;
        height: 48px;
        line-height: 48px;
        color: #303133;
        cursor: pointer;
        border-bottom: 1px solid #ebeef5;
    }

    .el-dialog {
        width: 75%;
    }
</style>