import Action from './actions';

export interface APIInfo {
  count: number;
  next?: number;
  pages: number;
  prev?: number;
}

export interface Character {
  id: string;
  name: string;
  image: string;
  species: string;
  origin: string;
}

interface Pagination extends APIInfo {
  page: number;
}

export interface State {
  characters: Character[];
  character?: Character;
  pagination: Pagination;
  loading: boolean;
}

export const initialState: State = {
  characters: [],
  character: undefined,
  pagination: {
    page: 1,
    count: 0,
    pages: 0,
    prev: undefined,
    next: undefined,
  },
  loading: false,
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
    case 'SET_PAGES_INFO': {
      const newState = { ...state };
      newState.pagination = { ...action.info, page: action.page };

      return newState;
    }
    case 'SET_LOADING': {
      const newState = { ...state };
      newState.loading = action.loading;

      return newState;
    }
  }

  return state;
}
