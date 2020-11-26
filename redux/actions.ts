import { APIInfo, Character, State } from './reducer';

import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { fetchCharacters } from '../api';

interface SetCharacter {
  type: 'SET_CHARACTER';
  character: Character;
}

interface SetCharacters {
  type: 'SET_CHARACTERS';
  characters: Character[];
}

interface SetPagesInfo {
  type: 'SET_PAGES_INFO';
  info: APIInfo;
  page: number;
}

interface SetLoading {
  type: 'SET_LOADING';
  loading: boolean;
}

async function go(state: State, page: number, dispatch: Dispatch<Actions>) {
  if (!state.loading) {
    dispatch({ type: 'SET_LOADING', loading: true });
    dispatch({ type: 'SET_CHARACTERS', characters: [] });

    const results = await fetchCharacters(page);
    if (results) {
      const { characters, apiInfo } = results;
      dispatch({ type: 'SET_CHARACTERS', characters });
      dispatch({ type: 'SET_PAGES_INFO', info: apiInfo, page });
    }

    dispatch({ type: 'SET_LOADING', loading: false });
  }
}

export function loadCharacters(): ThunkAction<any, any, any, Actions> {
  return async (dispatch: Dispatch<Actions>, getState: () => State) => {
    const state = getState();
    await go(state, state.pagination.page, dispatch);
  };
}

export function goBack(): ThunkAction<any, any, any, Actions> {
  return async (dispatch: Dispatch<Actions>, getState: () => State) => {
    const state = getState();
    await go(state, state.pagination.page - 1, dispatch);
  };
}

export function goForward(): ThunkAction<any, any, any, Actions> {
  return async (dispatch: Dispatch<Actions>, getState: () => State) => {
    const state = getState();
    await go(state, state.pagination.page + 1, dispatch);
  };
}

type Actions = SetCharacter | SetCharacters | SetPagesInfo | SetLoading;
export default Actions;
