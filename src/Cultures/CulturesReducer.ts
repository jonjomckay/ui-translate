import { Culture } from '../Flow/FlowRedux';
import { CulturesRedux } from './CulturesRedux';

interface CulturesState {
    cultures: Culture[]
    cultureToDelete?: Culture
    isDeleting: boolean
    isLoading: boolean
}

const initialState: CulturesState = {
    cultures: [],
    isDeleting: false,
    isLoading: false
};

export function culturesReducer(state = initialState, action: CulturesRedux): CulturesState {
    switch (action.type) {
        case 'SET_CULTURES':
            return {
                ...state,
                cultures: action.cultures
            };
        case 'SET_CULTURE_TO_DELETE':
            return {
                ...state,
                cultureToDelete: action.culture
            };
        case 'TOGGLE_CULTURES_DELETING':
            return {
                ...state,
                isDeleting: !state.isDeleting
            };
        case 'TOGGLE_CULTURES_LOADING':
            return {
                ...state,
                isLoading: !state.isLoading
            };
        default:
            return state;
    }
}
