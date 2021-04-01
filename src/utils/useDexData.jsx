import { useState, useEffect } from "react"
import { getProfit, getFlashLoanPair } from "./../utils/misc"

const query = `
{
  pairs(orderBy: volumeUSD, orderDirection: desc) {
    id
    token0 { id, symbol, derivedETH, decimals }
    token1 { id, symbol, derivedETH, decimals }
    token0Price
    token1Price
  }
}
`

const body = {
  operationName: "pairs",
  query,
  variables: {},
}

const pancakeUrl =
  "https://api.thegraph.com/subgraphs/name/pancakeswap/exchange"
const bakeryUrl = "https://api.bscgraph.org/subgraphs/name/bakeryswap"

export const getPairs = (url) => {
  return fetch(url, {
    body: JSON.stringify(body),
    method: "POST",
  })
    .then((res) => res.json())
    .then(({ data }) => data.pairs)
    .then((pairs) => {
      return pairs.reduce((result, pair) => {
        const { id, token0, token1, token0Price } = pair
        const pairLabel = `${token0.symbol}/${token1.symbol}`
        result[`${token0.id}_${token1.id}`] = {
          pairLabel,
          ratio: token0Price,
          token0Address: token0.id,
          token1Address: token1.id,
          token0BnbValue: token0.derivedETH,
          token1BnbValue: token1.derivedETH,
          token0Decimals: token0.decimals,
          token1Decimals: token1.decimals,
          pairId: id,
        }
        return result
      }, {})
    })
}

export default () => {
  const [dexData, setDexData] = useState()

  const createDexData = async () => {
    const pancakePairs = getPairs(pancakeUrl)
    const bakeryPairs = getPairs(bakeryUrl)
    const [pancake, bakery] = await Promise.all([pancakePairs, bakeryPairs])
    console.log("Number of pancake pairs:", Object.keys(pancake).length)
    console.log("Number of bakery pairs:", Object.keys(bakery).length)
    const data = Object.keys(pancake)
      .map((idsForPair) => {
        if (bakery[idsForPair]) {
          const { pairLabel } = pancake[idsForPair]
          return {
            pairLabel,
            pancakeData: pancake[idsForPair],
            bakeryData: bakery[idsForPair],
          }
        }
      })
      .filter((p) => p)
      .sort((a, b) => {
        const aProfit = getProfit({
          pancakeData: a.pancakeData,
          bakeryData: a.bakeryData,
        })
        const bProfit = getProfit({
          pancakeData: b.pancakeData,
          bakeryData: b.bakeryData,
        })
        return bProfit - aProfit
      })
    console.log("All pairs:", data)
    return data
  }

  useEffect(() => {
    createDexData().then(setDexData)
  }, [])

  return dexData
}
