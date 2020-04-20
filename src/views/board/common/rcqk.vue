<template>
    <div class="my-board main">
        <!-- <div class="title-c">
        珠海产才监测看板
        </div> -->
        <div class="fuse content" v-if="isShow">
        <div class="row bh-100">
            <div class="col-md-4 f-column">
                <ul class="nums clearfix">
                    <li class="num-elastic">
                        <img src="~@/assets/img/board/rcsl.png" alt="">
                        <div>
                        <p>数量</p>
                            <span>{{num1||0}}</span> 
                        </div>
                    </li>
                    <li>
                        <p @click="$router.push({name: 'highlevel',query:{company:15,name:'现代物流',opra:'重庆唯品会电子商务有限公司',industrySelect:6}})" class="industryBtn">重点企业</p>
                    </li>
                </ul>
                <Chart class="bh-40" :initData="edu_aData" :config='edu_aconfig'></Chart>
            <Chart class="bh-40" :initData="age_Data" :config='age_config'></Chart>
            </div>
            <div class="col-md-4 f-column" style="padding:0 10px">
            <Chart class="bh-33" :initData="people_Data" :config='people_config'></Chart>
            <Chart class="bh-33" :initData="title_Data" :config='title_config'></Chart>
            <Chart class="bh-33" :initData="skill_Data" :config='skill_config'></Chart>
            </div>
    
            <div class="col-md-4 f-column">
            <Chart :initData="resource_Data" :config='resource_config'></Chart>
            <Chart :initData="eduneed_aData" :config='eduneed_config'></Chart>
            <!-- <Chart :initData="resource_Data" :config='resource_config'></Chart> -->
            </div>
        </div>
        </div>
    </div>
    </template>

<script>
    export default {
        data() {
            let queryType = this.$route.query.type;
            return {
                name: '汽车',
                num1: 0,
                isShow: false,
                eduneed_aData: null,
                eduneed_config: {
                    type: 'rcxlxqfb',
                    title: '人才学历需求分布',
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
                skill_Data: null,
                skill_config: {
                    type: 'rcldqk',
                    title: '人才流动情况',
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
                title_Data: null,
                title_config: {
                    type: 'qyxz',
                    title: '人才技能等级分布',
                    paddingTop: '5%',
                    left: '8%',
                    right: '5%',
                    top: '10%',
                    bottom: '22%',
                    bar_color_l: "#00ffff",
                    bar_color_r: "#ff8352",
                    barWidth: 15,
                },
                people_Data: null,
                people_config: {
                    type: 'bussinessFlow',
                    title: "人才职称分布",
                    isScroll: false,
                    paddingTop: '8%',
                    c_left: "5%",
                    margin: '5%',
                    legend: ['流入', '流出']
                },
                age_Data: null,
                age_config: {
                    type: 'qyxz',
                    title: '人才年龄分布',
                    paddingTop: '5%',
                    left: '8%',
                    right: '5%',
                    top: '10%',
                    bottom: '22%',
                    bar_color_l: "#00ffff",
                    bar_color_r: "#ff8352",
                    barWidth: 15,
                },
                edu_aData: null,
                edu_aconfig: {
                    type: 'rcqk2',
                    title: '人才学历分布',
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
                resource_config: {
                    type: 'rcpy',
                    bar_color_l: "#00fff3",
                    bar_color_r: "transparent",
                    ispercent: false,
                    paddingTop: '5%',
                    top: '15%',
                    right: '5%',
                    left: '15%',
                    bottom: '25%',
                    barWidth: '10px',
                    title: "人才来源需求分布",
                }

            }
        },
        created() {
            this.init();
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
                            industrySelect: 6
                                // queryKeys: ['A_A4_1', 'A_A2_1', 'A_A10_1', 'B_B1_1', 'A_A3_1']
                        })
                    }
                }).then(({
                    data
                }) => {
                    if (data && data.code == 200) {

                        data.data.list.forEach((item, index) => {
                            if (item.name == '现代物流') {
                                this.eduneed_aData = item.eduNeeds
                                this.skill_Data = item.industuryFlow
                                this.title_Data = item.skillNeeds
                                this.people_Data = item.work
                                this.age_Data = item.age
                                this.edu_aData = item.edu
                                this.resource_Data = item.sourceNeeds;
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
    
    .bh-33 {
        height: 32%;
        // margin-top: -2px;
    }
</style>