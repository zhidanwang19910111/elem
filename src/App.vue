<template>
  <div id="app">
  	<vHeader :seller="seller"></vHeader>
    <!--<img src="./assets/logo.png">-->
    <div class="tab" >
    	<div class="tab-item">
    		<!--<div class="goods">商品</div>-->
    		<router-link to="/goods">商品</router-link>
    	</div>
    	<div class="tab-item">
    		<!--<div class="ratings">评论</div>-->
    		<router-link to="/ratings">评论</router-link>
    	</div>
    	<div class="tab-item">
    		<!--<div class="seller">商家</div>-->
    		<router-link to="/seller">商家</router-link>
    	</div>
    </div>
    <keep-alive>
    <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import vHeader from '@/components/header/Header'
export default {
  data () {
  	return {
  		seller: {
  		}
  	}
  },
  components: {
  	vHeader
  },
  created () {
  	this.$http.get('api/seller').then(function(res){
  		if(res.body.errno === 0){
  			this.seller = res.body.data
  		}
  	})
  }
}
</script>

<style lang="less" scoped>
@import "/common/css/mixin.less";
#app {
/*  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;*/
  width: 100%;
}
.tab{
	width:100%;
	/*background: #7E8C8D;*/
	display: flex;
	.border-1px(rgba(7,17,27,0.1));
	.tab-item{	height: 40px;
	line-height: 40px;
		cursor: pointer;
		color: #7e8c8d;
		line-height: 40px;
		text-align: center;
		flex: 1;
		font-size: 16px;
		.router-link-active{
    	color:red;
    }
	}
}
</style>
