const cartStore = {
  state: {
    cart: []
  },
  mutations: {
    Add_Item: (state, item) => {
      const found = state.cart.findIndex((_item) => _item.itemId === item.itemId)
      const isCorrectQuantity = state.cart[found]?.quantity < item.maxQuantity

      if (found < 0) {
        state.cart.push({ ...item, quantity: 1 })
      } else if (isCorrectQuantity) {
        state.cart[found].quantity += 1
      }
    },
    Add_Items_By_Count: (state, item) => {
      const found = state.cart.findIndex((_item) => _item.itemId === item.itemId)
      const isCorrectQuantity = state.cart[found]?.quantity <= item.maxQuantity

      if (found >= 0 && isCorrectQuantity) {
        state.cart[found].quantity = item.count
      }
    },
    Remove_Item: (state, itemId) => {
      const found = state.cart.findIndex((_item) => _item.itemId === itemId)
      const isCorrectQuantity = state.cart[found]?.quantity > 1

      if (found >= 0 && isCorrectQuantity) {
        state.cart[found].quantity -= 1
      } else {
        state.cart.splice(found, 1)
      }
    },
    Clear_Item: (state, itemId) => {
      state.cart = state.cart.filter((item) => item.itemId !== itemId)
    }
  },
  getters: {
    Get_Cart: (state) => state.cart
  }
}

export default cartStore
