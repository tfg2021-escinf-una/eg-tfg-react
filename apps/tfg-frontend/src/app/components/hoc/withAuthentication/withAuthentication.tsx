import { RootState, refresh, AppDispatch, retrieveIdentity, refreshTrigger } from "../../../../redux";
import { ISessionState } from "../../../../redux/reducers";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from 'react-router-dom'
import { useEffect, useRef } from "react";

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
      const { refreshTriggered } = sessionState;
      const { tokens } = sessionState.identity;

      if(!checkAuthentication(sessionState)){
        if(!refreshTriggered &&
            tokens?.jwtToken !== undefined &&
            tokens?.refreshToken !== undefined) {
          dispatch(refreshTrigger(true))
          dispatch(refresh({
            jwtToken: tokens?.jwtToken,
            refreshToken: tokens?.refreshToken
          }))
        }
      }
    }, [dispatch])

    if(checkAuthentication(sessionState) || sessionState.refreshTriggered){
      return (
        <WrappedComponent {...props} />
      );
    }
    return <Navigate to="/login"/>
  }
