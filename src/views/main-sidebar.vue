<template>
  <aside class="site-sidebar" :class="'site-sidebar--' + sidebarLayoutSkin">
    <div class="site-sidebar__inner">
      <el-menu :default-active="menuActiveName || $route.path.split('/').reverse()[0]" 
               :collapse="sidebarFold"
               :collapseTransition="false" 
               class="site-sidebar__menu">
        <el-menu-item index="home" @click="$router.push({ name: 'home' })">
          <icon-svg name="shouye" class="site-sidebar__menu-icon"></icon-svg>
          <span slot="title">首页</span>
        </el-menu-item>
        <!-- <el-menu-item index="company_manage" @click="$router.push({ name: 'company_manage' })">
          <icon-svg name="shouye" class="site-sidebar__menu-icon"></icon-svg>
          <span slot="title">企业管理</span>
        </el-menu-item> -->
        <!-- <el-submenu index="企业管理">
          <template slot="title">
            <icon-svg name="tongjifenxi" class="site-sidebar__menu-icon"></icon-svg>
            <span>企业管理</span>
          </template>
<el-menu-item index="company_manage_list" @click="$router.push({ name: 'company_manage_list' })">
    <icon-svg name="tongjifenxi" class="site-sidebar__menu-icon"></icon-svg>
    <span slot="title">企业列表</span>
</el-menu-item>
<el-menu-item v-if="isAuth('sys:company:email')" index="company_manage_email" @click="$router.push({ name: 'company_manage_email' })">
    <icon-svg name="tongjifenxi" class="site-sidebar__menu-icon"></icon-svg>
    <span slot="title">邮件发送记录</span>
</el-menu-item>
</el-submenu> -->
<el-submenu index="分析管理">
    <template slot="title">
            <icon-svg name="tongjifenxi" class="site-sidebar__menu-icon"></icon-svg>
            <span>分析管理</span>
          </template>
    <el-menu-item index="analyse" @click="$router.push({ name: 'analyse' })">
        <icon-svg name="tongjifenxi" class="site-sidebar__menu-icon"></icon-svg>
        <span slot="title">统计分析</span>
    </el-menu-item>
    <el-menu-item index="data" @click="$router.push({ name: 'data' })">
        <icon-svg name="shujutongji" class="site-sidebar__menu-icon"></icon-svg>
        <span slot="title">数据统计</span>
    </el-menu-item>
    <el-menu-item index="company" @click="$router.push({ name: 'company' })">
        <icon-svg name="qiyechaxun" class="site-sidebar__menu-icon"></icon-svg>
        <span slot="title">企业查询</span>
    </el-menu-item>
</el-submenu>
<sub-menu v-for="menu in menuList" :key="menu.menuId" :menu="menu" :dynamicMenuRoutes="dynamicMenuRoutes">
</sub-menu>
<el-menu-item index="board" @click="pushNewPage">
    <icon-svg name="tubiao" class="site-sidebar__menu-icon"></icon-svg>
    <span slot="title">一键看板</span>
</el-menu-item>
<el-menu-item index="open" @click="$router.push({ name: 'open' })">
    <icon-svg name="system" class="site-sidebar__menu-icon"></icon-svg>
    <span slot="title">接口管理</span>
</el-menu-item>
<el-menu-item index="user" @click="$router.push({ name: 'user' })">
    <icon-svg name="log" class="site-sidebar__menu-icon"></icon-svg>
    <span slot="title">用户接口管理</span>
</el-menu-item>
<!-- <el-submenu index="系统管理">
          <template slot="title">
            <icon-svg name="tongjifenxi" class="site-sidebar__menu-icon"></icon-svg>
            <span>系统管理</span>
          </template>
          <el-menu-item index="user" @click="$router.push({ name: 'user' })">
            <icon-svg name="tongjifenxi" class="site-sidebar__menu-icon"></icon-svg>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item index="role" @click="$router.push({ name: 'role' })">
            <icon-svg name="shujutongji" class="site-sidebar__menu-icon"></icon-svg>
            <span slot="title">角色管理</span>
          </el-menu-item>
          <el-menu-item index="menu" @click="$router.push({ name: 'menu' })">
            <icon-svg name="qiyechaxun" class="site-sidebar__menu-icon"></icon-svg>
            <span slot="title">菜单管理</span>
          </el-menu-item>
        </el-submenu> -->
