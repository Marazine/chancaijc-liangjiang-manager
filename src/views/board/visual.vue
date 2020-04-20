<template>
  <div class="visual">
    
    <div class="visual-sideNav">
      <div v-for="item of navData" :class="{active:item.isActive}" @click="navBtn(item.id)">{{item.name}}</div>
    </div>
    <div class="visual-wrap">
      <router-view></router-view>
    </div>

    
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
                navData: [{
                        id: 0,
                        name: "首页",
                        router: 'boardHome',
                        isActive: true
                    }, {
                        id: 1,
                        name: "汽车产业",
                        router: 'board',
                        isActive: false
                    }, {
                        id: 2,
                        name: "电子产业",
                        router: 'qyqk',
                        isActive: false
                    }, {
                        id: 3,
                        name: "装备产业",
                        router: 'rcfb',
                        isActive: false
                    }, {
                        id: 4,
                        name: "生物医药产业",
                        router: 'company2',
                        isActive: false
                    }, {
                        id: 5,
                        name: "金融产业",
                        router: 'rcpy',
                        isActive: false
                    }, {
                        id: 6,
                        name: "现代物流产业",
                        router: 'rcqk',
                        isActive: false
                    }, {
                        id: 7,
                        name: "服务贸易产业",
                        router: 'rcyj',
                        isActive: false
                    }, {
                        id: 8,
                        name: "商贸文旅产业",
                        router: 'rlzyfw',
                        isActive: false
                    }
                    // , {
                    //     id: 9,
                    //     name: "会展产业",
                    //     router: 'exhibition',
                    //     isActive: false
                    // }
                ]
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
            navBtn(ind) {
                this.navData.forEach((item, index) => {
                    this.navData[item.id].isActive = false;
                    // if (ind == this.navData.length - 1) {
                    //     this.drawer = true //打开弹框
                    //     this.navData[ind].isActive = true;
                    // } else if (ind == item.id) {
                    //     this.navData[ind].isActive = true;
                    //     this.$router.push({
                    //         name: item.router
                    //     })
                    // }
                    if (ind == item.id) {
                        this.navData[ind].isActive = true;
                        this.$router.push({
                            name: item.router
                        })
                    }
                })
            }
        }
    }
</script>

<style lang='scss' scoped>
    .visual {
        color: #cccccc;
        /* height: 100vh; */
        width: 100%;
        /* background: url('~@/assets/img/background.jpg') no-repeat; */
        background-size: 100% 100%;
        /* 侧边导航 */
        .visual-sideNav {
            position: fixed;
            top: 9%;
            left: 0;
            width: 8%;
            height: 100%;
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
                height: 7vh;
                line-height: 7vh;
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
        .visual-wrap {
            height: 90%;
            width: 92%;
            position: fixed;
            top: 10%;
            left: 8%;
        }
    }
</style>
<style lang='scss'>
    .visual {
        .el-drawer {
            width: 46% !important;
            background: rgba(2, 6, 14, 0.88);
            border-left: 1px solid #01787f;
        }
    }
    
    @media screen and (max-width: 960px) {
        .visual .visual-navImg div {
            font-size: 28px;
        }
    }
    
    @media screen and (min-width:960px) and (max-width:1440px) {
        .visual .visual-navImg div {
            font-size: 38px;
        }
    }
    
    @media screen and (min-width:1440px) and (max-width:1919px) {
        .visual .visual-navImg div {
            font-size: 42px;
        }
    }
    
    @media screen and (min-width: 1920px) {
        .visual .visual-navImg div {
            font-size: 48px;
        }
    }
</style>