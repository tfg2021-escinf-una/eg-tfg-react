import { Dispatch } from "react";
import { ICredentialRequest, ITokenResponse, IUserIdentity } from "../../../interfaces";
import { identityService } from "../../../services";
import { IAPIResponse } from "../../../interfaces";
import { identityBuilder,
         saveObjectInLocalStorage,
         retrieveObjectFromLocalStorage } from "../../helpers";
import { objEncryptionDecryption } from "../../../utils";
import { LOGIN_SUCCESS,
         LOGIN_REQUEST,
         LOGIN_NOT_FOUND,
         LOGIN_INVALID_PASSWORD,
         LOGIN_FAILURE,
         NOT_AUTHENTICATED,
         LOGIN_FETCH_USER,
         LOGIN_REFRESH_JWTTOKEN
         } from "../../constants";

/**
 * The following functions will be called inside the login action that is the one that
 * is used by redux as a thunk.
 */

const request = (flag : boolean = true) => {
  return {
    type: LOGIN_REQUEST,
    payload: flag
  }
};

const success = (identity: IUserIdentity) => {
  return {
    type: LOGIN_SUCCESS,
    payload: identity
  }
};

const invalidPassword = (flag : boolean = true) => {
  return {
    type: LOGIN_INVALID_PASSWORD,
    payload: flag
  }
}

const notFound = (flag: boolean = true) => {
  return {
    type : LOGIN_NOT_FOUND,
    payload: flag
  }
}

const failure = (flag: boolean = true) => {
  return {
    type: LOGIN_FAILURE,
    payload: flag
  }
}

const notAuthenticated = () => {
  return {
    type: NOT_AUTHENTICATED
  }
}

/**
 * The following function is the thunk that will be called from a component in other to
 * alter the redux state.
 */

export const login = ({ ...credentials } : ICredentialRequest ) => {
  return (dispatch : Dispatch<any>) => {
    dispatch(request(true));
    identityService
    .login({...credentials})
    .then((fetchedData : IAPIResponse<ITokenResponse>) => {
      switch(fetchedData.statusCode){
        case 200:
          const uIdentity = identityBuilder(fetchedData)
          const uIdentityEncrypted = objEncryptionDecryption(true, uIdentity);
          saveObjectInLocalStorage('identity', uIdentityEncrypted);
          dispatch(success(uIdentity));
          break;
        case 400:
          dispatch(invalidPassword());
          break;
        case 404:
          dispatch(notFound());
          break;
        default:
          dispatch(failure());
          break;
      }
      dispatch(request(false));
    });
  }
}

export const retrieveIdentity = () => {
  return (dispatch : Dispatch<any>) : void => {
    let data : string | null = retrieveObjectFromLocalStorage('identity')
    if(data){
      let plainObject = objEncryptionDecryption(false, data) as IUserIdentity;
      dispatch(success(plainObject));
    } else {
      dispatch(notAuthenticated());
    }
  }
};

export const fetchUser = ({ ...tokens } : ITokenResponse) => {
  return (dispatch : Dispatch<any>) => {



  }
}

export const logout = () => {
  return (dispatch : Dispatch<any>) => {

  }
}

export const refresh = () => {
  return (dispatch : Dispatch<any>) => {

  };
};
