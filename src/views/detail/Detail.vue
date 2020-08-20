<template>
	<div id="detail">
		<detail-nav-bar class="detail-nav-bar"></detail-nav-bar>
		<scroll class="detail-content" ref="wrapper">
			<detail-swiper :top-images="topImages"></detail-swiper>
			<detail-base-info :goods="goods"></detail-base-info>
			<detail-shop-info :shop="shop"></detail-shop-info>
			<detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
			<detail-param-info :param-info="paramInfo"></detail-param-info>
		</scroll>
		
	</div>
</template>

<script>
	import DetailNavBar from './childComps/DetailNavBar'
	import DetailSwiper from './childComps/DetailSwiper'
	import DetailBaseInfo from './childComps/DetailBaseInfo'
	import DetailShopInfo from './childComps/DetailShopInfo'
	import DetailGoodsInfo from './childComps/DetailGoodsInfo'
	import DetailParamInfo from './childComps/DetailParamInfo'
	
	import Scroll from 'components/common/scroll/Scroll'
	
	import {getDetail, Goods, Shop, GoodsParam} from 'network/detail'
	
	
	export default {
		name: 'Detail',
		components: {
			DetailNavBar,
			Scroll,
			DetailSwiper,
			DetailBaseInfo,
			DetailShopInfo,
			DetailGoodsInfo,
			DetailParamInfo
		},
		data() {
			return {
				iid: null,
				topImages: [],
				goods: {},
				shop: {},
				detailInfo: {},
				paramInfo: {}
			}
		},
		methods: {
			imageLoad() {
				this.$refs.wrapper.refresh()
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
		height: calc(100% - 44px);
	}
</style>