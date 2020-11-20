import { Character, State } from './store';

import Action from './actions';

export default function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_CHARACTER': {
      const newState = { ...state };
      newState.character = action.character;

      return newState;
    }
    case 'SET_CHARACTERS': {
      const newState = { ...state };
      newState.characters = action.characters;

      return newState;
    }
    case 'FETCH_CHARACTERS': {
      const newState = { ...state };
      newState.characters = CHARACTERS;

      return newState;
    }
  }

  return state;
}

const CHARACTERS: Character[] = [
  {
    id: '1',
    name: 'Rick Sanchez',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  },
  {
    id: '2',
    name: 'Morty Smith',
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
  },
  {
    id: '3',
    name: 'Summer Smith',
    image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
  },
  {
    id: '4',
    name: 'Beth Smith',
    image: 'https://rickandmortyapi.com/api/character/avatar/4.jpeg',
  },
  {
    id: '5',
    name: 'Jerry Smith',
    image: 'https://rickandmortyapi.com/api/character/avatar/5.jpeg',
  },
];
