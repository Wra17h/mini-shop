<template>
  <div class="products__block mb-[2rem] border border-gray-400 border-t-0">
    <div
      class="products"
      v-for="[groupName, goods] in Object.entries(props.listGoods || {})"
      :key="groupName"
    >
      <div class="products__header border-y border-gray-400 pl-2 py-2 bg-sky-200">
        <h2 class="text-lg">{{ groupName }}</h2>
      </div>
      <div class="products__body grid grid-cols-3 border-solid border-gray-400">
        <div class="product flex" v-for="good in goods" :key="good.itemId">
          <div class="border-solid p-2 w-full flex text-sm">{{ good.N }} ({{ good.inStock }})</div>
          <div
            class="bg-gray-200 flex-col justify-center items-center p-2 flex w-[150px]"
            :class="`${getClassByPriceType(good.priceChangeType)}`"
          >
            <div class="mb-2">
              {{ PriceService.getFormattedPrice(good.price) }}
            </div>
            <button @click="addItem(good)">
              <plus-circle-icon class="h-6 w-6 btn-hover-animation" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { PlusCircleIcon } from '@heroicons/vue/24/outline'
import { priceChangeType } from '@/static/helpers'
import { PriceService } from '@/services/PriceService'
import { useStore } from 'vuex'

const store = useStore()
const props = defineProps({
  listGoods: Object
})

const addItem = ({ itemId, groupId, inStock }) => {
  store.commit('Add_Item', { itemId, groupId, maxQuantity: inStock })
}

const getClassByPriceType = (changedTypeNumber) => {
  switch (changedTypeNumber) {
    case priceChangeType.INCREASED:
      return 'increased'
    case priceChangeType.DECREASED:
      return 'decreased'
    default:
      return ''
  }
}
</script>

<style scoped>
.increased {
  background: #e57373;
}

.decreased {
  background: #81c784;
}
</style>
