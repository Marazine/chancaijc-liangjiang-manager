/**
 * 全站路由配置
 *
 * 建议:
 * 1. 代码中路由统一使用name属性跳转(不使用path属性)
 */
import Vue from 'vue'
import Router from 'vue-router'
import http from '@/utils/httpRequest'
import { isURL } from '@/utils/validate'
import { clearLoginInfo } from '@/utils'

Vue.use(Router)

// 开发环境不使用懒加载, 因为懒加载页面太多的话会造成webpack热更新太慢, 所以只有生产环境使用懒加载
const _import = require('./import-' + process.env.NODE_ENV)

// 全局路由(无需嵌套上左右整体布局)
const globalRoutes = [
    { path: '/404', component: _import('common/404'), name: '404', meta: { title: '404未找到' } },
    { path: '/login', component: _import('common/login'), name: 'login', meta: { title: '登录' } },
    { path: '/analyseF_detail/:companyId/:companyName', component: _import('analyseF/analyseF_detail'), name: 'analyseF_detail', meta: { title: '统计分析明细F' } },
    {
        path: '/highlevel',
        component: _import('board/wrap/highlevel'),
        name: 'highlevel',
        meta: {
            title: '企业情况'
        }
    },
    {
        path: '/common',
        component: _import('board/comon'),
        name: 'common',
        redirect: {
            name: 'population',
        },
        meta: { title: '珠海产才检测看板' },
        children: [{
                path: '/common/population',
                component: _import('board/wrap/population'),
                name: 'population',
                meta: {
                    title: '人才总体概况'
                }
            },
            {
                path: '/person',
                component: _import('board/wrap/person'),
                name: 'person',
                meta: {
                    title: '高层次人才情况'
                }
            },
            {
                path: '/common/visual',
                component: _import('board/visual'),
                name: 'visual',
                meta: {
                    title: '珠海产才监测看板'
                },
                redirect: {
                    name: 'boardHome',
                },
                children: [{
                        path: '/common/visual/home',
                        component: _import('board/common/home'),
                        name: 'boardHome',
                        meta: {
                            title: '首页'
                        }
                    }, {
                        path: '/common/visual/board',
                        component: _import('board/common/board'),
                        name: 'board',
                        meta: {
                            title: '看板'
                        }
                    },
                    {
                        path: '/common/visual/qyqk',
                        component: _import('board/common/qyqk'),
                        name: 'qyqk',
                        meta: {
                            title: '企业情况'
                        }
                    },
                    {
                        path: '/common/visual/rcqk',
                        component: _import('board/common/rcqk'),
                        name: 'rcqk',
                        meta: {
                            title: '人才情况'
                        }
                    },
                    {
                        path: '/common/visual/rcfb',
                        component: _import('board/common/rcfb'),
                        name: 'rcfb',
                        meta: {
                            title: '人才分布'
                        }
                    },
                    {
                        path: '/common/visual/rcyj',
                        component: _import('board/common/rcyj'),
                        name: 'rcyj',
                        meta: {
                            title: '人才引进'
                        }
                    },
                    {
                        path: '/common/visual/rcpy',
                        component: _import('board/common/rcpy'),
                        name: 'rcpy',
                        meta: {
                            title: '人才培养'
                        }
                    },
                    {
                        path: '/common/visual/rlzyfw',
                        component: _import('board/common/rlzyfw'),
                        name: 'rlzyfw',
                        meta: {
                            title: '人才资源服务与政策'
                        }
                    },
                    {
                        path: '/common/visual/company2',
                        component: _import('board/common/company'),
                        name: 'company2',
                        meta: {
                            title: '企业类型分布'
                        }
                    },
                    {
                        path: '/common/visual/exhibition',
                        component: _import('board/common/exhibition'),
                        name: 'exhibition',
                        meta: {
                            title: '会展'
                        }
                    },
                ]
            }
        ],
    },

    // { path: '/board', component: _import('board/visual'), name: 'board', meta: { title: '看板' } },
    // { path: '/rcfb', component: _import('board/rcfb/rcfb'), name: 'rcfb', meta: { title: '人才分布' } },
    // { path: '/company2', component: _import('board/common/company'), name: 'company2', meta: { title: '企业类型分布' } },
    // { path: '/rcfzhj', component: _import('board/rcfzhj/rcfzhj'), name: 'rcfzhj', meta: { title: '人才发展环境分析' } },
    // { path: '/xq', component: _import('board/xq/xq'), name: 'xq', meta: { title: '人才需求分析' } },
    // { path: '/qyrlfw', component: _import('board/qyrlfw/qyrlfw'), name: 'qyrlfw', meta: { title: '企业人力资源服务投入及需求分析' } },
    // { path: '/rcld', component: _import('board/rcld/rcld'), name: 'rcld', meta: { title: '人才流动及来源分析' } },
]

