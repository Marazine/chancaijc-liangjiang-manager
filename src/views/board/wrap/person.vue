<template>
    <div class="my-board main">
        <!-- <div class="title-c">
        珠海产才监测看板
        </div> -->
        <div class="fuse content" v-if="isShow">
        <div class="row bh-100">
            <div class="col-md-4 f-column">
                
                <ChartNew class="bh-50" :initData="edu_aData" :config='edu_aconfig'></ChartNew>
                <ChartNew class="bh-50" :initData="age_Data" :config='age_config'></ChartNew>
            </div>
            <div class="col-md-4 f-column" style="padding:0 30px">
                <ChartNew class="bh-33" :initData="people_Data" :config='people_config'></ChartNew>
                <ChartNew class="bh-33" :initData="title_Data" :config='title_config'></ChartNew>
                <ChartNew class="bh-33" :initData="skill_Data" :config='skill_config'></ChartNew>
            </div>
    
            <div class="col-md-4 f-column">
                <ChartNew class="bh-50" :initData="resource_Data" :config='resource_config'></ChartNew>
                <ChartNew class="bh-50" :initData="eduneed_aData" :config='eduneed_config'></ChartNew>
            <!-- <Chart :initData="resource_Data" :config='resource_config'></Chart> -->
            </div>
        </div>
        </div>
    </div>
    </template>

<script>
    import {
        dataCompany
    } from '../utils/company'
    export default {
        data() {
            let queryType = this.$route.query.type;
            return {
                name: '汽车',
                num1: 0,
                isShow: true,
                eduneed_aData: dataCompany,
                eduneed_config: {
                    type: 'rcxlxqfb',
                    title: '两江新区新引进人才需求岗位及企业动态更新',
                    echartTitleShow: true,
                    echartTitle: "",
                    left: '2%',
                    right: '2%',
                    top: '10%',
                    bottom: '0',
                    isClick: true,
                    push: 'rcqk',
                    radius: ['45%', '60%'],
                    radius2: [0, '42%'],
                },
                skill_Data: [{
                    name: "市高层次",
                    value: 0,
                    value1: 0
                }, {
                    name: "英才计划",
                    value: 0,
                    value1: 0
                }, {
                    name: "鸿雁计划",
                    value: 0,
                    value1: 0
                }, {
                    name: "留创计划",
                    value: 0,
                    value1: 0
                }],
                skill_config: {
                    type: 'rcldqk',
                    title: '高层次人才类型需求分布',
                    echartTitleShow: true,
                    echartTitle: "",
                    left: '2%',
                    right: '2%',
                    top: '10%',
                    bottom: '0',
                    isClick: true,
                    push: 'rcqk',
                    radius: ['45%', '60%'],
                    radius2: [0, '42%'],
                },
                title_Data: {
                    "name": ["外籍人才", "留学归国人才", "国内应届毕业生", "国内社会招聘人才"],
                    "value": [0, 0, 262, 5053]
                },
                title_config: {
                    type: 'rencaixuqiu',
                    title: '人才需求类型分布',
                    paddingTop: '5%',
                    left: '8%',
                    right: '5%',
                    top: '10%',
                    bottom: '22%',
                    bar_color_l: "#00ffff",
                    bar_color_r: "#ff8352",
                    barWidth: 15,
                },
                people_Data: {
                    "name": ["高中及以下", "大专", "本科", "硕士", "博士"],
                    "value": [1011, 2739, 1324, 213, 48]
                },
                people_config: {
                    type: 'bussinessFlow',
                    title: "人才需求学历分布",
                    isScroll: false,
                    paddingTop: '8%',
                    c_left: "5%",
                    margin: '5%',
                    legend: ['流入', '流出']
                },
                age_Data: {
                    "name": ["汽车", "电子", "装备", "生物医药", "金融", "现代物流", "服务贸易", "商贸文旅"],
                    "value": [359, 570, 166, 464, 297, 28, 2243, 1108]
                },
                age_config: {
                    type: 'qyxz',
                    title: '企业人才需求产业分布',
                    paddingTop: '5%',
                    left: '8%',
                    right: '5%',
                    top: '10%',
                    bottom: '22%',
                    bar_color_l: "#00ffff",
                    bar_color_r: "#ff8352",
                    barWidth: 15,
                },
                edu_aData: {
                    name: ['第一季度', '第二季度', '第三季度', '第四季度'],
                    value: [106, 292, 0, 0]
                },
                edu_aconfig: {
                    type: 'rcqk2',
                    title: '2020年人才引进需求企业占比变化趋势',
                    echartTitleShow: true,
                    echartTitle: "",
                    left: '2%',
                    right: '2%',
                    top: '10%',
                    bottom: '0',
                    isClick: true,
                    push: 'rcqk',
                    radius: ['45%', '60%'],
                    radius2: [0, '42%'],
                },
                resource_Data: {
                    "name": ['软件工程师', '高级Java开发工程师', '嵌入式开发工程师', '机械/材料工程师', '工程项目经理', '造价工程师', '激光通信工程师', '大数据架构工程师', '自动驾驶测试研究工程师', '生物制剂研究科学家'],
                    "value": [219, 127, 78, 55, 46, 42, 35, 10, 8, 6]
                },
                resource_config: {
                    type: 'liangjiangtop10',
                    bar_color_l: "#00fff3",
                    bar_color_r: "transparent",
                    ispercent: false,
                    paddingTop: '5%',
                    top: '15%',
                    right: '5%',
                    left: '15%',
                    bottom: '25%',
                    barWidth: '10px',
                    title: "两江新区企业岗位需求TOP10",
                }

            }
        },
        created() {
            this.$store.commit("common/updataboartStatus", 3)
                // this.init();
        },
        components: {
            // ns_map
        },
        methods: {
            init() {
                // let data = require('./data.json');
                this.$http({
                    url: this.$http.adornUrl("op=dash&func=getDashData", "XZX"),
                    method: "post",
                    data: {
                        condition: JSON.stringify({
                            index: 3,
                            // queryKeys: ['A_A4_1', 'A_A2_1', 'A_A10_1', 'B_B1_1', 'A_A3_1']
                        })
                    }
                }).then(({
                    data
                }) => {
                    if (data && data.code == 200) {

                        data.data.list.forEach((item, index) => {
                            if (item.name == '生物医药') {
                                // this.eduneed_aData = item.eduNeeds
                                // this.skill_Data = item.industuryFlow
                                // this.title_Data = item.skillNeeds
                                // this.people_Data = item.work
                                // this.age_Data = item.age
                                // this.edu_aData = item.edu
                                // this.resource_Data = item.sourceNeeds;
                                this.num1 = item.comNum
                            }
                        })


                        this.isShow = true;
                    }
                });
            }
        }
    }
