import { Element } from '../Flow/FlowRedux';
import { ElementRedux } from './ElementRedux';

interface ElementState {
    element: Element
    elementKind: string
    isLoading: boolean
    isSaving: boolean
}

const initialState: ElementState = {
    element: {
        developerName: '',
        contentValueDocument: {
            translations: {

            }
        },
        id: ''
    },
    elementKind: '',
    isLoading: false,
    isSaving: false
};

export function elementReducer(state = initialState, action: ElementRedux): ElementState {
    switch (action.type) {
        case 'SET_ELEMENT':
            return {
                ...state,
                element: action.element,
                elementKind: action.kind
            };
        case 'SET_ELEMENT_LOADING':
            return {
                ...state,
                isLoading: action.isLoading
            };
        case 'SET_ELEMENT_SAVING':
            return {
                ...state,
                isSaving: action.isSaving
            };
        default:
            return state;
    }
}
