<template>
  <el-dialog :title="!dataForm.id ? '新增' : '修改'"
             :close-on-click-modal="false"
             :visible.sync="visible">
    <el-form :model="dataForm"
             :rules="dataRule"
             ref="dataForm"
             @keyup.enter.native="dataFormSubmit()"
             label-width="80px">

      <el-form-item label="接口名称"
                    prop="name"
                    class="is-required">
        <el-input v-model="dataForm.name"
                  placeholder="接口名称"></el-input>
      </el-form-item>

      <el-form-item label="接口地址"
                    prop="apiPath">
        <el-input v-model="dataForm.apiPath"
                  placeholder="/sys/user/list"></el-input>
      </el-form-item>

      <el-form-item label="扩展信息"
                    prop="extendInfo">
        <el-input v-model="dataForm.extendInfo"
                  placeholder="扩展信息"></el-input>
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
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      dataForm: {
        id: -1, //主键ID
        name: "", //接口名称
        apiPath: "", //接口地址
        extendInfo: "", //扩展信息
        status: 1 //1正常 2禁用
      },
      dataRule: {
        name: [
          { required: true, message: "接口名称不能为空", trigger: "blur" }
        ],
        apiPath: [
          { required: true, message: "接口请求地址不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    init(id) {
      this.visible=true;
      this.dataForm.id = id || 0;
      if (this.dataForm.id) {
        this.$http({
          url: this.$http.adornUrl(`/api/info`, "CQ"),
          method: "post",
          data: {
            id: this.dataForm.id
          }
        }).then(({ data }) => {
          if (data && data.code == 200) {
            this.dataForm.name = data.data.name;
            this.dataForm.apiPath = data.data.apiPath;
            this.dataForm.extendInfo = data.data.extendInfo;
            this.dataForm.status = data.data.status;
          }
        });
      }
    },

    // 表单提交
    dataFormSubmit() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(
              `/api/${!this.dataForm.id ? "add" : "update"}`,
              "CQ"
            ),
            method: "post",
            data: {
              commonOpenApi: JSON.stringify({
                id: this.dataForm.id, //主键编号
                name: this.dataForm.name, //接口名称
                apiPath: this.dataForm.apiPath, //接口地址
                extendInfo: this.dataForm.extendInfo, //扩展信息
                status: this.dataForm.status //1正常 2禁用
              })
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
