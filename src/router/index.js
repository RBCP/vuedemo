import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  {path: '/login', component: () => import('@/views/login/index'), hidden: true},
  {
    path: '',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: {title: '首页', icon: 'home'}
    }]
  },
  {
    path:'/Users',
    component:Layout,
    redirect:'/UsersManager',
    meta:{'title':'用户群组'},
    children: [
      {
        path:'UserList',
        name:'UserList',
        component:()=>import('@/views/user/UserList/index'),
        meta:{title:'用户管理'}
      },
      {
        path:'groupList',
        name:'groupList',
        meta:{title:'群组管理'}
      }
    ]
  },
  {
    path:'/Control',
    component:Layout,
    redirect:'/ControlManager',
    meta:{
      'title':'权限管理'
    },
    children:[{
      path: 'controlist',
      name:'controlist',
      component:()=>import('@/views/Control/controlist'),
      meta:{'title':'权限列表'},
    },
      {
       path:'getrolelist',
        name:'getrolelist',
        meta:{'title':'个人权限'},
      },
      {
        path:'manual',
        name:'manual',
        meta:{'title':'增加权限'},
      }
    ]
  },
  {
    path:'/Chat_log',
    component:Layout,
    redirect:'/Chat_log_record',
    meta:{'title':'聊天记录'},
    children:[{
      path:'single_chat_log',
      name:'single_chat_log',
      meta:{'title':'单聊记录'},
    },
      {
        path:'group_chat_log',
        name:'group_chat_log',
        meta:{'title':'群聊记录'},
      }
    ]
  }
  ]
export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})
