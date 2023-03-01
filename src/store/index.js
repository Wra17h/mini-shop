import { createStore } from 'vuex'
import shopStore from '@/modules/shop/store'
import cartStore from '@/modules/cart/store'

const store = createStore({
  modules: {
    shopStore,
    cartStore
  }
})

export default store
