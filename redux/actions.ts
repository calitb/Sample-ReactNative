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

interface GoLast {
  type: 'GO_LAST';
}

interface GoFirst {
  type: 'GO_FIRST';
}

// export function go(page: number): ThunkAction<any, any, any, Actions> {
//   return async (dispatch: Dispatch<Actions>, getState: () => State) => {
//     const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
//     const body = await response.json();
//     const { results, info } = body;
//     const characters = results.map(characterMapper);

//     console.log({ info });

//     dispatch({ type: 'SET_CHARACTERS', characters });
//   };
// }

export function loadCharacters(): ThunkAction<any, any, any, Actions> {
  return async (dispatch: Dispatch<Actions>, getState: () => State) => {
    const state = getState();

    const results = await fetchCharacters(state.pagination.page);
    if (results) {
      const { characters, apiInfo } = results;
      dispatch({ type: 'SET_CHARACTERS', characters });
      dispatch({ type: 'SET_PAGES_INFO', info: apiInfo, page: state.pagination.page });
    }
  };
}

export function goBack(): ThunkAction<any, any, any, Actions> {
  return async (dispatch: Dispatch<Actions>, getState: () => State) => {
    const state = getState();

    const results = await fetchCharacters(state.pagination.page - 1);
    if (results) {
      const { characters, apiInfo } = results;
      dispatch({ type: 'SET_CHARACTERS', characters });
      dispatch({ type: 'SET_PAGES_INFO', info: apiInfo, page: state.pagination.page - 1 });
    }
  };
}

export function goForward(): ThunkAction<any, any, any, Actions> {
  return async (dispatch: Dispatch<Actions>, getState: () => State) => {
    const state = getState();

    const results = await fetchCharacters(state.pagination.page + 1);
    if (results) {
      const { characters, apiInfo } = results;
      dispatch({ type: 'SET_CHARACTERS', characters });
      dispatch({ type: 'SET_PAGES_INFO', info: apiInfo, page: state.pagination.page + 1 });
    }
  };
}

type Actions = SetCharacter | SetCharacters | SetPagesInfo;
export default Actions;
