<template>
	<div class="line">
		<span class="line-font"></span>
		<i class="title">{{title}}</i>
		<span class="line-font"></span>
	</div>
</template>

<script>
export default {
	props:{
		title:{
			type:String
		}
	}
}
</script>

<style lang="less" scoped>
@import '../../common/css/mixin.less';
.line{
	margin: 28px 0 24px 0;
	text-align:center;
	vertical-align:middle;
	.line-font{
		height:50%;
		width:30%;
		display:inline-block;
		.border-1px(rgba(225,225,225,0.2));
	}
	.title{
		display: inline-block;
		margin: 0 12px;
		position: relative;
		left: 0;
		font-style: normal;
		font-weight: 700;
		color: rgb(255,255,255);
	}
}
</style>
