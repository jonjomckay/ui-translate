import { combineReducers } from 'redux';
import { flowsReducer } from './Flows/FlowsReducer';
import { flowReducer } from './Flow/FlowReducer';

export const rootReducer = combineReducers({
    flow: flowReducer,
    flows: flowsReducer
});

export type AppState = ReturnType<typeof rootReducer>
