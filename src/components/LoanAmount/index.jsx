import { Box, Text, TextInput } from "grommet"

export default ({ loanAmount, setLoanAmount }) => {
  return (
    <Box direction="row" margin={{ top: "large" }}>
      <Box
        margin={{ right: "medium" }}
        align="center"
        alignContent="center"
        alignSelf="center"
      >
        <Text textAlign="center" alignSelf="center">
          Loan Amount (in WBNB):
        </Text>
      </Box>
      <Box>
        <TextInput
          type="number"
          placeholder="Loan Amount (in WBNB)"
          value={loanAmount}
          onChange={(event) => setLoanAmount(event.target.value)}
        />
      </Box>
    </Box>
  )
}
