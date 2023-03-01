import { fetchNames, fetchData } from '@/services/api'
import { PriceService } from '@/services/PriceService'
import { getPriceChangedType } from '@/modules/shop/helpers'

const shopStore = {
  state: {
    goods: {},
    names: {}
  },
  mutations: {
    Add_Goods: (state, goods) => {
      state.goods = goods
    },
    Add_Names: (state, names) => {
      state.names = names
    }
  },
  actions: {
    Get_Data: async ({ commit, state }) => {
      const storeFetchedData = async () => {
        try {
          PriceService.updateExchangeRate()
          const responseNames = await fetchNames()
          const responseData = await fetchData()

          if (responseData.ok) {
            const goods = await responseData.json()
            const resultedGoodList = goods.Value.Goods.reduce((prevState, goodItem) => {
              const goodId = goodItem.T
              return {
                ...prevState,
                [goodId]: {
                  ...goodItem,
                  priceChangeType: getPriceChangedType({
                    newPrice: goodItem?.C,
                    oldPrice: state.goods[goodId]?.C
                  })
                }
              }
            }, {})
            commit('Add_Goods', resultedGoodList)
          }

          if (responseNames.ok) {
            const names = await responseNames.json()
            commit('Add_Names', names)
          }
        } catch (e) {
          console.error(e)
        }
      }

      storeFetchedData()
      const seconds = 15
      const oneMilliseconds = 1000
      const intervalInMSec = seconds * oneMilliseconds
      setInterval(storeFetchedData, intervalInMSec)
    }
  },
  getters: {
    Get_Names: (state) => state.names,
    Get_Goods: (state) => state.goods
  }
}

export default shopStore
