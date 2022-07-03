import { RootState, refresh, AppDispatch, retrieveIdentity, refreshTrigger } from "../../../../redux";
import { ISessionState } from "../../../../redux/reducers";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from 'react-router-dom'
import { useEffect } from "react";

export const withAuthentication =
  (WrappedComponent : any) =>
  (props: any) => {
    const sessionState : ISessionState = useSelector((state : RootState)  => state.sessionReducer);
    const dispatch : AppDispatch = useDispatch();
    const checkAuthentication = (session : ISessionState) => {
      const { tokens } = session.identity;
      if(session.isAuthenticated && tokens !== undefined ){
        const expireDate = new Date(tokens?.expiresat!)
        if(expireDate.getTime() > Date.now())
          return true
      }
      return false
    }

    useEffect(() => {
      dispatch(retrieveIdentity())
      if(!checkAuthentication(sessionState)){
        const { refreshTriggered, identity } = sessionState;
        if(!refreshTriggered && identity.tokens?.jwtToken && identity.tokens?.refreshToken) {
          dispatch(refreshTrigger(true))
          dispatch(refresh({ jwtToken: identity.tokens.jwtToken, refreshToken: identity.tokens.refreshToken }))
        }
      }
    }, [])

    if(checkAuthentication(sessionState)){
      return (
        <WrappedComponent {...props} />
      );
    }
    return <Navigate to="/login"/>
  }
