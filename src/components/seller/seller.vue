<template>
  <div class="seller" ref="seller">
  	<div>
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
			<div class="line"></div>
			<div class="seller-active">
			<h2 class="title">公告与活动</h2>
			<div class="bulletin">
				{{seller.bulletin}}
			</div>
			<div class="discount">
				<ul>
					<li class="discount-item" v-for="item in seller.supports">
						{{item.description}}
					</li>
				</ul>
			</div>
		</div>
			<div class="line"></div>
			<div class="seller-pic">
				<h2 class="title">商家实景</h2>
				<div ref="picwrap">
					<ul class="pic-wrap" ref="piclist">
						<li class="pic" v-for="picItem in seller.pics">
							<img :src="picItem"/>
						</li>
					</ul>
				</div>
			</div>
  		<div class="seller-info">
  			<h2 class="title">商家信息</h2>
  			<div class="info-content">
  				<ul class="info-wrap">
  					<li class="info-item" v-for="item in seller.infos">{{item}}</li>
  				</ul>
  			</div>
  		</div>
  	</div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import Star from '@/components/star/Star'
export default {
	props:{
		seller:{
			type:Object
		}
	},
	methods:{
		_initSeler(){
			if(!this.scroll){
				this.srcoll = new BScroll(this.$refs.seller,{
					click:true
				})
			}else{
				this.scroll.refresh()
			}
		},
		_IintPic(){
			if (this.seller.pics) {
					this.$nextTick(()=>{
						let picWidth = 120
	          let margin = 6
	          let width = (picWidth + margin) * this.seller.pics.length
	          this.$refs.piclist.style.width = width + 'px'
	          if (!this.picScroll) {
	            this.picScroll = new BScroll(this.$refs.picwrap, {
	              click: true,
	              scrollX: true,
	              eventPassthrough: 'vertical'
	            })
	          } else {
	            this.picScroll.refresh()
	          }
				})
			}
		}
		
	},
	watch: {
    seller () {
      this._initSeler();
			this._IintPic()
    }
 },
	mounted(){
		this._initSeler();
		this._IintPic()
	},
	components:{
		Star
	}
}
</script>
<style lang="less" scoped>
@import "../../common/css/mixin.less";
.seller{
	width:100%;
	position:absolute;
	left:0;
	bottom:0;
	top: 174px;
	overflow:hidden;
	.line{
		height: 16px;
		background: #f3f5f7;
	}
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
	.seller-active{
		padding: 18px 18px 0 18px;
		.title{
			font-size: 14px;
			color: rgb(7,17,27);
		}
		.bulletin{
			margin:8px 12px 0 12px;
			padding-bottom: 18px;
			.border-1px(rgba(7,17,27,0.1));
			font-size: 12px;
			line-height: 24px;
			color: rgb(240,20,20);
		}
		.discount{
			.discount-item{
				padding:16px 12px 16px 12px;
				font-size: 12px;
				color: rgb(7,17,27);
				line-height: 16px;
				.border-1px(rgba(7,17,27,0.1));
			}
		}
	}
	.seller-pic{
		padding: 18px;
		.title{
			font-size: 14px;
			color: rgb(7,17,27);
		}
		.pic-wrap{
			margin-top: 12px;
			overflow: hidden;
			white-space: nowrap;
			.pic{
				display: inline-block;
				width:120px;
				height:90px;
				margin-right:6px;
				img{
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	.seller-info{
		padding: 18px;
		.title{
			font-size: 14px;
			color: rgb(7,17,27);
			.border-1px(rgba(7,17,27,0.1));
		}
		.info-content{
			.info-item{
				padding: 16px 12px 16px 12px;
				font-size: 12px;
				color: rgb(7,17,27);
				line-height: 16px;
				.border-1px(rgba(7,17,27,0.1));
			}
		}
	}
}
</style>
