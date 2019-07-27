import { FlowState, FlowRedux } from './FlowRedux';

const initialState: FlowState = {
    flow: {
        developerName: '',
        developerSummary: '',
        editingToken: '',
        id: '',
        mapElements: [],
        navigationElements: [],
        pageElements: [],
        valueElements: [],
    },
    isLoading: false,
    isSaving: false
};

export function flowReducer(state = initialState, action: FlowRedux): FlowState {
    switch (action.type) {
        case 'SET_FLOW':
            return {
                ...state,
                flow: action.flow
            };
        case 'SET_FLOW_LOADING':
            return {
                ...state,
                isLoading: action.isLoading
            };
        case 'SET_FLOW_SAVING':
            return {
                ...state,
                isSaving: action.isSaving
            };
        default:
            return state;
    }
}
