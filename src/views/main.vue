<template>
  <div class="site-wrapper" :class="{ 'site-sidebar--fold': sidebarFold }" v-loading.fullscreen.lock="loading"
    element-loading-text="拼命加载中">

    <!-- <div class="homeguideWindow" id="homeguideWindow" v-if="isshowGuide">
        <div id="guidecontainer">
          <div class="guideTitle">产品功能升级提示</div>
          <div class="guideTitle">我们对一些功能进行了调整</div>
          <div class="guideAct">
            <el-button size="small" type="primary" @click="trunoffGuideWindow">关闭提示</el-button>
          </div>
        </div>
        <div class="guidedes">
            <img src="../assets/img/guide.png" width="60px" class="arrowImg"/>
            <div class="guideText">
                通过此处，可对数据的提交时间进行筛选，筛选后全部统计数据将仅统计该日期后的数据
            </div>
        </div>
    </div> -->
    <template v-if="!loading">
      <main-navbar />
      <main-sidebar/>
      <div class="site-content__wrapper" :style="{ 'min-height': documentClientHeight + 'px' }">
        <main-content />
      </div>
    </template>

</div>
</template>

<script>
    import MainNavbar from './main-navbar'
    import MainSidebar from './main-sidebar'
    import MainContent from './main-content'
    import {
        setTimeout
    } from 'timers'
    export default {
        data() {
            return {
                loading: false,
                isshowGuide: false
            }
        },
        components: {
            MainNavbar,
            MainSidebar,
            MainContent
        },
        computed: {
            documentClientHeight: {
                get() {
                    return this.$store.state.common.documentClientHeight
                },
                set(val) {
                    this.$store.commit('common/updateDocumentClientHeight', val)
                }
            },
            sidebarFold: {
                get() {
                    return this.$store.state.common.sidebarFold
                }
            },
            userId: {
                get() {
                    return this.$store.state.user.id
                },
                set(val) {
                    this.$store.commit('user/updateId', val)
                }
            }
        },
        created() {
            // this.getUserInfo()
        },
        mounted() {

            this.resetDocumentClientHeight();
            var tempStr = this.$cookie.get("token") + "islogined"; // 是否首次登陆
            if (localStorage.getItem(tempStr) == undefined || localStorage.getItem(tempStr) == null || localStorage.getItem(tempStr) == "") {
                // 未登陆过
                localStorage.setItem(tempStr, "0");
                this.isshowGuide = true;
            } else { // 如果有值
                if (localStorage.getItem(tempStr) == '1') {
                    // 此用户登陆过
                    this.isshowGuide = false;
                } else {
                    this.isshowGuide = true;
                }
            }
            if (this.isshowGuide) {
                // setTimeout(function(){
                //   document.getElementById("guidecontainer").style.left=((document.body.clientWidth)/2)+"px"; 
                // },2)
            }

        },
        methods: {
            // 重置窗口可视高度
            resetDocumentClientHeight() {
                this.documentClientHeight = document.documentElement['clientHeight']

                window.onresize = () => {
                    this.documentClientHeight = document.documentElement['clientHeight'];
                    //   if(this.isshowGuide){
                    //       document.getElementById("guidecontainer").style.left=((document.body.clientWidth)/2)+"px";
                    //   }

                }
            },
            trunoffGuideWindow() {
                this.isshowGuide = false;
                var tempStr = this.$cookie.get("token") + "islogined"; // 是否首次登陆
                localStorage.setItem(tempStr, "1"); // 设置为登陆过了
            },
            // 获取当前管理员信息
            getUserInfo() {
                this.$http({
                    url: this.$http.adornUrl('/user/info', 'CQ'),
                    method: 'get',
                    params: this.$http.adornParams()
                }).then(({
                    data
                }) => {
                    if (data && data.code === 200) {
                        this.loading = false
                        this.userId = data.user.userId
                        this.userName = data.user.username
                    }
                })
            }
        }
    }
</script>


<style scoped>
    .homeguideWindow {
        width: 100%;
        height: 100%;
        position: absolute;
        background: rgba(0, 0, 0, 0.7);
        top: 0px;
        padding: 0px;
        z-index: 9991;
    }
    
    #guidecontainer {
        position: fixed;
        top: 60%;
        text-align: center;
        color: #fff;
        font-size: 28px;
        margin-left: -170px;
        margin-top: -130px;
    }
    
    .guideTitle {
        padding-bottom: 10px;
    }
    
    .guidedes {
        position: fixed;
        right: 368px;
        top: 50px;
        font-size: 13px;
        color: #fff;
    }
    
    .arrowImg {
        margin-left: 49px;
    }
    
    .guideText {
        width: 190px;
        line-height: 18px;
    }
</style>