<template>
  <div class="board-detailWrap">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="first">
        <div class="boardBtn-item active">安抚哈舒服吧舒服撒飞机撒就会发生的</div>
        <div class="boardBtn-item">安抚哈舒服吧舒服撒飞机撒就会发生的</div>
        <div class="boardBtn-item">安抚哈舒服吧舒服撒飞机撒就会发生的</div>
        <div class="boardBtn-item">安抚哈舒服吧舒服撒飞机撒就会发生的</div>
        <div class="boardBtn-item">安抚哈舒服吧舒服撒飞机撒就会发生的</div>
        <div class="boardBtn-item">安抚哈舒服吧舒服撒飞机撒就会发生的</div>
      </el-tab-pane>
      <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                activeName: 'second'
            }
        },
        created() {
            this.init();
            // this.isShow = true;
        },
        components: {},

        methods: {
            init() {

            },
            handleClick(tab, event) {
                console.log(tab, event);
            }
        }
    }
</script>

<style lang='scss' scoped>
    .board-detailWrap {
        .boardBtn-item {
            cursor: pointer;
            height: 70px;
            line-height: 70px;
            border-bottom: 1px solid #01787f;
        }
        .boardBtn-item.active {
            background: url('~@/assets/img/board/boardBtn-imt.png');
            background-size: 100% 100%;
        }
    }
</style>
<style lang='scss'>
    .board-detailWrap {
        .el-tabs__header {
            margin: 0;
        }
        .el-tabs__item {
            height: 60px;
            line-height: 60px;
            color: #818181;
        }
        .el-tabs__item.is-active {
            color: #00f2f1;
        }
        .el-tabs__active-bar {
            background: #00f2f1;
        }
    }
</style>