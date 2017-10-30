<template>
<div class="tab">
	<div class="tab-wrap">
		<div class="tab-type positive" :class="{'active':selectType===2}" @click="select(2,$event)">
			<span class="title">{{desc.all}}</span>
			<span class="num">{{ratingNum.length}}</span>
		</div>
		<div class="tab-type positive" :class="{'active':selectType===0}" @click="select(0,$event)">
			<span class="title">{{desc.positive}}</span>
			<span class="num">{{positiveNum.length}}</span>
		</div>
		<div class="tab-type negative" :class="{'active':selectType===1}" @click="select(1,$event)">
			<span class="title">{{desc.negative}}</span>
			<span class="num">{{negativeNum.length}}</span>
		</div>
	</div>
	<div class="onlyContent">
		<span class="icon iconfont icon-select" :class="{'active':selectIcon}" @click="toggleSelect($event)"></span>
		<span class="text">只看有内容的评论</span>
	</div>
	
</div>
</template>

<script>
export default{
	props:{
		desc:{
			type:Object,
			default(){
				return {
					all: '全部',
		            positive: '满意',
		            negative: '不满意'
				}
			}
		},
		ratingNum:{
			type:Array,
			default () {
				return []
			}
		},
		selectType:{
			type:Number,
			default () {
				return 2
			}
		},
		selectIcon:{
			type:Boolean,
			default () {
				return false
			}
		}
	},
	computed:{
		positiveNum () {
			return this.ratingNum.filter((rating)=>{
				return rating.rateType === 0
			})
		},
		negativeNum () {
			return this.ratingNum.filter((rating)=>{
				return rating.rateType === 1
			})
		}
	},
	methods:{
		select (type,event) {
			this.$emit('select', type)
		},
		toggleSelect(event){
			this.$emit('toggleSelect')
		}
	}
}
</script>

<style lang="less" scoped>
@import "../../common/css/mixin.less";
.tab{
	.tab-wrap{
		padding: 18px 0;
		.border-1px(rgba(7,17,27,0.1));
		.tab-type{
		    display: inline-block;
		    padding: 8px 12px;
		    line-height: 16px;
		    border-radius: 2px;
		    margin-right: 8px;
		    font-size: 12px;
		    color: #4d555d;
		    text-align: center;
		    &.active{
		    	color: #FFFFFF;	
	    	}
		    &.positive{
		    	background:rgba(0,160,220,0.2);
		    	&.active{
		    		background: rgb(0,160,220);
		    	}
		    }
		    &.negative{
		    	background: rgba(77,85,93,0.2);
		    	&.active{
		    		background: rgb(77,85,93);
		    	}
		    }
		}
	}
	.onlyContent{
		padding: 12px 0;
		.border-1px(rgba(7,17,27,0.1));
		span{
			display: inline-block;
			vertical-align: middle;
		}
		.iconfont{
			font-size: 24px;
			color: rgb(147,153,159);
			line-height: 24px;
			&.active{
				color: rgb(0,160,220);	
			}
		}
		.text{
			font-size: 12px;
			color: rgb(147,153,159);
			line-height: 24px;
		}
	}
}
</style>