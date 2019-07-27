import { combineReducers } from 'redux';
import { flowsReducer } from './Flows/FlowsReducer';
import { flowReducer } from './Flow/FlowReducer';
import { culturesReducer } from './Cultures/CulturesReducer';
import { cultureReducer } from './Culture/CultureReducer';
import { elementReducer } from './Element/ElementReducer';

export const rootReducer = combineReducers({
    culture: cultureReducer,
    cultures: culturesReducer,
    element: elementReducer,
    flow: flowReducer,
    flows: flowsReducer
});

export type AppState = ReturnType<typeof rootReducer>
