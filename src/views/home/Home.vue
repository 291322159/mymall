<template>
	<div id="home">
		<nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
		<home-swiper :banners="banners"></home-swiper>
		<home-recommend-view :recommends="recommends"></home-recommend-view>
		<feature-view></feature-view>
		<tab-control :titles="['流行', '新款', '精选']" class="tab-control"></tab-control>
	</div>
</template>

<script>
	
	import HomeSwiper from './childComps/HomeSwiper'
	import HomeRecommendView from './childComps/HomeRecommendView'
	import FeatureView from './childComps/FeatureView'
	
	import NavBar from 'components/common/navbar/NavBar'	
	
	import TabControl from 'components/content/tabcontrol/TabControl'
	
	import {getHomeMultidata, getHomeGoods} from 'network/home'
	
	
	
	export default {
		name: 'home',
		components: {
			NavBar,
			HomeSwiper,
			HomeRecommendView,
			FeatureView,
			TabControl
		},
		data() {
			return {
				banners: [],
				recommends: [],
				goods: {
					'pop': {page: 0, list: []},
					'news': {page: 0, list: []},
					'sell': {page: 0, list: []}
				}
			}
		},
		created() {
//			1.请求多个数据
			this.getHomeMultidata()
			
//			2.请求商品数据
			this.getHomeGoods()
		},
		methods: {
			getHomeMultidata() {
				getHomeMultidata()
				.then(res => {
					this.banners = res.data.banner.list
					this.recommends = res.data.recommend.list
				})
			},
			getHomeGoods() {
				getHomeGoods('pop', 1)
				.then(res => {
					this.goods
				})
			}
			
		}
		
	}
</script>

<style>
	#home {
		padding-top: 44px;
		margin-bottom: 1000px;
	}
	.home-nav {
		background-color: var(--color-tint);
		color: #fff;
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		z-index: 999;
	}
	.tab-control {
		position: sticky;
		top: 44px;
	}
</style>