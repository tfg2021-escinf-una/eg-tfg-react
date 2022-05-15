import { AppBar } from "@eg-tfg/core"
import { useSelector } from "react-redux";
import { IIdentityState } from "apps/tfg-frontend/src/redux/reducers/session/sessionReducer";
import { StyledHeader,
         StyledContent,
         StyledFooter,
         StyledFooterContent} from "./withBaseWrapper.styles"
import { Typography } from "@mui/material";

export const withBaseWrapper =
  (WrappedComponent: any) =>
  (props: any) => {

  const session : IIdentityState = useSelector((state : any)  => state.sessionReducer);
  const dt = new Date();

  return(
    <>
      <StyledHeader>
        <AppBar isAuthenticated={session.isAuthenticated}
                title={"TFG - Universidad Nacional"} />
      </StyledHeader>
      <StyledContent>
        <WrappedComponent {...props} />
      </StyledContent>
      <StyledFooter>
        <StyledFooterContent>
          <Typography color="textPrimary" variant="h5">
            UNA - Trabajo Final de Graduacion
          </Typography>
          <Typography color="textSecondary" variant="subtitle1">
            Creado por Luis Ramírez y Edwin Lobo
          </Typography>
          <Typography color="textSecondary" variant="body2">
            Copyright © {dt.getUTCFullYear()}
          </Typography>
        </StyledFooterContent>
      </StyledFooter>
    </>
  )
}
