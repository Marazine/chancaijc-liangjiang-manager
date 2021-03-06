<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      label-width="80px"
    >

      <el-form-item label="用户名" prop="userName" :class="{ 'is-required': !dataForm.id }">
        <el-input v-model="dataForm.userName" placeholder="登录帐号" :disabled="dataForm.is_root==2"></el-input>
      </el-form-item>

      <el-form-item v-if="dataForm.id==''" label="密码" prop="passWord" :class="{ 'is-required': !dataForm.id }">
        <el-input v-model="dataForm.passWord" type="passWord" placeholder="密码"></el-input>
      </el-form-item>

      <el-form-item v-if="dataForm.id==''" label="确认密码" prop="comfirmPassword" :class="{ 'is-required': !dataForm.id }">
        <el-input v-model="dataForm.comfirmPassword" type="passWord" placeholder="确认密码"></el-input>
      </el-form-item>

      <el-form-item label="姓名" prop="name">
        <el-input v-model="dataForm.name" placeholder="姓名"></el-input>
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input v-model="dataForm.email" placeholder="邮箱"></el-input>
      </el-form-item>

      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="dataForm.mobile" placeholder="手机号"></el-input>
      </el-form-item>

      <el-form-item label="角色" size="mini" prop="roleIdList">
        <el-checkbox-group v-model="dataForm.roleIdList" :disabled="dataForm.is_root==2">
          <el-checkbox v-for="role in roleList" :key="role.id" :label="role.id">{{ role.name }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="状态" size="mini" prop="status">
        <el-radio-group v-model="dataForm.status" :disabled="dataForm.is_root==2">
          <el-radio :label="2">禁用</el-radio>
          <el-radio :label="1">正常</el-radio>
        </el-radio-group>
      </el-form-item>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { isEmail, isMobile } from "@/utils/validate";
export default {
  data() {
    var validatePassword = (rule, value, callback) => {
      if (!this.dataForm.id && !/\S/.test(value)) {
        callback(new Error("密码不能为空"));
      } else {
        callback();
      }
    };
    var validateComfirmPassword = (rule, value, callback) => {
      if (!this.dataForm.id && !/\S/.test(value)) {
        callback(new Error("确认密码不能为空"));
      } else if (this.dataForm.passWord !== value) {
        callback(new Error("确认密码与密码输入不一致"));
      } else {
        callback();
      }
    };
    var validateEmail = (rule, value, callback) => {
      if (!isEmail(value)) {
        callback(new Error("邮箱格式错误"));
      } else {
        callback();
      }
    };
    var validateMobile = (rule, value, callback) => {
      if (!isMobile(value)) {
        callback(new Error("手机号格式错误"));
      } else {
        callback();
      }
    };
    return {
      visible: false,
      roleList: [],
      dataForm: {
        id: 0,
        userName: "",
        passWord: "",
        comfirmPassword: "",
        admin_id: "",
        name: "",
        salt: "",
        email: "",
        mobile: "",
        roleIdList: [],
        status: 1
      },
      dataRule: {
        admin_id: [
          { required: true, message: "管理员ID不能为空", trigger: "blur" }
        ],
        name: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
        passWord: [{ validator: validatePassword, trigger: "blur" }],
        comfirmPassword: [
          { validator: validateComfirmPassword, trigger: "blur" }
        ],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          { validator: validateEmail, trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          { validator: validateMobile, trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.dataForm = {
        id: 0,
        userName: "",
        passWord: "",
        comfirmPassword: "",
        admin_id: "",
        name: "",
        salt: "",
        email: "",
        mobile: "",
        roleIdList: [],
        status: 1
      }
  },
  methods: {
    init(id) {
      this.dataForm.id = id || 0;
      this.$http({
        url: this.$http.adornUrl("/role/select", "CQ"),
        method: "post",
        params: this.$http.adornParams()
      })
        .then(({ data }) => {
          this.roleList = data && data.code == 200 ? data.data : [];
        })
        .then(() => {
          this.visible = true;
          this.$nextTick(() => {
            this.$refs["dataForm"].resetFields();
          });
        })
        .then(() => {
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/user/info`, "CQ"),
              method: "post",
              data: {
                adminId: this.dataForm.id
              }
            }).then(({ data }) => {
              if (data && data.code == 200) {
                this.dataForm.userName = data.data.userName;
                this.dataForm.name = data.data.name;
                this.dataForm.email = data.data.email;
                this.dataForm.mobile = data.data.mobile;
                this.dataForm.roleIdList = data.data.roleIdList;
                this.dataForm.admin_id = data.data.admin_id;
                this.dataForm.status = data.data.status;
                this.dataForm.is_root = data.data.is_root;
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
              `/user/${!this.dataForm.id ? "save" : "update"}`,
              "CQ"
            ),
            method: "post",
            data: {
              roleIds: this.dataForm.roleIdList.join(","),
              adminInfo: JSON.stringify({
                admin_id: this.dataForm.admin_id,
                userName: this.dataForm.userName,
                passWord: this.dataForm.passWord,
                status: this.dataForm.status,
                name: this.dataForm.name,
                email: this.dataForm.email,
                mobile: this.dataForm.mobile
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
