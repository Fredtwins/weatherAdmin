import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 登录页面
const Login = () => import('components/login/login')

// 首页
const topnav = () => import('components/Nav/topnav')

// 用户列表
const content = () => import('components/content/index')

// 菜单列表
const menulist = () => import('components/content/menulist')

export default new Router({
  routes: [
		{
			path: '*',
			redirect: '/'
		}, {
			path: '/',
			component: Login,
			meta: {
				nologin: true
			},
			name: 'login'
		}, {
      path: '/topnav',
      component: topnav,
      name: topnav,
      children: [{
        path: '/topnav/sys/user',
        component: content,
        name: content
      }, {
        path: '/topnav/sys/menu',
        component: menulist,
        name: menulist
      }]
    }
  ]
})
