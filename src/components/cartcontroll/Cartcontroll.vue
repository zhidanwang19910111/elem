<template>
	<div class="cart-control">
		<div @click="decrease">
			<span class="iconfont icon-del" v-if="food.count>0"></span>
		</div>
		<div>
			<span class="count" v-if="food.count>0">{{food.count}}</span>
		</div>
		
		<div @click="addcount">
			<span class="iconfont icon-add"></span>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
export default {
	props:{
		food:{
			type:Object
		}
	},
	methods:{
		addcount () {
			if (!this.food.count) {
		        Vue.set(this.food, 'count', 1)
		    } else {
		      this.food.count ++
		    }
		},
		decrease () {
			this.food.count --
		}
	}
}
</script>

<style lang="less" scoped>
.cart-control{
	div{
		display: inline-block;
		font-size: 0;
		margin-right:6px;
	}
	.count{
		font-size: 14px;
		color: rgb(147,153,159);
	}
	.iconfont{
		width: 24px;
		height: 24px;
		font-size: 24px;
		color: rgb(0,160,220);
		&.icon-del{
			font-size: 26px;
		}
	}
}
</style>