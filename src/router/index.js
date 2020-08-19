import Vue from 'vue'
import Router from 'vue-router'



const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Cart = () => import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')
const Detail = () => import('../views/detail/Detail')



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
//    路由重定向
   		redirect: '/home',
    },
    {
    	path: '/home',
    	name: '首页',
    	component: Home,
    	meta: {
	    	title: '首页'
	    },
    },
    {
    	path: '/category',
    	name: '分类',
    	component: Category,
    	meta: {
	    	title: '分类'
	    },
    },
    {
    	path: '/cart',
    	name: '购物车',
    	component: Cart,
    	meta: {
	    	title: '购物车'
	    },
    },
    {
    	path: '/profile',
    	name: '我的',
    	component: Profile,
    	meta: {
	    	title: '我的'
	    },
    },
    {
    	path: '/detail/:iid',
    	name: '商品详情',
    	component: Detail,
    	meta: {
	    	title: '商品详情'
	    }
    }
  ],
//HTML5 的 history 模式,去掉链接的 # 号
  mode: 'history'
})