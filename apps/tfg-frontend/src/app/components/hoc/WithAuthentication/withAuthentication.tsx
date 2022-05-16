import { IIdentityState } from "apps/tfg-frontend/src/redux/reducers/session/SessionReducer";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from 'react-router-dom'
import { fetchUser, retrieveIdentity } from "apps/tfg-frontend/src/redux/actions/session/session";
import { Dispatch } from "react";

const checkIdentity = () => {
  const dispatch : Dispatch<any> = useDispatch();
  dispatch(retrieveIdentity())
}

const checkAuthentication = (session : IIdentityState) : boolean => {
  const { tokens } = session.identity;
  if(session.isAuthenticated && tokens !== undefined ){
    if(tokens?.expiresat?.getTime()! < Date.now()){
      return true;
    }
  }
  return false;
}

export const WithAuthentication =
  (WrappedComponent : any) =>
  (props: any) => {

    /**
     * Loading the react-redux state in order to check the authenticity of the
     * tokens.
     */

    checkIdentity();
    const session : IIdentityState = useSelector((state : any)  => state.sessionReducer);

    /**
     * Checking the auth session state, if it is still alive, the page will load the
     * wrapped component that is passed by parameter, otherwise, it will navigate to the
     * main non auth page.
     */

    if(checkAuthentication(session)){
      return (
        <WrappedComponent {...props} />
      );
    }
    return <Navigate to="/"/>
  }
