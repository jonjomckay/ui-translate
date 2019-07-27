import { combineReducers } from 'redux';
import { flowsReducer } from './Flows/FlowsReducer';
import { flowReducer } from './Flow/FlowReducer';
import { culturesReducer } from './Cultures/CulturesReducer';
import { cultureReducer } from './Culture/CultureReducer';

export const rootReducer = combineReducers({
    culture: cultureReducer,
    cultures: culturesReducer,
    flow: flowReducer,
    flows: flowsReducer
});

export type AppState = ReturnType<typeof rootReducer>
