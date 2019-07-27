import { ThunkAction } from 'redux-thunk';
import { AppState } from '../store';
import { Action } from 'redux';
import axios from 'axios';

export const SAVE_MAP_ELEMENT = "SAVE_MAP_ELEMENT";
export const SET_CULTURES = 'SET_CULTURES';
export const SET_FLOW = 'SET_FLOW';
export const SET_IS_LOADING = 'SET_IS_LOADING';
export const SET_IS_SAVING = 'SET_IS_SAVING';
export const SET_CURRENT_MAP_ELEMENT = 'SET_CURRENT_MAP_ELEMENT';

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

interface SetCurrentMapElement {
    type: typeof SET_CURRENT_MAP_ELEMENT
    mapElement: MapElement
}

export type FlowRedux = SaveMapElementAction | SetCulturesAction | SetFlowAction | SetIsLoadingAction | SetIsSavingAction | SetCurrentMapElement;

export const saveMapElement = (mapElement: MapElement): ThunkAction<Promise<void>, AppState, null, Action<string>> => async (dispatch, getState) => {
    const state = getState();

    dispatch({
        type: SET_IS_SAVING,
        isSaving: true
    });

    return axios.post('https://flow.boomi.com/api/translate/1/flow/' + state.flow.flow.id + '/d91031d7-1ddd-427c-a93c-16fc0c5756c5/element/map', mapElement)
        .then(() => {
            dispatch({
                type: SET_IS_SAVING,
                isSaving: false
            });
        });
};

export const addMapElementTranslation = (translation: MapElementTranslation): ThunkAction<void, AppState, null, Action<string>> => async (dispatch, getState) => {
    const state = getState();

    const currentMapElement = state.flow.currentMapElement;

    // If the current culture already exists in the element, we just append to it, otherwise, we need to create it
    if (currentMapElement.contentValueDocument.translations[translation.culture] === undefined ||
        currentMapElement.contentValueDocument.translations[translation.culture].contentValues === undefined ||
        currentMapElement.contentValueDocument.translations[translation.culture].contentValues === null) {
        currentMapElement.contentValueDocument.translations[translation.culture] = {
            contentValues: {

            }
        };
    }

    // Set the translation in the map element culture/translation map
    currentMapElement.contentValueDocument.translations[translation.culture].contentValues[translation.id] = translation.value;

    dispatch({
        type: SET_CURRENT_MAP_ELEMENT,
        mapElement: currentMapElement
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

export function setCurrentMapElement(mapElement: MapElement) {
    return {
        type: SET_CURRENT_MAP_ELEMENT,
        mapElement: mapElement
    }
}

// State
export interface MapElementTranslation {
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

export interface MapElement {
    contentValueDocument: ContentValueDocument
    developerName: string
    id: string
}

export interface FlowTranslationImage {
    developerName: string
    id: string,
    mapElements: MapElement[]
}

export interface FlowState {
    cultures: Culture[] // TODO: This feels like the wrong place
    currentMapElement: MapElement
    flow: FlowTranslationImage
    isLoading: boolean
    isSaving: boolean
    updatedTranslations: MapElementTranslation[] // TODO: This feels like the wrong place
}
