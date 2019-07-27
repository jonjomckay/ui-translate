import axios from 'axios';
import { Culture } from '../Flow/FlowRedux';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../store';
import { Action } from 'redux';

export const SAVE_CULTURE = 'SAVE_CULTURE';
export const SET_CULTURE = 'SET_CULTURE';
export const SET_CULTURE_FIELD = 'SET_CULTURE_FIELD';
export const SET_CULTURE_LOADING = 'SET_CULTURE_LOADING';
export const SET_CULTURE_SAVING = 'SET_CULTURE_SAVING';

interface SaveCultureAction {
    type: typeof SAVE_CULTURE
}

interface SetCultureAction {
    type: typeof SET_CULTURE
    culture: Culture
}

interface SetCultureLoadingAction {
    type: typeof SET_CULTURE_LOADING
    isLoading: boolean
}

interface SetCultureSavingAction {
    type: typeof SET_CULTURE_SAVING
    isSaving: boolean
}

interface SetCultureField {
    type: typeof SET_CULTURE_FIELD,
    field: string
    value: string
}

export type CultureRedux = SaveCultureAction | SetCultureAction | SetCultureField | SetCultureLoadingAction | SetCultureSavingAction;

export const loadCulture = (id: string): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
    dispatch({
        type: SET_CULTURE_LOADING,
        isLoading: true
    });

    axios.get('https://flow.boomi.com/api/translate/1/culture/' + id)
        .then(response => {
            dispatch({
                type: SET_CULTURE,
                culture: response.data
            });

            dispatch({
                type: SET_CULTURE_LOADING,
                isLoading: false
            });
        })
};

export const saveCulture = (culture: Culture): ThunkAction<Promise<void>, AppState, null, Action<string>> => async dispatch => {
    dispatch({
        type: SET_CULTURE_SAVING,
        isSaving: true
    });

    return axios.post('https://flow.boomi.com/api/translate/1/culture', culture)
        .then(response => {
            dispatch({
                type: SET_CULTURE,
                culture: response.data
            });

            dispatch({
                type: SET_CULTURE_SAVING,
                isSaving: false
            });
        })
};

export function setCultureField(field: string, value: string) {
    return {
        type: SET_CULTURE_FIELD,
        field: field,
        value: value
    }
}
