<template>
    <!-- <div class="com"> -->
    <div class="company-management-email">
        <!-- 表单搜索 START -->
        <el-form :inline="true" class="">
            <el-form-item class="my-form-input">
                <el-input v-model="condition.opUser" placeholder="操作人" clearable></el-input>
            </el-form-item>
            <el-form-item class="my-form">
                <el-date-picker v-model="time"
                                style="width: 70%"
                                type="daterange"
                                range-separator="-"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                format="yyyy-MM-dd"
                                value-format="yyyy-MM-dd">
                </el-date-picker>
            </el-form-item>
            <el-form-item style="marginLeft: -115px;">
                <el-button type="primary" @click="serchData()" >查询</el-button>
            </el-form-item>
        </el-form>
        <!-- 表单搜索 END -->
        <!-- 展示列表 START -->
        <el-table :data="dataList" border v-loading="dataListLoading" style="width: 100%;" >
            <el-table-column prop="batchId" label="批号" align="center" width="150"></el-table-column>
            <el-table-column prop="updateTime" label="操作时间" align="center" width="200"></el-table-column>    
            <el-table-column prop="allNum" label="发送企业数量" align="center" width="150"></el-table-column>    
            <el-table-column prop="successNum" label="发送成功数量" align="center" width="150"></el-table-column>    
            <el-table-column prop="failNum" label="发送失败数量" align="center" width="150"></el-table-column>    
            <el-table-column prop="opUser" label="操作人" align="center" ></el-table-column>    
            <el-table-column fixed="right" header-align="center" align="center" label="操作" width="150"> 
                <template slot-scope="scope">
                    <el-button v-if="isAuth('sys:company:getMailList')" type="text" size="small" @click="checkInfo(scope.row)">查看详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 展示列表 END -->
        <!-- 分页展示 START -->
        <el-pagination @size-change="sizeChangeHandle" 
                    @current-change="currentChangeHandle" 
                    :page-sizes="[10, 20, 50, 100]" 
                    :current-page="condition.pageNo"
                    :page-size="condition.pageSize" 
                    :total="totalPage"
                    layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
        <!-- 分页展示 END -->
    
        <!-- 查看详情 START -->
        <el-dialog title="邮件详情" :visible.sync="emailInfoDialogShow" @close="closeEmailDialog" width="80%">
            <el-form :model="emailInfo" style="marginTop: -20px;">
                <el-row :gutter="20">
                    <el-col :span="5">
                        <el-form-item>
                            <el-input v-model="emailInfo.companyName" placeholder="输入企业名称查询" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item>
                            <el-input v-model="emailInfo.linkEmail" placeholder="联系邮箱" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item>
                            <el-select v-model="emailInfo.status" placeholder="全部状态" clearable>
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item>
                            <el-button type="primary" @click="serchData2()" >查询</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <!-- 展示列表 START -->
            <el-table :data="dataEmail" border v-loading="emailListLoading" style="width: 100%;">
                <el-table-column prop="batchId" label="批号" align="center" width="100"></el-table-column>
                <el-table-column prop="companyName" label="企业名称" align="center" ></el-table-column>    
                <el-table-column prop="linkEmail" label="联系邮箱" align="center" ></el-table-column>    
                <el-table-column prop="updateTime" label="状态更新时间" align="center" ></el-table-column>    
                <el-table-column prop="status" label="发送状态" align="center">
                    <template slot-scope="scope">{{getStatus(scope.row.status)}}</template>
                </el-table-column>    
                <!-- <el-table-column prop="" label="返回值" align="center" ></el-table-column> -->
            </el-table>
            <!-- 展示列表 END -->
            <!-- 分页展示 START -->
            <el-pagination @size-change="sizeChangeHandle2" 
                           @current-change="currentChangeHandle2" 
                           :page-sizes="[10, 20, 50, 100]" 
                           :current-page="emailInfo.pageNo"
                           :page-size="emailInfo.pageSize" 
                           :total="totalPage2"
                           layout="total, sizes, prev, pager, next, jumper">
            </el-pagination>
            <!-- 分页展示 END -->
        </el-dialog>
        <!-- 查看详情 END -->
    </div>
</template>

<script>
  // import { condition } from "../data/menu.js";
