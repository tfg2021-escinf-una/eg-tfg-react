import { IAPIResponse, ITokenResponse, IUser, IUserIdentity } from "../../interfaces";
import { customJwtPayload } from "../utils/types";
import { PlainData } from "simple-crypto-js";
import jwtDecode from 'jwt-decode';

export const saveObjectInLocalStorage = (key : string, object : PlainData) => {
  localStorage.setItem(key, object.toString());
}

export const retrieveObjectFromLocalStorage = (key: string) => {
  return localStorage.getItem(key);
}

export const purgeObjectFromLocalStorage = (key : string) => {
  localStorage.removeItem(key);
}

export const identityBuilder = (identityTokens : IAPIResponse<ITokenResponse>) : IUserIdentity => {
  const { jwtToken, refreshToken, expiresat } = identityTokens.data;
  const decoded = jwtDecode<customJwtPayload>(jwtToken!);
  const identityObject : IUserIdentity =  {
    user : {
      id: 1, // TO DO: We need to include in the payload the user id.
      firstName: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
      role: decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
      emailAddress: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
      username: decoded.username
    } as IUser,
    tokens: {
      jwtToken: jwtToken,
      refreshToken: refreshToken,
      expiresat: expiresat
    } as ITokenResponse
  };
  return identityObject;
}



