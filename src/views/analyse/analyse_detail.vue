<template>
  <el-dialog :title="title" :close-on-click-modal="false" :visible.sync="visible" width="80%">
    <div class="mod-user">
      <el-form :model="dataForm" @keyup.enter.native="getDataList1()" @submit.native.prevent>
        <el-form-item>
          <el-input v-model="dataForm.companyName" placeholder="请输入企业名" clearable style="width:500px"></el-input>
          <el-button type="primary" @click="getDataList1()">搜索企业名称</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="dataList" @sort-change="sortChange" border v-loading="dataListLoading" style="width: 100%;">
        <el-table-column type="index" :index="(pageIndex-1)*pageSize+1" header-align="center" align="center" width="50"
          label="序号"></el-table-column>
        <!--<el-table-column header-align="center" align="center" width="80" label="企业标签">-->
          <!--<template slot-scope="scope">-->
            <!--<el-tag v-if="scope.row.fourOrCountry === '1'||scope.row.fourOrCountry === '1,2'" color="#4794F9"-->
              <!--size="mini" style="color:#fff">四上</el-tag>-->
            <!--<el-tag v-if="scope.row.fourOrCountry === '2'||scope.row.fourOrCountry === '1,2'" color="#F63030"-->
              <!--size="mini" style="color:#fff">国高</el-tag>-->
          <!--</template>-->
<!--</el-table-column>-->
<el-table-column v-for="(item,key) in dataHead" :key="key" :prop="key" header-align="center" :align="key=='company_name'?'left':'center'" :label="item" :width="key=='company_name'?'500px':'auto'" :sortable="key=='data'?'custom':false"></el-table-column>

<el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
    <template slot-scope="scope">
            <el-button type="text" size="small" @click="checkPaper(scope.row)">查看答卷</el-button>
          </template>
</el-table-column>
</el-table>
<el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex" :page-sizes="[5, 10, 20, 50,100]" :page-size="pageSize" :total="totalPage" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
</div>
</el-dialog>
</template>

<script>
    import {
        previewAddress
    } from '@/utils'
    export default {
        data() {
            return {
                visible: false,
                title: "",
                dataForm: {
                    companyName: ""
                },
                sort: "desc", //asc
                dataInfo: {},
                dataHead: {},
                dataList: [],
                pageIndex: 1,
                pageSize: 5,
                totalPage: 0,
                dataListLoading: false
            };
        },

        activated() {

        },
        methods: {
            init(data, title) {
                this.dataInfo = data;
                // console.log(this.dataInfo);
                this.title = title;
                this.dataForm.companyName = data.keyword;
                this.pageIndex = data.pageParams.currIndex;
                this.pageSize = data.pageParams.pageSize;
                this.keyword = data.keyword;
                // this.pageParams = this.dataInfo.pageParams;

                this.getDataList();
            },
            getDataList1() {
                this.pageIndex = 1;
                this.getDataList();
            },
            // 获取数据列表
            getDataList() {
                this.dataListLoading = true;
                var dataInfo = {
                    keyword: this.dataForm.companyName,
                    groupName: this.dataInfo.groupName,
                    nameCode: this.dataInfo.nameCode,
                    pageParams: {
                        currIndex: this.pageIndex,
                        pageSize: this.pageSize
                    }
                };
                this.$http({
                    url: this.$http.adornUrl(
                        "op=bigtablecontroller&func=getComRegInfo",
                        "CQ"
                    ),
                    method: "post",
                    data: {
                        dataInfo: JSON.stringify(dataInfo)
                    }
                }).then(({
                    data
                }) => {
                    if (data.code == 200 && data.data && data.data.data ) {
                        this.dataList = data.data.data;
                        this.dataHead = data.data.thead;

                        this.totalPage = data.data.pageParams.total;
                        this.visible = true;
                        this.dataListLoading = false;
                    } else {
                        this.dataList = [];
                        this.totalPage = 0;
                        this.$message.error(data.status_desc);
                    }
                });
            },
            // 每页数
            sizeChangeHandle(val) {
                this.pageSize = val;
                this.pageIndex = 1;
                this.getDataList();
            },
            // 当前页
            currentChangeHandle(val) {
                // console.log(val);
                this.pageIndex = val;
                this.getDataList();
            },
            //远程排序
            sortChange(sort) {
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
            //查看答卷
            checkPaper(row) {
                // console.log(row);
                var temp = previewAddress(row.company_id);
                window.open(
                    temp
                );

            }
        }
    };
</script>

<style>
    .el-dialog {
        width: 75%;
    }
</style>