// 主入口路由(需嵌套上左右整体布局)
const mainRoutes = {
    path: '/',
    component: _import('main'),
    name: 'main',
    redirect: { name: 'home' },
    meta: { title: '主入口整体布局' },
    children: [
        // 通过meta对象设置路由展示方式
        // 1. isTab: 是否通过tab展示内容, true: 是, false: 否
        // 2. iframeUrl: 是否通过iframe嵌套展示内容, '以http[s]://开头': 是, '': 否
        // 提示: 如需要通过iframe嵌套展示内容, 但不通过tab打开, 请自行创建组件使用iframe处理!
        { path: '/home', component: _import('common/home'), name: 'home', meta: { title: '首页' } },
        { path: '/analyse', component: _import('analyse/analyse'), name: 'analyse', meta: { title: '统计分析' } },
        { path: '/analyse_detail', component: _import('analyse/analyse_detail'), name: 'analyse_detail', meta: { title: '统计分析明细' } },
        { path: '/data', component: _import('data/data'), name: 'data', meta: { title: '数据统计' } },
        { path: '/data_list', component: _import('data/data_list'), name: 'data_list', meta: { title: '数据统计占比' } },
        { path: '/company', component: _import('company/company'), name: 'company', meta: { title: '企业查询' } },
        { path: '/analyseF', component: _import('analyseF/analyseF'), name: 'analyseF', meta: { title: '统计分析F' } },
        { path: '/open', component: _import('intf/open-api-list'), name: 'open', meta: { title: '统计分析F' } },
        { path: '/user', component: _import('intf/open-api-user'), name: 'user', meta: { title: '统计分析F' } },
        // { path: '/company_manage_list', component: _import('companyManage/companyManageList'), name: 'company_manage_list', meta: { title: '企业列表' } },
        // { path: '/company_manage_email', component: _import('companyManage/companyManageEmail'), name: 'company_manage_email', meta: { title: '邮件发送记录' } },
        // { path: '/user', component: _import('sys/user/user'), name: 'user', meta: { title: '用户管理' } },
        // { path: '/role', component: _import('sys/role/role'), name: 'role', meta: { title: '角色管理' } },
        // { path: '/menu', component: _import('sys/menu/menu'), name: 'menu', meta: { title: '菜单管理' } }
        // { path: '/demo-echarts', component: _import('demo/echarts'), name: 'demo-echarts', meta: { title: 'demo-echarts', isTab: true } },
        // { path: '/demo-ueditor', component: _import('demo/ueditor'), name: 'demo-ueditor', meta: { title: 'demo-ueditor', isTab: true } }
    ],
    beforeEnter(to, from, next) {
        let token = Vue.cookie.get('token')
        if (!token || !/\S/.test(token)) {
            clearLoginInfo()
            next({ name: 'login' })
        }
        next()
    }
}

const router = new Router({
    mode: 'hash',
    scrollBehavior: () => ({ y: 0 }),
    isAddDynamicMenuRoutes: false, // 是否已经添加动态(菜单)路由
    routes: globalRoutes.concat(mainRoutes)
})

