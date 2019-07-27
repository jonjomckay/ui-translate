import { Culture, FlowRedux, FlowState } from '../Flow/FlowRedux';
import { CulturesRedux } from './CulturesRedux';

interface CulturesState {
    cultures: Culture[]
    isLoading: boolean
}

const initialState: CulturesState = {
    cultures: [],
    isLoading: false
};

export function culturesReducer(state = initialState, action: CulturesRedux): CulturesState {
    switch (action.type) {
        case 'SET_CULTURES':
            return {
                ...state,
                cultures: action.cultures
            };
        case 'SET_CULTURES_LOADING':
            return {
                ...state,
                isLoading: action.isLoading
            };
        default:
            return state;
    }
}
