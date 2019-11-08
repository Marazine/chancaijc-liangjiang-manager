<template>
  <el-dialog
    title="日志详情"
    :close-on-click-modal="false"
    :visible.sync="visible"
  ><el-row>
    <el-col :md="9" :sm="11" :push="1" v-if="dataForm.user">
        <div class="itemBox">
            <el-col :md="5" :sm="5" class="title">姓名</el-col>
            <el-col :md="1" :sm="1" class="title title_left">:</el-col>
            <el-col :md="18" :sm="18" class="content">{{dataForm.user}}</el-col>
        </div>
        <div class="itemBox">
            <el-col :md="5" :sm="5" class="title">id</el-col>
            <el-col :md="1" :sm="1" class="title title_left">:</el-col>
            <el-col :md="18" :sm="18" class="content">{{dataForm.id}}</el-col>
        </div>
        <div class="itemBox">
            <el-col :md="5" :sm="5" class="title">ip</el-col>
            <el-col :md="1" :sm="1" class="title title_left">:</el-col>
            <el-col :md="18" :sm="18" class="content">{{dataForm.ip}}</el-col>
        </div>
        <div class="itemBox">
            <el-col :md="5" :sm="5" class="title">操作时间</el-col>
            <el-col :md="1" :sm="1" class="title title_left">:</el-col>
            <el-col :md="18" :sm="18" class="content">{{dataForm.createtime}}</el-col>
        </div>
    </el-col>
    <el-col :md="9" :sm="11" :push="1" v-if="dataForm.id">
        <div class="itemBox">
            <el-col :md="5" :sm="5" class="title">操作内容</el-col>
            <el-col :md="1" :sm="1" class="title title_left">:</el-col>
            <el-col :md="18" :sm="18" class="content">{{dataForm.extendInfo}}</el-col>
        </div>
    </el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
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
      visible : false
    };
  },
  methods: {
    init(id) {
      this.dataForm.id = id || 0;
      this.$http({
        url: this.$http.adornUrl("/operator/info", "CQ"),
        method: "post",
        data: {id: this.dataForm.id}
      }).then(({ data }) => {
        if (data && data.code == 200) {
          this.dataForm = data.data;
        }
        this.visible = true;
      });
    }
  }
};
</script>
