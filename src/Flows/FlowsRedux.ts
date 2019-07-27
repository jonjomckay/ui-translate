import { ThunkAction } from 'redux-thunk';
import { AppState } from '../store';
import { Action } from 'redux';
import axios from 'axios';

export const LOAD_FLOWS = "LOAD_FLOWS";
export const SET_FLOWS = "SET_FLOWS";

// Actions
interface LoadFlowsAction {
    type: typeof LOAD_FLOWS
}

interface SetFlowsAction {
    type: typeof SET_FLOWS
    flows: Flow[]
}

export type FlowsRedux = LoadFlowsAction | SetFlowsAction;

export function setFlows(flows: Flow[]) {
    return {
        type: SET_FLOWS,
        flows: flows
    }
}

export const loadFlows = (): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
    dispatch({
        type: LOAD_FLOWS
    });

    axios.get('https://flow.boomi.com/api/translate/1/flow')
        .then(response => dispatch(setFlows(response.data)));
};

// State
export interface Flow {
    developerName: string
    id: {
        id: string,
        versionId: string
    }
}

export interface FlowsState {
    flows: Flow[]
    isLoading: boolean
}
