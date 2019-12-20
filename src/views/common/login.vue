<template>
  <div class="site-wrapper site-page--login">
    <div class="brand-info">
      <!-- <h4>南山区人力资源局</h4> -->
      <h3>两江新区人才发展状况调研</h3>
      <p class="version">(分析平台)</p>
      <div style="padding: 30px 100px;">
        <el-form :model="dataForm"
                 :rules="dataRule"
                 ref="dataForm"
                 @keyup.enter.native="dataFormSubmit()"
                 status-icon>
          <el-form-item prop="userName">
            <el-input v-model="dataForm.userName"
                      placeholder="帐号"
                      prefix-icon="el-icon-mobile-phone"
                      class="myinput">
            </el-input>
          </el-form-item>
          <el-form-item prop="passWord">
            <el-input v-model="dataForm.passWord"
                      type="passWord"
                      placeholder="密码"
                      prefix-icon="el-icon-view"
                      class="myinput">
            </el-input>
          </el-form-item>
          <el-form-item prop="captcha">
            <el-row :gutter="20">
                <el-col :span="14">
                <el-input size="large"
                          v-model="dataForm.captcha"
                          placeholder="请输入验证码"
                          class="myinput"
                          status-icon>
                </el-input>
                </el-col>
                <el-col :span="10"
                        class="login-captcha">
                <img :src="captchaPath"
                     @click="getCaptcha()"
                     alt="" />
                </el-col>
            </el-row>
            </el-form-item>
          <el-form-item>
            <el-button class="login-btn-submit" type="primary" @click="dataFormSubmit()">登 录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { getUUID } from "@/utils"
import { encode, decode } from "punycode"
export default {
  data() {
    return {
      dataForm: {
        userName: "",
        passWord: "",
        uuid: "",
        captcha: ""
      },
      dataRule: {
        userName: [{
          required: true,
          message: "帐号不能为空",
          trigger: "blur"
        }],
        passWord: [{
          required: true,
          message: "密码不能为空",
          trigger: "blur"
        }],
        captcha: [{ 
          required: true, 
          message: "验证码不能为空", 
          trigger: "blur" 
        }]
      },
      captchaPath: ""
    }
  },
  computed: {
    userId: {
      get() {
        return this.$store.state.user.id;
      },
      set(val) {
        this.$store.commit("user/updateId", val);
      }
    },
    userName: {
      get() {
        return this.$store.state.user.name;
      },
      set(val) {
        this.$store.commit("user/updateName", val);
      }
    }
  },
  created() {
    this.getCaptcha()
    document.body.style.backgroundImage = "url("+require('../../assets/img/login_bg.jpg')+")";
        // "url(//img3.job1001.com/zhuanti/2018/nsrc_dbsys/images/bg-login.jpg)";
    document.body.style.backgroundRepeat = 'no-repeat';
  },
  methods: {
    // 提交表单
    dataFormSubmit() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          let url = this.$http.adornUrl("/user/login", "CQ"),
          param = {
            userName: this.dataForm.userName,
            passWord: Base64.encode(this.dataForm.passWord),
            captcha:this.dataForm.captcha
          }
          this.$http({
            url: url,
            method: "post",
            data: param
          }).then(({ data }) => {
            if (data && data.code == 200) {
              this.$message.success(data.status_desc);
              this.userInfo()
              this.$router.replace({
                name: "home"
              })
            } else {
              this.getCaptcha()
              this.$message.error(data.status_desc)
            }
          });
        }
        // if (valid) {
        //   this.$http({
        //       url: this.$http.adornUrl(
        //           "op=bigtablecontroller&func=signIn",
        //           "XZX"
        //       ),
        //       method: "post",
        //       data: {
        //           userInfo: JSON.stringify({
        //               username: this.dataForm.userName,
        //               passwd: this.dataForm.passWord,
        //               captcha: this.dataForm.captcha
        //           })
        //       }
        //   }).then(({
        //       data
        //   }) => {
        //       if (data.code == 200) {
        //           // debugger
        //           this.$cookie.set("token", data.data.userId);
        //           this.$store.commit("user/updateId", data.data.userId);
        //           this.$store.commit("user/updateName", data.data.username);
        //           sessionStorage.setItem("username", data.data.username);
        //           var tempStr = data.data.userId + "islogined"; // 是否首次登陆
        //           if (localStorage.getItem(tempStr) == undefined || localStorage.getItem(tempStr) == null || localStorage.getItem(tempStr) == "") {
        //               // 未登陆过
        //               localStorage.setItem(tempStr, "0");
        //           }
        //           this.$router.replace({
        //               name: "home"
        //           });
        //           this.$message.success(data.status_desc);

        //       } else {
        //           this.getCaptcha()
        //           this.$message.error(data.status_desc);
        //       }
        //   });
        // }
      })
    },
    // 获取用户详细信息
    userInfo() {
      let url = this.$http.adornUrl("/user/info", "CQ"),
        param = {
          adminId: ""
        };
      this.$http({
        url: url,
        method: "post",
        data: param
      }).then(({ data }) => {
        if (data && data.code == 200) {
          sessionStorage.setItem('user', JSON.stringify(data.data || {}))
          this.$cookie.set("token", data.user);
          this.$router.replace({ name: "home" });
        }
      });
    },
    // 获取验证码code值
    getCaptcha() {
      let url = this.$http.adornUrl("/user/initCaptcha", "CQ");
      this.$http({
        url: url,
        method: "get",
        data: {}
      }).then(({ data }) => {
        if (data && data.code == 200) {
          this.getCaptchaImage();
        }
      })
    },
    //根据验证码code获取验证码图片
    getCaptchaImage(captchaCode) {
      this.captchaPath=this.$http.adornUrl("/user/drawCaptcha", "CQ")+"&time="+ (new Date()).getTime();
    }
    // 获取验证码
    // getCaptcha() {
    //   this.dataForm.uuid = getUUID()
    //   this.captchaPath = this.$http.adornUrl(
    //       `/captcha.jpg?uuid=${this.dataForm.uuid}`
    //   )
    // }
  }
}
</script>

<style lang="scss">
.myinput .el-input__inner {
  height: 45px;
  line-height: 45px;
  background: transparent;
  color: #fff;
}  
.brand-info {
  width: 600px;
  margin: 0px auto;
  padding-top: 95px;
  color: #ffffff;
  text-align: center;
}
.brand-info h4 {
  line-height: 50px;
  font-size: 28px;
  font-weight: bold;
  margin: 0;
  padding: 0;
}
.brand-info h3 {
  line-height: 50px;
  font-size: 36px;
  font-weight: bold;
  margin: 0;
  padding: 0;
}
.brand-info .version {
  line-height: 50px;
  font-size: 25px;
  margin: 0;
  padding: 0;
}
.login-main {
  /*position: absolute;*/
  margin: 0px auto;
  top: 0;
  right: 0;
  padding: 150px 60px 180px;
  width: 470px;
  min-height: 100%;
  /*background-color: #fff;*/
}
.login-title {
  font-size: 16px;
}
.login-captcha {
  overflow: hidden;
  >img {
    width: 100%;
    cursor: pointer;
    height: 45px
  }
}
.login-btn-submit {
  width: 100%;
  height: 45px;
  margin-top: 10px;
  font-size: 22px;
  background: #c7eafe;
  color: #51b7fc;
  border: none;
}
.login-btn-submit:hover {
  opacity: 0.8;
  background: #c7eafe;
}
.el-input__icon {
  color: #fff;
  font-size: 20px;
}
</style>