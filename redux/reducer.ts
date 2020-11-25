import Action from './actions';

export interface Character {
  id: string;
  name: string;
  image: string;
}

interface Pagination {
  actual: number;
  anterior?: number;
  siguiente?: number;
  total: number;
}

export interface State {
  characters: Character[];
  character?: Character;
  pagination: Pagination;
}

export const initialState: State = {
  characters: [],
  character: undefined,
  pagination: {
    actual: 1,
    total: 0,
    anterior: undefined,
    siguiente: undefined,
  },
};

export default function reducer(state: State = initialState, action: Action): State {
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
  }

  return state;
}
