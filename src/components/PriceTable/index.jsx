import {
  Box,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  Text,
  Spinner,
} from "grommet"
import { getProfit, getFlashLoanPair } from "./../../utils/misc"

const Header = ({ label }) => {
  return (
    <TableCell scope="col" border="bottom">
      <strong>{label}</strong>
    </TableCell>
  )
}

const Row = ({ data, loanAmount }) => {
  const { pairLabel, pancakeData, bakeryData } = data
  const potentialProfit = getProfit({ pancakeData, bakeryData, loanAmount })
  return (
    <TableRow>
      <TableCell scope="row">{pairLabel}</TableCell>
      <TableCell>{pancakeData.ratio}</TableCell>
      <TableCell>{bakeryData.ratio}</TableCell>
      <TableCell>{potentialProfit} BNB</TableCell>
    </TableRow>
  )
}

export default ({ data, loanAmount }) => {
  if (!data) {
    return (
      <Box margin={{ top: "medium" }} align="center">
        <Spinner size="large" />
      </Box>
    )
  }
  return (
    <Box
      margin={{ top: "medium" }}
      pad="small"
      border={{ color: "brand", size: "small" }}
      round="small"
      elevation="medium"
    >
      {/* <Text>Ratios between PancakeSwap and BakerySwap pairs:</Text> */}
      <Table>
        <TableHeader>
          <TableRow>
            <Header label="Pair" />
            <Header label="PancakeSwap Price" />
            <Header label="BakerySwap Price" />
            <Header label="Potential Profit" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((rowData) => (
            <Row
              data={rowData}
              key={rowData.pairLabel}
              loanAmount={loanAmount}
            />
          ))}
        </TableBody>
      </Table>
    </Box>
  )
}
