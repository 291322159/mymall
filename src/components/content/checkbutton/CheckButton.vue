<template>
	<div class="checkbutton" :class="{check: isChecked}">
		<img src="~assets/images/cart/tick.svg" alt="" />
	</div>
</template>

<script>
	export default {
		name: 'CheckButton',
		props: {
			isChecked: {
				type: Boolean,
				default: true
			}
		},
		
	}
</script>

<style scoped>
	.checkbutton {
		border-radius: 50%;
		border: 2px solid #aaa;
	}
	.check {
		border-color: var(--color-tint);
		background-color: var(--color-tint);		
	}
</style>