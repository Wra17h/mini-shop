import { priceChangeType } from '@/static/helpers'

const getPriceChangedType = ({ newPrice, oldPrice }) => {
  if (newPrice > oldPrice) {
    return priceChangeType.INCREASED
  } else if (newPrice < oldPrice) {
    return priceChangeType.DECREASED
  } else {
    return priceChangeType.SAME
  }
}

export { getPriceChangedType }
