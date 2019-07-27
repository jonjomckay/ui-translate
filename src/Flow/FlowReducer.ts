import { FlowState, FlowRedux } from './FlowRedux';

const initialState: FlowState = {
    cultures: [],
    currentElement: {
        developerName: '',
        contentValueDocument: {
            translations: {

            }
        },
        id: ''
    },
    currentElementKind: '',
    flow: {
        developerName: '',
        id: '',
        mapElements: [],
        pageElements: []
    },
    isLoading: false,
    isSaving: false,
    updatedTranslations: []
};

export function flowReducer(state = initialState, action: FlowRedux): FlowState {
    switch (action.type) {
        case 'SET_CULTURES':
            return {
                ...state,
                cultures: action.cultures
            };
        case 'SET_FLOW':
            return {
                ...state,
                flow: action.flow
            };
        case 'SET_CURRENT_ELEMENT':
            return {
                ...state,
                currentElement: action.element,
                currentElementKind: action.kind
            };
        case 'SET_IS_LOADING':
            return {
                ...state,
                isLoading: action.isLoading
            };
        case 'SET_IS_SAVING':
            return {
                ...state,
                isSaving: action.isSaving
            };
        default:
            return state;
    }
}
