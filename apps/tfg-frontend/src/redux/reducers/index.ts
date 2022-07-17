import { combineReducers } from 'redux';
import { sessionReducer } from './sessionReducer';
export * from './sessionReducer'
/**
 *  Here we will combine all the possible reducers that redux state is going
 *  to handle.
 */

export const rootReducer = combineReducers({
    sessionReducer : sessionReducer
});
