<template>
	<div class="buttombar">
		<div class="checkcontent">
			<check-button 
				:is-checked="isSelectAll" 
				class="checkbutton"
				@click.native="checkClick"></check-button>
			<span>全选</span>
		</div>
		
		<div class="price">
			合计：{{totalPrice}}
		</div>
		
		<div class="calculate">结算 ( {{checkLength}} )</div>
	</div>
</template>

<script>
	import CheckButton from 'components/content/checkbutton/CheckButton'
	
	import { mapGetters } from 'vuex'
	
	export default {
		name: 'CartButtonBar',
		components: {
			CheckButton
		},
		data() {
			return {
					
			}
		},
		computed: {
			...mapGetters(['cartList']),
			totalPrice() {
				return '￥' + this.$store.getters.cartList.filter(item => {
					return item.checked
				}).reduce((preValue, item) => {
					return preValue + item.price * item.count
				}, 0).toFixed(2)
			},
			checkLength() {
				return this.cartList.filter(item => item.checked).length
			},
			isSelectAll() {
//				if(this.cartList.length === 0) return false
//				return !(this.cartList.find(item => !item.checked))
//				return this.cartList.length === 0 ? false : !(this.cartList.find(item => !item.checked))
				return this.cartList.length === 0 ? false : !(this.cartList.find(item => !item.checked))
			}
		},
		methods: {
			checkClick() {
//				if(this.SelectAll) {
//					this.cartList.filter(item => item.checked = false)
//				}else {
//					this.cartList.filter(item => item.checked = true)
//				}
				this.isSelectAll ? this.cartList.filter(item => item.checked = false) : this.cartList.filter(item => item.checked = true)
				
			}
		}
	}
</script>

<style scoped>
	.buttombar {
		height: 49px;
		background-color: #eee;
		position: fixed;
		bottom: 49px;
		left: 0;
		right: 0;
		line-height: 49px;
		display: flex;
	}
	.buttombar > div {
		/*flex: 1;*/
	}
	.checkcontent {
		display: flex;
		width: 100px;
	}
	.checkbutton {
		width: 25px;
		height: 25px;
		margin: 10px 10px 0 5px;
		line-height: 27px;
		text-align: center;
	}
	.price {
		flex: 1;
	}
	.calculate{
		padding: 0 15px;
		background-color: red;
		color: #fff;
		float: right;
	}
</style>