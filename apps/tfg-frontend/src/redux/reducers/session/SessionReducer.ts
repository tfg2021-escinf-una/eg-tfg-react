import { AnyAction } from 'redux';

interface User {
    name: string, 
    role: string,
}

interface Tokens {
    jwt : string,
    refreshToken: string,
    expiresIn : Date
}

const initialState : Object = {
    user : {
        name: "",
        role: ""
    } as User ,
    tokens: {
        jwt : "",
        refreshToken: "",
        expiresIn: new Date()
    } as Tokens
};

export const SessionReducer = (state = initialState, action: AnyAction) => {
    switch(action.type){
        default: 
            return state;
    }
} 