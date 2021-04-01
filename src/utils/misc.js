export const getProfit = ({ pancakeData, bakeryData, loanAmount = 1 }) => {
  //
  const numUnits = loanAmount / pancakeData.token0BnbValue
  const difference = pancakeData.ratio - bakeryData.ratio
  const multiplier = pancakeData.token0BnbValue / pancakeData.ratio
  return Math.abs(numUnits * difference) * multiplier
}

const getFullValue = ({ amount, decimals }) => {
  return amount * Math.pow(10, decimals)
}

export const getFlashLoanPair = (data) => {
  console.log("getFlashLoan - data:", data)
  const { pancakeData, bakeryData, loanAmount } = data
  let token0Amount = 0
  let token1Amount = 0
  const difference = pancakeData.ratio - bakeryData.ratio
  if (difference > 0) {
    token0Amount = loanAmount / pancakeData.token0BnbValue
  } else {
    token1Amount = loanAmount / pancakeData.token1BnbValue
  }

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
