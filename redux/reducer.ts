import Action from './actions';

export interface Character {
  id: string;
  name: string;
  image: string;
}

export interface State {
  characters: Character[];
  character?: Character;
}

export const initialState: State = {
  characters: [],
  character: undefined,
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
