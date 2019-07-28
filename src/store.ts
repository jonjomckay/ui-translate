import { combineReducers } from 'redux';
import { flowsReducer } from './Flows/FlowsReducer';
import { flowReducer } from './Flow/FlowReducer';
import { culturesReducer } from './Cultures/CulturesReducer';
import { cultureReducer } from './Culture/CultureReducer';
import { elementReducer } from './Element/ElementReducer';
import { loginReducer } from './Login/LoginReducer';

export const rootReducer = combineReducers({
    culture: cultureReducer,
    cultures: culturesReducer,
    element: elementReducer,
    flow: flowReducer,
    flows: flowsReducer,
    login: loginReducer
});

export type AppState = ReturnType<typeof rootReducer>
