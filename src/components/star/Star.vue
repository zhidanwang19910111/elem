<template>
	<div id="star">
		<div class="star" :class="starType">
			<span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
		</div>
	</div>
</template>

<script>
  const LENGTH = 5;
  const CLS_ON = 'on';
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';
  export default {
  	props:{
  		size:{
  			type:Number
  		},
  		score:{
  			type:Number
  		}
  	},
  	computed:{
      starType(){
      	return 'star-' + this.size
      },
      itemClasses(){
      	let result = []
      	let score = Math.floor(this.score*2) / 2
      	let hasDecimal = score % 1 !==0
      	let integer = Math.floor(score)
      	for(let i = 0;i<integer;i++){
      		result.push(CLS_ON)
      	}
      	if(hasDecimal){
      		result.push(CLS_HALF)
      	}
      	while(result.length<LENGTH){
      		result.push(CLS_OFF)
      	}
      	return result
      }
  	}
  }
</script>

<style lang="less" scoped>
#star{
	.star{
		font-size:0;
		text-align:center;
		.star-item{
			display: inline-block;
		}
	}
	.star-24{
		.star-item{
			width: 10px;
	        height: 10px;
	        margin-right: 3px;
		}
		.star-item:last-child{
			margin-right: 0;
		}
		.on{
			background: url("star24_on@2x.png") no-repeat left top;
			background-size: 10px 10px;
		    @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
		      background-image: url("star24_on@3x.png");
		    }
		}
		.half{
			background: url("star24_half@2x.png") no-repeat left top;
			 background-size: 10px 10px;
		    @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
		      background-image: url("star24_half@3x.png");
		    }
		}
		.off{
			background: url("star24_off@2x.png") no-repeat left top;
			 background-size: 10px 10px;
		    @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
		      background-image: url("star24_off@3x.png");
		    }
		}
	}
	.star-36{
		.star-item{
			width: 15px;
	        height: 15px;
	        margin-right: 6px;
		}
		.star-item:last-child{
			margin-right: 0;
		}
		.on{
			background: url("star36_on@2x.png") no-repeat left top;
			background-size: 15px 15px;
		    @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
		      background-image: url("star36_on@3x.png");
		    }
		}
		.half{
			background: url("star36_half@2x.png") no-repeat left top;
			 background-size: 15px 15px;
		    @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
		      background-image: url("star36_half@3x.png");
		    }
		}
		.off{
			background: url("star36_off@2x.png") no-repeat left top;
			 background-size: 15px 15px;
		    @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
		      background-image: url("star36_off@3x.png");
		    }
		}
	}
	.star-48{
		.star-item{
			width: 20px;
	        height: 20px;
	        margin-right: 22px;
		}
		.star-item:last-child{
			margin-right: 0;
		}
		.on{
			background: url("star48_on@2x.png") no-repeat left top;
			background-size: 20px 20px;
		    @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
		      background-image: url("star48_on@3x.png");
		    }
		}
		.half{
			background: url("star48_half@2x.png") no-repeat left top;
			 background-size: 20px 20px;
		    @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
		      background-image: url("star48_half@3x.png");
		    }
		}
		.off{
			background: url("star48_off@2x.png") no-repeat left top;
			 background-size: 20px 20px;
		    @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
		      background-image: url("star48_off@3x.png");
		    }
		}
	}
}
</style>
