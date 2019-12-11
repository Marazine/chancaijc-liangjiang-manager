<template>
  <el-dialog title="日志详情" :close-on-click-modal="false" :visible.sync="visible">
    <el-row>
      <el-col :span="10" v-if="dataForm.user">
        <el-col :span="6" class="">姓名: </el-col>
        <el-col :span="18" class="">{{dataForm.user}}</el-col>
        <el-col :span="6" class="">id: </el-col>
        <el-col :span="18" class="">{{dataForm.id}}</el-col>
        <el-col :span="6" class="">ip: </el-col>
        <el-col :span="18" class="">{{dataForm.ip}}</el-col>
        <el-col :span="6" class="">操作时间: </el-col>
        <el-col :span="18" class="">{{dataForm.createtime}}</el-col>
      </el-col>
      <el-col :span="14" v-if="dataForm.id">
        <el-col :span="24" class="">操作内容: </el-col>
        <el-col class="">
          <div class="my-postParams" style="marginTop: 20px">postParams: </div>
          <json-viewer :value="postParams"></json-viewer>
          <div>postResult: </div>
          <json-viewer :value="postResult"></json-viewer>
        </el-col>
      </el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import JsonViewer from 'vue-json-viewer'
export default {
  components: {
    'json-viewer': JsonViewer
  },
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
      postParams: {},
      postResult: {},
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
          let postParams = this.dataForm.extendInfo.indexOf('postParams');
          let postResult = this.dataForm.extendInfo.indexOf('postResult');
          this.postParams = JSON.parse(this.dataForm.extendInfo.slice(postParams+11, postResult-1) || "{}");
          this.postResult = JSON.parse(this.dataForm.extendInfo.slice(postResult+11) || "{}");
        }
        this.visible = true;
      });
    }
  }
};
</script>
