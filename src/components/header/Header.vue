<template>
	<div id="header">
		<div class="header clearfix">
	    	<div class="header-blur fl">
	    		<img width="100%" height="100%" :src="seller.avatar"/>
	    	</div>
	    	<div class="detail fl">
	    		<div class="avatar fl">
	    			<img width="100%" height="100%" :src="seller.avatar"/>
	    		</div>
	    		<div class="desc fl">
	    			<div class="band">
	    					<span class="pic"></span>
	    					<span class="content">{{seller.name}}</span>	
	    			</div>
	    			<div class="deliver-time">
	    				{{seller.description}}/{{seller.deliveryTime}}分钟到达
	    			</div>
	    			<div class="pay-discount" v-if="seller.supports">
	    				<span class="icon" :class="classMap[seller.supports[0].type]"></span>
	    				<span class="text">{{seller.supports[0].description}}</span>
	    			</div>
	    		</div>
	    	</div>
	    	<div class="count fr" @click="maskClick">
	    		<span v-if="seller.supports">{{seller.supports.length}}个</span>
	    		<span class="iconfont icon-more"></span>
	    	</div>
	    	<div class="bulletin" @click="maskClick">
	    		<span class="icon"></span>
	    		<span class="text">{{seller.bulletin}}</span>
	    		<span class="iconfont icon-more"></span>
	    	</div>
	   </div>
	    <div class="mask" ref="maskwrap" v-show="maskShow">
	    	<div class="mask-wrap">
		    	<div class="mask-content clearfix" >
		    		<h2 class="title">
		    			{{seller.name}}
		    		</h2>
		    		<div class="star-wrap">
		    			<Star :size="48" :score="seller.score"></Star>
		    		</div>
		    		<div class="line-wrap">
		    			<vLine title="优惠信息"></vLine>
		    		</div>
		    		<div class="supports">
		    			<ul v-if="seller.supports">
		    				<li v-for="(support,index) in seller.supports" class="support-item">
		    					<span class="icon" :class="classMap[seller.supports[index].type]"></span>
		    					<span class="text">{{seller.supports[index].description}}</span>
		    				</li>
		    			</ul>
		    		</div>
		    		<div class="line-wrap">
		    			<vLine title="商家公告"></vLine>
		    		</div>
		    		<div class="decs">
		    			{{seller.bulletin}}
		    		</div>
		    	</div>
		    	<div class="closeMask" @click="maskHide">
		    		<span class="iconfont icon-close"></span>
		    	</div>
	    	</div>
	    </div>
	</div>
</template>

<script>
import BScroll from 'better-scroll'
import Star from '@/components/star/Star'
import vLine from '@/components/line/Line'
export default {
  data () {
  	return {
  		maskShow:false,
  		classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
  	}
  },
  props:{
  	seller:{
  		type: Object
  	}
  },
  mounted (){
  	/*this.$nextTick(() => {
  		this.menuscroll = new BScroll(this.$refs.maskwrap,{})
  	})*/
  },
  methods:{
  	maskClick () {
  		this.maskShow = !this.maskShow
  	},
  	maskHide () {
  		this.maskClick()
  	}
  },
  components:{
  	Star,
  	vLine
  }
}
</script>

