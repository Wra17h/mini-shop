let exchangeRate = 30

const updateExchangeRate = () => {
  exchangeRate = Math.random() * (80 - 20) + 20
}

const getExchangeRate = () => exchangeRate

const applyExchangeRate = (price) => price * exchangeRate

const getFormattedPrice = (price) => {
  return `${applyExchangeRate(price).toFixed(2)} ₽`
}

export const PriceService = {
  updateExchangeRate,
  getExchangeRate,
  applyExchangeRate,
  getFormattedPrice
}
