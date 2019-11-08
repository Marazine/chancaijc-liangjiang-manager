<template>
  <div class="anaF_tab">
    <el-card>
      <div class="trendLayout trendTop">
        <p v-cloak>{{company_name}}</p>
        <div class="trendLayout">
          <div>
            <span :class="active1" @click="quarterChange">本季</span>
            <span :class="active" @click="quarterChange">全年</span>
            <span :class="activeAll" @click="quarterChange">全部</span>
          </div>
          <div class="block">
            <el-date-picker v-model="value13" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期"
              :default-time="['00:00:00', '23:59:59']" @change="change">
            </el-date-picker>
          </div>
        </div>
      </div>
    </el-card>
    <el-table :data="tableList" stripe style="width: 100%">
      <el-table-column type="index" label="序号" width="50">
      </el-table-column>
      <el-table-column v-for="(item,key) of tableThead" :key="key" :prop="key" :label="item"
        :align="key=='company_name'?'left':'center'" :width="key=='company_name'?'500px':'auto'">
      </el-table-column>
    </el-table>
    <el-pagination class="page" @size-change="sizeChangeHandle" @current-change="currentChangeHandle"
      :current-page="currIndex" :page-sizes="[5, 10, 20, 50,100]" :page-size="pageSize" :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper"></el-pagination>
  </div>
</template>

<script>
  export default {
    props: ["companyName", "companyId", "select"],
    data() {
      return {
        tableList: [],
        company_name: "",
        currIndex: 1,
        pageSize: 10,
        value13: '', //时间 日期
        active: "active",
        active1: "",
        activeAll: "",
        time: {},
        totalPage: 0,
        tableThead: {}, //标题
        index: 1
      }
    },
    created() {
      this.init(this.index);
    },
    activated() {
      // this.init();
    },
    methods: {
      // 初始化
      init(index) {
        this.index = index;
        var dataTimeF = new Date();
        var year = dataTimeF.getFullYear();
        this.time = {
          staTime: year + "-1-1 00:00:00",
          endTime: year + "-12-31 23:59:59"
        }
        this.getPersonData(this.time);
      },
      // 本季 全年 全部
      quarterChange(e) {
        this.time = "";
        var staTime = "2019-1-1 " + "00:00:00";
        var endTime = "2019-12-31 " + "23:59:59";
        if (e.target.innerHTML == "本季") {
          this.active1 = "active";
          this.active = "";
          this.activeAll = "";
          let dataTime = new Date();
          var year = dataTime.getFullYear();
          var month = dataTime.getMonth() + 1;
          if (month > 0 && month <= 3) {
            staTime = year + "-1-1 " + "00:00:00";
            endTime = year + "-3-31 " + "23:59:59";
          } else if (month > 3 && month <= 6) {
            staTime = year + "-4-1 " + "00:00:00";
            endTime = year + "-6-31 " + "23:59:59";
            // this.time=[year+"-4-1 ",year+"-6-31"];
          } else if (month > 6 && month <= 9) {
            staTime = year + "-7-1 " + "00:00:00";
            endTime = year + "-9-31 " + "23:59:59";
          } else {
            staTime = year + "-10-1 " + "00:00:00";
            endTime = year + "-12-31 " + "23:59:59";
          }
        } else if (e.target.innerHTML == "全部") {
          this.active = "";
          this.active1 = "";
          this.activeAll = "active";
          staTime = "";
          endTime = "";
        } else {
          this.activeAll = "";
          this.active = "active";
          this.active1 = "";

        }
        this.time = {
          staTime,
          endTime
        };
        this.getPersonData(this.time);
      },
      getPersonData(time) {
        this.tableList = [];
        if (this.index == 1) {
          var url = "op=bigtablecontroller&func=gapPositionCountList";
        } else if (this.index == 2) {
          var url = "op=bigtablecontroller&func=personFlowInfoList";
        }
        var param = JSON.stringify({
          companyId: this.companyId,
          staTime: time.staTime,
          endTime: time.endTime,
          pageParams: {
            currIndex: this.currIndex,
            pageSize: this.pageSize
          }
        })
        this.$http({
          url: this.$http.adornUrl(
            url,
            "CQ"
          ),
          method: "post",
          data: {
            groupName: param
          }
        }).then(({
          data
        }) => {
          // console.log(data);
          if (data.code == 200) {
            this.tableThead = data.thead;
            // console.log(data.tabStatus);
            // console.log(this.tableThead);
            this.tableList = [];
            if (data.tabStatus == 1) {
              this.company_name = this.companyName + "人才引进情况";
              for (var item of data.data) {
                this.tableList.push({
                  position_name: item.positionName,
                  position_count: item.count,
                  position_salary: item.positionSalary,
                  update_time: item.updateTime
                });
              };
            } else if (data.tabStatus == 2) {
              this.company_name = this.companyName + "人才流失情况";
              for (var item of data.data) {
                this.tableList.push({
                  person_name: item.personName,
                  person_gznum: item.workTotalTime,
                  person_education: item.personEducation,
                  position_name: item.positionName,
                  update_time: item.updateTime
                });
              };
            }
            this.totalPage = data.pageParams.total;
          } else {
            this.$message("请求失败")
          }
        });
      },
      // 每页数
      sizeChangeHandle(val) {
        this.pageSize = val;
        this.currIndex = 1;
        this.getPersonData(this.time);
      },
      // 当前页
      currentChangeHandle(val) {
        this.currIndex = val;
        this.getPersonData(this.time);
      },
      //远程排序
      sortChange(sort) {
        // console.dir(sort);
        switch (sort.prop) {
          case "value":
            if (sort.order == "descending") {
              this.sort = "desc";
            } else {
              this.sort = "asc";
            }
            break;

          default:
            break;
        }
        this.getPersonData(this.time);
      },
      // 时间日期
      change() {
        this.activeAll = "";
        this.active = "";
        this.active1 = "";
        var staYear = this.value13[0].getFullYear();
        var staMonth = this.value13[0].getMonth() + 1;
        var staDate = this.value13[0].getDate();
        var staTime = staYear + "-" + staMonth + "-" + staDate + " 00:00:00";
        // 结束时间
        var endYear = this.value13[1].getFullYear();
        var endMonth = this.value13[1].getMonth() + 1;
        var endDate = this.value13[1].getDate();
        var endTime = endYear + "-" + endMonth + "-" + endDate + " 23:59:59";
        // console.log(staTime,endTime);
        this.time = {
          staTime,
          endTime
        }
        this.getPersonData(this.time);
      }
    }
  }

</script>
<style>
  [v-cloak] {
    display: none;
  }

  /* 时间日期 */
  .anaF_tab .trendLayout {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .anaF_tab .trendTop {
    padding: 0 30px 0 20px;
    border-bottom: 1px solid #ebeef5;
    height: 54px;
    width: 100%;
  }

  .anaF_tab .trendTop span {
    margin-right: 20px;
    cursor: pointer;
  }

  .anaF_tab .trendTop .block {
    margin-left: 20px;
  }

  .anaF_tab .active {
    color: #1890FF;
  }

  .anaF_tab .trendTop .el-range-editor--medium.el-input__inner {
    height: 32px;
  }

  .page {
    margin-top: 20px;
    float: right;
  }
</style>