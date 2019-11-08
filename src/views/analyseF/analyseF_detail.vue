<template>
  <div class="analyseF">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="问卷详情" name="first">
        <paper :companyId="companyId" ref="paper"></paper>
      </el-tab-pane>
      <el-tab-pane label="岗位招聘情况" name="second">
        <analyseFTable :companyName="companyName" :companyId="companyId" :select="select1" ref="analyseFTable">
        </analyseFTable>
      </el-tab-pane>
      <el-tab-pane label="人才流失情况" name="third">
        <analyseFTable :companyName="companyName" :companyId="companyId" :select="select2" ref="analyseFTable">
        </analyseFTable>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import analyseFTable from "./analyseF_table.vue";
  import paper from '../data/paper.vue';
  import {
    setTimeout
  } from 'timers';
  export default {
    data() {
      return {
        activeName: 'second',
        value13: '', //时间 日期
        active: "active",
        time: {},
        companyId: "",
        companyName: "",
        select1: 1,
        select2: 2
      };
    },
    components: {
      analyseFTable,
      paper
    },
    created() {
      this.init();
    },
    activated() {
      // this.init();
    },
    mounted() {
      // this.init();
    },
    methods: {
      //初始化
      init() {
        this.companyId = this.$route.params.companyId;
        this.companyName = this.$route.params.companyName;
        // console.log(this.companyId, this.companyName);
        this.$nextTick(() => {
          this.$refs.analyseFTable.init(1);
        });
      },
      handleClick(tab, event) {
        if (tab.index == 0) {
          this.$nextTick(() => {
            this.$refs.paper.init();
          })
        } else if (tab.index == 1) {
          this.$nextTick(() => {
            // this.$refs.analyseFTable.init(tab.index);
          });
        } else if (tab.index == 2) {
          this.$nextTick(() => {
            this.$refs.analyseFTable.init(tab.index);
          });
        }
      }
    }
  };

</script>

<style scoped>
  [v-cloak] {
    display: none;
  }

  .el-tabs {
    width: 80%;
    margin: 0 auto;
    padding: 40px 20px;
  }

  .is-top {
    padding: 0 30px;
  }
</style>