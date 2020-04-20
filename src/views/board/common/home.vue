<template>
    <div class="board">
        <!-- -->
        <div class="wrap" v-if="!loading">
            <el-row class="chart-wrap">
                <el-col :span="12" class="f-column">
                    <div class="bh-50">
                        <ChartNew :initData="personFlowData"
                            :config='personFlowConfig'></ChartNew>
                    </div>
                    <div class="bh-50">
                        <ChartNew :initData="hangyeflowData" :config='hangyeflowConfig'></ChartNew>
                    </div>
                </el-col>
                <el-col :span="12" class="f-column" style="padding-left:20px;">
                    <div class="bh-50">
                        <ChartNew :initData="personBennianduData"
                            :config='personBennianduConfig'></ChartNew>
                    </div>
                    <div class="bh-50">
                        <ChartNew :initData="personSourseData" :config='personSourseConfig'></ChartNew>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                loading: false,
                active: true,
                personFlowData: null,
                personFlowConfig: {
                    type: 'personEdu',
                    title: "人才重点产业分布",
                },
                personBennianduData: null,
                personBennianduConfig: {
                    type: 'jinyibuwanshan',
                    title: "重点产业人才学历分布",
                },
                personSourseData: null,
                personSourseConfig: {
                    type: 'tigongzhichi',
                    title: "重点产业人才职称分布",
                },
                hangyeflowData: null,
                hangyeflowConfig: {
                    type: 'rencaishebao',
                    title: "重点产业人才流动分布",
                },
            }
        },
        components: {},
        created() {
            this.$store.commit("common/updataboartStatus", 2)
            this.getDataLIst()
        },
        methods: {
            getDataLIst() {
                this.loading = true;
                this.$http({
                    url: this.$http.adornUrl(
                        "op=dash&func=getDashData",
                        "XZX"
                    ),
                    method: "post",
                    data: {
                        condition: JSON.stringify({
                            index: 5,
                            queryKeys: []
                        })
                    }
                }).then(({
                    data
                }) => {
                    if (data.code == 200) {

                        // this.dataList = data.data

                        this.personFlowData = data.data.industry_person
                        this.personBennianduData = data.data.industry_edu
                        this.personSourseData = data.data.industry_position
                        this.hangyeflowData = data.data.industry_flow

                        this.loading = false
                    } else {

                    }
                });
            },
        }
    }
</script>

<style lang='scss' scoped>
    .board {
        padding: 10px 20px 20px 20px;
        height: 100%;
        /* background: url("~@/assets/img/board/bg.jpg"); */
        background-size: 100% 100%;
        .nav-title {
            text-align: center;
            line-height: 50px;
            font-size: 38px;
            width: 100%;
            height: 66px;
            color: #00ebff;
            letter-spacing: 4px;
        }
        .wrap {
            height: 100%;
        }
        .back {
            position: absolute;
            top: 0;
            left: 0;
            width: 180px;
            height: 40px;
            /* background: url("~@/assets/img/board/back.png"); */
            background-size: 100% 100%;
            cursor: pointer;
            span {
                position: absolute;
                top: 50%;
                left: 40%;
                transform: translate(-50%, -50%);
                font-size: 20px;
                color: #000A1E;
            }
        }
    }
</style>
<style lang='scss'>
    .chart-wrap {
        height: 100%;
        .el-col {
            height: 100%;
        }
    }
</style>