import { ICredentialRequest, IRefreshTokenRequest, IUserIdentity } from "../../interfaces";
import { identityService } from "../../services";
import { doApiCall, objEncryptionDecryption } from "../../utils";
import { identityBuilder,
         saveObjectInLocalStorage,
         retrieveObjectFromLocalStorage,
         purgeObjectFromLocalStorage } from "../helpers";
import { LOGIN_SUCCESS,
         LOGIN_REQUEST,
         LOGIN_NOT_FOUND,
         LOGIN_INVALID_PASSWORD,
         LOGIN_FAILURE,
         NOT_AUTHENTICATED,
         LOGIN_REFRESH_JWTTOKEN,
         SESSION_EXPIRED,
         REFRESH_TRIGGERED
         } from "../constants";
import { AppDispatch } from "../store/store";

/**
 * The following functions will be called inside the login action that is the one that
 * is used by redux as a thunk.
 */

const request = (flag : boolean = true) => ({
    type: LOGIN_REQUEST,
    payload: flag
  });

const success = (identity: IUserIdentity) => ({
    type: LOGIN_SUCCESS,
    payload: identity
  });

const invalidPassword = (flag : boolean = true) => ({
    type: LOGIN_INVALID_PASSWORD,
    payload: flag
  })

const notFound = (flag: boolean = true) => ({
    type : LOGIN_NOT_FOUND,
    payload: flag
  })

const failure = (flag: boolean = true) => ({
    type: LOGIN_FAILURE,
    payload: flag
  })

const setTokens = (tokens  : IRefreshTokenRequest) => ({
  type: LOGIN_REFRESH_JWTTOKEN,
  payload: tokens
})

const notAuthenticated = () => ({ type: NOT_AUTHENTICATED })
const triggerRefresh = (flag: boolean = true) => ({ type: REFRESH_TRIGGERED, payload: flag })
const expiredSession = () => ({ type: SESSION_EXPIRED })

/**
 * The following function is the thunk that will be called from a component in other to
 * alter the redux state.
 */

export const login = ({ ...credentials } : ICredentialRequest ) => {
  return async (dispatch : AppDispatch) => {
    try {
      dispatch(request(true));
      let fetchedData = await doApiCall(identityService.login, { ...credentials });
      switch(fetchedData.get('statusCode')){
        case 200:
          const uIdentity = identityBuilder(fetchedData.get("identity"))
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
      }
    } catch (err) {
      dispatch(failure());
    }
    dispatch(request(false));
  }
}

export const retrieveIdentity = () => {
  return (dispatch : AppDispatch) : void => {
    let data : string | null = retrieveObjectFromLocalStorage('identity')
    if(data){
      let plainObject = objEncryptionDecryption(false, data) as IUserIdentity;
      dispatch(success(plainObject));
    } else {
      dispatch(notAuthenticated());
    }
  }
}

export const logout = () => {
  return (dispatch : AppDispatch) => {
    purgeObjectFromLocalStorage('identity');
    dispatch(notAuthenticated())
  }
}

export const refresh = ({ ...identityTokens } : IRefreshTokenRequest) => {
  return async (dispatch : AppDispatch) => {
    const responseMap = await doApiCall(identityService.refresh, { ...identityTokens });
    if(responseMap.get('statusCode') === 200){
      const uIdentity = identityBuilder({ ...responseMap.get('tokens') })
      const uIdentityEncrypted = objEncryptionDecryption(true, uIdentity);
      saveObjectInLocalStorage('identity', uIdentityEncrypted);
      dispatch(setTokens({ ...responseMap.get('tokens') }))
      dispatch(refreshTrigger(false))
    } else {
      purgeObjectFromLocalStorage('identity')
      dispatch(notAuthenticated())
    }
  };
}

export const refreshTrigger = (flag : boolean) => {
  return (dispatch: AppDispatch) => {
    dispatch(triggerRefresh())
  }
}

export const sessionExpired = () => {
  return (dispatch : AppDispatch) => {
    purgeObjectFromLocalStorage('identity');
    dispatch(expiredSession())
  }
}
