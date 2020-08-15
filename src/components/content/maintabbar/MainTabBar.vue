<template>
	<tab-bar>
  		<tab-bar-item path="/home" activeColor="#ff5777">
  			<img slot="item-icon" src="@/assets/images/tabbar/home.png" alt="" />
  			<img slot="item-icon-active" src="@/assets/images/tabbar/home_active.png" alt="" />
  			<div slot="item-txt">首页</div>
  		</tab-bar-item>
  		<tab-bar-item path="/category" activeColor="#ff5777">
  			<img slot="item-icon" src="@/assets/images/tabbar/category.png" alt="" />
  			<img slot="item-icon-active" src="@/assets/images/tabbar/category_active.png" alt="" />
  			<div slot="item-txt">分类</div>
  		</tab-bar-item>
  		<tab-bar-item path="/cart" activeColor="#ff5777">
  			<img slot="item-icon" src="@/assets/images/tabbar/cart.png" alt="" />
  			<img slot="item-icon-active" src="@/assets/images/tabbar/cart_active.png" alt="" />
  			<div slot="item-txt">购物车</div>
  		</tab-bar-item>
  		<tab-bar-item path="/profile" activeColor="#ff5777">
  			<img slot="item-icon" src="@/assets/images/tabbar/profile.png" alt="" />
  			<img slot="item-icon-active" src="@/assets/images/tabbar/profile_active.png" alt="" />
  			<div slot="item-txt">我的</div>
  		</tab-bar-item>
  	</tab-bar>
</template>

<script>

import TabBar from 'components/common/tabbar/TabBar'
import TabBarItem from 'components/common/tabbar/TabBarItem'

export default {
	name: 'MainTabBar',
	components: {
		TabBar,
		TabBarItem
	}
}
</script>

<style>
</style>