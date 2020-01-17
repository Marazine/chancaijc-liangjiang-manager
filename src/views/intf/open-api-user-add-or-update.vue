<template>
  <div>
    <el-dialog :title="!dataForm.id ? '新增' : '修改'"
               :close-on-click-modal="false"
               :visible.sync="visible">
      <el-form :model="dataForm"
               :rules="dataRule"
               ref="dataForm"
               @keyup.enter.native="dataFormSubmit()"
               label-width="140px">

        <el-form-item label="接口用户名称"
                      prop="name"
                      class="is-required">
          <el-input v-model="dataForm.name"
                    placeholder="接口用户名称"></el-input>
        </el-form-item>

        <el-form-item label="是否有所有接口权限"
                      size="mini"
                      prop="isAll">
          <el-radio-group v-model="dataForm.isAll">
            <el-radio :label="2">有</el-radio>
            <el-radio :label="1">无</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="备注"
                      prop="remark">
          <el-input v-model="dataForm.remark"
                    placeholder="备注"></el-input>
        </el-form-item>

        <!-- 接收选择的接口列表 -->
        <el-form-item>
          <el-button @click="bindIntf">已选择接口{{inftNumber}}个</el-button>
        </el-form-item>

        <el-form-item label="状态"
                      size="mini"
                      prop="status">
          <el-radio-group v-model="dataForm.status"
                          :disabled="dataForm.is_root==2">
            <el-radio :label="2">禁用</el-radio>
            <el-radio :label="1">正常</el-radio>
          </el-radio-group>
        </el-form-item>

      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary"
                   @click="dataFormSubmit()">确定</el-button>
      </span>
    </el-dialog>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="apiDialogVisible" ref="apiDialog" @refreshData="refreshData"></add-or-update>
  </div>

</template>

<script>
import AddOrUpdate from "./open-api-user-choosen-dialog";
export default {
  data() {
    return {
      visible: false,
      apiDialogVisible:false,
      dataListSelections: [],
      inftNumber:0,
      dataForm: {
        id: -1, //主键ID
        name: "", //接口用户名称
        remark: "", //备注
        isAll: 1, //是否有所有接口的权限
        status: 1 //1正常 2禁用
      },
      dataRule: {
        name: [
          { required: true, message: "接口用户名称不能为空", trigger: "blur" }
        ]
      }
    };
  },
  components: {
    AddOrUpdate
  },
  methods: {

    //选择用户后的回调
    refreshData(data){
      this.dataListSelections.length=0;
      this.inftNumber=data.length;
      data.forEach(v=>{  
        this.dataListSelections.push(v.id);
      });
    },
    
    //绑定接口
    bindIntf(){
      this.apiDialogVisible = true;
      this.$nextTick(() => {
        this.$refs.apiDialog.initDialog(11);
      });
    },

    //初始化
    init(id) {
      this.visible = true;
      this.dataForm.id = id || 0;
      this.dataListSelections=[];
      if (this.dataForm.id) {
        this.$http({
          url: this.$http.adornUrl(`/api_user/info`, "CQ"),
          method: "post",
          data: {
            apiInfo: JSON.stringify({
              key: "id",
              value: this.dataForm.id
            })
          }
        }).then(({ data }) => {
          if (data && data.code == 200) {
            this.dataForm.name = data.data.name;
            this.dataForm.isAll = data.data.isAll;
            this.dataForm.remark = data.data.remark;
            this.dataForm.status = data.data.status;
            data.data.commonOpenApiList.forEach(v=>{  
              this.dataListSelections.push(v.id);
            });
            this.inftNumber=this.dataListSelections.length;
          }
        });
      }
    },

    // 表单提交
    dataFormSubmit() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          let ids=this.dataListSelections.map(item => {
              return item;
            }).join(",");
          this.$http({
            url: this.$http.adornUrl(
              `/api_user/${!this.dataForm.id ? "add" : "update"}`,
              "CQ"
            ),
            method: "post",
            data: {
              commonApiUser: JSON.stringify({
                id: this.dataForm.id, //主键编号
                name: this.dataForm.name, //接口名称
                isAll: this.dataForm.isAll, //接口地址
                remark: this.dataForm.remark, //扩展信息
                status: this.dataForm.status //1正常 2禁用
              }),
              openApiIds:ids////存放和API的关联信息,以逗号分隔
            }
          }).then(({ data }) => {
            if (data && data.code == 200) {
              this.$message({
                message: "操作成功",
                type: "success",
                duration: 1500,
                onClose: () => {
                  this.visible = false;
                  this.$emit("refreshDataList");
                }
              });
            } else {
              this.$message.error(data.status_desc);
            }
          });
        }
      });
    }
  }
};
</script>
