<template>
  <div class="seller">
		<div class="seller-detail">
			<div class="seller-wrap">
				<div class="selelr-name">
				{{seller.name}}
				</div>
				<div class="seller-star">
					<span class="star"><Star :size="36" :score="seller.score"></Star></span>
					<span class="sell-count">月售{{seller.sellCount}}单</span>
				</div>
				<div class="favorite">
					<div class="heart">
						<span class="iconfont icon-favorite-material"></span>
					</div>
					<div class="add-favorite">
						<span>收藏</span>
					</div>
				</div>
			</div>
			<div class="deliver-detail">
				<div class="min-Price deliver-item">
					<div class="text">起送价</div>
					<div class="content">
						<span class="price">{{seller.minPrice}}</span>
						<span class="until">元</span>
					</div>
				</div>
				<div class="delivery-price deliver-item">
					<div class="text">商家配送</div>
					<div class="content">
						<span class="price">{{seller.deliveryPrice}}</span>
						<span class="until">元</span>
					</div>
				</div>
				<div class="delivery-time deliver-item">
					<div class="text">平均配送时间</div>
					<div class="content">
						<span class="price">{{seller.deliveryTime}}</span>
						<span class="until">分钟</span>
					</div>
				</div>
			</div>
		</div>
  </div>
</template>
<script>
import Star from '@/components/star/Star'
export default {
	props:{
		seller:{
			type:Object
		}
	},
	components:{
		Star
	}
}
</script>
<style lang="less" scoped>
@import "../../common/css/mixin.less";
.seller{
	.seller-detail{
		padding:18px;
		.border-1px(rgba(7,17,27,0.1));
		.seller-wrap{
			.border-1px(rgba(7,17,27,0.1));
			position:relative;
			padding-bottom:18px;
			.seller-name{
				font-size: 14px;
				line-height: 14px;
				color: rgb(7,17,27);
			}
			.seller-star{
				margin-top: 8px;
				span{
					display: inline-block;
					vertical-align: middle;
					&.sell-count{
						margin-left: 12px;
						font-size: 10px;
						color: rgb(77,85,93);
					}
				}
			}
			.favorite{
				position: absolute;
				right: 18px;
				bottom: 18px;
				.heart{
					.iconfont{
						font-size: 24px;
					  color: rgb(77,85,93);
					}
				}
				.add-favorite{
					margin-top: 4px;
					font-size: 10px;
					color: rgb(77,85,93);
				}
			}
		}
		.deliver-detail{
			padding: 18px 0;
			display: flex;
			.deliver-item{
				text-align: center;
				flex: 1;
				border-right: 1px solid rgba(7,17,27,0.1);
				&.deliver-item:last-child{
					border: 0;
				}
				.text{
					margin-bottom: 10px;
					font-size: 10px;
					color: rgb(147,153,159);
				}
				.content{
					.price{
						font-size: 24px;
						color: rgb(7,17,27);
					}
					.until{
						font-size: 10px;
					}
				}
			}
		}
	}
}
</style>
