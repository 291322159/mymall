<template>
	<div class="tab-bar-item" @click="itemClick">
		
		<div v-if="!isActive"><slot name="item-icon"></slot></div>
		<div v-else><slot name="item-icon-active"></slot></div>
		<div :style=activeStyle><slot name="item-txt"></slot></div>
		
		
	</div>
</template>

<script>
	export default {
		name: 'TabBarItem',
		data() {
			return {
//				isActive: true
			}
		},
		props: {
			path: String,
			activeColor: {
				type: String,
				default: 'red'
			}
		},
		methods: {
			itemClick() {
				this.$router.replace(this.path)
			}
		},
		computed: {
			isActive() {
				return this.$route.path.indexOf(this.path) !== -1
			},
			activeStyle() {
				return this.isActive ? {color: this.activeColor} : {}
				
			}
		}
	}
</script>

<style>
	.tab-bar-item {
		flex: 1;
		text-align: center;
		height: 49px;
		font-size: 14px;
		color: #333;
	}
	.tab-bar-item img {
		width: 24px;
		height: 24px;
		margin-top: 2px;
		line-height: 0;
	}
</style>