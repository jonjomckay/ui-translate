import { ThunkAction } from 'redux-thunk';
import { AppState } from '../store';
import { Action } from 'redux';
import axios from 'axios';

export const SAVE_MAP_ELEMENT = "SAVE_MAP_ELEMENT";
export const SET_CULTURES = 'SET_CULTURES';
export const SET_FLOW = 'SET_FLOW';
export const SET_IS_LOADING = 'SET_IS_LOADING';
export const SET_IS_SAVING = 'SET_IS_SAVING';
export const SET_CURRENT_ELEMENT = 'SET_CURRENT_ELEMENT';

// Actions
interface SaveMapElementAction {
    type: typeof SAVE_MAP_ELEMENT
    mapElement: MapElement
}

interface SetCulturesAction {
    type: typeof SET_CULTURES
    cultures: Culture[]
}

interface SetFlowAction {
    type: typeof SET_FLOW
    flow: FlowTranslationImage
}

interface SetIsLoadingAction {
    type: typeof SET_IS_LOADING,
    isLoading: boolean
}

interface SetIsSavingAction {
    type: typeof SET_IS_SAVING,
    isSaving: boolean
}

interface SetCurrentElement {
    type: typeof SET_CURRENT_ELEMENT
    element: Element
    kind: string
}

export type FlowRedux = SaveMapElementAction | SetCulturesAction | SetFlowAction | SetIsLoadingAction | SetIsSavingAction | SetCurrentElement;

export const saveElement = (element: Element): ThunkAction<Promise<void>, AppState, null, Action<string>> => async (dispatch, getState) => {
    const state = getState();

    dispatch({
        type: SET_IS_SAVING,
        isSaving: true
    });

    let url;

    switch (state.flow.currentElementKind) {
        case 'group':
        case 'map':
        case 'navigation':
            url = 'https://flow.boomi.com/api/translate/1/flow/' + state.flow.flow.id + '/d91031d7-1ddd-427c-a93c-16fc0c5756c5/element/' + state.flow.currentElementKind;
            break;
        default:
            url = 'https://flow.boomi.com/api/translate/1/element/' + state.flow.currentElementKind;
            break;
    }

    return axios.post(url, element)
        .then(() => {
            dispatch({
                type: SET_IS_SAVING,
                isSaving: false
            });
        });
};

export const addElementTranslation = (translation: ElementTranslation): ThunkAction<void, AppState, null, Action<string>> => async (dispatch, getState) => {
    const state = getState();

    const currentElement = state.flow.currentElement;
    const currentElementKind = state.flow.currentElementKind;

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
        type: SET_CURRENT_ELEMENT,
        element: currentElement,
        kind: currentElementKind
    });
};

export const loadFlowAndCultures = (id: string): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
    dispatch({
        type: SET_IS_LOADING,
        isLoading: true
    });

    const promiseOne = axios.get('https://flow.boomi.com/api/translate/1/culture')
        .then(response => dispatch(setCultures(response.data)));

    const promiseTwo = axios.get('https://flow.boomi.com/api/translate/1/flow/' + id)
        .then(response => dispatch(setFlow(response.data)));

    Promise.all([promiseOne, promiseTwo])
        .then(_ => {
            dispatch({
                type: SET_IS_LOADING,
                isLoading: false
            })
        })
};

export function setCultures(cultures: Culture[]) {
    return {
        type: SET_CULTURES,
        cultures: cultures
    }
}

export function setFlow(flow: FlowTranslationImage) {
    return {
        type: SET_FLOW,
        flow: flow
    }
}

export function setCurrentElement(element: Element, kind: string) {
    return {
        type: SET_CURRENT_ELEMENT,
        element: element,
        kind: kind
    }
}

// State
export interface ElementTranslation {
    culture: string
    id: string
    value: string
}

interface ContentValueDocumentTranslation {
    contentValues: { [id: string]: string }
}

interface ContentValueDocument {
    translations: { [id: string]: ContentValueDocumentTranslation }
}

export interface Culture {
    country: string
    developerName: string
    id: string
    language: string
}

export interface Element {
    contentValueDocument: ContentValueDocument
    developerName: string
    id: string
}

export interface MapElement extends Element {

}

export interface PageElement extends Element {

}

export interface FlowTranslationImage {
    developerName: string
    id: string,
    mapElements: MapElement[]
    pageElements: PageElement[]
}

export interface FlowState {
    cultures: Culture[] // TODO: This feels like the wrong place
    currentElement: Element
    currentElementKind: string
    flow: FlowTranslationImage
    isLoading: boolean
    isSaving: boolean
    updatedTranslations: ElementTranslation[] // TODO: This feels like the wrong place
}
