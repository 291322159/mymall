<template>
	<div class="tab-control">
		<div v-for="(item, index) in titles" 
			class="tabControl-item" 
			:class="{active: index === currentIndex}"
			@click="itemClick(index)">
			<span>{{item}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'tabControl',
		props: {
			titles: {
				type: Array,
				default() {
					return []
				}
			}
		},
		data() {
			return {
				currentIndex: 0
			}
		},
		methods: {
			itemClick(index) {
				this.currentIndex = index
				this.$emit('tabClick', index)
			}
		}
	}
</script>

<style>
	.tab-control{
		display: flex;
		text-align: center;
		height: 40px;
		line-height: 40px;
		font-size: 16px;
		background-color: #fff;
	}
	.tabControl-item{
		flex: 1;
	}
	.active span {
		color: var(--color-high-text);
		padding: 5px;
		border-bottom: 3px solid var(--color-high-text);
	}
</style>