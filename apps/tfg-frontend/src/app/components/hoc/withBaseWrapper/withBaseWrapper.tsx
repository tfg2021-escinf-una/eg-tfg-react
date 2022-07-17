import { AppBar } from "@eg-tfg/core"
import { useDispatch, useSelector } from "react-redux";
import { ISessionState } from "apps/tfg-frontend/src/redux/reducers";
import { StyledHeader, StyledContent, StyledFooter, StyledFooterContent} from "./withBaseWrapper.styles"
import { Typography } from "@mui/material";
import { logout, retrieveIdentity } from '../../../../redux/actions';
import { useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "apps/tfg-frontend/src/redux";
import { ReactNode, useEffect } from "react";

interface IIdentityHandler {
  sessionState : ISessionState,
  dispatch : AppDispatch
  children: ReactNode,
}

const IdentityHandler = ({
  sessionState,
  dispatch,
  children
} : IIdentityHandler) => {

  useEffect(() => {
    dispatch(retrieveIdentity())
  }, [])

  return(
    <>{children}</>
  )
}

export const withBaseWrapper =
  (WrappedComponent: any) =>
  (props: any) => {

  const session : ISessionState = useSelector((state : RootState)  => state.sessionReducer);
  const dispatch : AppDispatch = useDispatch();
  const navigate = useNavigate();
  const dt = new Date();

  return(
    <>
      <StyledHeader>
        <AppBar isAuthenticated={session.isAuthenticated}
                title={"TFG - Universidad Nacional"}
                handleOnClickLogin={() => navigate('/login')}
                handleSignOut={() => { dispatch(logout()) }} />
      </StyledHeader>
      <StyledContent>
        <IdentityHandler sessionState={session}
                         dispatch={dispatch}>
          <WrappedComponent {...props} />
        </IdentityHandler>
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
