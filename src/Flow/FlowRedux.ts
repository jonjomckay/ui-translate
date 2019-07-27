import { ThunkAction } from 'redux-thunk';
import { AppState } from '../store';
import { Action } from 'redux';
import axios from 'axios';

export const SET_FLOW = 'SET_FLOW';
export const SET_FLOW_LOADING = 'SET_FLOW_LOADING';
export const SET_FLOW_SAVING = 'SET_FLOW_SAVING';

interface SetFlowAction {
    type: typeof SET_FLOW
    flow: FlowTranslationImage
}

interface SetIsLoadingAction {
    type: typeof SET_FLOW_LOADING,
    isLoading: boolean
}

interface SetIsSavingAction {
    type: typeof SET_FLOW_SAVING,
    isSaving: boolean
}

export type FlowRedux = SetFlowAction | SetIsLoadingAction | SetIsSavingAction;

export const loadFlow = (id: string): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
    dispatch({
        type: SET_FLOW_LOADING,
        isLoading: true
    });

    axios.get('https://flow.boomi.com/api/translate/1/flow/' + id)
        .then(response => {
            dispatch({
                type: SET_FLOW,
                flow: response.data
            });

            dispatch({
                type: SET_FLOW_LOADING,
                isLoading: false
            });
        });
};

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
    brand: string
    country: string
    developerName: string
    developerSummary: string
    id: string
    language: string
    variant: string
}

export interface Element {
    contentValueDocument: ContentValueDocument
    developerName: string
    id: string
}

export interface FlowTranslationImage {
    developerName: string
    developerSummary: string
    editingToken: string
    id: string,
    mapElements: Element[]
    navigationElements: Element[]
    pageElements: Element[]
    valueElements: Element[]
}

export interface FlowState {
    flow: FlowTranslationImage
    isLoading: boolean
    isSaving: boolean
}
