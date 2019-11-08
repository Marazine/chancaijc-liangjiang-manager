<template>
  <!-- <div class="com"> -->
  <div class="company-management-list">
    <!-- 表单搜索 START -->
    <el-form :inline="true" class="">
        <el-form-item>
          <el-input v-model="condition.companyName" placeholder="输入企业名称查询" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="condition.linkMobile" placeholder="手机号查询" :maxlength="11" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="condition.status" clearable placeholder="问卷状态查询">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="condition.companyFrom" clearable placeholder="企业类型">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="serchData()">查询</el-button>
        </el-form-item>
    </el-form>
    <!-- 表单搜索 END -->
    <!-- 新增预设企业, 导入预设企业, 批量发送邮件 START -->
    <div class="company-management-list-operation">
      <el-button v-if="isAuth('sys:company:getComById')" type="primary" @click="addOrUpdateCompany('add')">新增预设企业</el-button>
      <el-button v-if="isAuth('sys:company:saveCom')" type="primary" @click="exportCompany">导入预设企业</el-button>
      <el-button v-if="isAuth('sys:company:sendEmail')" type="primary" @click="showEmailInfoDialog('more')">批量发送邮件</el-button>
    </div>
    <!-- 新增预设企业, 导入预设企业, 批量发送邮件 END -->
    <!-- 展示列表 START -->
    <el-table :data="dataList" border v-loading="dataListLoading" style="width: 100%;" @selection-change="handleSelectionChange">
      <el-table-column type="selection" align="center" width="40" fixed></el-table-column>
      <el-table-column type="index" header-align="center" align="center" width="50" label="序号" fixed></el-table-column>
      <el-table-column prop="companyName" label="企业名称" align="center" width="200" fixed></el-table-column>
      <el-table-column prop="linkMobile" label="联系电话" align="center" width="120"></el-table-column>    
      <el-table-column prop="linkEmail" label="联系邮箱" align="center" width="200"></el-table-column>    
      <el-table-column prop="companyFrom" label="类型" align="center" width="100">
        <template slot-scope="scope">
          {{getCompanyFrom(scope.row.companyFrom)}}
        </template>
      </el-table-column>    
      <!-- <el-table-column prop="name" label="短信状态" align="center" width="100"></el-table-column>    
      <el-table-column prop="name" label="邮件状态" align="center" width="100"></el-table-column>     -->
      <el-table-column prop="status" label="问卷状态" align="center" width="100">
        <template slot-scope="scope">
          {{getStatus(scope.row.status)}}
        </template>
      </el-table-column>    
      <el-table-column prop="reachRate" label="问卷完成率" align="center" width="100"></el-table-column>    
      <el-table-column prop="updateTime" label="更新时间" align="center" width="100"></el-table-column>    
      <el-table-column fixed="right" header-align="center" align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button v-if="isAuth('sys:company:getComById')" type="text" size="small" @click="checkInfo(scope.row)">查看详情</el-button>
          <el-button v-if="isAuth('sys:company:getComById')" type="text" size="small" @click="addOrUpdateCompany('update', scope.row)">编辑</el-button>
          <el-button v-if="isAuth('sys:company:deleteCom')" type="text" size="small" @click="deleteCom(scope.row)">删除</el-button>
          <el-button v-if="isAuth('sys:company:checkPaper')" type="text" size="small" @click="checkPaper(scope.row)">查看问卷</el-button>
          <el-button v-if="isAuth('sys:company:sendEmail')" type="text" size="small" @click="showEmailInfoDialog('only', scope.row)">发送邮件</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 展示列表 END -->
    <!-- 分页展示 START -->
    <el-pagination @size-change="sizeChangeHandle" 
                   @current-change="currentChangeHandle" 
                   :current-page="condition.pageNo"
                   :page-sizes="[10, 20, 50, 100]" 
                   :page-size="condition.pageSize" 
                   :total="totalPage"
                   layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 分页展示 END -->
    <!-- 查看详情 START -->
    <el-dialog title="查看详情" :visible.sync="isShow" width="30%">
      <div class="my-dialog-content">
        <el-form>
          <el-form-item label="企业名称:" label-width="100px" class="test" style="margin-bottom:0">
            <span>{{info.companyName}}</span>
          </el-form-item>
          <el-form-item label="联系人: " label-width="100px" style="margin-bottom:0">
            <span>{{info.linkMan}}</span>
          </el-form-item>
          <el-form-item label="联系地址:" label-width="100px" style="margin-bottom:0">
            <span>{{info.linkAddress}}</span>
          </el-form-item>
          <el-form-item label="联系电话:" label-width="100px" style="margin-bottom:0">
            <span>{{info.linkMobile}}</span>
          </el-form-item>
          <el-form-item label="联系邮箱:" label-width="100px" style="margin-bottom:0">
            <span>{{info.linkEmail}}</span>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="isShow = false">关 闭</el-button>
      </span>
    </el-dialog>
    <!-- 查看详情 END -->
    <!-- 新增/编辑预设企业 START -->
    <el-dialog v-if="addOrUpdateShow" :title="addOrUpdateTitle" :visible.sync="addOrUpdateShow" width="30%">
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item label="企业名称" label-width="100px" prop="companyName">
          <el-input v-model="form.companyName"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" label-width="100px" prop="linkMobile">
          <el-input v-model="form.linkMobile"></el-input>
        </el-form-item>
        <el-form-item label="联系邮箱" label-width="100px" prop="linkEmail">
          <el-input v-model="form.linkEmail"></el-input>
        </el-form-item>
        <el-form-item label="联系人" label-width="100px">
          <el-input v-model="form.linkMan"></el-input>
        </el-form-item>
        <el-form-item label="联系地址" label-width="100px">
          <el-input v-model="form.linkAddress"></el-input>
        </el-form-item>
        <el-form-item label="问卷状态" label-width="100px" v-if="isShowaddOrUpdateStatus">
          <el-select v-model="form.status" placeholder="请选择活动区域">
            <el-option label="已提交" :value="1"></el-option>
            <el-option label="未完成" :value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAddOrUpdateDialogShow">取 消</el-button>
        <el-button type="primary" @click="uploadAddOrUpdateDialogData('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增/编辑预设企业 END -->
    <!-- 发送邮件 START -->
    <el-dialog title="发送邮件" :visible.sync="sendEmailDialogShow" width="50%">
      <el-form :model="formEmail">
        <el-form-item label="发件人邮箱" label-width="100px">
          <el-input v-model="formEmail.fromMail" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="收件人邮箱" label-width="100px">
          <el-input v-model="formEmail.toMail" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邮件标题" label-width="100px">
          <el-input v-model="formEmail.emailTitle"></el-input>
        </el-form-item>
        <el-form-item label="邮件正文" label-width="100px">
          <el-input type="textarea" v-model="formEmail.emailContent"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelSendEmailDialogShow">取 消</el-button>
        <el-button type="primary" @click="uploadSendEmailDialogShow">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 发送邮件 END -->
    <!-- 导入预设企业 START -->
    <el-dialog title="导入预设企业" v-if="exportShow" :visible.sync="exportShow" width="40%">
      <!-- <div class="my-dialog-export" style="position: relative;"> -->
      <div class="my-dialog-export">
        <div class="my-dialog-export-tip">
          请先下载导入文件模板, 并根据模板填写相关信息后在进行信息导入。
        </div>
        <el-button size="small" type="primary" @click="download" class="my-dialog-export-button">下载模板</el-button>
        <div>
          <el-upload ref="upload"
                     class="upload-demo"
                     list-type="text"
                     accept=".xlsx"
                     :limit="1"
                     :action="uploadUrl"
                     :auto-upload="false"
                     :on-success="uploadSuccess"
                     :on-error="uploadError"
                     :on-exceed="handleExceed"
                     :before-remove="beforeRemove">
            <el-button size="small" type="success">上传文件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传.xlsx文件</div>
          </el-upload>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="cancelUpload">取 消</el-button>
        <el-button type="primary" @click="submitUpload">确 认</el-button>
      </span>
    </el-dialog>
    <!-- 导入预设企业 END -->
  </div>
