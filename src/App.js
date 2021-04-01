import { Box, Heading, Grommet, Text } from "grommet"
import { useEffect, useState } from "react"

import LoanAmount from "./components/LoanAmount"
import PriceTable from "./components/PriceTable"
import StartButton from "./components/StartButton"
import useDexData from "./utils/useDexData"
import { startFlashLoan } from "./utils/flashLoan"
import { getProfit, getFlashLoanPair } from "./utils/misc"

const theme = {
  global: {
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px",
    },
    colors: { brand: "#ff0000" },
  },
}

function App() {
  const [state, setState] = useState({ loanAmount: 10 })
  const [flashLoanPair, setFlashLoanPair] = useState()
  const [web3, setWeb3] = useState()
  const data = useDexData()

  const start = () => {
    if (flashLoanPair) {
      startFlashLoan({ flashLoanPair, web3 })
    }
  }

  useEffect(() => {
    if (data) {
      const pair = getFlashLoanPair({
        ...data[0],
        loanAmount: state.loanAmount,
      })
      console.log("Flash loan pair:", pair)
      setFlashLoanPair(pair)
    }
  }, [state.loanAmount, data])

  // useEffect(() => {
  //   setWeb3(new Web3(Web3.givenProvider || "ws://localhost:8545"))
  // }, [])

  return (
    <Grommet theme={theme}>
      <Box
        direction="column"
        border={{ color: "brand", size: "large" }}
        pad="medium"
        round="medium"
        margin="small"
        elevation="large"
      >
        <Heading margin="none">The Flash ⚡</Heading>
        <Box margin={{ top: "small" }}>
          <Text>
            <i>Flashloan UI for Binance Smart Chain:</i>
          </Text>
        </Box>
        <LoanAmount
          loanAmount={state.loanAmount}
          setLoanAmount={(loanAmount) => {
            setState({ ...state, loanAmount })
          }}
        />
        <StartButton startTrade={start} disabled={!flashLoanPair} />
        <PriceTable data={data} loanAmount={state.loanAmount} />
      </Box>
    </Grommet>
  )
}

export default App
