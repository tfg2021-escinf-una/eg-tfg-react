import { IUserIdentity } from '../../../interfaces';
import { LOGIN_SUCCESS,
         LOGIN_REQUEST,
         LOGIN_NOT_FOUND,
         LOGIN_INVALID_PASSWORD,
         LOGIN_FAILURE,
         LOGIN_FETCH_USER,
         NOT_AUTHENTICATED,
} from "../../constants";

export interface IIdentityState {
  isAuthenticated : boolean,
  isNotFound : boolean,
  isRequestingLogin : boolean,
  isInvalidPassword : boolean,
  failure : boolean,
  identity: IUserIdentity,
}

const initialState : IIdentityState = {
  isAuthenticated: false,
  isNotFound: false,
  isRequestingLogin: false,
  isInvalidPassword: false,
  failure: false,
  identity : {
    user : undefined,
    tokens: undefined
  } as IUserIdentity
};

export const sessionReducer = (state : IIdentityState = initialState, action: any) => {
  switch(action.type){
    case LOGIN_SUCCESS:
      return {...state,
        isAuthenticated: true,
        identity: action.payload
      } as IIdentityState;

    case LOGIN_FAILURE:
      return { ...state,
        failure: action.payload
      }

    case LOGIN_NOT_FOUND:
      return { ...state,
        isNotFound: action.payload
      };

    case LOGIN_INVALID_PASSWORD:
      return {...state,
        isInvalidPassword: action.payload
      }

    case LOGIN_REQUEST:
      return {...state,
        isRequestingLogin: action.payload
      }

    case NOT_AUTHENTICATED:
      return initialState;

    case LOGIN_FETCH_USER:
      return new Error("Not implemented yet! Keep Calm and be patient!!")

    default:
      return state;
  }
}
