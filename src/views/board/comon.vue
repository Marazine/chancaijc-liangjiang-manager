<template>
    <div class="comon">
        <div class='comon-navImg'>
        <div>两江新区人才发展大数据平台</div>
        </div>
        <div class="nav-bar">
            <div class="my-button">
                <div class="my-react" @click="allInfo" :class="boartStatus==1 ? 'my-bgc': ''">
                    <span class="my-react-text">人才整体概况</span>
                </div>
                
                <div class="my-react" @click="entr" :class="boartStatus==2 ? 'my-bgc': ''">
                    <span class="my-react-text">重点产业人才</span>
                </div>
                <div class="my-react" @click="obtain" :class="boartStatus==3 ? 'my-bgc': ''">
                    <span class="my-react-text">数据动态更新</span>
                </div>
            </div>
        </div>
        <div class="timewrap">{{time}}</div>
        <div class="comon-wrap">
        <router-view></router-view>
        </div>
    
        <el-drawer v-if="drawer" title="我是标题" :visible.sync="drawer" :with-header="false">
        <boardDetailst></boardDetailst>
        </el-drawer>
    </div>
    </template>

<script>
    import boardDetails from '@/views/board/dialog/details'
    import boardDetailst from '@/views/board/dialog/detailst'
    export default {
        data() {
            return {
                drawer: false,
                direction: 'rtl',
                navTitle: '两江新区人才发展大数据平台',
                one: true,
                two: false,
                three: false,
                time: '',
            }
        },
        watch: {
            $route: {
                handler: function(val, oldVal) {
                    // console.log(val);
                },
                // 深度观察监听
                deep: true
            }
        },
        computed: {
            boartStatus() {
                return this.$store.state.common.boartStatus
            }
        },
        created() {
            switch (this.boartStatus) {
                case 1:
                    this.one = true;
                    this.two = false;
                    this.three = false;
                    break;
                case 2:
                    this.one = false;
                    this.two = true;
                    this.three = false;
                    break;
                case 3:
                    this.one = false;
                    this.two = false;
                    this.three = true;
                    break;
                default:
                    break;
            }
            setInterval(() => {
                this.timedata();
            }, 1000)
            this.timedata();
        },
        components: {
            boardDetails,
            boardDetailst
        },

        methods: {
            init() {

            },
            timedata() {
                let weekarr = new Array("日", "一", "二", "三", "四", "五", "六");
                let nowtime = new Date();
                let year = nowtime.getFullYear();
                let month = nowtime.getMonth() + 1;
                let date = nowtime.getDate();
                let week = String(nowtime.getDay());
                let time_text = year + "年" + month + "月" + date + "日 星期" + weekarr[week] + " " +
                    nowtime.toTimeString().substring(0, 8);
                this.time = time_text;
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            allInfo() {
                this.$router.replace({
                    name: 'population'
                })
                this.one = true;
                this.two = false;
                this.three = false;
            },
            obtain() {
                this.$router.replace({
                    name: 'person'
                })
                this.one = false;
                this.two = true;
                this.three = false;
            },
            entr() {
                this.$router.push({
                    name: 'visual'
                })
                this.one = false;
                this.two = false;
                this.three = true;
            },
        }
    }
</script>

<style lang='scss' scoped>
    .comon {
        color: #818181;
        height: 100vh;
        width: 100%;
        background: url('~@/assets/img/background.jpg') no-repeat;
        background-size: 100% 100%;
        .comon-navImg {
            height: 9%;
            width: 100%;
            background: url('~@/assets/img/borad/nav.png') no-repeat;
            background-size: 100% 100%;
            div {
                /* font-size: 3rem; */
                font-weight: 600;
                color: #00f2f1;
                height: 100%;
                line-height: 1.8;
                text-align: center;
                /* padding-left: 2%; */
            }
        }
        .nav-bar {
            position: absolute;
            top: 3%;
            left: 3.5%;
            .my-button {
                display: flex;
                .my-react {
                    margin-right: 15px;
                    /* width: 112px; */
                    /* width: 100%; */
                    height: 55px;
                    line-height: 55px;
                    padding: 0 20px;
                    text-align: center;
                    font-size: 16px;
                    font-weight: 700;
                    color: #00f1f0;
                    background: url('~@/assets/img/borad/navkuang.png') no-repeat;
                    background-size: 100% 100%;
                    /* border: 1px solid #01f1f0; */
                    &-text {
                        display: inline-block;
                    }
                    &:nth-child(1) {
                        margin-left: -26px;
                    }
                    &:hover {
                        cursor: pointer;
                    }
                }
                .my-bgc {
                    /* color: #000; */
                    background: url('~@/assets/img/borad/navback.png') no-repeat;
                    background-size: 100% 100%;
                }
            }
        }
        /* 侧边导航 */
        .comon-sideNav {
            position: fixed;
            top: 9%;
            left: 0;
            width: 8%;
            height: 90%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: center;
            border: 1px solid #01787f;
            border-top: none;
            border-left: none;
            background: rgba(10, 75, 200, 0.2);
            div {
                cursor: pointer;
                height: 8vh;
                line-height: 8vh;
                border-bottom: 1px solid #01787f;
            }
            .active {
                font-weight: 700;
                color: #00f2f1;
                background: url('~@/assets/img/board/btnImg.png') no-repeat;
                background-size: 100% 100%;
            }
        }
        /* 看板内容 */
        .comon-wrap {
            height: 91%;
            width: 100%;
            /* position: fixed;
            top: 10%;
            left: 8%; */
        }
        .timewrap {
            position: absolute;
            top: 5%;
            right: 2.3%;
            color: #fff;
        }
    }
</style>
<style lang='scss'>
    .comon {
        .el-drawer {
            width: 46% !important;
            background: rgba(2, 6, 14, 0.88);
            border-left: 1px solid #01787f;
        }
    }
    
    @media screen and (max-width: 960px) {
        .comon .comon-navImg div {
            font-size: 28px;
        }
    }
    
    @media screen and (min-width:960px) and (max-width:1440px) {
        .comon .comon-navImg div {
            font-size: 38px;
        }
    }
    
    @media screen and (min-width:1440px) and (max-width:1919px) {
        .comon .comon-navImg div {
            font-size: 42px;
        }
    }
    
    @media screen and (min-width: 1920px) {
        .comon .comon-navImg div {
            font-size: 48px;
        }
    }
</style>