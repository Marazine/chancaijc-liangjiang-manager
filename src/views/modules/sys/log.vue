<template>
  <div class="mod-user">
    <!-- 表单搜索 START -->
    <el-form :inline="true" class="">
        <el-form-item>
            <el-input v-model="condition.user" placeholder="操作人" clearable></el-input>
        </el-form-item>
        <el-form-item>
            <el-input v-model="condition.ip" placeholder="ip" clearable></el-input>
        </el-form-item>
        <el-form-item>
            <el-select  v-model="condition.userType" filterable clearable placeholder="操作平台">
              <el-option label="分析系统" value="1"></el-option>
              <el-option label="问卷系统" value="2"></el-option>
            </el-select>
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
    <el-table :data="dataList" border v-loading="dataListLoading" style="width: 100%;">
      <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
      <el-table-column prop="operatorId" header-align="center" align="center" label="操作人ID"></el-table-column>
      <el-table-column prop="user" header-align="center" align="center" label="操作人"></el-table-column>
      <el-table-column prop="userType" header-align="center" align="center" label="操作平台">
        <template slot-scope="scope">
          <span v-if="scope.row.userType == 2">问卷系统</span>
          <span v-else>分析系统</span>
        </template>
      </el-table-column>
      <!--<el-table-column prop="operatorType" header-align="center" align="center" label="操作类型">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.operatorType === 0" size="small" type="danger"></el-tag>
          <el-tag v-else size="small">正常</el-tag>
        </template>
      </el-table-column>-->
      <el-table-column prop="operationDesc" header-align="center" align="center" label="操作描述"></el-table-column>
      <el-table-column prop="ip" header-align="center" align="center" label="ip"></el-table-column>
      <el-table-column prop="createtime" header-align="center" align="center" width="180" label="操作时间"></el-table-column>
      <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
        <template slot-scope="scope">
          <el-button v-if="isAuth('sys:log:info')" type="text" size="small" @click="addOrUpdateHandle(scope.row.admin_id)">修改</el-button>
        </template>
        <!--查看详情-->
        <template slot-scope="scope">
          <el-button v-if="isAuth('sys:log:info')" type="text" size="small" @click="infoHandle(scope.row.id)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
    <!--查看详情-->
    <log-info v-if="infoVisible" ref="logInfo" @refreshDataList="getDataList"></log-info>
  </div>
</template>

<script>
import AddOrUpdate from "./user-add-or-update";
import logInfo from "./log-info";

export default {
  data() {
    return {
      dataForm: {
        id:"",
        type:"",
        operatorId:"",
        user:"",
        operatorType:"",
        operationDesc:"",
        ip: "",
        createtime:""
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
      infoVisible: false,
      time: [],
      condition: {
        user: '',
        ip: '',
        userType: '',
        startTime: '',
        endTime: '',
      }
    };
  },
  components: {
    AddOrUpdate,
    logInfo
  },
  created () {
    this.getDataList()
  },
  activated() {
    this.getDataList()
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
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true
      let url = this.$http.adornUrl("/operator/list", "CQ"),
      param = {
        pageNo: this.pageIndex,
        pageSize: this.pageSize,
        condition: JSON.stringify(this.condition)
      }
      this.$http({
        url: url,
        method: "post",
        data: param
      }).then(({ data }) => {
        if (data && data.code == 200) {
          this.dataList = data.data;
          this.totalPage = data.pageparam.sums;
          this.pageIndex = data.pageparam.page;
          this.pageSize = data.pageparam.page_size;
        } else {
          this.dataList = [];
          this.totalPage = 0;
        }
        this.dataListLoading = false;
      });
    },
    serchData() {
      this.pageIndex = 1;
      this.getDataList();
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
    // 查看
    addOrUpdateHandle(id) {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id);
      });
    },
    //跳转详情页
    infoHandle(id) {
      this.infoVisible = true;
      this.$nextTick(() => {
        this.$refs.logInfo.init(id);
      });
    },
  }
};
</script>

<style lang="scss" scoped>
.mod-user {
  .my-form {
      .el-form-item__content {
          .el-input__inner {
              padding-right: 4px;
          }
      }
  }
}
</style>
