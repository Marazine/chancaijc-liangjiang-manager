<template>
    <div class="comon">
        <div class='comon-navImg'>
        <div>两江新区人才发展大数据平台</div>
        </div>
        <div class="nav-bar">
            <div class="my-button">
                <div class="my-react" @click="allInfo" :class="one ? 'my-bgc': ''">
                    <span class="my-react-text">人才整体概况</span>
                </div>
                <div class="my-react" @click="obtain" :class="two ? 'my-bgc': ''">
                    <span class="my-react-text">高层次人才情况</span>
                </div>
                <div class="my-react" @click="entr" :class="three ? 'my-bgc': ''">
                    <span class="my-react-text">重点产业人才</span>
                </div>
            </div>
        </div>
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
            }
        },
        created() {
            this.init();
            // this.isShow = true;
        },
        components: {
            boardDetails,
            boardDetailst
        },

        methods: {
            init() {

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
            height: 10%;
            width: 100%;
            background: url('~@/assets/img/board/nav.png') no-repeat;
            background-size: 150% 100%;
            div {
                /* font-size: 3rem; */
                font-weight: 600;
                color: #00f2f1;
                height: 100%;
                line-height: 2;
                padding-left: 2%;
            }
        }
        .nav-bar {
            position: absolute;
            top: 0;
            right: 2%;
            .my-button {
                display: flex;
                .my-react {
                    margin-right: 7px;
                    /* width: 112px; */
                    /* width: 100%; */
                    height: 40px;
                    line-height: 40px;
                    padding: 0 10px;
                    text-align: center;
                    font-size: 16px;
                    font-weight: 700;
                    color: #00f1f0;
                    background: transparent;
                    border: 1px solid #01f1f0;
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
                    color: #000;
                    background-color: #01f1f0;
                }
            }
        }
        /* 侧边导航 */
        .comon-sideNav {
            position: fixed;
            top: 10%;
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
            height: 90%;
            width: 100%;
            /* position: fixed;
            top: 10%;
            left: 8%; */
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