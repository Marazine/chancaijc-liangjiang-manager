<template>
  <el-dialog :title="title" :close-on-click-modal="false" :visible.sync="visible" width="70%">
    <div class="mod-user">
      <el-form :model="dataForm" @keyup.enter.native="getDataList()" @submit.native.prevent>
        <el-form-item>
          <el-input v-model="dataForm.companyName" placeholder="请输入" clearable style="width:500px"></el-input>
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
<el-table-column v-for="(item,key) in dataHead" :key="key" :prop="key" header-align="center" :align="key=='companyName'?'left':'center'" :label="item" :width="key=='companyName'?'400px':'auto'" :sortable="key=='data'?'custom':false"></el-table-column>

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
                condition: {},
                dataHead: {},
                dataList: [],
                pageIndex: 1,
                pageSize: 5,
                totalPage: 0,
                dataListLoading: false
            };
        },

        activated() {
            // this.condition = JSON.parse(this.$route.params.condition);
            // this.condition.filter.forEach(element => {
            //   // console.log(element.key);
            //   if (element.key == "A_A1_1") {
            //     this.dataForm.companyName = element.select;
            //     // console.log(element.select);
            //   }
            // });
            // console.log(this.dataForm.companyName);
            // this.getDataList();
        },
        methods: {
            init(data, title) {
                this.condition = data;
                this.title = title;
                // console.dir(data);
                this.pageIndex = this.condition.pagination.currPage;
                this.pageSize = this.condition.pagination.pageSize;
                this.condition.filter.forEach(element => {
                    // console.log(element.key);
                    if (element.key == "A_A1_1") {
                        this.dataForm.companyName = element.select;
                        // console.log(element.select);
                    } else {
                        this.dataForm.companyName = "";
                    }
                });
                // console.log(this.dataForm.companyName);

                this.getDataList();
            },
            // 获取数据列表
            getDataList1() {
                this.pageIndex = 1;
                this.getDataList();
            },
            getDataList() {
                //是否有企业参数
                var havaCompanyName = false;
                this.condition.filter.forEach(element => {
                    if (element.key == "A_A1_1") {
                        element.select = this.dataForm.companyName;
                        havaCompanyName = true;
                    }
                });
                if (!havaCompanyName && this.dataForm.companyName != "") {
                    this.condition.filter.push({
                        key: "A_A1_1",
                        select: this.dataForm.companyName
                    });
                }
                //参数
                var condition = {
                    filter: this.condition.filter,
                    query: this.condition.query,
                    sorting: this.sort,
                    pagination: {
                        currPage: this.pageIndex,
                        pageSize: this.pageSize
                    }
                };
                // console.dir(condition);
                this.dataListLoading = true;
                this.$http({
                    url: this.$http.adornUrl(
                        "op=bigtablecontroller&func=getComListByPageForDataStati",
                        "XZX"
                    ),
                    // url:
                    //   "http://192.168.60.161:8080/webservice/index.php?user=bigtable&pwd=bigtable1001&op=bigtablecontroller&func=getComListByPageForDataStati&gtype=http",
                    method: "post",
                    data: {
                        condition: JSON.stringify(condition)
                    }
                }).then(({
                    data
                }) => {
                    this.visible = true;

                    if (data.code == 200) {
                        this.dataList = data.data.tbody;
                        this.dataHead = data.data.thead;
                        this.totalPage = data.data.pageParams.total;
                    } else {
                        this.dataList = [];
                        this.totalPage = 0;
                        this.$message.error(data.status_desc);
                    }
                    this.dataListLoading = false;
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
                this.pageIndex = val;
                this.getDataList();
            },
            //远程排序
            sortChange(sort) {
                switch (sort.prop) {
                    case "data":
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
                var temp = previewAddress(row.id);
                window.open(
                    temp
                );
            }
        }
    };
</script>