</script>

<style lang='scss' scoped>
    .deta {
        position: absolute;
        top: 6%;
        z-index: 1;
        &.fl {
            left: 10%;
        }
        &.fr {
            right: 10%;
        }
        li {
            padding: 2vh 0;
            width: 8vw;
            position: relative;
            color: #fff;
            display: flex;
             ::after {
                content: '';
                display: block;
                width: 7.7vw;
                height: 0.1vh;
                background: #10d1ea;
                position: absolute;
                left: 0.3vw;
                bottom: 0
            }
            img {
                margin-right: 0.5vw;
                height: auto;
                display: inline-block;
                vertical-align: middle;
            }
            i {
                display: inline-block;
                vertical-align: middle;
                width: 1px;
                height: 100%;
            }
            p {
                width: 3vw;
                margin: 0;
                white-space: nowrap;
                &.num {
                    font-size: 20px;
                    // line-height: 1.05;
                }
            }
            // border-bottom: 1px solid #fff;
        }
    }
    
    .my-ul {
        padding-top: 40px;
        display: flex;
        li {
            width: 33%;
            text-align: center;
            display: flex;
            color: #fff;
            justify-content: center;
            align-items: center;
            .num {
                margin-bottom: 0;
            }
        }
    }
    
    @keyframes myfirst {
        from {
            transform: rotate(360deg);
        }
        to {
            transform: rotate(0deg);
        }
    }
    
    .main {
        height: 100%;
        /* padding-bottom: 2%; */
        /* padding-top: 2%; */
        /* background: url('~@/assets/img/background.jpg') no-repeat;
            background-size: 100% 100%;*/
        padding: 1% 2% 1%;
    }
    
    .nums {
        height: 12%;
    }
    
    .nums li {
        float: left;
        width: 50%;
        height: 100%;
    }
    
    .nums li p {
        display: inline-block;
        vertical-align: middle;
    }
    
    .nums li span {
        display: inline-block;
        vertical-align: middle;
        height: 100%
    }
    
    .bh-40 {
        height: 41%;
        margin-top: -2px;
    }
    
    .bh-50 {
        height: 48.5%;
    }
    
    .bh-33 {
        height: 31%;
        // margin-top: -2px;
    }
</style>