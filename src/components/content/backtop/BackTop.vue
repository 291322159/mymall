<template>
	<div class="backtop">
		<img src="@/assets/images/common/top.png" alt=""/>
	</div>
</template>

<script>
	export default {
		name: 'BackTop',
		
	}
</script>

<style>
	.backtop {
		position: fixed;
		bottom: 55px;
		right: 18px;		
	}
	.backtop img {
		width: 43px;
		height: 43px;
		z-index: 999;
	}
</style>