</template>
<script>
// import { condition } from "../data/menu.js";
import { previewAddress, } from '@/utils';
export default {
  data() {
    let checkPhone = (rule, value, callback) => { // 手机号验证
      const phoneReg = /^1[3|4|5|6|7|8][0-9]{9}$/;
      if (value != '') {
        setTimeout(() => {
          if (!Number.isInteger(+value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (phoneReg.test(value)) {
              callback();
            } else {
              callback(new Error('电话号码格式不正确'));
            }
          }
        }, 100)
      } else {
        callback();
      }
    };
    return {
      uploadUrl:'',
      // 搜索信息
      condition: {
        companyName: '',
        linkMobile: '',
        status: '',
        companyFrom: '',
        pageNo: 1,
        pageSize: 10,
      },
      // 查看详情弹窗显示
      isShow: false,
      // 导入预设企业弹窗显示
      exportShow: false,
      // 新增/编辑预设企业
      addOrUpdateShow: false,
      addOrUpdateTitle: '',
      isShowaddOrUpdateStatus: false,
      sendEmailDialogShow: false,
      // 
      options: [
        {
          value: '0',
          label: '待填写'
        }, 
        {
          value: '1',
          label: '已提交'
        }, 
        {
          value: '2',
          label: '未完成'
        }
      ],
      options2: [
        {
          value: '1',
          label: '注册企业'
        }, 
        {
          value: '0',
          label: '预导企业'
        }
      ],
      dataList: [],
      totalPage: 0,
      dataListLoading: false,
      info: {
        companyName: '',
        linkMan: '',
        linkAddress: '',
        linkMobile: '',
        linkEmail: '',
      },
      form: {
        id: '',
        companyName: '',
        linkMobile: '',
        linkEmail: '',
        status: '',
        linkMan: '',
        linkAddress: ''
      },
      rules: {
        companyName: [
          { required: true, message: '请输入企业名称', trigger: 'blur' },
        ],
        linkEmail: [
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        linkMobile: [
          { required: true, validator: checkPhone, trigger: 'blur' }
        ],
      },
      multipleSelection: [],
      companyId: '',
      fromMail: '',
      toMail: '', 
      formEmail: {
        companyId: '',
        fromMail: '',
        toMail: '',
        emailTitle: '邀请你参加XX企业人才调研',
        emailContent: 'XX公司',
      },
    };
  },
  created() {
    this.getDataList();
    this.uploadUrl = this.$http.adornUrl("op=company&func=importCom", "XZX");
  },
  watch: {

  },
  methods: {
    // --------------------------------------------------
    // 打开预导企业 弹窗
    exportCompany() {
      this.exportShow = true;
    },
    // 确认上传
    submitUpload() {
      this.$refs.upload.submit();
    },
    // 文件上传成功的回调
    uploadSuccess(response, file, fileList) {
      if(response.code == 200) {
        this.getDataList();
        this.exportShow = false;
        this.$message.success(response.status_desc);
      } else {
        this.$message.error(response.status_desc);
      }
    },
    // 文件上传失败时的回调
    uploadError(err, file, fileList) {
      console.log(err, file, fileList);
    },
    // 取消
    cancelUpload() {
      this.$refs.upload.clearFiles();
      this.exportShow = false;
    },
    // 下载模板
    download() {
      window.open('//img3.job1001.com/chancaijc/企业信息导入模板.xlsx');
    },
    handleExceed(file, fileList) {
      this.$message.warning(`当前只能单次上传 1 个文件,本次选择了 ${file.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确认移除 ${file.name}`);
    },
    // --------------------------------------------------
    // table 列表选中数据内容 array
    handleSelectionChange(val) {
      this.multipleSelection = val.map(item => {
        return item.id;
      });
      this.companyId = val.map(item => {
        return item.id;
      }).join(',');
    },
    // 打开 邮件发送的弹窗 
    showEmailInfoDialog(type, data) {
      if(type == 'more') { // 多条获取邮件信息
        if(this.multipleSelection.length > 0) { // 选择了多条
          this.getEmailInfo(type);
          this.sendEmailDialogShow = true;
        } 
        else { // 没有选择多条, 提示弹窗
          this.$message.error('请选择多条数据在进行操作');
        }
      } else if (type == 'only') { // 单条获取邮件信息
        this.getEmailInfo(type, data);
        this.sendEmailDialogShow = true;
      }
    },
    // 获取 发送的邮箱信息
    getEmailInfo(type, data) {
      let condition;
      if(type == 'more') {
        condition = {
          id: this.companyId
        };
      } else if(type == 'only') {
        condition = {
          id: data.id
        };
      }
      this.$http({
        url: this.$http.adornUrl("op=company&func=getEmailInfo", "XZX"),
        method: "post",
        data: {
          condition: JSON.stringify(condition)
        }
      }).then( ({data}) =>{
        if(data.code == 200) {
          this.fromMail = data.data.fromMail;
          this.toMail = data.data.toMail;
          this.companyId = data.data.companyId;
          this.formEmail.companyId = data.data.companyId;
          this.formEmail.fromMail = data.data.fromMail;
          this.formEmail.toMail = data.data.toMail;
        } else {
          this.$message.error(data.status_desc);
        }
      });
    },
    // 关闭 邮件发送的弹窗
    cancelSendEmailDialogShow() {
      this.sendEmailDialogShow = false;
      this.formEmail.companyId = '';
      this.formEmail.fromMail = '';
      this.formEmail.toMail = '';
    },
    // 发送 邮件
    async uploadSendEmailDialogShow() {
      let condition = {
        companyId: this.formEmail.companyId,
        fromMail: this.formEmail.fromMail,
        toMail: this.formEmail.toMail,
        emailTitle: this.formEmail.emailTitle,
        emailContent: this.formEmail.emailContent,
      };
      const loading = this.$loading({
        lock: true,
        text: '邮件发送中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.8)'
      });
      const res = await this.$http({
        url: this.$http.adornUrl("op=company&func=sendEmail", "XZX"),
        method: "post",
        data: {
          condition: JSON.stringify(condition)
        }
      });
      let data = res.data;
      if(data.code == 200) {
        loading.close();
        this.sendEmailDialogShow = false;
        this.$message.success(data.status_desc);
      } else {
        loading.close();
        this.$message.error(data.status_desc);
      }
    }, 
    // 打开 新增/编辑预设企业 的弹窗
    addOrUpdateCompany(type, data) {
      if(type == 'add') {
        this.addOrUpdateTitle = '新增预设企业';
        this.isShowaddOrUpdateStatus = false;
        this.addOrUpdateShow = true;
      } else if(type == 'update') {
        let condition = {
          id: data.id
        };
        this.$http({
          url: this.$http.adornUrl("op=company&func=getComById", "XZX"),
          method: "post",
          data: {
            condition: JSON.stringify(condition)
          }
        }).then( ({data}) =>{
          if (data.code == 200) {
            this.form.id = data.data.id;
            this.form.companyName = data.data.companyName;
            this.form.linkMobile = data.data.linkMobile;
            this.form.linkEmail = data.data.linkEmail;
            this.form.linkMan = data.data.linkMan;
            this.form.linkAddress = data.data.linkAddress;
            this.form.status = data.data.status;
            if(data.data.status == 1) {
              this.isShowaddOrUpdateStatus = true;
            } else {
              this.isShowaddOrUpdateStatus = false;
            }
            this.addOrUpdateTitle = '编辑预设企业';
            this.addOrUpdateShow = true;
          } else {
            this.$message.error(data.status_desc);
          }
        });

      }
      // console.log(type, data);
    },
    // 关闭 新增/编辑预设企业 的弹窗
    cancelAddOrUpdateDialogShow() {
      this.addOrUpdateShow = false;
      this.form = {
        id: '',
        companyName: '',
        linkMobile: '',
        linkEmail: '',
        status: '',
        linkMan: '',
        linkAddress: ''
      };
    },
    // 提交 新增/编辑预设企业 的弹窗 里的数据
    uploadAddOrUpdateDialogData(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // alert('submit!');
          let condition = {
            id: this.form.id,
            companyName: this.form.companyName,
            linkMobile: this.form.linkMobile,
            linkEmail: this.form.linkEmail,
            status: this.form.status,
            linkMan: this.form.linkMan,
            linkAddress: this.form.linkAddress
          };
          const res = await this.$http({
            url: this.$http.adornUrl("op=company&func=saveCom", "XZX"),
            method: "post",
            data: {
              condition: JSON.stringify(condition)
            }
          });
          if(res.data.code == 200) {
            this.$message.success(res.data.status_desc);

            this.addOrUpdateShow = false;
            this.form = {
              id: '',
              companyName: '',
              linkMobile: '',
              linkEmail: '',
              status: '',
              linkMan: '',
              linkAddress: ''
            };
            this.getDataList();
          } else {
            this.$message.error(res.data.status_desc);
          }
        } else {
          // this.$message.error('error submit!!');
          return false;
        }
      });
    },
    // 删除
    deleteCom(data) {
      let condition = {
        id: data.id,
      };
      this.$confirm('是否删除此条数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http({
          url: this.$http.adornUrl("op=company&func=deleteCom", "XZX"),
          method: "post",
          data: {
            condition: JSON.stringify(condition)
          }
        });
        if(res.data.code == 200) {
          this.getDataList();
          this.$message({type: 'success', message: res.data.status_desc});
        } else {
          this.$message({type: 'error', message: res.data.status_desc});
        }
      }).catch(() => {
        this.$message({type: 'info', message: '已取消删除'});          
      });
    },
    //查看答卷
    checkPaper(row) {
      let temp = previewAddress(row.id);
      window.open(
          temp
      );
    },
    // 列表中 类型 显示文字转换
    getCompanyFrom(companyFrom) {
      if(companyFrom == 0) {
        return '预导企业';
      } else if(companyFrom == 1) {
        return '注册企业';
      } else if(companyFrom == 2) {
        return '注册企业';
      }
    },
    // 列表中 问卷状态 显示文字转换
    getStatus(status) {
      if(status == 0) {
        return '待填写';
      } else if(status == 1) {
        return '已提交';
      } else if(status == 2) {
        return '未完成';
      }
    },
    // 获取页面列表
    async getDataList() {
      try {
        this.dataListLoading = true;
        const res = await this.$http({
          url: this.$http.adornUrl("op=company&func=queryCom", "XZX"),
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
        this.$message.error(error);
      }
    },
    // 查看详情
    async checkInfo(data) {
      let condition = {
        id: data.id
      };
      const res = await this.$http({
        url: this.$http.adornUrl("op=company&func=getComById", "XZX"),
        method: "post",
        data: {
          condition: JSON.stringify(condition)
        }
      });
      let d = res.data;
      if (d.code == 200) {
        this.info.companyName = d.data.companyName;
        this.info.linkMan = d.data.linkMan;
        this.info.linkAddress = d.data.linkAddress;
        this.info.linkMobile = d.data.linkMobile;
        this.info.linkEmail = d.data.linkEmail;

        this.isShow = true;
      } else {
        this.$message.error(d.status_desc);
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
  }
};
</script>

<style lang="scss" scoped>
.company-management-list {
  &-operation {
    padding-bottom: 20px;
  }
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
  .my-dialog-export {
    margin-top: -20px;
    padding-left: 30px;
    position: relative;
    &-button {
      position: absolute; 
      right: 50%;
      transform: translate(-50%);
    }
  }
}
</style>
