<template>
  <div class="cart__item">
    <div class="cart-item__block grid grid-cols-4">
      <div class="cart-item__name">
        {{ names[props.groupId].B[props.itemId].N }} ({{ props.maxQuantity }})
      </div>
      <div class="cart-item__count flex items-center">
        <input
          type="text"
          class="w-10 border-2 border-gray-300 px-1 rounded mr-2"
          @input="handleInput"
          @keydown.enter="
            addByCount(
              { groupId: props.groupId, itemId: props.itemId, inStock: props.maxQuantity },
              count
            )
          "
          v-model="count"
        />
        <button
          @click="
            addItem({ groupId: props.groupId, itemId: props.itemId, inStock: props.maxQuantity })
          "
        >
          <plus-circle-icon class="h-6 w-6 btn-hover-animation" />
        </button>
        <button @click="removeItem(props.itemId)">
          <minus-circle-icon class="h-6 w-6 btn-hover-animation" />
        </button>
      </div>
      <div class="cart-item__quantity">
        {{ PriceService.getFormattedPrice(goods[props.itemId].C * props.quantity) }}/шт.
      </div>
      <div class="cart__controls">
        <button @click="clearItem(props.itemId)">
          <trash-icon class="h-6 w-6 btn-hover-animation" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { PriceService } from '@/services/PriceService'
import { PlusCircleIcon, MinusCircleIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { useStore } from 'vuex'

const store = useStore()
const props = defineProps({
  countItems: Number,
  maxQuantity: Number,
  groupId: Number,
  itemId: Number,
  quantity: Number
})

const count = ref(0)
watch(
  () => props.countItems,
  () => {
    count.value = props.countItems
  },
  { immediate: true }
)

const goods = computed(() => {
  return store.getters.Get_Goods
})
const names = computed(() => {
  return store.getters.Get_Names
})

const handleInput = (event) => {
  if (Number(event.target.value) <= props.maxQuantity) {
    count.value = Number(event.target.value) || ''
  } else {
    count.value = props.maxQuantity
  }
}

const addItem = ({ itemId, groupId, inStock }) => {
  store.commit('Add_Item', { itemId, groupId, maxQuantity: inStock })
}

const addByCount = ({ itemId, groupId, inStock }, count) => {
  store.commit('Add_Items_By_Count', { itemId, groupId, maxQuantity: inStock, count })
}

const clearItem = (itemId) => {
  store.commit('Clear_Item', itemId)
}

const removeItem = (itemId) => {
  store.commit('Remove_Item', itemId)
}
</script>

<style scoped></style>
