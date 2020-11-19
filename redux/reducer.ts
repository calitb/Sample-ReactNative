import Action from './actions';
import { State } from './store';

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
      newState.characters = [{ id: '1', name: 'Rick', image: 'imagen.png' }];

      return newState;
    }
  }

  return state;
}
