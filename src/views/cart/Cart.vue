<template>
	<div class="cart">
		<nav-bar class="navbar">
			<div slot="center">购物车({{cartLength}})</div>
		</nav-bar>
		<!--列表-->
		<cart-list></cart-list>
		<!--底部栏-->
		<cart-buttom-bar></cart-buttom-bar>
	</div>
</template>

<script>
	import CartList from './childComps/CartList'
	import CartButtomBar from './childComps/CartButtomBar'
	
	import NavBar from 'components/common/navbar/NavBar'
	
	
	import { mapGetters } from 'vuex'
	
	export default {
		name: 'cart',
		components: {
			NavBar,
			CartList,
			CartButtomBar
		},
		data() {
			return {
				
			}
		},
		computed: {
			...mapGetters(['cartLength'])
		}
	}
</script>

<style scoped>
	.cart {
		height: 100vh;
	}

	.navbar {
		background-color: var(--color-tint);
		color: #fff;
	}
</style>