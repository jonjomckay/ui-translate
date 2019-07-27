import axios from 'axios';
import { Culture } from '../Flow/FlowRedux';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../store';
import { Action } from 'redux';

export const SET_CULTURES = 'SET_CULTURES';
export const SET_CULTURE_TO_DELETE = 'SET_CULTURE_TO_DELETE';
export const TOGGLE_CULTURES_DELETING = 'TOGGLE_CULTURES_DELETING';
export const TOGGLE_CULTURES_LOADING = 'TOGGLE_CULTURES_LOADING';

interface SetCulturesAction {
    type: typeof SET_CULTURES
    cultures: Culture[]
}

interface SetCultureToDeleteAction {
    type: typeof SET_CULTURE_TO_DELETE
    culture: Culture
}

interface ToggleCulturesDeletingAction {
    type: typeof TOGGLE_CULTURES_DELETING
}

interface ToggleCulturesLoadingAction {
    type: typeof TOGGLE_CULTURES_LOADING
}

export type CulturesRedux = SetCulturesAction | SetCultureToDeleteAction | ToggleCulturesDeletingAction | ToggleCulturesLoadingAction;

export const setCultureToDelete = (culture?: Culture): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
    dispatch({
        type: SET_CULTURE_TO_DELETE,
        culture: culture
    });
};

export function toggleCulturesDeleting() {
    return {
        type: TOGGLE_CULTURES_DELETING
    }
}

export function toggleCulturesLoading() {
    return {
        type: TOGGLE_CULTURES_LOADING
    }
}

export const deleteCulture = (culture: Culture): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
    dispatch(toggleCulturesDeleting());

    axios.delete('https://flow.boomi.com/api/translate/1/culture/' + culture.id)
        .then(() => {
            dispatch(loadCultures());
            dispatch(setCultureToDelete());
            dispatch(toggleCulturesDeleting());
        });
};

export const loadCultures = (): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
    dispatch(toggleCulturesLoading());

    axios.get('https://flow.boomi.com/api/translate/1/culture')
        .then(response => {
            dispatch({
                type: SET_CULTURES,
                cultures: response.data
            });

            dispatch(toggleCulturesLoading());
        })
};
