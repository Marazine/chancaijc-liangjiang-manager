<template>
  <el-dialog :title="'选择接口'"
             :close-on-click-modal="false"
             append-to-body
             :visible.sync="visible">
    <div class="mod-user userBox">
      <el-button @click="makeSureClick()" type="primary">确定</el-button>
      <el-container>
        <el-table :data="dataList"
                  border
                  v-loading="dataListLoading"
                  @selection-change="selectionChangeHandle"
                  style="width: 100%;">
          <el-table-column type="selection"
                           header-align="center"
                           align="center"
                           width="50">
          </el-table-column>

          <el-table-column prop="name"
                           header-align="center"
                           align="center"
                           label="接口名称">
          </el-table-column>

          <el-table-column prop="apiPath"
                           header-align="center"
                           align="center"
                           label="接口地址">
          </el-table-column>

          <el-table-column prop="extendInfo"
                           header-align="center"
                           align="center"
                           label="扩展信息">
          </el-table-column>

          <el-table-column prop="status"
                           header-align="center"
                           align="center"
                           label="状态">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status === 2"
                      size="small"
                      type="danger">禁用</el-tag>
              <el-tag v-else
                      size="small">正常</el-tag>
            </template>
          </el-table-column>

          <el-table-column prop="createtime"
                           header-align="center"
                           align="center"
                           width="180"
                           label="创建时间">
          </el-table-column>
        </el-table>
      </el-container>
      <el-pagination @size-change="sizeChangeHandle"
                     @current-change="currentChangeHandle"
                     :current-page="pageIndex"
                     :page-sizes="[10, 20, 50, 100]"
                     :page-size="pageSize"
                     :total="totalPage"
                     layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </div>
  </el-dialog>

</template>

<script>
export default {
  data() {
    return {
      visible: false, //控制弹窗的显示
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: []
    };
  },
  methods: {
    initDialog(v) {
      this.visible = true;
      this.dataListSelections=[];
      this.getDataList();
    },

    //确定所选数据
    makeSureClick() {
      //获取到选中的数据,并传回上一个页面
      if(this.dataListSelections.length<=0){
        this.$message.error("请选择一个接口");
        return;
      }
      this.visible = false;
      this.$emit("refreshData", this.dataListSelections);
    },

    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl("/api/list", "CQ"),
        method: "post",
        data: {
          status:1,
          pageNo: this.pageIndex,
          pageSize: this.pageSize
        }
      }).then(({ data }) => {
        if (data && data.code == 200) {
          this.dataList = data.data;
          this.totalPage = data.pageparam.sums;
        } else {
          this.dataList = [];
          this.totalPage = 0;
        }
        this.dataListLoading = false;
      });
    },

    // 表格选中
    selectionChangeHandle(val) {
      this.dataListSelections = val;
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
    }
  }
};
</script>

<style scoped>
</style>
