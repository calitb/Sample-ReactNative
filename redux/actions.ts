import { Character, State } from './reducer';

import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

interface SetCharacter {
  type: 'SET_CHARACTER';
  character: Character;
}

interface SetCharacters {
  type: 'SET_CHARACTERS';
  characters: Character[];
}

interface GoBack {
  type: 'GO_BACK';
}

interface GoForward {
  type: 'GO_FORWARD';
}

interface GoLast {
  type: 'GO_LAST';
}

interface GoFirst {
  type: 'GO_FIRST';
}

export function go(page: number): ThunkAction<any, any, any, Actions> {
  return async (dispatch: Dispatch<Actions>, getState: () => State) => {
    const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
    const body = await response.json();
    const { results, info } = body;
    const characters = results.map(characterMapper);

    console.log({ info });

    dispatch({ type: 'SET_CHARACTERS', characters });
  };
}

export function fetchCharacters(): ThunkAction<any, any, any, Actions> {
  return async (dispatch: Dispatch<Actions>, getState: () => State) => {
    const response = await fetch('https://rickandmortyapi.com/api/character');
    const body = await response.json();
    const { results, info } = body;
    const characters = results.map(characterMapper);

    dispatch({ type: 'SET_CHARACTERS', characters });
  };
}

type Actions = SetCharacter | SetCharacters;
export default Actions;

function characterMapper({ id, name, image }: Character): Character {
  return {
    id,
    name,
    image,
  };
}
