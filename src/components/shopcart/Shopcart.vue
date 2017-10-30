<template>
	<div id="shop-cart">
		<div class="content" @click="toggleMask">
			<div class="content-left">
				<div class="cart-logo">
					<div class="logo-img" :class="{'highlight':totalCount>0}">
						<span class="iconfont icon-shopcart-o"></span>
					</div>
					<div class="num" v-if="totalCount>0">{{totalCount}}</div>
				</div>
				<div class="price" :class="{'highlight':totalPrice>0}">
						￥{{totalPrice}}元
				</div>
				<div class="desc">
					另需配送费￥{{deliverPrice}}元
				</div>
			</div>
			<div class="content-right">
				<div class="pay" :class="payClass">
					{{payDesc}}
				</div>
			</div>
		</div>
		<div class="shopcart-mask" v-show="maskShow">
			<div class="mask-content">
				<div class="mask-title clearfix">
					<div class="name fl">购物车</div>
					<div class="clearall fr">清空</div>
				</div>
				<div class="mask-list" ref="listContent">
					<ul>
						<li v-for="item in selectGood" class="list-item">
							<div class="list-name fl">
								{{item.name}}
							</div>
							<div class="list-ctrl fr">
								<span class="price">
									￥{{item.price}}
								</span>
								<span class="quality">
									<Cartcontrol :food="item"></Cartcontrol>
								</span>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import BScroll from 'better-scroll'
import Cartcontrol from '@/components/cartcontroll/Cartcontroll'
export default {
	data(){
		return {
			maskShow:false
		}
	},
	props:{
		selectGood:{
			type:Array,
			default:[]
		},
		deliverPrice:{
			type:Number,
			default: 0
		},
		minPrice:{
			type:Number,
			default: 0
		}
	},
	methods:{
		toggleMask(){
			if(this.totalCount<=0){
				this.maskShow = false;
				return;
			}
			this.maskShow = !this.maskShow;
			if (this.maskShow) {
		        this.$nextTick(() => {
		          if (!this.scroll) {
		            this.scroll = new BScroll(this.$refs.listContent, {
		              click: true
		            })
		          } else {
		            this.scroll.refresh()
		          }
		        })
		      }
		}
	},
	computed:{
		totalCount(){
			let count = 0;
			this.selectGood.forEach((food)=>{
				count += food.count
			});
			return count
		},
		totalPrice(){
			let total = 0
	        this.selectGood.forEach((food) => {
	          total += food.price * food.count
	        })
	        return total
		},
	    payDesc () {
	      if (this.totalPrice === 0) {
	        return '￥' + this.minPrice + '元起送'
	      } else if (this.totalPrice < this.minPrice) {
	        let diff = this.minPrice - this.totalPrice
	        return '还差￥' + diff + '元起送'
	      } else {
	        return '去结算'
	      }
	    },
	    payClass () {
	      if (this.totalPrice < this.minPrice) {
	        return 'no-enough'
	      } else {
	        return 'enough'
	      }
   	 	}
	},
	components:{
		Cartcontrol
	}
}
</script>

<style lang="less" scoped>
@import "../../common/css/mixin.less";
#shop-cart{
	.content{
		height: 100%;
		display: flex;
		background: #141d27;
		.content-left{
			flex: 1;
			.cart-logo,.price,.desc{
				display: inline-block;
			}
			.cart-logo{
				position: relative;
				top: -10px;
				margin: 0 12px;
				padding: 6px;
				width: 56px;
				height: 56px;
				box-sizing: border-box;
				vertical-align: top;
				border-radius: 50%;
				background: #141d27;
				.logo-img{
					width: 100%;
					height: 100%;
					border-radius: 50%;
					background: #2b343c;
					text-align:center;
					&.highlight{
						background: rgb(225,225,225);
					}
					.iconfont{
						font-size: 44px;
						color: #80858a;
					}
				}
				.num{
					position:absolute;
					top:0;
					right:0;
					width:24px;
					height: 16px;
					line-height: 16px;
					text-align: center;
					border-radius:16px;
					font-size:9px;
					font-weight: 700;
					color: #FFFFFF;
					background: rgb(240,20,20);
					box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
				}
			}
			.price{
				vertical-align: top;
				line-height: 24px;
				margin-top:12px;
				box-sizing: border-box;
				padding-right: 12px;
				border-right: 1px solid rgba(255,255,255,0.1);
				font-size: 16px;
				font-weight: 700;
				color: rgba(225,225,225,0.4);
				&.highlight{
					color:#FFFFFF;
				}
			}
			.desc{
				vertical-align: top;
				line-height: 24px;
				margin:12px 0 0 12px;
				font-size: 10px;
				color: rgba(225,225,225,0.4)
			}
		}
		.content-right{
			flex: 0 0 105px;
			width: 105px;
			.pay{
				height: 100%;
				line-height: 48px;
				text-align: center;
				font-size: 12px;
				color: rgba(225,225,225,0.4);
				font-weight: 700;
				&.no-enough{
					background: #2b333b;
				}
				&.enough{
					background: #00b43c;
					color: #FFFFFF;
				}
			}
		}
	}
	.shopcart-mask{
		width: 100%;
		position: fixed;
		z-index: -1;
		left: 0;
		top: 0;
		bottom: 46px;
		background: rgba(7,17,27,0.8);
		/*filter:blur(10px);*/
		.mask-content{
			width: 100%;
			position: absolute;
			left: 0;
			bottom: 0;
			.mask-title{
				width: 100%;
				height: 40px;
				line-height: 40px;
				background: #f3f5f7;
				border-bottom: 2px solid rgba(7,17,27,0.1);
				.name{
					margin-left: 18px;
					font-size: 14px;
					color: rgb(7,17,27);
				}
				.clearall{
					margin-right: 18px;
					font-size: 12px;
					color: rgb(0,160,220);
				}
			}
			.mask-list{
				max-height: 217px;
				background: #FFFFFF;
				overflow: hidden;
				.list-item{
					height: 48px;
					padding: 0 18px;
					.border-1px(rgba(7,17,27,0.1));
					.border-1px(rgba(7,17,27,0.1));
					.list-name{
						line-height: 48px;
						font-size: 14px;
						color: rgb(7,17,27);
					}
					.list-ctrl{
						height: 48px;
						.price{
							display: inline-block;
							margin-right: 12px;
							line-height: 48px;
							font-size: 10px;
							color: rgb(240,20,20);
							font-weight: 700;
						}
						.quality{
							display: inline-block;
							line-height: 48px;
						}
					}
				}
			}
		}
	}
}
</style>