//   import { previewAddress } from '@/utils';
export default {
    data() {
      return {
        // 搜索信息
        time: [],
        condition: {
          opUser: '',
          startTime: '',
          endTime: '',
          pageNo: 1,
          pageSize: 10,
        },
        emailInfo: {
          batchId: '',
          companyName: '',
          linkEmail: '',
          status: '',
          pageNo: 1,
          pageSize: 10,
        },
        options: [
            {
                value: '1',
                label: '发送成功'
            },
            {
                value: '2',
                label: '发送失败'
            },
        ],
        dataList: [],
        dataEmail: [],

        totalPage: 0,
        totalPage2: 0,
        dataListLoading: false,
        emailListLoading: false,
        // 查看详情弹窗显示
        emailInfoDialogShow: false,
      };
    },
    created() {
      this.getDataList();
    },
    watch: {
      time: {
        handler: function (val, oldVal) { 
          if(val == null) {
            this.condition.startTime = '';
            this.condition.endTime = '';
          } else {
            this.condition.startTime = val[0];
            this.condition.endTime = val[1];
          }
        },
        deep: true
      },
    },
    methods: {
        async getDataList() {
            try {
                this.dataListLoading = true;
                const res = await this.$http({
                    url: this.$http.adornUrl("op=company&func=batchMailList", "XZX"),
                    method: "post",
                    data: {
                        condition: JSON.stringify(this.condition)
                    }
                });
                let data = res.data;
                
                if (data.code == 200) {
                    this.dataList = data.data.data;
                    this.totalPage = data.data.total;
                    this.condition.pageNo = data.data.currIndex;
                    this.condition.pageSize = data.data.pageSize;
                } else {
                    this.$message.error(data.status_desc);
                }
                this.dataListLoading = false;
            } catch (error) {
                if(typeof error == 'object'){
                    this.$message.error("网络错误！");
                } else {
                    this.$message.error(error);
                }
            }
        },
        // 查看详情
        checkInfo(data) {
            this.emailInfo.batchId = data.batchId;
            this.emailInfoDialogShow = true;
            this.getEmailInfoData();
        },
        // 获取邮件详情信息
        async getEmailInfoData() {
            this.emailListLoading = true;
            const res = await this.$http({
                url: this.$http.adornUrl("op=company&func=getMailList", "XZX"),
                method: "post",
                data: {
                    condition: JSON.stringify(this.emailInfo)
                }
            });
            
            let data = res.data;
            if (data.code == 200) {
                this.emailListLoading = false;
                this.dataEmail = data.data.data;
                this.totalPage2 = data.data.total;
                this.emailInfo.pageNo = data.data.currIndex;
                this.emailInfo.pageSize = data.data.pageSize;
            } else {
                this.$message.error(data.status_desc);
            }
        },
        // 关闭邮件详情 弹窗
        closeEmailDialog() {
            this.dataEmail = [];
        },
        getStatus(val) {
            if(val == 1) {
                return '发送成功';
            } else if(val == 2) {
                return '发送失败';
            }
        },
        //查询
        serchData() {
            this.condition.pageNo = 1;
            this.getDataList();
        },
        // 每页数
        sizeChangeHandle(val) {
            this.condition.pageSize = val;
            this.condition.pageNo = 1;
            this.getDataList();
        },
        // 当前页
        currentChangeHandle(val) {
            this.condition.pageNo = val;
            this.getDataList();
        },
        //查询
        serchData2() {
            this.emailInfo.pageNo = 1;
            this.getEmailInfoData();
        },
        // 每页数
        sizeChangeHandle2(val) {
            this.emailInfo.pageSize = val;
            this.emailInfo.pageNo = 1;
            this.getEmailInfoData();
        },
        // 当前页
        currentChangeHandle2(val) {
            this.emailInfo.pageNo = val;
            this.getEmailInfoData();
        },
    }
};
</script>

<style lang="scss" scoped>
.company-management-email {
    .my-form {
        .el-form-item__content {
            .el-input__inner {
                padding-right: 4px;
            }
        }
    }
    .my-dialog-content {
        margin-top: -20px;
        padding-left: 30px;
    }
}

.my-bgc {
    // position: absolute;
    background-color: red;
    width: 100%;
    height: 100%;
}
/deep/ .el-form-item.my-form-input.el-form-item--medium /deep/ div.el-form-item__content {
    line-height: 32px !important;
  }
</style>
