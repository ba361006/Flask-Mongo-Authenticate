import { Box, BoxProps } from '@mui/material'

const FabWrapper = (props: BoxProps) => {
  return <Box position='fixed' pr={3} pb={3} right={0} bottom={0} {...props} />
}

export default FabWrapper
