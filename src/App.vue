<template>
  <main class="w-[1280px] m-auto pb-[4rem] pt-[2rem]">
    <app-shop :list-goods="listGoods" />
    <app-cart />
  </main>
</template>

<script setup>
import { computed, watch, ref } from 'vue'
import { useStore } from 'vuex'
import AppCart from '@/modules/cart/AppCart.vue'
import AppShop from '@/modules/shop/AppShop.vue'

const store = useStore()
store.dispatch('Get_Data')

const goods = computed(() => {
  return store.getters.Get_Goods
})
const names = computed(() => {
  return store.getters.Get_Names
})

const listGoods = ref()
watch([() => goods.value, () => names.value], () => {
  listGoods.value = Object.values(goods.value).reduce((acc, goodValue) => {
    const groupId = goodValue.G
    const groupTitle = names.value[groupId]?.G
    const price = goodValue.C
    const itemId = goodValue.T
    const inStock = goodValue.P

    return {
      ...acc,
      [groupTitle]: [
        ...(acc[groupTitle] ? acc[groupTitle] : []),
        {
          ...names.value[groupId]?.B[itemId],
          price,
          itemId,
          groupId,
          inStock,
          priceChangeType: goodValue.priceChangeType
        }
      ]
    }
  }, {})
})
</script>
