import Vue from 'vue'
import Router from 'vue-router'
import Goods from '@/components/goods/Goods'
import Ratings from '@/components/ratings/Ratings'
import Seller from '@/components/seller/seller'
Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/goods' },
    {
      path: '/goods',
      name: 'goods',
      component: Goods
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: Ratings
    },
    {
      path: '/seller',
      name: 'seller',
      component: Seller
    }
  ]
})
