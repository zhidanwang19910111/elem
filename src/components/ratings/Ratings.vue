<template>
  <div class="ratings" ref="rating">
		<div class="rating-wrap">
			<div class="desc">
				<div class="score">
						<h2 class="count">{{seller.score}}</h2>
						<div class="text">综合评分</div>
						<div class="compare">
							高与周边商家{{seller.rankRate}}%
						</div>
				</div>
				<div class="score-star">
					<div class="serviceScore">
						<span class="text line-block">服务态度</span>
						<span class="line-block star"><Star :size="36" :score="seller.serviceScore"></Star></span>
						<span class="last">{{seller.serviceScore}}</span>
					</div>
					<div class="foodScore">
						<span class="text line-block">服务态度</span>
						<span class="line-block star"><Star :size="36" :score="seller.foodScore"></Star></span>
						<span class="last">{{seller.foodScore}}</span>
					</div>
					<div class="deliverTime">
						<span class="text line-block star">送达时间</span>
						<span class="line-block last">{{seller.deliveryTime}}送达</span>
					</div>
				</div>
			</div>
			<div class="line"></div>
			<div class="tab-wrap">
				<Tab 
					:ratingNum="ratingdata" 
					:desc="ratingDesc" 
					:selectType="selectType"
					:selectIcon="selectIcon"
					v-on:select="tabType"
					v-on:toggleSelect="toggleSelect"
					>
				</Tab>
				<div class="rating-detail">
					<div class="user" v-for="rating in ratingdata" v-if="needShow(rating.rateType,rating.text)">
						<div class="avatar">
							<img :src="rating.avatar" alt="" />
						</div>
						<div class="content">
							<div class="user-detail clearfix">
								<span class="user-name fl">{{rating.username}}</span>
								<span class="rating-time fr">{{rating.rateTime}}</span>
							</div>
							<div class="score">
								<span class="score-star"><Star :size="36" :score="rating.score"></Star></span>
								<span class="deliveryTime" v-if="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
							</div>
							<div class="rating-text">
								{{rating.text}}
							</div>
							<ul class="recommend clearfix" v-if="rating.recommend">
								<li class="recommend-item fl" v-for="item in rating.recommend">
									<span>{{item}}</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import Star from '@/components/star/Star'
import Tab from '@/components/tab/tab'
export default {
	data () {
		return {
			ratingdata:[],
			ratingDesc:{
				all:'全部',
				positive:'满意',
				negative:'不满意'
			},
			selectType:2,
			selectIcon:false
		}
	},
	props:{
		seller:{
			type:Object
		}
	},
  created () {
  	this.$http.get('/api/ratings').then((res)=>{
  		if(res.body.errno === 0){
  			this.ratingdata = res.body.data;
  			this.$nextTick(()=>{
  				this.scroll = new BScroll(this.$refs.rating,{
  					click:true
  				})
  			})
  		}
  	})
  },
  methods:{
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
  	Star,
  	Tab
  }
}
</script>
<style lang="less" scoped>
@import "../../common/css/mixin.less";
.ratings{
	position:absolute;
	left:0;
	top:174px;
	bottom:0;
	overflow:hidden;
	.line{
		background:#f3f5f7;
		width: 100%;
		height: 16px;
		.border-1px(rgba(7,17,27,0.1));
	}
	.rating-wrap{
		.desc{
			display: flex;
			.border-1px(rgba(7,17,27,0.1));
			.score{
				margin: 18px 0;
				padding: 10px;
				flex: 0 0 137px;
				width: 137px;
				text-align:center;
				border-right:1px solid rgba(7,17,27,0.1);
				.count{
					font-size: 24px;
					color: rgb(255,153,0);
					line-height: 28px;
				}
				.text{
					margin-top: 6px;
					font-size: 12px;
					color: rgb(7,17,27);
				}
				.compare{
					margin-top: 8px;
					font-size: 10px;
					color: #93999f;
				}
			}
			.score-star{
				padding: 24px;
				.line-block{
					display: inline-block;
					vertical-align: middle;
				}
				.text{
					font-size: 6px;
					margin-right: 12px;
				}
				.star{
					margin-right: 12px;
				}
				.last{
					font-size: 12px;
					color: rgb(255,153,0);
				}
				.serviceScore{
					
				}
				.foodScore{
					margin-top: 8px;
				}
				.deliverTime{
					margin-top: 8px;
					.last{
						color: rgb(147,153,159);
					}
				}
			}
		}
		.tab-wrap{
			padding: 18px;
			.rating-detail{
				.user{
					padding: 18px 0;
					.border-1px(rgba(7,17,27,0.1));
					display: flex;
					.avatar{
						margin-right: 12px;
						flex: 0 0 28px;
						width: 28px;
						height: 28px;
						img{
							width: 100%;
							height: 100%;
							border-radius: 50%;
						}
					}
					.content{
						flex: 1;
						.user-detail{
							font-size: 10px;
							line-height: 12px;
							.user-name{
								color: rgb(7,17,27);
							}
							.rating-time{
								color: rgb(147,153,159);
							}
						}
						.score{
							margin-top: 4px;
							margin-bottom: 6px;
							span{
								display: inline-block;
								vertical-align: middle;
								&.deliveryTime{
									margin-left: 6px;
									font-size: 10px;
									color: rgb(147,153,159);
								}
							}
						}
						.rating-text{
							font-size: 12px;
							line-height: 18px;
							color: rgb(7,17,27);
						}
						.recommend{
							.recommend-item{
								margin-left: 8px;
								margin-top:4px;
								padding: 0 6px;
								border: 1px solid rgba(7,17,27,0.1);
								border-radius:2px;
								span{
									font-size: 9px;
									line-height: 16px;
									color: rgb(147,153,159);
								}
							}
						}
					}
				}
			}
		}
	}
}
</style>
