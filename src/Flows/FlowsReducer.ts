import { FlowsState, FlowsRedux } from './FlowsRedux';

const initialState: FlowsState = {
    flows: [],
    isLoading: false
};

export function flowsReducer(state = initialState, action: FlowsRedux): FlowsState {
    switch (action.type) {
        case 'LOAD_FLOWS':
            return {
                ...state,
                isLoading: true
            };
        case 'SET_FLOWS':
            return {
                flows: action.flows,
                isLoading: false
            };
        default:
            return state;
    }
}
