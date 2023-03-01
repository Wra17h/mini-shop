<template>
  <h2 class="text-3xl mb-[2rem]">Корзина</h2>
  <template v-if="isCartEmpty">
    <p class="text-2xl">Тут пусто</p>
  </template>
  <div class="cart__block" v-else>
    <div
      class="cart__headers grid grid-cols-4 border-b border-gray-300 pb-3 border-solid text-xl my-2"
    >
      <p class="item__name">Наименование товара</p>
      <p class="item__count">Количество</p>
      <p class="item__price">Цена</p>
    </div>
    <p v-for="{ groupId, itemId, quantity, maxQuantity } in cart" :key="itemId">
      <app-cart-item
        :quantity="quantity"
        :item-id="itemId"
        :count-items="quantity"
        :group-id="groupId"
        :max-quantity="maxQuantity"
        class="my-3 border-b-2 py-3"
      />
    </p>
    <p class="text-lg">Общая стоимость: {{ PriceService.getFormattedPrice(totalPrice) }}</p>
  </div>
</template>

<script setup>
import AppCartItem from './components/AppCartItem.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { PriceService } from '../../services/PriceService'

const store = useStore()
const cart = computed(() => {
  return store.getters.Get_Cart
})
const isCartEmpty = computed(() => cart.value.length < 1)

const goods = computed(() => {
  return store.getters.Get_Goods
})

const totalPrice = computed(() => {
  return cart.value.reduce(
    (prevValue, goodValue) => prevValue + goods.value[goodValue.itemId].C * goodValue.quantity,
    0
  )
})
</script>

<style scoped></style>
