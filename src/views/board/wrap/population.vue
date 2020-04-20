<template>
    <div class="population bh-100">
        <div class="wrap bh-100"></div>
            <!-- <div class="f-column" style="width:26%">
                <Chart class="bh-100" :initData="city_Data" :config='city_config'></Chart>
            </div>
            <div  class="f-column bh-100" style="width:74%;padding-left:20px;">
                <div class="bh-50 wrrap">
                    <div class="left-wrap-box elastic">
                        <div class='elastic-c'>
                            <p>党政人才</p>
                            <p class="number">1041</p>
                            <img src="~@/assets/img/board/biao.png" alt="">
                            <p class="number">0.2%</p>
                        </div>
                        <div class='elastic-c'>
                            <p>企业经营管理人才</p>
                            <p class="number">46000</p>
                            <img src="~@/assets/img/board/qyjyglrc.png" alt="">
                            <p class="number">35%</p>
                        </div>
                        <div class='elastic-c'>
                            <img src="~@/assets/img/board/zyjsrc.png" alt="">
                            <p>专业技术人才</p>
                            <p class="number">75000</p>
                        </div>
                        <div class='elastic-c'>
                            <p>高技能人才</p>
                            <p class="number">66000</p>
                            <img src="~@/assets/img/board/zyjsrc.png" alt="">
                            <p>专业技术人才</p>
                        </div>
                        <div class='elastic-c'>
                            <img src="~@/assets/img/board/ncsyrc.png" alt="">
                            <p>农村实用人才</p>
                            <p class="number">0</p>
                        </div>
                        <div class='elastic-c'>
                            <img src="~@/assets/img/board/shgzrc.png" alt="">
                            <p>社会工作人才</p>
                            <p class="number">6546</p>
                        </div>
                    </div>
                </div>
                <div  class="bh-50">
                    <Chart class="bh-100" :initData="people_Data" :config='people_config'></Chart>
                </div>
            </div> -->
    </div>
</template>

<script>
    export default {
        data() {
            return {
                people_Data: {
                    name: ['市级高层次人才', '英才计划', '鸿雁计划', '留创计划'],
                    value: [77, 20, 111, 46]
                },
                people_config: {
                    type: 'bussinessFlow',
                    title: "人才类型分布",
                    isScroll: false,
                    paddingTop: '8%',
                    c_left: "5%",
                    margin: '5%',
                    legend: ['流入', '流出']
                },
                city_Data: {
                    name: ['全市人才总量', '全区人才总量'],
                    value: [662500, 194587],
                    propor: ['12.7%', '3.7%'],
                },
                city_config: {
                    type: 'qsyqqcczlzb',
                    title: "全市与全区人才总量占比",
                }
            }
        },
        created() {
            this.$store.commit("common/updataboartStatus", 1)
                // this.isShow = true;
        },
        methods: {

        }
    }
</script>

<style lang='scss' scoped>
    .population {
        padding: 1% 1%;
        display: flex;
        justify-content: space-between;
        .wrap {
            width: 100%;
            background: url('~@/assets/img/borad/posiotn.png') no-repeat;
            background-size: 100% 100%;
        }
        .wrrap {
            border: 1px solid #00f2f1;
            position: relative;
        }
        .left-wrap-box {
            width: 90%;
            height: 50%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            div {
                height: 100%;
                text-align: center;
                width: 16%;
                background: url('~@/assets/img/borad/rencaikuang.png') no-repeat;
                background-size: 100% 100%;
                img {
                    width: 90px;
                    margin-bottom: 10px;
                }
                p {
                    margin: 0;
                    font-size: 20px;
                    color: #00f2f1;
                }
                .number {
                    font-size: 32px;
                    color: #fff;
                }
            }
        }
    }
</style>