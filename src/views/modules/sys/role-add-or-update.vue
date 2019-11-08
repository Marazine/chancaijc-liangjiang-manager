<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">

      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="dataForm.roleName" placeholder="角色名称"></el-input>
      </el-form-item>

      <el-form-item label="备注" prop="remark">
        <el-input v-model="dataForm.remark" placeholder="备注" maxlength="100"></el-input>
      </el-form-item>

      <el-form-item label="排序" prop="ranking">
        <el-input v-model="dataForm.ranking" placeholder="排序"></el-input>
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="dataForm.status">
          <el-radio v-for="(status, index) in dataForm.statusList" :label="index+1" :key="index">{{ status }}</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item size="mini" label="授权">
        <el-tree
          :data="menuList"
          :props="menuListTreeProps"
          node-key="menuId"
          ref="menuListTree"
          show-checkbox>
        </el-tree>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { treeDataTranslate } from "@/utils";
export default {
  data() {
    return {
      visible: false,
      menuList: [],
      menuListTreeProps: {
        label: "name",
        children: "children"
      },
      dataForm: {
        id: 0,
        roleName: "",
        remark: "",
        status: 1,
        ranking: 0,
        statusList: ["正常", "禁用"]
      },
      dataRule: {
        roleName: [
          { required: true, message: "角色名称不能为空", trigger: "blur" }
        ]
      },
      tempKey: -666666 // 临时key, 用于解决tree半选中状态项不能传给后台接口问题. # 待优化
    };
  },
  methods: {
    init(id) {
      this.dataForm.id = id || 0;
      this.$http({
        url: this.$http.adornUrl("/menu/list", "CQ"),
        method: "post",
        data: this.$http.adornParams()
      })
        .then(({ data }) => {
          if (data.code == 200) {
            this.menuList = treeDataTranslate(data.data, "menuId");
            console.log(this.menuList);
          }
        })
        .then(() => {
          this.visible = true;
          this.$nextTick(() => {
            this.$refs["dataForm"].resetFields();
            this.$refs.menuListTree.setCheckedKeys([]);
          });
        })
        .then(() => {
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/role/info`, "CQ"),
              method: "post",
              data: {
                roleId: this.dataForm.id
              }
            }).then(({ data }) => {
              if (data && data.code == 200) {
                this.dataForm.roleName = data.data.name;
                this.dataForm.remark = data.data.remark;
                this.dataForm.ranking = data.data.ranking;
                this.dataForm.status = data.data.status;
                // this.dataForm.menuIdList.forEach(item => this.$refs.menuListTree.setChecked(item, true))
                var idx = data.data.menuIdList.indexOf(this.tempKey);
                if (idx !== -1) {
                  data.data.menuIdList.splice(
                    idx,
                    data.data.menuIdList.length - idx
                  );
                }
                this.$refs.menuListTree.setCheckedKeys(data.data.menuIdList);
              }
            });
          }
        });
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(
              `/role/${!this.dataForm.id ? "save" : "update"}`,
              "CQ"
            ),
            method: "post",
            data: {
              roleInfo: JSON.stringify({
                name: this.dataForm.roleName,
                remark: this.dataForm.remark,
                id: this.dataForm.id || "",
                ranking: this.dataForm.ranking,
                status: this.dataForm.status
              }),
              permissionIds: []
                .concat(
                  this.$refs.menuListTree.getCheckedKeys(),
                  this.$refs.menuListTree.getHalfCheckedKeys()
                )
                .join(",")
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
