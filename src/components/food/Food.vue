<template>
<div class="food" ref="food" v-show="foodhide">
	<div>
		<div class="icon">
			<img :src="foodDetail.image"/>
			<span class="back iconfont icon-back" @click="foodDetailHide"></span>
		</div>
		<div class="desc">
			<h2 class="title">
				{{foodDetail.name}}
			</h2>
			<div class="sale">
				月销售{{foodDetail.sellCount}}份， 好评率{{foodDetail.rating}}
			</div>
			<div class="price">
				<span class="now-price">{{foodDetail.price}}</span>
				<span class="odl-price" v-if="foodDetail.oldPrice">{{foodDetail.oldPrice}}</span>
			</div>
			<div class="add-cart">
				<span class="add" v-if="!foodDetail.count || foodDetail.count===0" @click="addcart">加入购物车</span>
				<span class="cart-control" v-if="foodDetail.count>0"><Cartcontrol :food="foodDetail"></Cartcontrol></span>
			</div>
		</div>
		<div class="split">	
		</div>
		<div class="introduce">
			<h2 class="title">
				商品介绍
			</h2>
			<div class="content">
				{{foodDetail.info}}
			</div>
		</div>
		<div class="split">	
		</div>
		<div class="ratings">
			<div class="rating-wrap">
				<h2 class="title">
				商品评价
				</h2>
				<Tab 
					:ratingNum="foodDetail.ratings" 
					:desc="ratingDesc" 
					:selectType="selectType"
					:selectIcon="selectIcon"
					v-on:select="tabType"
					v-on:toggleSelect="toggleSelect"
					>
				</Tab>
				<div class="rating-content">
					<div class="user" v-for="rating in foodDetail.ratings" v-if="needShow(rating.rateType,rating.text)">
						<div class="user-wrap clearfix">
							<span class="time fl">{{rating.rateTime}}</span>
							<span class="user-detail fr">
								<span class="name">{{rating.username}}</span>
								<span class="avatar">
									<img :src="rating.avatar"/>
								</span>
							</span>
						</div>
						<div class="content">
							<span>{{rating.text}}</span>
						</div>
					</div>
				</div>
			</div>	
		</div>
	</div>
</div>
</template>

<script>
import Vue from 'vue'
import BScroll from 'better-scroll'
import Cartcontrol from '@/components/cartcontroll/Cartcontroll'
import Tab from '@/components/tab/tab'
export default {
	data(){
		return {
			foodhide:false,
			ratingDesc:{
				all:'全部',
				positive:'推荐',
				negative:'吐槽'
			},
			selectType:2,
			selectIcon:false
		}
	},
	props:{
		foodDetail:{
			type:Object
		}
	},
	methods:{
		foodDetailHide(){
			this.foodhide = false;	
		},
		foodshow(){
			this.foodhide = true;
			this.$nextTick(()=>{
				if (!this.scroll) {
		          this.scroll = new BScroll(this.$refs.food, {
		            click: true,
		            startX: 0,
		            startY: 0
		          })
		        } else {
		          this.scroll.refresh()
		        }
			})
		},
		addcart(){
			if(!this.foodDetail.count){
				Vue.set(this.foodDetail,'count',1)
				return;
			}
			this.foodDetail.count++;
		},
		tabType (type) {
			this.selectType = type
		    this.$nextTick(() => {
		      this.scroll.refresh()
		    })
		},
		toggleSelect () {
			this.selectIcon = !this.selectIcon;
			this.$nextTick(() => {
		        this.scroll.refresh()
		    })
		},
		needShow (type,text) {
			if (this.selectIcon && !text) {
		        return false
	        }
			if (this.selectType === 2) {
		        return true
		    } else {
		        return type === this.selectType
		    }
		}
	},
	components:{
		Cartcontrol,
		Tab
	}
}
</script>

<style lang="less" scoped>
@import "../../common/css/mixin.less";
.food{
	width:100%;
	position:fixed;
	z-index: 10;
	left: 0;
	top:0;
	right:0;
	bottom: 46px;
	overflow:hidden;
	background: #f3f5f7;
	.split{
		width: 100%;
		height: 16px;
		.border-1px(rgba(7,17,27,0.1));
	}
	.icon{
	    position: relative;
	    width: 100%;
	    height: 0;
	    padding-top: 100%;
	    img{
	    	position: absolute;
	    	top: 0;
	    	left: 0;
	    	width: 100%;
	    	height: 100%;
	    }
	    .back{
    	    position: absolute;
		    top: 30px;
		    left: 30px;
		    &.iconfont{
		    	font-size: 16px;
		    	color: #FFFFFF;
		    }
	    }
	}
	.desc{
		padding: 18px;
		background: #FFFFFF;
		position: relative;
		.title{
			font-size: 14px;
			font-weight: 700;
			color: rgb(7,17,27);
		}
		.sale{
			margin-top: 8px;
			font-size: 10px;
			color: rgb(147,153,159);
		}
		.price{
			margin-top: 18px;
			font-size: 14px;
			font-weight: 700;
			color: rgb(240,20,20);
			.odl-price{
				font-size: 10px;
				color: rgb(147,153,159);
				text-decoration: line-through;
			}
		}
		.add-cart{
			position: absolute;
			right:18px;
			bottom: 18px;
			span{
				display: inline-block;
				&.add{
					width: 74px;
					height: 24px;
					line-height: 24px;
					text-align: center;
					border-radius: 12px;
					background: rgb(0,160,220);
					font-size: 10px;
					color: #FFFFFF;
				}
			}
		}
	}
	.introduce{
		background: #FFFFFF;
		padding: 18px;
		.title{
			font-size: 18px;
			color: #000000;
			margin-bottom: 6px;
		}
		.content{
			padding-left: 6px;
			padding-right: 6px;
			font-size: 12px;
			line-height: 24px;
			color: rgb(77,85,93);
		}
	}
	.ratings{
		.rating-wrap{
			background: #FFFFFF;
			padding: 18px;
			.title{
				font-size: 18px;
				color: #000000;
				margin-bottom: 6px;
			}
			.rating-content{
				.user{
					padding: 16px 0;
					.border-1px(rgba(7,17,27,0.1));
					.content{
						margin-top: 6px;
						font-size: 12px;
						color: rgb(7,17,27);
						line-height: 16px;
					}
					.time{
						font-size: 10px;
						color: rgb(147,153,159);
					}
					.user-detail{
						span{
							display: inline-block;
							vertical-align: middle;
							font-size: 0;
						}
						.name{
							font-size: 10px;
							color: rgb(147,153,159);
						}
						.avatar{
							width: 12px;
							height: 12px;
							img{
								border-radius: 50%;
								width: 100%;
								height: 100%;
							}
						}
					}
				}
			}
		}
	}
}
</style>
