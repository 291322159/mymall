<template>
	<div id="detail">
		<detail-nav-bar class="detail-nav-bar" @titleClick="titleClick" ref="navbar"></detail-nav-bar>	
		<scroll class="detail-content" 
			ref="wrapper" 
			:probe-type="3" 
			@scroll="contentScroll">		
			<detail-swiper :top-images="topImages"></detail-swiper>
			<detail-base-info :goods="goods"></detail-base-info>
			<detail-shop-info :shop="shop"></detail-shop-info>
			<detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
			<detail-param-info ref="param" :param-info="paramInfo"></detail-param-info>
			<detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
			<goods-list ref="recommend" :goods="recommend" @detailItemImgLoad="detailItemImgLoad"></goods-list>
		</scroll>
		<back-top @click.native="backclick" v-show="isShow"></back-top>
		<detail-bottom-bar @addCart="addCart"></detail-bottom-bar>
		<toast :message="message" :show="show"></toast>
	</div>
	
</template>

<script>
	import DetailNavBar from './childComps/DetailNavBar'
	import DetailSwiper from './childComps/DetailSwiper'
	import DetailBaseInfo from './childComps/DetailBaseInfo'
	import DetailShopInfo from './childComps/DetailShopInfo'
	import DetailGoodsInfo from './childComps/DetailGoodsInfo'
	import DetailParamInfo from './childComps/DetailParamInfo'
	import DetailCommentInfo from './childComps/DetailCommentInfo'
	import DetailBottomBar from './childComps/DetailBottomBar'
	
	import GoodsList from 'components/content/goods/GoodsList'
	import BackTop from 'components/content/backtop/BackTop'
	import Toast from 'components/common/toast/Toast'
	
	import Scroll from 'components/common/scroll/Scroll'
	
	import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'
	
	import { mapActions } from 'vuex'
	
	
	export default {
		name: 'Detail',
		components: {
			DetailNavBar,
			Scroll,
			DetailSwiper,
			DetailBaseInfo,
			DetailShopInfo,
			DetailGoodsInfo,
			DetailParamInfo,
			DetailCommentInfo,
			DetailBottomBar,
			GoodsList,
			BackTop,
			Toast
			
		},
		data() {
			return {
				iid: null,
				topImages: [],
				goods: {},
				desc: {},
				shop: {},
				lowNowPrice: {},
				detailInfo: {},
				paramInfo: {},
				commentInfo: {},
				recommend: {},
				isShow: '',
				themeTopYs: [0, -1000, -2000, -3000],
				currentIndex: '',
				message: '',
				show: false
			}
		},
		methods: {			
			...mapActions(['addCart']),
			
			imageLoad() {
				this.$refs.wrapper.refresh()
				
				this.themeTopYs = []
				this.themeTopYs.push(0)
				this.themeTopYs.push(-this.$refs.param.$el.offsetTop + 44)
				this.themeTopYs.push(-this.$refs.comment.$el.offsetTop + 44)
				this.themeTopYs.push(-this.$refs.recommend.$el.offsetTop + 44)
				this.themeTopYs.push(-Number.MAX_VALUE)
				setTimeout(() => {
					this.$refs.wrapper.refresh()
				},500)
				
			},
			detailItemImgLoad() {
				this.$refs.wrapper.refresh()
				console.log(9999)				
				
			},
			backclick() {
				this.$refs.wrapper.scrollTo(0, 0)
			},
			titleClick(index) {
				this.$refs.wrapper.scrollTo(0, this.themeTopYs[index], 500)
			},
			contentScroll(position) {
//				const position = this.themeTopYs
				let length = this.themeTopYs.length
				for(let i = 0; i < length - 1; i++) {
					if(this.currentIndex !== i && (position.y <= this.themeTopYs[i] && position.y > this.themeTopYs[i + 1])) {
						this.currentIndex = i
						this.$refs.navbar.currentIndex = this.currentIndex
					}
				}
//				判断BackTop是否显示
				position.y < -1000 ? this.isShow = true : this.isShow = false				
			},
			
			addCart() {
//				获取购物车需要展示的信息
				const product = {}
				product.img = this.topImages[0]
				product.tiile = this.goods.title
				product.desc = this.goods.desc
				product.price = this.goods.lowNowPrice				
				product.iid = this.iid				
				console.log(product)
				
//				将商品添加到购物车里
				this.$store.dispatch('addCart', product).then(res => {
					this.show = true
					this.message = res
					
					setTimeout(() => {
						this.show = false
						this.message = ''
					}, 1000)
				})

				
			}
			
		},
		created() {
//			保存传入的id
			this.iid = this.$route.params.iid
			
//			根据id请求详情数据
			getDetail(this.iid).then(res => {
//				获取顶部的图片轮播数据
				const data = res.result
				this.topImages = res.result.itemInfo.topImages
				
//				获取商品信息
				this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
				
//				创建店铺信息的对象
				this.shop = new Shop(data.shopInfo)
				
//				保存商品的详情数据
				this.detailInfo = data.detailInfo
				
//				获取参数信息
				this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
				
//				获取评论信息,判断是否有评论信息
				if(data.rate.cRate !== 0) {
					this.commentInfo = data.rate.list[0]
				}
			})
			
//			请求推荐数据
			getRecommend().then(res => {
				this.recommend = res.data.list
			})
			
			
		}
	}
</script>

<style scoped>
	#detail {
		position: relative;
		z-index: 9999;
		background-color: #fff;
		height: 100vh;
	}
	.detail-nav-bar {
		position: relative;
		z-index: 99999;
		background-color: #fff;
	}
	.detail-content {
		height: calc(100% - 44px - 49px);
	}
</style>