<!-- <el-submenu index="demo">
          <template slot="title">
            <icon-svg name="shoucang" class="site-sidebar__menu-icon"></icon-svg>
            <span>demo</span>
          </template>
<el-menu-item index="demo-echarts" @click="$router.push({ name: 'demo-echarts' })">
    <icon-svg name="tubiao" class="site-sidebar__menu-icon"></icon-svg>
    <span slot="title">echarts</span>
</el-menu-item>
<el-menu-item index="demo-ueditor" @click="$router.push({ name: 'demo-ueditor' })">
    <icon-svg name="editor" class="site-sidebar__menu-icon"></icon-svg>
    <span slot="title">ueditor</span>
</el-menu-item>
</el-submenu> -->
</el-menu>
</div>
</aside>
</template>

<script>
    import SubMenu from './main-sidebar-sub-menu'
    import {
        isURL
    } from '@/utils/validate'
    export default {
        data() {
            return {
                dynamicMenuRoutes: []
            }
        },
        components: {
            SubMenu
        },
        computed: {
            sidebarLayoutSkin: {
                get() {
                    return this.$store.state.common.sidebarLayoutSkin
                }
            },
            sidebarFold: {
                get() {
                    return this.$store.state.common.sidebarFold
                }
            },
            menuList: {
                get() {
                    return this.$store.state.common.menuList
                },
                set(val) {
                    this.$store.commit('common/updateMenuList', val)
                }
            },
            menuActiveName: {
                get() {
                    return this.$store.state.common.menuActiveName
                },
                set(val) {
                    this.$store.commit('common/updateMenuActiveName', val)
                }
            },
            mainTabs: {
                get() {
                    return this.$store.state.common.mainTabs
                },
                set(val) {
                    this.$store.commit('common/updateMainTabs', val)
                }
            },
            mainTabsActiveName: {
                get() {
                    return this.$store.state.common.mainTabsActiveName
                },
                set(val) {
                    this.$store.commit('common/updateMainTabsActiveName', val)
                }
            }
        },
        watch: {
            $route: 'routeHandle'
        },
        created() {
            this.menuList = JSON.parse(sessionStorage.getItem('menuList') || '[]')
            this.dynamicMenuRoutes = JSON.parse(sessionStorage.getItem('dynamicMenuRoutes') || '[]')
            this.routeHandle(this.$route)
        },
        // computed: {
        //   defaultActive() {
        //     return '/' + this.$route.path.split('/').reverse()[0];
        //   }
        // },
        methods: {
            // 路由操作
            routeHandle(route) {
                if (route.meta.isTab) {
                    // tab选中, 不存在先添加
                    var tab = this.mainTabs.filter(item => item.name === route.name)[0]
                    if (!tab) {
                        if (route.meta.isDynamic) {
                            route = this.dynamicMenuRoutes.filter(item => item.name === route.name)[0]
                            if (!route) {
                                return console.error('未能找到可用标签页!')
                            }
                        }
                        tab = {
                            menuId: route.meta.menuId || route.name,
                            name: route.name,
                            title: route.meta.title,
                            type: isURL(route.meta.iframeUrl) ? 'iframe' : 'module',
                            iframeUrl: route.meta.iframeUrl || '',
                            params: route.params,
                            query: route.query
                        }
                        this.mainTabs = this.mainTabs.concat(tab)
                    }
                    console.log(tab.menuId);
                    this.menuActiveName = tab.menuId + ''
                    this.mainTabsActiveName = tab.name
                }
            },
            pushNewPage() {
                const {
                    href
                } = this.$router.resolve({
                    name: 'common'
                })
                window.open(href, '_blank')
            }
        }
    }
</script>