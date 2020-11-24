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
