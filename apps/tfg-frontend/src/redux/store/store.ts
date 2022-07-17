import { createStore, applyMiddleware, compose } from 'redux';
import { rootReducer } from '../reducers';
import thunkMiddleware from 'redux-thunk';
import { Dispatch } from 'react';

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose,
    }
}

const composeEnhancers = process.env['NODE_ENV'] === 'development' ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

export const store = createStore(
    rootReducer,
    composeEnhancers?.(
      applyMiddleware(thunkMiddleware)
    )
);

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch | Dispatch<any>