router.beforeEach((to, from, next) => {
    // 添加动态(菜单)路由
    // 1. 已经添加 or 全局路由, 直接访问
    // 2. 获取菜单列表, 添加并保存本地存储
    if (router.options.isAddDynamicMenuRoutes || fnCurrentRouteType(to, globalRoutes) === 'global') {
        next()
    } else {
        http({
            url: http.adornUrl('/menu/nav', 'CQ'),
            method: 'get',
            params: http.adornParams()
        }).then(({ data }) => {
            if (data && data.code === 200) {
                fnAddDynamicMenuRoutes(data.data.menuList)
                router.options.isAddDynamicMenuRoutes = true
                sessionStorage.setItem('menuList', JSON.stringify(data.data.menuList || '[]'))
                sessionStorage.setItem('permissions', JSON.stringify(data.data.permissions || '[]'))
                next({...to, replace: true })
            } else {
                sessionStorage.setItem('menuList', '[]')
                sessionStorage.setItem('permissions', '[]')
                next()
            }
        }).catch((e) => {
            console.log(`%c${e} 请求菜单列表和权限失败，跳转至登录页！！`, 'color:blue')
            router.push({ name: 'login' })
        })
    }
})

/**
 * 判断当前路由类型, global: 全局路由, main: 主入口路由
 * @param {*} route 当前路由
 */
function fnCurrentRouteType(route, globalRoutes = []) {
    var temp = []
    for (var i = 0; i < globalRoutes.length; i++) {
        if (route.path === globalRoutes[i].path) {
            return 'global'
        } else if (globalRoutes[i].children && globalRoutes[i].children.length >= 1) {
            temp = temp.concat(globalRoutes[i].children)
        }
    }
    return temp.length >= 1 ? fnCurrentRouteType(route, temp) : 'main'
}

/**
 * 添加动态(菜单)路由
 * @param {*} menuList 菜单列表
 * @param {*} routes 递归创建的动态(菜单)路由
 */
function fnAddDynamicMenuRoutes(menuList = [], routes = []) {
    var temp = []
    for (var i = 0; i < menuList.length; i++) {
        if (menuList[i].list && menuList[i].list.length >= 1) {
            temp = temp.concat(menuList[i].list)
        } else if (menuList[i].url && /\S/.test(menuList[i].url)) {
            menuList[i].url = menuList[i].url.replace(/^\//, '')
            var route = {
                    path: menuList[i].url.replace('/', '-'),
                    component: null,
                    name: menuList[i].url.replace('/', '-'),
                    meta: {
                        menuId: menuList[i].menuId,
                        title: menuList[i].name,
                        isDynamic: true,
                        isTab: true,
                        iframeUrl: ''
                    }
                }
                // url以http[s]://开头, 通过iframe展示
            if (isURL(menuList[i].url)) {
                route['path'] = `i-${menuList[i].menuId}`
                route['name'] = `i-${menuList[i].menuId}`
                route['meta']['iframeUrl'] = menuList[i].url
            } else {
                try {
                    route['component'] = _import(`modules/${menuList[i].url}`) || null
                } catch (e) {}
            }
            routes.push(route)
        }
    }
    if (temp.length >= 1) {
        fnAddDynamicMenuRoutes(temp, routes)
    } else {
        mainRoutes.name = 'main-dynamic'
        mainRoutes.children = routes
        router.addRoutes([
            mainRoutes,
            { path: '*', redirect: { name: '404' } }
        ])
        sessionStorage.setItem('dynamicMenuRoutes', JSON.stringify(mainRoutes.children || '[]'))
        console.log('\n')
        console.log('%c!<-------------------- 动态(菜单)路由 s -------------------->', 'color:blue')
            // console.log(mainRoutes.children)
        console.log('%c!<-------------------- 动态(菜单)路由 e -------------------->', 'color:blue')
    }
}

export default router