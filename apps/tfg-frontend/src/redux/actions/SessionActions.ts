import { Dispatch } from "react";
import { ICredentialRequest, ITokenResponse, IUser, IUserIdentity } from "../../interfaces";
import { identityService } from "../../services";
import { IAPIResponse } from "../../interfaces";
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { LOGIN_SUCCESS,
         LOGIN_REQUEST,
         LOGIN_NOT_FOUND,
         LOGIN_INVALID_PASSWORD,
         LOGIN_FAILURE } from "../constants";

/**
 * The following functions will be called inside the login action that is the one that
 * is used by redux as a thunk.
 */

const request = (flag : boolean) => {
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

const invalidPassword = () => {
    return {
        type: LOGIN_INVALID_PASSWORD
    }
}

const notFound = () => {
    return {
        type : LOGIN_NOT_FOUND
    }
}

const failure = () => {
    return {
        type: LOGIN_FAILURE
    }
}

const identityBuilder = (fetchedData : IAPIResponse<ITokenResponse>) : IUserIdentity => {
    type customJwtPayload = JwtPayload & { 
        name: string,
        role: string,

    };

    const data = fetchedData.data;
    const token : string = data.jwtToken!;
    const decoded = jwtDecode<customJwtPayload>(token);
    const identityObject =  {
        user : {
            name: decoded.name,
            role: decoded.role
        } as IUser,
        tokens: {
            jwtToken: token,
            refreshToken: data.refreshToken,
            expiresat: data.expiresat
        } as ITokenResponse
    } as IUserIdentity;

    localStorage.setItem('userIdentity', JSON.stringify(identityObject));
    return identityObject;
}

/**
 * The following function is the thunk that will be called from a component in other to
 * alter the redux state.
 */

export const login = ({ ...credentials } : ICredentialRequest ) => {
    return (dispatch : Dispatch<any>) => {
        
        dispatch(request(true));

        identityService.login({...credentials})
            .then((fetchedData : IAPIResponse<ITokenResponse>) => {
                switch(fetchedData.statusCode){
                    case 200:
                        dispatch(success(identityBuilder(fetchedData)));
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
    