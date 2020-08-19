<template>
	<div id="detail">
		<detail-nav-bar></detail-nav-bar>
		<detail-swiper :top-images="topImages"></detail-swiper>
	</div>
</template>

<script>
	import DetailNavBar from './childComps/DetailNavBar'
	import DetailSwiper from './childComps/DetailSwiper'
	
	import {getDetail} from 'network/detail'
	
	
	export default {
		name: 'Detail',
		components: {
			DetailNavBar,
			DetailSwiper
		},
		data() {
			return {
				iid: null,
				topImages: null
			}
		},
		created() {
//			保存传入的id
			this.iid = this.$route.params.iid
			
//			根据id请求详情数据
			getDetail(this.iid).then(res => {
				this.topImages = res.result.itemInfo.topImages
				console.log(res)
			})
		}
	}
</script>

<style>
</style>