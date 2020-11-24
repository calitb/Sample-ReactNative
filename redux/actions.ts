import { Character } from './store';
import { Thunk } from './useRedux';

interface SetCharacter {
  type: 'SET_CHARACTER';
  character: Character;
}

interface SetCharacters {
  type: 'SET_CHARACTERS';
  characters: Character[];
}

export function fetchCharacters(): Thunk {
  return async (dispatch: React.Dispatch<Action>) => {
    const response = await fetch('https://rickandmortyapi.com/api/character');
    const body = await response.json();
    const { results, info } = body;
    const characters = results.map(characterMapper);

    dispatch({ type: 'SET_CHARACTERS', characters });
  };
}

function characterMapper({ id, name, image }: Character): Character {
  return {
    id,
    name,
    image,
  };
}

type Action = SetCharacter | SetCharacters | Thunk;

export default Action;
