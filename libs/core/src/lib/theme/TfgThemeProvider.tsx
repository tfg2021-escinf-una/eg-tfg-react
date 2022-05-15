import { ThemeProvider } from "@mui/material";
import { createCustomTheme, ThemeProps } from "./TfgThemeProvider.styles";

export const TfgThemeProvider = ({
  mode = 'dark',
  children } : ThemeProps) => {

  const theme = createCustomTheme(mode);

  return(
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}
