import { Character } from './store';

interface SetCharacter {
  type: 'SET_CHARACTER';
  character: Character;
}

interface SetCharacters {
  type: 'SET_CHARACTERS';
  characters: Character[];
}

interface FetchCharacters {
  type: 'FETCH_CHARACTERS';
}

type Action = SetCharacter | FetchCharacters | SetCharacters;

export default Action;
