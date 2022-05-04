import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { rootReducer } from '../reducers';
import thunkMiddleware from 'redux-thunk';

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose,
    }
}

const loggerMiddleware = createLogger()

const composeEnhancers = process.env['NODE_ENV'] === 'development' ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

export const store =  createStore( 
    rootReducer,
    composeEnhancers?.(
        applyMiddleware(thunkMiddleware, loggerMiddleware)
    )
);