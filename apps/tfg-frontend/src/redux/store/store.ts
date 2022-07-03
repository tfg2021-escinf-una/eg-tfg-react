import { createStore, applyMiddleware, compose, Middleware,  } from 'redux';
import { createLogger } from 'redux-logger';
import { rootReducer } from '../reducers';
import thunkMiddleware from 'redux-thunk';
import { Dispatch } from 'react';

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose,
    }
}

const loggerMiddleware = createLogger()

const composeEnhancers = process.env['NODE_ENV'] === 'development' ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

export const store = createStore(
    rootReducer,
    composeEnhancers?.(
      applyMiddleware(thunkMiddleware, loggerMiddleware)
    )
);

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch | Dispatch<any>
