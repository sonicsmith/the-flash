export const getProfit = ({ pancakeData, bakeryData, loanAmount = 1 }) => {
  //
  const numUnits = loanAmount / pancakeData.token0BnbValue
  const difference = pancakeData.ratio - bakeryData.ratio
  const multiplier = pancakeData.token0BnbValue / pancakeData.ratio
  return Math.abs(numUnits * difference) * multiplier
}

const getFullValue = ({ amount, decimals }) => {
  return Math.round(amount * Math.pow(10, decimals))
}

export const getFlashLoanPair = (data) => {
  const { pairLabel, pancakeData, bakeryData, loanAmount } = data
  const [token0Symbol, token1Symbol] = pairLabel.split("/")
  console.log(`Pancake pairId:`, pancakeData.pairId)
  console.log(`Pancake ${token0Symbol} price:`, pancakeData.token0BnbValue)
  console.log(`Pancake ${token1Symbol} price:`, pancakeData.token1BnbValue)
  console.log(`Bakery ${token0Symbol} price:`, bakeryData.token0BnbValue)
  console.log(`Bakery ${token1Symbol} price:`, bakeryData.token1BnbValue)
  let token0Amount = 0
  let token1Amount = 0
  const difference = pancakeData.ratio - bakeryData.ratio
  if (difference > 0) {
    token0Amount = loanAmount / pancakeData.token0BnbValue
  } else {
    token1Amount = loanAmount / pancakeData.token1BnbValue
  }

  console.log(
    "Flash loan will borrow",
    token0Amount ? token0Symbol : token1Symbol
  )

  return {
    token0Address: pancakeData.token0Address,
    token1Address: pancakeData.token1Address,
    token0Amount: getFullValue({
      amount: token0Amount,
      decimals: pancakeData.token0Decimals,
    }),
    token1Amount: getFullValue({
      amount: token1Amount,
      decimals: pancakeData.token1Decimals,
    }),
  }
}
