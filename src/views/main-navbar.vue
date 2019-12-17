<template>
  <nav class="site-navbar" :class="'site-navbar--' + navbarLayoutType">
    <div class="site-navbar__header">
      <h1 class="site-navbar__brand" @click="$router.push({ name: 'home' })">
        <a class="site-navbar__brand-lg" href="javascript:;">两江新区人才发展状况调研分析平台</a>
        <a class="site-navbar__brand-mini" href="javascript:;">两江</a>
      </h1>
    </div>
    <div class="site-navbar__body clearfix">
      
      
      <el-menu class="site-navbar__menu site-navbar__menu--right" mode="horizontal">
        
        
        
        <el-menu-item class="site-navbar__avatar" index="2" style="background-color: transparent;">
          <el-input v-model="inputSearch" @keydown.enter.native="searchCompany" :debounce=0 placeholder="请输入企业名称">
          </el-input>
          <span class="el-icon-circle-close-outline" :style="{display:visible}" @click="clearContent"></span>
        </el-menu-item>
        <el-menu-item class="site-navbar__avatar padding0" index="3" @click.native="searchCompany">
          搜索
        </el-menu-item>
        <el-menu-item class="site-navbar__avatar" index="4" @click.native="logoutHandle()">退出
         
        </el-menu-item>
      </el-menu>
      <el-menu class="site-navbar__menu site-navbar_menu-left" mode="horizontal">
        <!-- <span class="navbar-left-title">数据提交时间筛选</span> -->
        <!-- <el-date-picker
          @change="globalDataChange"
          class="menu-left-data-picker"
          v-model="globalTime"
          type="datetimerange"
          value-format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker> -->

      </el-menu>
    </div>
    <!-- 弹窗, 修改密码 -->
    <update-password v-if="updatePassowrdVisible" ref="updatePassowrd"></update-password>
  </nav>
</template>

<script>
    import UpdatePassword from "./main-navbar-update-password";
    import {
        clearLoginInfo
    } from "@/utils";
    import bus from "./common/bus.js";

    export default {
        data() {
            return {
                updatePassowrdVisible: false,
                inputSearch: "",
                visible: "none", //清除按钮
                globalTime: [],
                userIDglobalData: ""
            };
        },
        components: {
            UpdatePassword
        },
        computed: {
            navbarLayoutType: {
                get() {
                    return this.$store.state.common.navbarLayoutType;
                }
            },
            sidebarFold: {
                get() {
                    return this.$store.state.common.sidebarFold;
                },
                set(val) {
                    this.$store.commit("common/updateSidebarFold", val);
                }
            },
            mainTabs: {
                get() {
                    return this.$store.state.common.mainTabs;
                },
                set(val) {
                    this.$store.commit("common/updateMainTabs", val);
                }
            },
            userName: {
                get() {
                    return this.$store.state.user.name;
                }
            }
        },
        watch: {
            inputSearch() {
                if (this.inputSearch == "") {
                    this.visible = "none";
                } else {
                    this.visible = "block"
                }
            }
        },
        methods: {
            searchCompany() {
                if (this.inputSearch == "") {
                    this.$message("搜索内容不允许为空");
                } else {
                    this.$router.push({
                        name: "company",
                        params: {
                            unitName: this.inputSearch
                        }
                    });
                    this.$store.commit('common/inputSearch', this.inputSearch);
                    bus.$emit("gloablSearch", {
                        inputSearch: this.inputSearch
                    });
                }
            },
            globalDataChange() { // 全局时间段change改变

                if (this.globalTime == null || this.globalTime == "") {
                    let dstrnull = {
                        "startTime": "",
                        "endTime": ""
                    };
                    localStorage.setItem(this.userIDglobalData, JSON.stringify(dstrnull));
                } else {
                    let dstrval = {
                        "startTime": this.globalTime[0],
                        "endTime": this.globalTime[1]
                    };
                    localStorage.setItem(this.userIDglobalData, JSON.stringify(dstrval));
                }
                this.$root.eventHub.$emit('globalDataChange', {
                    "on": 1
                })
            },
            // 清除搜索内容
            clearContent() {
                this.inputSearch = "";
            },
            // 修改密码
            updatePasswordHandle() {
                this.updatePassowrdVisible = true;
                this.$nextTick(() => {
                    this.$refs.updatePassowrd.init();
                });
            },
            // 退出
            logoutHandle() {
                this.$confirm(`确定进行[退出]操作?`, "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    })
                    .then(() => {
                        this.$http({
                            url: this.$http.adornUrl("/user/logout", "CQ"),
                            method: "post",
                            data: this.$http.adornData()
                        }).then(({
                            data
                        }) => {
                            // console.dir(data)
                            // if (data && data.code === 200) {
                            // }
                            clearLoginInfo();
                            this.$router.push({
                                name: "login"
                            });
                            this.$message.success(data.status_desc);
                        });
                    })
                    .catch(err => {
                        console.dir(err);
                    });
            }
        },
        created() {
            var userID = this.$cookie.get("token"); // 登录用户ID
            this.userIDglobalData = userID + "globalData"; // 本用户存储的全局时间戳
            if (localStorage.getItem(this.userIDglobalData) == undefined || localStorage.getItem(this.userIDglobalData) == null || localStorage.getItem(this.userIDglobalData) == "") {
                // 此用户未设置过全局时间戳
                let dstr = {
                    "startTime": "",
                    "endTime": ""
                };
                localStorage.setItem(this.userIDglobalData, JSON.stringify(dstr));
            } else {
                let globalDataObj = JSON.parse(localStorage.getItem(this.userIDglobalData));
                // globalTime
                if (globalDataObj.startTime != undefined && globalDataObj.startTime != null && globalDataObj.startTime != "" &&
                    globalDataObj.endTime != undefined && globalDataObj.endTime != null && globalDataObj.endTime != ""
                ) {
                    this.globalTime.push(globalDataObj.startTime);
                    this.globalTime.push(globalDataObj.endTime);
                } else {
                    let dstr = {
                        "startTime": "",
                        "endTime": ""
                    };
                    localStorage.setItem(this.userIDglobalData, JSON.stringify(dstr));
                }
            }
        }
    };
</script>
<style>
    .site-navbar__header{
        overflow: inherit;
    }
    .site-navbar .padding0 {
        padding: 0;
    }
    
    .site-navbar_menu-left {
        float: right;
    }
    
    .site-navbar_menu-left .menu-left-data-picker {
        vertical-align: inherit;
        margin-top: 7px;
        width: 400px;
    }
    
    .site-navbar_menu-left .el-date-editor .el-range-input {
        width: 40%;
    }
    
    .navbar-left-title {
        color: #fff;
    }
    
    .close {
        position: relative;
    }
    
    .el-icon-circle-close-outline {
        position: absolute;
        right: 22px;
        top: 16px;
        z-index: 999;
        color: #bbb;
        cursor: pointer;
    }
    
    .site-wrapper .el-input__inner {
        padding-right: 33px;
    }
</style>