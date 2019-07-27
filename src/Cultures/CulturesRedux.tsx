import axios from 'axios';
import { Culture } from '../Flow/FlowRedux';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../store';
import { Action } from 'redux';

export const SET_CULTURES = 'SET_CULTURES';
export const SET_CULTURES_LOADING = 'SET_CULTURES_LOADING';

interface SetCulturesAction {
    type: typeof SET_CULTURES
    cultures: Culture[]
}

interface SetCulturesLoadingAction {
    type: typeof SET_CULTURES_LOADING
    isLoading: boolean
}

export type CulturesRedux = SetCulturesAction | SetCulturesLoadingAction;

export const loadCultures = (): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
    dispatch({
        type: SET_CULTURES_LOADING,
        isLoading: true
    });

    axios.get('https://flow.boomi.com/api/translate/1/culture')
        .then(response => {
            dispatch({
                type: SET_CULTURES,
                cultures: response.data
            });

            dispatch({
                type: SET_CULTURES_LOADING,
                isLoading: false
            });
        })
};
