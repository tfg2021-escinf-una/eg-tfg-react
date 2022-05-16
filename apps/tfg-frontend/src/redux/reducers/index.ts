import { combineReducers } from 'redux';
import { SessionReducer as SReducer } from './session/SessionReducer';

/**
 *  Here we will combine all the possible reducers that redux state is going
 *  to handle.
 */

export const rootReducer = combineReducers({
    sessionReducer : SReducer
});
