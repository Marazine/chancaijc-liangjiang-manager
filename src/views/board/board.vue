<template>
  <div class="my-board main">
    <div class="title-c">
      珠海产才检测看板
    </div>
    <div class="fuse content" v-if="isShow">
      <div class="row bh-100">
        <div class="col-md-3 f-column">
          <!-- <product_person :initData="PayData" :config='configure_ind'></product_person> -->
          <chartSwitch :initData="PayData" :config='configure_ind'></chartSwitch>
          <!-- <pie_a :initData="product_personData" :config="product_person_config"></pie_a> -->
          <Chart :initData="product_personData" :config='product_person_config'></Chart>
        </div>
        <div class="col-md-6" style="padding:0 10px">
          <ns_map :initData='zhDataMap' :initmapData='initmapData' :title="'珠海地图'" :config="zhuhaimapConfig"></ns_map>
          <Guide></Guide>
        </div>
        <div class="col-md-3 f-column">
          <chartSwitch :initData="pie_aData" :config='pie_aconfig'></chartSwitch>
          <Chart :initData="professionalData" :config='professional_config'></Chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import pie_a from "./qyqk/modules/pie_a"

    import Guide from './chunk/guide'

    import nsMap from './ns'
    import nsData from './nsData'
    export default {
        data() {
            let queryType = this.$route.query.type;
            return {
                isShow: false,
                allData: null,
                initmapData: nsMap.data,
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
                    title: "企业情况",
                    isScroll: true,
                    titleLeft: "行业类型分布",
                    titleRight: "行业人才分布",
                },
                product_person_config: {
                    type: 'rcqk2',
                    title: '人才情况',
                    echartTitleShow: true,
                    echartTitle: "企业规模占比",
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
                    type: 'rcpy',
                    title: "人才培养",
                    echartTitleShow: true,
                    echartTitle: "人才主要培养方式",
                    left: '2%',
                    right: '2%',
                    top: '0',
                    bottom: '0',
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
                zhuhaimapConfig: {
                    // paddingTop: '1%',
                    // paddingTop: '1%',
                    marginTop: '4%',
                    isTitle: false,
                },
            }
        },
        created() {
            this.init();
            // this.isShow = true;
        },
        components: {
            pie_a,
            Guide
        },

        methods: {
            init() {
                this.$http({
                    url: this.$http.adornUrl("op=personfusioncontroller&func=getIndexData", "CQ"),
                    method: "post",
                    data: {
                        condition: JSON.stringify({
                            index: 1,
                            queryKeys: ['A4', 'B1_1', 'C1_1', 'C1_2', 'C8']
                        })
                    }
                }).then(({
                    data
                }) => {
                    if (data && data.code == 200) {
                        this.allData = data.data;
                        this.PayData = {
                            A4: data.data.A4,
                            personBussiness: data.data.personBussiness
                        };
                        this.product_personData = data.data.B1_1;
                        this.pie_aData = {
                            C1_1: data.data.C1_1,
                            C1_2: data.data.C1_2
                        };
                        this.professionalData = data.data.C8;
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