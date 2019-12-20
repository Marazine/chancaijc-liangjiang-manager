<template>
  <div class="my-board main">
    <div class="title-c">
      两江产才监测看板
    </div>
    <div class="fuse content" v-if="isShow">
      <div class="row bh-100">
        <div class="col-md-3 f-column">
          <chartSwitch :initData="PayData" :config='configure_ind'></chartSwitch>
          <Chart :initData="professionalData" :config='professional_config'></Chart>
        </div>
        <div class="col-md-6" style="padding:0 10px">
            <ul class="fl deta">
                <li>
                    <p><img src="../../assets/img/company1.png"/><i></i></p>
                    <div>
                        <p>调研企业</p>
                        <p class="num">{{num1}}家</p>
                    </div>
                </li>
                <li>
                    <p><img src="../../assets/img/company2.png" /><i></i></p>
                    <div>
                        <p>企业人才总数</p>
                        <p class="num">{{num2}}人</p>
                    </div>
                </li>
            </ul>
            <ul class="fr deta">
                <li>
                    <p><img src="../../assets/img/company3.png" /><i></i></p>
                    <div>
                        <p>重点产业数量</p>
                        <p class="num">{{num4}}家</p>
                    </div>
                </li>
                <li>
                    <p><img src="../../assets/img/company5.png" /><i></i></p>
                    <div>
                        <p>党员总数</p>
                        <p class="num">{{num3}}人</p>
                    </div>
                </li>
            </ul>
          <Chart :initData="middleData" :config='product_person_config2'></Chart>
          <Guide></Guide>
        </div>
        <div class="col-md-3 f-column">
          <Chart :initData="product_personData" :config='product_person_config'></Chart>
          <chartSwitch :initData="product_num" :config='product_num_config'></chartSwitch>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import Guide from './chunk/guide'
    import nsMap from './ns'
    import nsData from './nsData'
    
    export default {
        data() {
            let queryType = this.$route.query.type;
            return {
                num1:0,
                num2:0,
                num3:0,
                num4:0,
                isShow: false,
                allData: null,
                middleData: null,
                zhDataMap: {
                    ns_mapData: null,
                },
                PayData: [],
                pie_aData: {
                    C1_1: '',
                    C1_2: ''
                },
                configure_ind: {
                    type: 'qyqk',
                    echartTitleShow: true,
                    echartTitle: "行业类型分布",
                    title: "行业分布情况",
                    isScroll: true,
                    titleLeft: "行业类型分布",
                    titleRight: "行业人才分布",
                },
                product_num_config:{
                    type: 'qyqk',
                    echartTitleShow: true,
                    echartTitle: "企业规模",
                    title: "企业规模",
                    isScroll: false,
                    titleLeft: "行业类型分布",
                    titleRight: "行业人才分布",
                },
                product_person_config: {
                    type: 'rcqk2',
                    title: '企业盈利情况',
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
                professional_config: {
                    type: 'rczy',
                    type: 'rczy',
                    bar_color_l: "#00fff3",
                    bar_color_r: "transparent",
                    ispercent: false,
                    paddingTop: '5%',
                    top: '15%',
                    right: '5%',
                    left: '15%',
                    bottom: '25%',
                    barWidth: '10px',
                    title: "企业性质",
                    echartTitleShow: true,
                    echartTitle: "",
                    push: 'rcpy',
                    isClick: true,
                    radius: ['45%', '60%'],
                },
                pie_aconfig: {
                    title: "人才引进",
                    echartTitleShow: true,
                    echartTitle: "本年度人才引进数量",
                    isClick: true,
                    type: 'rcyinjin',
                    titleLeft: "本年度引进",
                    titleRight: "下年度引进",
                },
                product_num:null,
                zhuhaimapConfig: {
                    // paddingTop: '1%',
                    // paddingTop: '1%',
                    marginTop: '4%',
                    isTitle: false,
                },
                product_person_config2: {
                    type: 'jndj',
                    paddingTop: '10%',
                    echartTitleShow: false,
                    isClick: false,
                    left: '4%',
                    right: '10%',
                    top: '0',
                    bottom: '-8%',
                }
            }
        },
        created() {
            this.init();
        },
        components: {
            Guide
        },
        methods: {
            init() {
                this.$http({
                    url: this.$http.adornUrl("op=dash&func=getDashData", "XZX"),
                    method: "post",
                    data: {
                        condition: JSON.stringify({
                            index: 1,
                            queryKeys: ['A_A4_1', 'A_A2_1', 'A_A10_1', 'B_B1_1', 'A_A3_1']
                        })
                    }
                }).then(({
                    data
                }) => {
                    if (data && data.code == 200) {
                        this.allData = data.data;
                        this.PayData = {
                            A4: data.data.A_A4_1
                        };
                        this.middleData = data.data.A_A2_1
                        this.product_personData = data.data.A_A10_1;
                        
                        this.product_num = {
                            A4: data.data.B_B1_1
                        };
                        this.professionalData = data.data.A_A3_1;
                        this.num1 = data.data.num1;
                        this.num2 = data.data.num2;
                        this.num3 = data.data.num3;
                        this.num4 = data.data.num4;



                        this.pie_aData = {
                            C1_1: data.data.C1_1,
                            C1_2: data.data.C1_2
                        };
                        this.zhDataMap.ns_mapData = data.data.regionDetail;

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
    
    .circal {
        position: fixed;
        top: 50%;
        left: 50%;
        width: 70%;
        transform: translate(-50%, -50%);
        height: 124.2%;
        border: 1px solid #00ffff;
        background: url(/static/img/nsBg.7a8cd09.png) no-repeat;
        background-position: 52% 102%;
        background-size: 141% 95%;
        opacity: 0.1;
        /* animation: myfirst 3s infinite linear; */
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
        height: 100vh;
        background: url('../../assets/img/background.jpg') no-repeat;
        background-size: 100% 100%;
        padding: 0% 2.5% 2.5% 3.5% !important;
    }
</style>