<style lang="less" scoped>
@import '../../common/css/mixin.less';
.header{
	position: relative;
	width:100%;
	height: 134px;
	overflow: hidden;
	background: rgba(7,17,27,0.5);
	.header-blur{
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		filter:blur(10px);
		z-index: -1;
	}
	.detail{
		.avatar{
			width: 64px;
			height: 64px;
			margin: 24px 16px 18px 24px;
			img{
				border-radius: 4px;
			}
		}
		.desc{
			color: rgb(225,225,225);;
			.band{
			    margin-top: 24px;
			    font-size: 16px;
			    font-weight: bold;
			    span{
			    	display: inline-block;
			    	vertical-align: middle;
			    }
			    .pic{
			    	width: 30px;
			    	height: 18px;
			    	background: url("brand@2x.png") no-repeat left top;
			    	background-size: 30px 18px;
				    @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
				      background-image: url("brand@3x.png");
				    }
			    }
			}
			.deliver-time{
			    margin-top: 8px;
    			font-size: 12px;
			}
			.pay-discount{
			    margin-top: 10px;
    			font-size: 0px;
    			span{display: inline-block;vertical-align: middle;}
    			.icon{
    				width: 16px;
    				height: 16px;
    				&.decrease{
    					background: url("decrease_1@2x.png") no-repeat left top;
				    	background-size: 16px 16px;
					    @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
					      background-image: url("decrease_1@3x.png");
					    }
    				}
    			}
    			.text{
    				font-size: 10px;
    				margin-left: 4px;
    			}
    			
			}
		}
	}
	.count{
		width: 48px;
	    height: 24px;
	    margin: 70px 20px 0 0;
	    border-radius: 12px;
	    background: rgba(0, 0, 0, 0.2);
	    font-size: 0px;
	    line-height: 24px;
	    text-align: center;
	    span{
	    	display: inline-block;
	    	font-size: 10px;
	    	color: rgb(225,225,225);
	    }
	    .iconfont{
	    	font-size: 14px;
	    	font-weight: 700;
	    }
	}
	.bulletin{
		background: rgba(7,17,27,0.2);
		position: absolute;
		left: 0;
		bottom: 0;
		font-size: 0;
		padding-left: 4px;
		height: 28px;
		line-height: 28px;
		width: 100%;
		span{
			display: inline-block;
			color: rgb(225,225,225);
			vertical-align: middle;
		}
		.icon{
			width: 22px;
			height: 12px;
			background: url("bulletin@2x.png") no-repeat left top;
	    	background-size: 22px 12px;
		    @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
		      background-image: url("bulletin@3x.png");
		    }
		}
		.text{
			margin-left: 4px;
			width: 80%;
			font-size: 10px;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		
		}
		
		
		
		
	}
}
.mask{
	.mask-wrap{
		width: 100%;
		height: 100%;
		overflow: auto;
	}
	width: 100%;
	height: 100%;
	position: fixed;
	top:0;
	left: 0;
	z-index:200;
	background: rgba(7,17,27,0.9);
	/*overflow: auto;*/
	.mask-content{
		min-height:100%;
		padding-bottom:64px;
		padding-left:36px;
		padding-right:36px;
		.title{
			margin-top: 64px;
			text-align: center;
			font-size: 16px;
			font-weight: 700;
			color: rgb(255,255,255);
		}
		.star-wrap{
			margin: 20px auto 0 auto;
		}
		.supports{
			.support-item{
				margin-bottom:12px;
				span{
					display: inline-block;
					vertical-align: middle;
				}
				.icon{
					width: 16px;
					height: 16px;
					margin-left: 32px;
					&.decrease{
    					background: url("decrease_1@2x.png") no-repeat left top;
				    	background-size: 16px 16px;
					    @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
					      background-image: url("decrease_1@3x.png");
					    }
    				}
    				&.discount{
    					background: url("discount_1@2x.png") no-repeat left top;
				    	background-size: 16px 16px;
					    @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
					      background-image: url("discount_1@3x.png");
					    }
    				}
    				&.special{
    					background: url("special_1@2x.png") no-repeat left top;
				    	background-size: 16px 16px;
					    @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
					      background-image: url("special_1@3x.png");
					    }
    				}
    				&.invoice{
    					background: url("invoice_1@2x.png") no-repeat left top;
				    	background-size: 16px 16px;
					    @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
					      background-image: url("invoice_1@3x.png");
					    }
    				}
    				&.guarantee{
    					background: url("guarantee_1@2x.png") no-repeat left top;
				    	background-size: 16px 16px;
					    @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
					      background-image: url("guarantee_1@3x.png");
					    }
    				}
				}
				.text{
					font-size: 12px;
					color: rgb(255,255,255);
				}	
			}
		}
		.decs{
			padding: 0 12px;
			font-size: 12px;
			line-height: 24px;
			color: rgb(255,255,255);
		}
	}
	.closeMask{
		position: relative;
		width: 32px;
		height: 32px;
		color: rgb(225,225,225);
		margin: -100px auto 0 auto;
		clear:both;
		font-size: 32px;
	}
}
</style>
