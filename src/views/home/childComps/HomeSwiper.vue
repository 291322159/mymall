<template>
	<div>
		<swiper>
			<swiper-item v-for="item in banners">
				<a :href="item.link" >
					<img :src="item.image" alt="" class="banners-img" @load="imgload"/>
				</a>
			</swiper-item>
		</swiper>
	</div>
</template>

<script>
	
	import {Swiper, SwiperItem} from 'components/common/swiper'
	
	export default {
		name: 'HomeSwiper',
		props: {
			banners: {
				type: Array,
				default() {
					return []
				}
			}
		},
		data() {
			return {
				isload: false
			}
		},
		methods: {
			imgload() {
				if(!this.isload) {
					this.$emit('swiperImgload')
					this.isload = true
				}				
			}
		},
		components: {
			Swiper,
			SwiperItem
		}
	}
</script>

<style>
	.banners-img{
		display: block;
	}
</style>