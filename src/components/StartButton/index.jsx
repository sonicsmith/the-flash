import { Box, Button } from "grommet"

export default ({ startTrade, disabled }) => {
  return (
    <Box margin={{ top: "medium" }}>
      <Button
        primary
        label="Start Flash Loan"
        onClick={startTrade}
        disabled={disabled}
      />
    </Box>
  )
}
