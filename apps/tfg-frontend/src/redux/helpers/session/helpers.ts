import { ITokenResponse, IUser, IUserIdentity } from "../../../interfaces";
import { IAPIResponse } from "../../../interfaces";
import { customJwtPayload } from "../../utils/types";
import jwtDecode from 'jwt-decode';
import { PlainData } from "simple-crypto-js";

export const saveObjectInLocalStorage = (key : string, object : PlainData) => {
  localStorage.setItem(key, object.toString());
}

export const retrieveObjectFromLocalStorage = (key: string) => {
  return localStorage.getItem(key);
}

export const identityBuilder = (fetchedData : IAPIResponse<ITokenResponse>) : IUserIdentity => {
  const { data } = fetchedData;
  const token : string = data.jwtToken!;
  const decoded = jwtDecode<customJwtPayload>(token);
  const identityObject : IUserIdentity =  {
    user : {
      id: 1, // TO DO: We need to include in the payload the user id.
      name: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
      role: decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
      emailAddress: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
      username: decoded.username
    } as IUser,
    tokens: {
      jwtToken: token,
      refreshToken: data.refreshToken,
      expiresat: data.expiresat
    } as ITokenResponse
  };
  return identityObject;
}



