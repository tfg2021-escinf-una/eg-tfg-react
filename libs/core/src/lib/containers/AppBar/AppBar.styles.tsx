import { AppBar } from "@mui/material"
import { styled } from '@mui/system'

export const StyledAppBar = styled(AppBar)`
  display: block;
  position: inherit;
  background-color: ${({ theme }) => theme.palette['primary'].main };
`
