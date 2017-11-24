<template>
  <div class="goods">
		<div class="goods-nav" ref="menuWrap">
			<ul>
				<li class="nav-list" v-for="(item,index) in navList">
					<span @click="navClick(index,$event)" :class="{'active' : currentIndex===index}">{{item.name}}</span>
				</li>
			</ul>
		</div>
		<div class="good-list" ref="goodsWrap">
			<div>
				<ul class="item-title food-list-hook" v-for="items in navList">
					<li class="title">{{items.name}}</li>
					<li class="goods-item" v-for="item in items.foods">
						<div class="avatar" @click="toggleFood(item,$event)">
							<img width="57" height="57" :src="item.icon" alt="" />
						</div>
						<div class="detail">
							<h2 class="name">{{item.name}}</h2>
							<div class="desc">{{item.description}}</div>
							<div class="sellcount">
								<span class="count">月售{{item.sellCount}}份</span>
								<span>好评率{{item.rating}}</span>
							</div>
							<div class="price-wrap">
								<span class="price">{{item.price}}</span>
								<span class="oldPrice" v-if="item.oldPrice">{{item.oldPrice}}</span>
							</div>
						</div>
						<div class="cart-controll">
							<Cartcontrol :food="item"></Cartcontrol>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="shopCart">
			<Shopcart :selectGood="selectFoods" :deliverPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></Shopcart>
		</div>
		<Food :foodDetail="foodDetail" ref="food"></Food>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import Shopcart from '@/components/shopcart/Shopcart'
import Cartcontrol from '@/components/cartcontroll/Cartcontroll'
import Food from '@/components/food/Food'
export default {
	props:{
		seller:{
			type:Object
		}
	},
	data () {
		return {
			navList:[],
			scrollY:0,
			listHeight:[],
			foodDetailshow:false,
			foodDetail:{}
		}
	},
	computed:{
		currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (!height2 || this.scrollY >= height1 && this.scrollY < height2) {
          return i
        }
      }
      return 0
  },
  selectFoods () {
      let foods = []
      this.navList.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food)
          }
        })
      })
      return foods
    }
	},
	methods: {
		initScroll () {
			this.munuScroll = new BScroll(this.$refs.menuWrap,{
				click: true,
		        startX: 0,
		        startY: 0
			})
			this.goodsScroll = new BScroll(this.$refs.goodsWrap,{
				click: true,
				startX: 0,
				StartY: 0,
				probeType: 3
			})
			this.goodsScroll.on('scroll', (pos) => {
        		this.scrollY = Math.abs(Math.round(pos.y))
      		})
		},
		calculateHeight () {
      let foodList = this.$refs.goodsWrap.getElementsByClassName('food-list-hook')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
   },
		navClick (index,event) {
			let foodList = this.$refs.goodsWrap.getElementsByClassName('food-list-hook')
      let el = foodList[index]
      this.goodsScroll.scrollToElement(el, 300)
		},
		toggleFood(food,event){
			this.foodDetail = food
			this.$refs.food.foodshow()
		}
	},
	created (){
		this.$http.get('/api/goods').then((res)=>{
			if(res.body.errno === 0){
				this.navList = res.body.data;
				this.$nextTick(()=>{
					this.initScroll()
					this.calculateHeight()
				})
			}
		})
	},
	components:{
		Shopcart,
		Cartcontrol,
		Food
	}
}
</script>
<style lang="less" scoped>
@import "../../common/css/mixin.less";
.goods{
	width:100%;
	position:absolute;
	left: 0;
	top:174px;
	bottom: 46px;
	overflow:hidden;
	display:flex;
	.goods-nav{
		background: #f3f5f7;
		flex: 0 0 80px;
		width: 80px;
		.nav-list{
			display:table;
			margin: 0 auto;
			font-size: 12px;
			color: rgb(20,20,20);
			&.nav-list:last-child span{
				border:0;
			}
		}
		.active{
			background: rgb(255,255,255);
		}
		span{
			display: table-cell;
			width: 56px;
			height: 54px;
			line-height: 14px;
			vertical-align:middle;
			.border-1px(rgba(7,17,27,0.1));
		}
	}
	.good-list{
		flex:1;
		.item-title{
			.title{
				padding-left: 14px;
				height: 26px;
				line-height: 26px;
				border-left: 2px solid #d9dde1;
				font-size:12px;
				color:rgb(147,153,159);
				background:#f3f5f7;
			}
			.goods-item{
				padding: 18px;
				display: flex;
				position: relative;
				.border-1px(rgba(7,17,27,0.1));
				.avatar{
					width: 57px;
					height: 57px;
				}
				.detail{
					margin-left: 10px;
					color: rgb(7,17,27);
					.name{
						margin: 2px 0 8px 0;
						font-size: 14px;
						color: rgb(0,0,0);
					}
					.desc{
						margin-bottom: 8px;
						font-size: 10px;
						color:rgb(147,153,159);
					}
					.sellcount{
						font-size: 10px;
						color:rgb(147,153,159);
					}
					.price-wrap{
						margin-top: 8px;
						.price{
							font-size: 14px;
							color: rgb(255,0,0);
							font-weight: 700;
						}
						.oldPrice{
							font-size: 10px;
							color: rgb(147,153,159);
							font-weight: 700;
							text-decoration: line-through;
						}
					}
				}
				.cart-controll{
						position:absolute;
						right: 20px;
						bottom: 12px;
					}
			}
		}
	}
	.shopCart{
		width: 100%;
		height: 46px;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 100;
	}
}
</style>
