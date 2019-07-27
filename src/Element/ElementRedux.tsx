import axios from 'axios';
import { Element, ElementTranslation } from '../Flow/FlowRedux';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../store';
import { Action } from 'redux';

export const SAVE_ELEMENT = 'SAVE_ELEMENT';
export const SET_ELEMENT = 'SET_ELEMENT';
export const SET_ELEMENT_LOADING = 'SET_ELEMENT_LOADING';
export const SET_ELEMENT_SAVING = 'SET_ELEMENT_SAVING';

interface SaveElementAction {
    type: typeof SAVE_ELEMENT
}

interface SetElementAction {
    type: typeof SET_ELEMENT
    element: Element
    kind: string
}

interface SetElementLoadingAction {
    type: typeof SET_ELEMENT_LOADING
    isLoading: boolean
}

interface SetElementSavingAction {
    type: typeof SET_ELEMENT_SAVING
    isSaving: boolean
}

export type ElementRedux = SaveElementAction | SetElementAction | SetElementLoadingAction | SetElementSavingAction;

export const addElementTranslation = (translation: ElementTranslation): ThunkAction<void, AppState, null, Action<string>> => async (dispatch, getState) => {
    const state = getState();

    const currentElement = state.element.element;
    const currentElementKind = state.element.elementKind;

    // If the current culture already exists in the element, we just append to it, otherwise, we need to create it
    if (currentElement.contentValueDocument.translations[translation.culture] === undefined ||
        currentElement.contentValueDocument.translations[translation.culture].contentValues === undefined ||
        currentElement.contentValueDocument.translations[translation.culture].contentValues === null) {
        currentElement.contentValueDocument.translations[translation.culture] = {
            contentValues: {

            }
        };
    }

    // Set the translation in the element culture/translation map
    currentElement.contentValueDocument.translations[translation.culture].contentValues[translation.id] = translation.value;

    dispatch({
        type: SET_ELEMENT,
        element: currentElement,
        kind: currentElementKind
    });
};

export const loadElement = (flow: string, id: string, kind: string): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
    dispatch({
        type: SET_ELEMENT_LOADING,
        isLoading: true
    });

    let url;

    switch (kind) {
        case 'group':
        case 'map':
        case 'navigation':
            url = 'https://flow.boomi.com/api/translate/1/flow/' + flow + '/f72e0a59-631b-4839-9320-5d105f5a4f75/element/' + kind;
            break;
        default:
            url = 'https://flow.boomi.com/api/translate/1/element/' + kind;
            break;
    }

    axios.get(url + '/' + id)
        .then(response => {
            dispatch({
                type: SET_ELEMENT,
                element: response.data
            });

            dispatch({
                type: SET_ELEMENT_LOADING,
                isLoading: false
            });
        })
};

export const saveElement = (flow: string, element: Element, kind: string): ThunkAction<Promise<void>, AppState, null, Action<string>> => async dispatch => {
    dispatch({
        type: SET_ELEMENT_SAVING,
        isSaving: true
    });

    let url;

    switch (kind) {
        case 'group':
        case 'map':
        case 'navigation':
            url = 'https://flow.boomi.com/api/translate/1/flow/' + flow + '/f72e0a59-631b-4839-9320-5d105f5a4f75/element/' + kind;
            break;
        default:
            url = 'https://flow.boomi.com/api/translate/1/element/' + kind;
            break;
    }

    return axios.post(url, element)
        .then(() => {
            dispatch({
                type: SET_ELEMENT_SAVING,
                isSaving: false
            });
        });
};
