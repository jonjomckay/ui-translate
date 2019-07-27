import { Culture } from '../Flow/FlowRedux';
import { CultureRedux } from './CultureRedux';

interface CultureState {
    culture: Culture
    isLoading: boolean
    isSaving: boolean
}

const initialState: CultureState = {
    culture: {
        brand: '',
        country: '',
        developerName: '',
        id: '',
        language: '',
        variant: ''
    },
    isLoading: false,
    isSaving: false
};

export function cultureReducer(state = initialState, action: CultureRedux): CultureState {
    switch (action.type) {
        case 'SET_CULTURE':
            return {
                ...state,
                culture: action.culture
            };
        case 'SET_CULTURE_FIELD':
            return {
                ...state,
                culture: {
                    ...state.culture,
                    [action.field]: action.value
                }
            };
        case 'SET_CULTURE_LOADING':
            return {
                ...state,
                isLoading: action.isLoading
            };
        case 'SET_CULTURE_SAVING':
            return {
                ...state,
                isSaving: action.isSaving
            };
        default:
            return state;
    }
}
