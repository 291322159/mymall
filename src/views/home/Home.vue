<template>
	<div id="home">
		<nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
		<tab-control :titles="['流行', '新款', '精选']" 
				@tabClick="tabClick"
				ref="tabControl2"
				class="tab-control"
				v-show="isTabFixed"
				></tab-control>	
		<scroll class="content" 
			ref="scroll" 
			:probe-type="3" 
			@scroll="contentScroll"
			:pull-up-load="true"
			@pullingUp="loadMore">
			<home-swiper :banners="banners" 
				@swiperImgload="swiperImgload"></home-swiper>
			<home-recommend-view :recommends="recommends"></home-recommend-view>
			<feature-view></feature-view>
			<tab-control :titles="['流行', '新款', '精选']" 
				@tabClick="tabClick"
				ref="tabControl1"></tab-control>
			<goods-list :goods="showGoods"></goods-list>
		</scroll>
		<!--监听一个组件的原生时间时，必须加上 .native 修饰符才能监听-->
		<back-top @click.native="backclick" v-show="isShow"></back-top>
	</div>
</template>

<script>
	
	import HomeSwiper from './childComps/HomeSwiper'
	import HomeRecommendView from './childComps/HomeRecommendView'
	import FeatureView from './childComps/FeatureView'
	
	import NavBar from 'components/common/navbar/NavBar'	
	import Scroll from 'components/common/scroll/Scroll'
	
	import TabControl from 'components/content/tabcontrol/TabControl'
	import GoodsList from 'components/content/goods/GoodsList'
	import BackTop from 'components/content/backtop/BackTop'
	
	import {getHomeMultidata, getHomeGoods} from 'network/home'
	import {debounce} from 'common/utils'
	
	
	export default {
		name: 'Home',
		components: {
			NavBar,
			HomeSwiper,
			HomeRecommendView,
			FeatureView,
			TabControl,
			GoodsList,
			Scroll,
			BackTop
		},
		data() {
			return {
				banners: [],
				recommends: [],
				goods: {
					'pop': {page: 0, list: []},
					'new': {page: 0, list: []},
					'sell': {page: 0, list: []}
				},
				goodsType: 'pop',
				isShow: '',
				tabOffsetTop: 0,
				isTabFixed: false,
				saveY: 0
			}
		},
		computed: {
			showGoods() {
				return this.goods[this.goodsType].list
			}
		},
		created() {
//			1.请求多个数据
			this.getHomeMultidata()
			
//			2.请求商品数据
			this.getHomeGoods('pop')
			this.getHomeGoods('new')
			this.getHomeGoods('sell')
			
			
		},
		mounted() {
//			图片加载完成的时间监听
			const refresh = debounce(this.$refs.scroll.refresh, 20)
			this.$bus.$on('homeItemImgLoad', () => {
				refresh()
			})

		},
		activated() {
			this.$refs.scroll.scrollTo(0, this.saveY)
			this.$refs.scroll.refresh()
		},
		deactivated() {
//			保存Y值
			this.saveY = this.$refs.scroll.getScrollY()
		},
		
		methods: {
//			事件监听相关方法
			tabClick(index) {
				switch (index) {
					case 0:
						this.goodsType = 'pop'
						break
					case 1:
						this.goodsType = 'new'
						break
					case 2:
						this.goodsType = 'sell'
						break
				}
				this.$refs.tabControl2.currentIndex = index
				this.$refs.tabControl1.currentIndex = index
			},
			backclick() {
				this.$refs.scroll.scrollTo(0, 0)
			},
			contentScroll(position) {
//				判断BackTop是否显示
				position.y < -1000 ? this.isShow = true : this.isShow = false
//				决定tabControl是否吸顶(position:fixed)
				this.isTabFixed = (-position.y) > this.tabOffsetTop
			},
			loadMore() {
				this.getHomeGoods(this.goodsType)
				this.$refs.scroll.refresh()
			},
			swiperImgload() {
				this.tabOffsetTop = this.$refs.tabControl1.$el.offsetTop
			},
			
//			网络请求相关方法
			getHomeMultidata() {
				getHomeMultidata()
				.then(res => {
					this.banners = res.data.banner.list
					this.recommends = res.data.recommend.list
				})
			},
			getHomeGoods(type) {
				const page = this.goods[type].page + 1
				getHomeGoods(type, page)
				.then(res => {
					this.goods.[type].list.push(...res.data.list)
					this.goods[type].page += 1
					this.$refs.scroll.finishPullUp()
				})
			},
			
			

			
		}
	}
</script>

<style scoped>
	#home {
		/*视口高度*/
		height: 100vh;
		position: relative;
	}
	.home-nav {
		background-color: var(--color-tint);
		color: #fff;
	}
	.content{
		/*父元素高度的100%-93px的高度*/
		/*height: calc(100% - 49px);*/
		overflow: hidden;
		position: fixed;
		top: 44px;
		bottom: 49px;
	}
	.tab-control{
		position: relative;
		z-index: 9;
	}

</style>